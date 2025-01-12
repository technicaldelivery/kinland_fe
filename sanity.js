import sanityClient from '@sanity/client';

export function createSanityClient(config) {
  return sanityClient({
    projectId: config.sanityProjectId,
    dataset: config.sanityDataset,
    useCdn: false,
    apiVersion: '2021-04-16'
  });
}
