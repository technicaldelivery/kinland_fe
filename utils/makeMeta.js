import dayjs  from 'dayjs';

export const makeMeta = (payload) => {
  const title = `${payload.title === 'Kinland' ? payload.title : `${payload.title} | Kinland`}` || payload.fallback.title || 'Kinland';
  const description = payload.description || payload.fallback.description || 'We create craft-led spaces that draw upon the skills of artisans and makers. Through thoughtfully curated details, our projects offer an emotionally resonant take on the house and home that nurtures a relationship with place.';
  const image = (payload.image || payload.fallback.image) + '?w=1200&h=627&fit=crop&crop=entropy';
  let date = new Date;
  if (payload.date) date = payload.date;
  const dateFormat = dayjs(date).format('ddd, DD MMM YYYY HH:mm:ss [GMT]');
  return {
    title,
    htmlAttrs: { lang: 'en' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'theme-color', content: '#ffffff' },
      { hid: 'description', name: 'description', content: description },
      { hid: 'og:title', property: "og:title", content: title },
      { hid: 'og:description', name: 'og:description', content: description },
      { hid: 'og:image', property: "og:image", content: image },
      { hid: 'twitter:title', name: "twitter:title", content: title },
      { hid: 'twitter:description', name: "twitter:description", content: description },
      { hid: 'twitter:image', name: "twitter:image", content: image },
      { hid: 'twitter:card', name: "twitter:card", content: image },
      { hid: 'last-modified', "http-equiv": "last-modified", content: dateFormat }
    ]
  }
}
