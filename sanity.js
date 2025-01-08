import sanityClient from '@sanity/client';

export default sanityClient({
  projectId: "8vpi92o4",
  dataset: "production",
  useCdn: false,
  apiVersion: '2021-04-16'
});
