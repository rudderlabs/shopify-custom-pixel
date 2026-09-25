<p align="center">
  <a href="https://rudderstack.com/">
    <img src="https://user-images.githubusercontent.com/59817155/121357083-1c571300-c94f-11eb-8cc7-ce6df13855c9.png">
  </a>
</p>

<p align="center"><b>The Customer Data Platform for Developers</b></p>

<p align="center">
  <b>
    <a href="https://rudderstack.com">Website</a>
    ·
    <a href="">Documentation</a>
    ·
    <a href="https://rudderstack.com/join-rudderstack-slack-community">Community Slack</a>
  </b>
</p>

---

# \*\*Repo Name\*\*

\*\*Repo description\*\*

## Overview
This project provides an easy-to-follow guide and implementation for adding custom pixels to Shopify stores, allowing you to subscribe to client-side events like page views, product clicks, add-to-cart, and purchases for forwarding it to RudderStack.

\*\*Describe what the software does.\*\*

## Features

\*\*Describe the key features, if necessary.\*\*

## Getting started

\*\*Describe how to use the software.\*\*
Replace all the references of the <DATAPLANE_URL> & <WRITE_KEY> placeholder with actual values at (src/index.js)
Follow https://help.shopify.com/en/manual/promoting-marketing/pixels/custom-pixels/manage for adding the custom pixel in the store

## Identity stitching

This custom pixel tracks Shopify's standard customer events, but it does not map a Shopify cart token to the RudderStack `anonymousId`. Shopify checkout events expose a checkout token as `event.data.checkout.token`; that value remains the `checkout_id` and is not a substitute for the cart token expected by RudderStack's stitching endpoint.

If you combine custom-pixel events with Shopify webhook events, implement cart-token stitching in storefront, app-embed, or headless code that can reliably access the cart. See the [Shopify App Identity Stitching guide](https://www.rudderstack.com/docs/sources/event-streams/cloud-apps/shopify/shopify-source-solution/id-stitching/) for the maintained reference implementation and [INT-7122 decision record](docs/decisions/INT-7122-cart-token-stitching.md) for the custom-pixel sandbox feasibility evidence.
