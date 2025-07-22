import { createSanityClient } from "~/sanity.js";

export default async function ({ store, $config }) {
  const sanityClient = createSanityClient($config);
  if (store?.state?.sanity?.navigation) {
    // stupid but just easier ...
    // this is purely needed for catching dynamic routes with no content
  } else {
    await store.dispatch('sanity/NAVIGATION_CALL', sanityClient);
    await store.dispatch('sanity/PAGENOTFOUND_CALL', sanityClient);
    await store.dispatch('sanity/SEO_CALL', sanityClient);
    await store.dispatch('sanity/SETTINGS_CALL', sanityClient);
  }
}
