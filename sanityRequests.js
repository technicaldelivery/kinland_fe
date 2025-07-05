export const holdingPageRequest = `*[_id == "holdingPage" && !(_id in path('drafts.**'))][0] {
  ...,
  "splash": splash {
    ...,
    "video": video {
      ...,
      asset->{
        ...,
        "url": "https://stream.mux.com/" + playbackId
      }
    }
  },
  "lifestyleBanner": lifestyleBanner {
    ...,
    "metadata": asset->metadata
  },
  "secondLifestyleBanner": secondLifestyleBanner {
    ...,
    "metadata": asset->metadata
  },
  "slides": slides[] {
    ...,
    "media": media[] {
      _type == 'image' => {
        ...,
        "metadata": asset->metadata
      },
      _type == 'video' => {
        ...,
        "video": video {
          ...,
          asset->{
            ...,
            "url": "https://stream.mux.com/" + playbackId
          }
        }
      },
    }
  }
}`








const text = `
  ...,
  "markDefs": markDefs[] {
    ...,
    "reference": reference->{
      _type,
      "slug": slug.current,
      _type == 'product' => {
        "slug": store.slug.current
      },
    }
  }
`

const body = `"body": body[] { ${text} }`;

const downloads = `"downloads": downloads[] {
  ...,
  "file": file.asset->url,
  "originalFilename": file.asset->originalFilename
}`

const colorScheme = `"colorScheme": colorScheme->backgroundColor.hex`

// REUSABLES (PLURAL)

const editorialArticles = `{
  ...,
  "slug": slug.current,
  "coverImages": coverImages[] {
    ...,
    "metadata": asset->metadata
  },
  ${colorScheme},
}`

const projects = `{
  ...,
  "slug": slug.current,
  status->{
    title,
    "slug": slug.current
  },
  "image": image {
    ...,
    "metadata": asset->metadata
  },
  ${colorScheme}
}`

// REUSABLES (SINGULAR)

const editorialArticle = `{
  ...,
  "slug": slug.current,
  ${colorScheme},
  "coverImage": coverImages[0] {
    ...,
    "metadata": asset->metadata
  },
  "articleContent": articleContent[] {
    ...,
    "media": media[] {
      _type == 'image' => {
        ...,
        "metadata": asset->metadata
      },
      _type == 'video' => {
        ...,
        "video": video {
          ...,
          asset->{
            ...,
            "url": "https://stream.mux.com/" + playbackId
          }
        }
      },
    }
  },
  "nextArticle": *[_type == "editorialArticles" && date < ^.date && !(_id in path('drafts.**'))] | order(date desc)[0]{
    _createdAt,
    title,
    'slug': slug.current,
  },
  "latestArticle": *[_type == "editorialArticles" && !(_id in path('drafts.**'))] | order(date desc)[0]{
    _createdAt,
    title,
    'slug': slug.current,
  },
  "seoMeta": {
    "title": select(
      defined(title) => title
    ),
    "description": select(
      defined(standfirst) => standfirst
    ),
    "image": select(
      defined(coverImages[0]) && defined(coverImages[0].asset) => coverImages[0].asset->url,
    )
  }
}`

const project = `{
  ...,
  "slug": slug.current,
  ${colorScheme},
  status->{
    title,
    "slug": slug.current
  },
  "slides": slides[] {
    ...,
    "media": media[] {
      _type == 'image' => {
        ...,
        "metadata": asset->metadata
      },
      _type == 'video' => {
        ...,
        "video": video {
          ...,
          asset->{
            ...,
            "url": "https://stream.mux.com/" + playbackId
          }
        }
      },
    }
  },
  "seoMeta": {
    "title": select(
      defined(title) => title
    ),
    "description": select(
      defined(standfirst) => standfirst
    ),
    "image": select(
      defined(image) && image._type == "image" && defined(image.asset) => image.asset->url,
    )
  }
}`

const page = `{
  ...,
  ${colorScheme},
  teamMembers[] {
    ...,
    "image": image {
      ...,
      "metadata": asset->metadata
    }
  },
  "seoMeta": {
    ...seoMeta,
    "title": select(
      defined(seoMeta.title) => seoMeta.title,
      defined(title) => title
    ),
    "image": seoMeta.image.asset->url
  }
}`

// REQUESTS

export const editorialArticlesPageRequest = `{ "editorialArticles": *[_type == "editorialArticles" && !(_id in path('drafts.**'))] | order(date desc) ${ editorialArticles } }`
export const editorialArticlePageRequest = `*[_type == "editorialArticles" && slug.current == $editorialArticle && !(_id in path('drafts.**'))][0] ${ editorialArticle }`
export const editorialArticlePagesRequest = `{ "editorialArticles": *[_type == "editorialArticles" && !(_id in path('drafts.**'))] ${ editorialArticle } }`

export const colorsRequest = `*[_id == "settings" && !(_id in path('drafts.**'))][0].defaultColorScheme-> {
  ...,
}`

export const projectsPageRequest = `{ "projects": *[_type == "project" && !(_id in path('drafts.**'))] | order(year asc) ${ projects } }`
export const projectPageRequest = `*[_type == "project" && slug.current == $project && !(_id in path('drafts.**'))][0] ${ project }`
export const projectPagesRequest = `{ "projects": *[_type == "project" && !(_id in path('drafts.**'))] ${ project } }`

export const pageRequest = `*[_type == "page" && slug.current == $page && !(_id in path('drafts.**'))][0] ${ page }`

export const navigationRequest = `{
  "navigation": *[_type == "navigation" && !(_id in path('drafts.**'))][0] {
    ...,
    header[]->{
      ...,
      "slug": slug.current
    },
  }
}`

export const pageNotFoundRequest = `*[_id == "settings" && !(_id in path('drafts.**'))][0].pageNotFound {
  ...,
  ${body},
  "image": image {
    ...,
    "metadata": asset->metadata
  }
}`

export const seoRequest = `*[_id == "settings" && !(_id in path('drafts.**'))][0].seoMeta {
  ...,
  "image": image.asset->url
}`

export const settingsRequest = `*[_id == "settings" && !(_id in path('drafts.**'))][0] {
  ...
}`
