import { NuxtOptionsBuild, PostcssConfiguration } from '@nuxt/types/config/build'
import { Configuration, NuxtConfig } from '@nuxt/types'
import { NuxtOptionsRender } from '@nuxt/types/config/render'
import SitemapConfig from './config/sitemap'

const isDev = process.env.NODE_ENV === 'development'
const time = new Date().valueOf()

export default <NuxtConfig>{
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',

  /**
   * Nuxt server
   * See https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-server
   */
  server: {
    host: process.env.HOST,
    port: process.env.PORT,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'besthome.com.tr',
    meta: [
      { charset: 'utf-8', hid: 'charset' },
      {
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=edge',
        hid: 'http-equiv',
      },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no, user-scalable=no',
        hid: 'viewport',
      },
      {
        name: 'format-detection',
        content: 'telephone=no',
        hid: 'format-detection',
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
        hid: 'apple-mobile-web-app-capable',
      },
      {
        name: 'robots',
        content: 'index,follow',
      },
      {
        name: 'google-site-verification',
        content: 'iPVWPRFbRkEFesQhD_VhzcjDGpwWziozh_RWikibR3k',
      },
      {
        name: 'ahrefs-site-verification',
        content: '3ebedf4478217df957d0e324cf9024f86a3160204b30dcf6aba1ea0ed74dcaf5',
      },
      {
        name: 'yandex-verification',
        content: 'e34759ffa654fd57',
      },
      {
        name: 'dmca-site-verify',
        content: 'enJjc1dGMmhQVUYwZEtNVGdtb012Zz090',
      },
    ],
    link: [
      { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
      { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400&display=swap',
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script: [
      {
        src: 'https://code-ya.jivosite.com/widget/0OWAaFHxID',
        async: true,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['normalize.css/normalize.css', '~/sass/theme.sass'],

  pageTransition: {
    name: 'page',
    mode: 'out-in',
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/slider-swiper.js',
    '~plugins/v-click-outside.js',
    '@/plugins/axios.js',
    '@/plugins/vuelidate.js',
    '@/plugins/i18n.ts',
    '@/plugins/jsonld.js',
    { src: '~plugins/vue-scrollmagic.js', ssr: false },
    {
      src: '~plugins/vue-slider-component.js',
      ssr: false,
    },
    {
      src: '~plugins/vue-fragment.js',
    },
    { src: '~plugins/modal.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    ...(!isDev ? ['@nuxtjs/google-analytics'] : []),
  ],

  googleAnalytics: {
    id: 'UA-202582567-1',
  },

  yandexMetrika: {
    id: '83054044',
    webvisor: true,
    clickmap: true,
    useCDN: false,
    trackLinks: true,
    accurateTrackBounce: true,
  },

  styleResources: {
    sass: ['~/sass/_mixins.sass', '~/sass/_colors.sass'],
  },

  /**
   * Loading config
   */
  loading: {
    color: '#0066CC',
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/device',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/component-cache',
    'cookie-universal-nuxt',
    'nuxt-i18n',
    '~/modules/recaptcha/module.js',
    '@nuxtjs/sitemap',
    '@nuxtjs/redirect-module',
    ...(!isDev ? ['@nuxtjs/yandex-metrika'] : []),
  ],

  sitemap: SitemapConfig,

  i18n: {
    locales: ['ru', 'en'],
    defaultLocale: 'en',
    vueI18n: '~/config/i18n.js',
  },

  svgSprite: {
    publicPath: '/_nuxt/',
  },

  recaptcha: {
    siteKey: process.env.RECAPTCHA_SITE_KEY,
    version: 2,
  },

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
    debug: false,
    headers: {
      common: {
        'Cache-Control': 'no-cache',
      },
    },
  },

  proxy: {
    '/api/': process.env.API_URL,
    '/storage/': process.env.API_URL,
    '/robots.txt': process.env.API_URL,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
      name: 'BestHome',
      short_name: 'BestHome',
      description: '',
      theme_color: '#0066CC',
      start_url: '/',
      display: 'browser',
      background_color: '#FFF',
    },
    workbox: false,
    icon: {
      sizes: [16, 32, 64, 120, 144, 152, 192, 384, 512],
    },
  },

  /**
   * Render config
   */
  render: <NuxtOptionsRender>{
    http2: {
      push: true,
    },
    static: {
      maxAge: '1y',
      setHeaders(res, path) {
        if (path.includes('sw.js')) {
          res.setHeader('Cache-Control', `public, max-age=${15 * 60}`)
        }
      },
    },
  },

  router: {
    prefetchLinks: false,
    trailingSlash: true,
  },

  redirect: [
    { from: '^(\\/[^\\?]*[^\\/])(\\?.*)?$', to: '$1/$2' },
    { from: '/ru/our_team/', to: '/ru/company/about/' },
  ],

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: <NuxtOptionsBuild>{
    devMiddleware: {
      headers: {
        'Cache-Control': 'no-store',
        Vary: '*',
      },
    },

    publicPath: process.env.PUBLIC_PATH || '/_nuxt/',

    extractCSS: false,

    loaders: {
      cssModules: {
        modules: {
          localIdentName: isDev ? '[local]_[hash:base64:4]' : '[hash:base64:6]',
        },
      },
    },

    optimizeCSS: false,

    filenames: {
      app: ({ isDev }) => (isDev ? '[name].js' : 'js/' + time + '.[contenthash].js'),
      chunk: ({ isDev }) => (isDev ? '[name].js' : 'js/' + time + '.[contenthash].js'),
      css: ({ isDev }) => (isDev ? '[name].css' : 'css/' + time + '.[contenthash].css'),
      img: ({ isDev }) => (isDev ? '[path][name].[ext]' : 'img/' + time + '.[contenthash:7].[ext]'),
      font: ({ isDev }) =>
        isDev ? '[path][name].[ext]' : 'fonts/' + time + '.[contenthash:7].[ext]',
      video: ({ isDev }) =>
        isDev ? '[path][name].[ext]' : 'videos/' + time + '.[contenthash:7].[ext]',
    },

    ...(!isDev && {
      html: {
        minify: {
          collapseBooleanAttributes: true,
          decodeEntities: true,
          minifyCSS: true,
          minifyJS: true,
          processConditionalComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          trimCustomFragments: true,
          useShortDoctype: true,
        },
      },
    }),

    cache: true,

    /**
     * Если включить splitChunks для pages и commons
     * то перестанет работать lazy-hydration
     */
    splitChunks: {
      layouts: false,
      pages: false,
      commons: false,
    },

    optimization: {
      minimize: !isDev,
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },

    extend(config: Configuration, ctx) {
      config.module.rules.push({
        test: /\.pug$/,
        loader: 'pug-plain-loader',
      })
    },

    postcss: <PostcssConfiguration>{
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        ...(!isDev && {
          // Disable a plugin by passing false as value
          cssnano: {
            preset: [
              'advanced',
              {
                autoprefixer: false,
                cssDeclarationSorter: false,
                zindex: false,
                discardComments: {
                  removeAll: true,
                },
                discardUnused: false,
              },
            ],
          },
          'postcss-minify-font-values': {},
          'postcss-merge-rules': {},
          'postcss-minify-selectors': {},
          'postcss-reduce-idents': {},
          'postcss-url': false,
          'postcss-nested': {},
          'postcss-nested-ancestors': {},
          'postcss-responsive-type': {},
          'postcss-hexrgba': {},
        }),
      },

      ...(!isDev && {
        preset: {
          browsers: 'cover 99.5%',
          autoprefixer: true,
        },
      }),

      order: 'cssnanoLast',
    },
  },
}
