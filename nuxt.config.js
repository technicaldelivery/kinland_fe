import webpack from 'webpack'
import { createSanityClient } from "./sanity.js";
import { 
  editorialArticlePagesRequest,
  projectPagesRequest,
  navigationRequest,
  pageNotFoundRequest,
  seoRequest,
} from "./sanityRequests.js";
import { makeMeta } from "./utils/makeMeta.js";

const dynamicRoutes = async() => {
  // return []
  const sanityClient = createSanityClient({
    sanityProjectId: process.env.SANITY_PROJECT_ID,
    sanityDataset: process.env.SANITY_DATASET
  });
  const { navigation } = await sanityClient.fetch(navigationRequest);
  const pageNotFound = await sanityClient.fetch(pageNotFoundRequest);
  const seoMeta = await sanityClient.fetch(seoRequest);
  const payload = {
    navigation,
    pageNotFound,
    seoMeta,
  };
  const resForEditorialArticles = await sanityClient.fetch(editorialArticlePagesRequest);
  const routesForEditorialArticles = resForEditorialArticles.editorialArticles.map(editorialArticle => {
    return {
      route: `/journal/${ editorialArticle.slug }`,
      payload: {
        item: editorialArticle,
        ...payload
      }
    }
  });
  const resForPortfolio = await sanityClient.fetch(projectPagesRequest);
  const routesForPortfolio = resForPortfolio.projects.map(project => {
    return {
      route: `/portfolio/${ project.slug }`,
      payload: {
        item: project,
        ...payload
      }
    }
  });
  return [
    ...routesForEditorialArticles,
    ...routesForPortfolio,
  ];
}

export default async () => {
  return {
    target: 'static',
    components: true,
    transition: {
      name: 'page',
      mode: 'out-in'
    },
    render: {
      bundleRenderer: {
        shouldPreload: (file, type) => {
          if (type === 'font') return /.woff2/.test(file)
          return ['script', 'style'].includes(type)
        }
      }
    },
    /*
    ** Headers of the page
    */
    head: {
      ...makeMeta({ title: 'Kinland' }),
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ],
      script: [
        {
          src: "/sw.js",
        },
      ],
    },

    /*
    ** Customize the progress-bar color
    */
    loading: { color: 'black', height: '1px' },
    /*
    ** Global CSS
    */
    css: [
      '@/assets/css/main.scss'
    ],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
      // client
      { src: '~/plugins/init.client' },
      { src: '~/plugins/lazysizes.client' },
      { src: '~/plugins/gtag.client' },
      { src: '~/plugins/gtm.client' },
      { src: '~/plugins/preview.client' },
      { src: '~/plugins/vue-hammer.client' },
      { src: '~/plugins/vue-marquee.client' },
      { src: '~/plugins/vue-marquee.client' },
      { src: '~/plugins/vue-check-view.client' },
      // server
      { src: '~/plugins/dateRange' },
      { src: '~/plugins/dateTimeRange' },
      { src: '~/plugins/formatNames' },
      { src: '~/plugins/sanity-blocks-vue-component.js' },
    ],

    /*
    ** Nuxt.js modules
    */
    // modules: [
    //   // Doc: https://axios.nuxtjs.org/usage
    //   '@nuxtjs/axios',
    // ],
    modules: [
      // '@nuxtjs/pwa',
      '@nuxtjs/axios',
      'nuxt-dayjs-module',
      'portal-vue/nuxt',
      [
        'vue-scrollto/nuxt',
        {
          offset: () => {
            // const header = document.getElementById('header');
            // const space = document.getElementById('spacer');
            // return (window.innerHeight + header.offsetHeight) / 2 + spacer.offsetHeight;
            // return window.innerHeight / 2;
            return 0;
          },
          // container: "#homepage",
        }
      ],
      [
        'nuxt-mq',
        {
          defaultBreakpoint: 'default',
          breakpoints: {
            phone: 768,
            tablet: 1024,
            laptop: 1700,
            desktop: Infinity
          }
        }
      ],
      '@nuxtjs/robots',
      '@nuxtjs/sitemap'
    ],
    buildModules: [
      '@nuxtjs/style-resources'
    ],
    sitemap: {
      hostname: 'https://www.thisiskinland.com/',
      defaults: {
        lastmod: new Date(),
        changefreq: 'weekly'
      },
      filter({ routes }) {
        return routes.map(route => {
          // object containing [routeName]: [priority] pairs
          const priorities = {
            index: 1,
            editorialArticles: 0.9,
            projects: 0.8,
            information: 0.6,
          }
          // assign priority by route name or default (.5)
          return { ...route, priority: priorities[route.name] || 0.5 }
        })
      },
    },
    robots: {
      Sitemap: 'https://www.thisiskinland.com/sitemap.xml'
    },
    styleResources: {
      scss: [
        '@/assets/css/2-basics/_mixins.scss',
        '@/assets/css/2-basics/_typography.scss'
      ]
    },
    axios: {
      baseURL: '/',
      proxyHeaders: false,
      credentials: false
    },

    router: {
      middleware: "check-before-move"
    },

    /*
    ** Build configuration
    */
    build: {
      extractCSS: true,
      transpile: ['@gtm-support'],
      plugins: [
        new webpack.ProvidePlugin({
          '_': 'lodash'
        })
      ],
      html: {
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          minifyCSS: false,
          minifyJS: false,
        },
      },
      /*
      ** You can extend webpack config here
      */
      extend(config, { isDev, isClient }) {
        // Add babel-loader for plyr
        config.module.rules.push({
          test: /plyr\.min\.js$/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        })
      }
    },
    generate: {
      fallback: true,
      routes: dynamicRoutes
    },
    publicRuntimeConfig: {
      sanityProjectId: process.env.SANITY_PROJECT_ID,
      sanityDataset: process.env.SANITY_DATASET,
    }
  }
}
