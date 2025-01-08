export default async function ({ store, app }) {
  if (store?.state?.sanity?.navigation) {
    // stupid but just easier ...
    // this is purely needed for catching dynamic routes with no content
  } else {
    await store.dispatch('sanity/COLORS_CALL');
    await store.dispatch('sanity/NAVIGATION_CALL');
    await store.dispatch('sanity/PAGENOTFOUND_CALL');
    await store.dispatch('sanity/SEO_CALL');
  }
}
