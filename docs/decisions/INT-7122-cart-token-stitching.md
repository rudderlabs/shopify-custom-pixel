# INT-7122: Keep cart-token stitching outside the custom pixel

- **Status:** Decided
- **Decision:** Option B — publish and maintain the reference implementation in the Shopify Source documentation
- **Evidence reviewed:** 2026-09-25

## Context

The Shopify app embed can read and update the storefront cart, persist the RudderStack anonymous ID as a cart attribute, and send the normalized Ajax cart token to the RudderStack webhook. Porting that implementation into `src/index.js` would only be safe if Shopify's custom-pixel runtime provides a reliable source for that same cart token and can perform the whole flow.

## Feasibility evidence

The primary evidence for this decision is Shopify's current official documentation, not existing RudderStack documentation.

| Requirement | Current Shopify evidence | Conclusion |
| --- | --- | --- |
| Call `fetch('/cart.js')` from a custom pixel and read the shopper's cart | The [Ajax Cart API](https://shopify.dev/docs/api/ajax/reference/cart#get-locale-cart-js) documents `GET /{locale}/cart.js` and a response `token`. Separately, [About web pixels](https://shopify.dev/docs/apps/build/marketing/pixels) says custom pixels run in a lax sandbox implemented as an iframe and cannot access the top frame. Shopify does not document that a relative request from this iframe resolves against the storefront, carries the top-frame cart session, or returns a CORS-readable response. | Not established as a reliable custom-pixel cart-token source. |
| Call `fetch(window.Shopify.routes.root + 'cart.js')` | The [Ajax API](https://shopify.dev/docs/api/ajax) documents `window.Shopify.routes.root` for locale-aware storefront JavaScript. Shopify does not document this top-frame global as available inside the custom-pixel iframe. | Not established in custom pixels. |
| Call `fetch(window.Shopify.routes.root + 'cart/update.js')` | The [Ajax Cart API](https://shopify.dev/docs/api/ajax/reference/cart#post-locale-cart-update-js) documents updating cart attributes from storefront code. It does not guarantee that a sandboxed pixel request shares or can mutate the shopper's top-frame cart session, including across CORS boundaries. | Not established in custom pixels. |
| Use cookies, local storage, or session storage for a one-hour guard | The [Web Pixels Browser API](https://shopify.dev/docs/api/web-pixels-api/standard-api/browser) provides asynchronous access to top-frame cookies, `localStorage`, and `sessionStorage`. | Supported through Shopify's `browser` API; native `document.cookie` and storage should not be assumed. |
| POST to a RudderStack dataplane | Shopify's [`cart_viewed` custom-pixel example](https://shopify.dev/docs/api/web-pixels-api/standard-events/cart_viewed) sends an outbound `fetch` POST to a third party. Shopify does not certify the CORS configuration of a particular RudderStack dataplane, so the exact `${DATAPLANE_URL}/v1/webhook?writeKey=${WRITE_KEY}` request still needs live validation. | Generic outbound POST is supported; endpoint-specific CORS is not proven here. |
| Obtain a true cart token from a pixel event | The documented [`cart_viewed` Cart](https://shopify.dev/docs/api/web-pixels-api/standard-events/cart_viewed) has an `id` but no `token` field. Shopify calls `Cart.id` a globally unique identifier and does not equate it to the Ajax cart token. The documented [`Checkout.token`](https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_started) identifies a checkout. | No documented event field supplies the Ajax cart token. `Cart.id` and `Checkout.token` are not safe substitutes. |

No live-store result or direct Shopify confirmation was available to close the Ajax cart/session gap. This is an absence of affirmative support, not a claim that Shopify explicitly prohibits these requests.

## Decision

Keep `src/index.js` unchanged with respect to cart-token stitching and use the storefront/headless reference implementation documented in the [Shopify App Identity Stitching guide](https://www.rudderstack.com/docs/sources/event-streams/cloud-apps/shopify/shopify-source-solution/id-stitching/).

The decisive blocker for Option A is the lack of a reliable, documented cart-token source in the custom-pixel runtime. Storage and generic outbound network access alone are insufficient. `event.data.checkout.token` remains `checkout_id`; it must not be sent as `cartToken` without a separately approved server-side contract.

## Consequences

- The public custom pixel continues to emit its existing analytics calls and checkout IDs without adding cart reads, cart mutations, or webhook side effects.
- Customers combining custom-pixel and Shopify webhook events must perform cart-token stitching in storefront, app-embed, or headless code that owns the cart.
- The docs reference implementation should remain the canonical implementation for these customers.
- Reconsider Option A only after a live custom-pixel experiment or direct Shopify confirmation proves that `/cart.js` returns the shopper's actual Ajax cart and token, `/cart/update.js` mutates that same cart, the RudderStack webhook passes endpoint-specific CORS, and the documented Browser API can enforce the one-hour guard. Such a test should cover relevant storefront and checkout surfaces, browsers, and consent states.

## Reference implementation reviewed

The comparison implementation is `shopify-pixel-app/extensions/script/assets/tracker.js` at commit `8c98e0a`, especially its `getCart`, `updateCartNote`, and `updateRedisWithCartAttributes` functions. It depends on `window.Shopify.routes.root`, storefront cookies, the Ajax cart token, and a mutable cart session—dependencies that cannot be copied into the custom-pixel sandbox without the missing proof above.
