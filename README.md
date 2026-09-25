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

## Identity stitching (optional)

The pixel can link its client-side events to the Shopify webhook events (checkouts, orders) received by your Shopify source, by mapping the Shopify cart token and the logged-in customer id to the RudderStack `anonymousId`.

This is **disabled by default**.

Requirements:

- The RudderStack Shopify app must be installed and connected to your Shopify source. The app sends the Shopify webhooks (checkouts, orders) that this stitching links to. Webhooks configured manually or through the legacy RudderStack app are not supported.
- Keep the app's **Client Side Event Tracking using Web Pixel** setting disabled. Otherwise the app's own script also stitches the cart token, to a different `anonymousId`.

To enable it, in `src/index.js`:

1. Set `WRITE_KEY` to your **Shopify source** write key, not a JavaScript source write key. The stitching requests are sent to the `/v1/webhook` endpoint, which only accepts webhook-type sources.
2. Set `ENABLE_IDENTITY_STITCHING` to `true`.

Use only one identity stitching method per store: don't combine this with the storefront reference implementation from the [identity stitching docs](https://www.rudderstack.com/docs/sources/event-streams/cloud-apps/shopify/shopify-source-solution/id-stitching/).
