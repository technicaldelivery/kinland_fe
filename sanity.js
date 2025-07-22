import sanityClient from '@sanity/client';

export function createSanityClient(config) {
  return sanityClient({
    projectId: config.sanityProjectId,
    dataset: config.sanityDataset,
    useCdn: true,
    apiVersion: '2021-04-16',
    token: config.sanityToken
  });
}
