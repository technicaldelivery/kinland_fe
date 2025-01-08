import Vue from 'vue'
import VueGtm from '@gtm-support/vue2-gtm';
// import VueRouter from 'vue-router';
// const router = new VueRouter({ routes, mode, linkActiveClass });

Vue.use(VueGtm, {
  id: 'GTM-KX9S47SB', // Your GTM single container ID, array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy'] or array of objects [{id: 'GTM-xxxxxx', queryParams: { gtm_auth: 'abc123', gtm_preview: 'env-4', gtm_cookies_win: 'x'}}, {id: 'GTM-yyyyyy', queryParams: {gtm_auth: 'abc234', gtm_preview: 'env-5', gtm_cookies_win: 'x'}}], // Your GTM single container ID or array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy']
  // queryParams: {
  //   // Add URL query string when loading gtm.js with GTM ID (required when using custom environments)
  //   gtm_auth: 'AB7cDEf3GHIjkl-MnOP8qr',
  //   gtm_preview: 'env-4',
  //   gtm_cookies_win: 'x',
  // },
  defer: true, // Script can be set to `defer` to speed up page load at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible). Defaults to false, so the script is loaded `async` by default
  compatibility: true, // Will add `async` and `defer` to the script tag to not block requests for old browsers that do not support `async`
  // nonce: '2726c7f26c', // Will add `nonce` to the script tag
  enabled: false, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
  loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
});