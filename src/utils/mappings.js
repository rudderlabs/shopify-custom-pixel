export const contextualFieldMapping = [
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

export const productViewedEventMapping = [
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
  
  export const productToCartEventMapping = [
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
  
  export const cartViewedEventMapping = [
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
  
  export const productListViewedEventMapping = [
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
  
  export const checkoutStartedCompletedEventMapping = [
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