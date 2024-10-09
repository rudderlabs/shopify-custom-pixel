const DATAPLANE_URL = "<DATA_PLANE_URL>";
const WRITE_KEY = "<WRITE_KEY>";

//helper functions to map the event data to the RudderStack event schema
function mapObjectKeys(obj, mapping) {
  if (!Array.isArray(mapping)) {
    throw new TypeError("mapping should be an array");
  }
  const acc = { ...obj };

  return mapping.reduce((accumulator, { shopifyField, rudderField }) => {
    const value = getNestedValue(obj, shopifyField);
    if (value !== undefined) {
      setNestedValue(accumulator, rudderField, value);
    }
    return acc;
  }, acc);
}

function getNestedValue(obj, path) {
  const parts = path.split(".");
  return parts.reduce((acc, part) => acc && acc[part], obj);
}

function setNestedValue(obj, path, value) {
  const parts = path.split(".");
  const lastIndex = parts.length - 1;
  parts.reduce((acc, part, index) => {
    if (index === lastIndex) {
      acc[part] = value;
    } else if (!acc[part]) {
      acc[part] = {};
    }
    return acc[part];
  }, obj);
}

// Mapping of Shopify fields to RudderStack fields
const contextualFieldMapping = [
  {
    shopifyField: "context.document.referrer",
    rudderField: "page.referrer",
  },
  {
    shopifyField: "document.title",
    rudderField: "page.title",
  },
  {
    shopifyField: "navigator.userAgent",
    rudderField: "userAgent",
  },
  {
    shopifyField: "window.location.href",
    rudderField: "page.url",
  },
  {
    shopifyField: "window.location.pathname",
    rudderField: "page.path",
  },
  {
    shopifyField: "window.location.search",
    rudderField: "page.search",
  },
  {
    shopifyField: "window.screen.height",
    rudderField: "screen.height",
  },
  {
    shopifyField: "window.screen.width",
    rudderField: "screen.width",
  },
];

const productViewedEventMapping = [
  {
    shopifyField: "productVariant.product.id",
    rudderField: "product_id",
  },
  {
    shopifyField: "productVariant.product.title",
    rudderField: "variant",
  },
  {
    shopifyField: "productVariant.product.vendor",
    rudderField: "brand",
  },
  {
    shopifyField: "productVariant.product.type",
    rudderField: "category",
  },
  {
    shopifyField: "productVariant.product.image.src",
    rudderField: "image_url",
  },
  {
    shopifyField: "productVariant.price.amount",
    rudderField: "price",
  },
  {
    shopifyField: "productVariant.price.currencyCode",
    rudderField: "currency",
  },
  {
    shopifyField: "productVariant.product.url",
    rudderField: "url",
  },
  {
    shopifyField: "productVariant.product.sku",
    rudderField: "sku",
  },
  {
    shopifyField: "productVariant.product.title",
    rudderField: "name",
  },
  {
    shopifyField: "cartLine.quantity",
    rudderField: "quantity",
  },
];

const productToCartEventMapping = [
  {
    shopifyField: "cartLine.merchandise.image.src",
    rudderField: "image_url",
  },
  {
    shopifyField: "cartLine.merchandise.price.amount",
    rudderField: "price",
  },
  {
    shopifyField: "cartLine.merchandise.product.id",
    rudderField: "product_id",
  },
  {
    shopifyField: "cartLine.merchandise.product.title",
    rudderField: "variant",
  },
  {
    shopifyField: "cartLine.merchandise.product.type",
    rudderField: "category",
  },
  {
    shopifyField: "cartLine.merchandise.product.vendor",
    rudderField: "brand",
  },
  {
    shopifyField: "cartLine.merchandise.product.url",
    rudderField: "url",
  },
  {
    shopifyField: "cartLine.merchandise.sku",
    rudderField: "sku",
  },
  {
    shopifyField: "cartLine.merchandise.title",
    rudderField: "name",
  },
  {
    shopifyField: "cartLine.quantity",
    rudderField: "quantity",
  },
];

const cartViewedEventMapping = [
  { shopifyField: "merchandise.product.id", rudderField: "product_id" },
  { shopifyField: "merchandise.product.title", rudderField: "variant" },
  { shopifyField: "merchandise.image.src", rudderField: "image_url" },
  { shopifyField: "merchandise.price.amount", rudderField: "price" },
  { shopifyField: "merchandise.product.type", rudderField: "category" },
  { shopifyField: "merchandise.product.url", rudderField: "url" },
  { shopifyField: "merchandise.product.vendor", rudderField: "brand" },
  { shopifyField: "merchandise.sku", rudderField: "sku" },
  { shopifyField: "merchandise.title", rudderField: "name" },
  { shopifyField: "quantity", rudderField: "quantity" },
];

const productListViewedEventMapping = [
  { shopifyField: "image.src", rudderField: "image_url" },
  { shopifyField: "price.amount", rudderField: "price" },
  { shopifyField: "product.id", rudderField: "product_id" },
  { shopifyField: "product.title", rudderField: "variant" },
  { shopifyField: "product.type", rudderField: "category" },
  { shopifyField: "product.url", rudderField: "url" },
  { shopifyField: "product.vendor", rudderField: "brand" },
  { shopifyField: "sku", rudderField: "sku" },
  { shopifyField: "title", rudderField: "name" },
];

const checkoutStartedCompletedEventMapping = [
  { shopifyField: "quantity", rudderField: "quantity" },
  { shopifyField: "title", rudderField: "name" },
  { shopifyField: "variant.image.src", rudderField: "image_url" },
  { shopifyField: "variant.price.amount", rudderField: "price" },
  { shopifyField: "variant.sku", rudderField: "sku" },
  { shopifyField: "variant.product.id", rudderField: "product_id" },
  { shopifyField: "variant.product.title", rudderField: "variant" },
  { shopifyField: "variant.product.type", rudderField: "category" },
  { shopifyField: "variant.product.url", rudderField: "url" },
  { shopifyField: "variant.product.vendor", rudderField: "brand" },
];

(function() {
  "use strict";
  window.RudderSnippetVersion = "3.0.30";
  var identifier = "rudderanalytics";
  if (!window[identifier]) {
    window[identifier] = [];
  }
  var rudderanalytics = window[identifier];
  if (Array.isArray(rudderanalytics)) {
    if (rudderanalytics.snippetExecuted === true && window.console && console.error) {
      console.error("RudderStack JavaScript SDK snippet included more than once.");
    } else {
      rudderanalytics.snippetExecuted = true;
      window.rudderAnalyticsBuildType = "legacy";
      var sdkBaseUrl = "https://cdn.rudderlabs.com/v3";
      var sdkName = "rsa.min.js";
      var scriptLoadingMode = "async";
      var methods = [ "setDefaultInstanceKey", "load", "ready", "page", "track", "identify", "alias", "group", "reset", "setAnonymousId", "startSession", "endSession", "consent" ];
      for (var i = 0; i < methods.length; i++) {
        var method = methods[i];
        rudderanalytics[method] = function(methodName) {
          return function() {
            if (Array.isArray(window[identifier])) {
              rudderanalytics.push([ methodName ].concat(Array.prototype.slice.call(arguments)));
            } else {
              var _methodName;
              (_methodName = window[identifier][methodName]) === null || _methodName === void 0 || _methodName.apply(window[identifier], arguments);
            }
          };
        }(method);
      }
      try {
        new Function('class Test{field=()=>{};test({prop=[]}={}){return prop?(prop?.property??[...prop]):import("");}}');
        window.rudderAnalyticsBuildType = "modern";
      } catch (e) {}
      var head = document.head || document.getElementsByTagName("head")[0];
      var body = document.body || document.getElementsByTagName("body")[0];
      window.rudderAnalyticsAddScript = function(url, extraAttributeKey, extraAttributeVal) {
        var scriptTag = document.createElement("script");
        scriptTag.src = url;
        scriptTag.setAttribute("data-loader", "RS_JS_SDK");
        if (extraAttributeKey && extraAttributeVal) {
          scriptTag.setAttribute(extraAttributeKey, extraAttributeVal);
        }
        if (scriptLoadingMode === "async") {
          scriptTag.async = true;
        } else if (scriptLoadingMode === "defer") {
          scriptTag.defer = true;
        }
        if (head) {
          head.insertBefore(scriptTag, head.firstChild);
        } else {
          body.insertBefore(scriptTag, body.firstChild);
        }
      };
      window.rudderAnalyticsMount = function() {
        (function() {
          if (typeof globalThis === "undefined") {
            var getGlobal = function getGlobal() {
              if (typeof self !== "undefined") {
                return self;
              }
              if (typeof window !== "undefined") {
                return window;
              }
              return null;
            };
            var global = getGlobal();
            if (global) {
              Object.defineProperty(global, "globalThis", {
                value: global,
                configurable: true
              });
            }
          }
        })();
          window.rudderAnalyticsAddScript("".concat(sdkBaseUrl, "/").concat(window.rudderAnalyticsBuildType, "/").concat(sdkName), "data-rsa-write-key", WRITE_KEY);
      };
      if (typeof Promise === "undefined" || typeof globalThis === "undefined") {
        window.rudderAnalyticsAddScript("https://polyfill-fastly.io/v3/polyfill.min.js?version=3.111.0&features=Symbol%2CPromise&callback=rudderAnalyticsMount");
      } else {
        window.rudderAnalyticsMount();
      }
      var loadOptions = {};
        rudderanalytics.load(WRITE_KEY, DATAPLANE_URL, loadOptions);
    }
  }
})();

analytics.subscribe("product_viewed", (event) => {
  const trackProperties = {
    ...mapObjectKeys(event.data, productViewedEventMapping),
  };
  const contextualPayload = mapObjectKeys(
    event.context,
    contextualFieldMapping,
  );

  rudderanalytics.track("Product Viewed", trackProperties, contextualPayload);
});

analytics.subscribe("cart_viewed", (event) => {
  const lines = event?.data?.cart?.lines;
  if (!lines) {
    return;
  }
  const products = [];

  lines.forEach((line) => {
    const product = mapObjectKeys(line, cartViewedEventMapping);
    products.push(product);
  });

  const trackProperties = {
    products: products,
    cart_id: event.data.cart.id,
  };
  const contextualPayload = mapObjectKeys(
    event.context,
    contextualFieldMapping,
  );

  rudderanalytics.track("Cart Viewed", trackProperties, contextualPayload);
});

analytics.subscribe("product_added_to_cart", (event) => {
  const trackProperties = {
    ...mapObjectKeys(event.data, productToCartEventMapping),
  };

  const contextualPayload = mapObjectKeys(
    event.context,
    contextualFieldMapping,
  );

  rudderanalytics.track("Product Added", trackProperties, contextualPayload);
});

analytics.subscribe("product_removed_from_cart", (event) => {
  const trackProperties = {
    ...mapObjectKeys(event.data, productToCartEventMapping),
  };

  const contextualPayload = mapObjectKeys(
    event.context,
    contextualFieldMapping,
  );

  rudderanalytics.track("Product Removed", trackProperties, contextualPayload);
});

analytics.subscribe("collection_viewed", (event) => {
  const productVariants = event?.data?.collection?.productVariants;
  const products = [];

  productVariants.forEach((productVariant) => {
    const mappedProduct = mapObjectKeys(
      productVariant,
      productListViewedEventMapping,
    );
    products.push(mappedProduct);
  });

  const trackProperties = {
    cart_id: event.clientId,
    list_id: event.id,
    products: products,
  };

  const contextualPayload = mapObjectKeys(
    event.context,
    contextualFieldMapping,
  );

  rudderanalytics.track(
    "Product List Viewed",
    trackProperties,
    contextualPayload,
  );
});

analytics.subscribe("checkout_started", (event) => {
  const lineItems = event?.data?.checkout?.lineItems;
  const products = [];

  lineItems.forEach((lineItem) => {
    const mappedProduct = mapObjectKeys(
      lineItem,
      checkoutStartedCompletedEventMapping,
    );
    products.push(mappedProduct);
  });

  const trackProperties = {
    products: products,
    order_id: event.id,
    checkout_id: event?.data?.checkout?.token,
    total: event?.data?.checkout?.totalPrice?.amount,
    currency: event?.data?.checkout?.currencyCode,
    discount: event?.data?.checkout?.discountsAmount?.amount,
    shipping: event?.data?.checkout?.shippingLine?.price?.amount,
    revenue: event?.data?.checkout?.subtotalPrice?.amount,
    value: event?.data?.checkout?.totalPrice?.amount,
    tax: event?.data?.checkout?.totalTax?.amount,
  };
  const contextualPayload = mapObjectKeys(
    event.context,
    contextualFieldMapping,
  );

  rudderanalytics.track("Checkout Started", trackProperties, contextualPayload);
});

analytics.subscribe("search_submitted", (event) => {
  const payload = {
    query: event.data.searchResult.query,
  };

  const contextualPayload = mapObjectKeys(
    event.context,
    contextualFieldMapping,
  );

  rudderanalytics.track("Products Searched", payload, contextualPayload);
});

analytics.subscribe("checkout_completed", (event) => {
  const lineItems = event?.data?.checkout?.lineItems;
  const products = [];

  lineItems.forEach((lineItem) => {
    const mappedProduct = mapObjectKeys(
      lineItem,
      checkoutStartedCompletedEventMapping,
    );
    products.push(mappedProduct);
  });

  const trackProperties = {
    products: products,
    order_id: event.id,
    checkout_id: event?.data?.checkout?.token,
    currency: event?.data?.checkout?.currencyCode,
    discount: event?.data?.checkout?.discountsAmount?.amount,
    shipping: event?.data?.checkout?.shippingLine?.price?.amount,
    revenue: event?.data?.checkout?.subtotalPrice?.amount,
    value: event?.data?.checkout?.totalPrice?.amount,
    tax: event?.data?.checkout?.totalTax?.amount,
  };
  const contextualPayload = mapObjectKeys(
    event.context,
    contextualFieldMapping,
  );

  rudderanalytics.track("Order Completed", trackProperties, contextualPayload);
});

analytics.subscribe("page_viewed", (event) => {
  const contextualPayload = mapObjectKeys(
    event.context,
    contextualFieldMapping,
  );

  const pageProperties = {
    ...event.data,
  };

  rudderanalytics.page("Page Viewed", pageProperties, contextualPayload);
});

analytics.subscribe("checkout_address_info_submitted", (event) => {
  const data = event.data;
  // identify event and mappings
  let userId = data?.checkout?.email;
  const identifyTraits = {
    customerId: data?.order?.customer?.id,
    shopifyClientId: event.clientId,
    email: data?.checkout?.email,
    phone: data?.checkout?.phone,
    firstName: data?.checkout?.billingAddress?.firstName,
    lastName: data?.checkout?.billingAddress?.lastName,
    address: {
      street: data?.checkout?.billingAddress?.address1,
      city: data?.checkout?.billingAddress?.city,
      country: data?.checkout?.billingAddress?.country,
      postalCode: data?.checkout?.billingAddress?.zip,
      state: data?.checkout?.billingAddress?.province,
    },
  };
  rudderanalytics.identify(userId, identifyTraits);
  // track event and mappings
  const contextualPayload = mapObjectKeys(
    event.context,
    contextualFieldMapping,
  );
  const trackProperties = {
    ...event.data.checkout,
  };
  rudderanalytics.track(
    "Checkout Address Info Submitted",
    trackProperties,
    contextualPayload,
  );
});

analytics.subscribe("checkout_contact_info_submitted", (event) => {
  const data = event.data;
  // identify event and mappings
  let userId = data?.checkout?.email;
  const identifyTraits = {
    customerId: data?.order?.customer?.id,
    shopifyClientId: event.clientId,
    email: data?.checkout?.email,
    phone: data?.checkout?.phone,
    firstName: data?.checkout?.billingAddress?.firstName,
    lastName: data?.checkout?.billingAddress?.lastName,
    address: {
      street: data?.checkout?.billingAddress?.address1,
      city: data?.checkout?.billingAddress?.city,
      country: data?.checkout?.billingAddress?.country,
      postalCode: data?.checkout?.billingAddress?.zip,
      state: data?.checkout?.billingAddress?.province,
    },
  };
  rudderanalytics.identify(userId, identifyTraits);
  // track event and mappings
  const contextualPayload = mapObjectKeys(
    event.context,
    contextualFieldMapping,
  );
  const trackProperties = {
    ...event.data.checkout,
  };
  rudderanalytics.track(
    "Checkout Contact Info Submitted",
    trackProperties,
    contextualPayload,
  );
});

analytics.subscribe("checkout_shipping_info_submitted", (event) => {
  const data = event.data;
  // identify event and mappings
  let userId = data?.checkout?.email;
  const identifyTraits = {
    customerId: data?.order?.customer?.id,
    shopifyClientId: event.clientId,
    email: data?.checkout?.email,
    phone: data?.checkout?.phone,
    firstName: data?.checkout?.billingAddress?.firstName,
    lastName: data?.checkout?.billingAddress?.lastName,
    address: {
      street: data?.checkout?.billingAddress?.address1,
      city: data?.checkout?.billingAddress?.city,
      country: data?.checkout?.billingAddress?.country,
      postalCode: data?.checkout?.billingAddress?.zip,
      state: data?.checkout?.billingAddress?.province,
    },
  };
  rudderanalytics.identify(userId, identifyTraits);
  // track event and mappings
  const contextualPayload = mapObjectKeys(
    event.context,
    contextualFieldMapping,
  );
  const trackProperties = {
    ...event.data.checkout,
  };
  rudderanalytics.track(
    "Checkout Shipping Info Submitted",
    trackProperties,
    contextualPayload,
  );
});

analytics.subscribe("payment_info_submitted", (event) => {
  const data = event.data;
  // identify event and mappings
  let userId = data?.checkout?.email;
  const identifyTraits = {
    customerId: data?.order?.customer?.id,
    shopifyClientId: event.clientId,
    email: data?.checkout?.email,
    phone: data?.checkout?.phone,
    firstName: data?.checkout?.billingAddress?.firstName,
    lastName: data?.checkout?.billingAddress?.lastName,
    address: {
      street: data?.checkout?.billingAddress?.address1,
      city: data?.checkout?.billingAddress?.city,
      country: data?.checkout?.billingAddress?.country,
      postalCode: data?.checkout?.billingAddress?.zip,
      state: data?.checkout?.billingAddress?.province,
    },
  };
  rudderanalytics.identify(userId, identifyTraits);
  // track event and mappings
  const contextualPayload = mapObjectKeys(
    event.context,
    contextualFieldMapping,
  );
  const trackProperties = {
    ...event.data.checkout,
  };
  rudderanalytics.track(
    "Payment Info Submitted",
    trackProperties,
    contextualPayload,
  );
});
