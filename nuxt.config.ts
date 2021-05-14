import { NuxtOptionsBuild, PostcssConfiguration } from '@nuxt/types/config/build'
import { Configuration, NuxtConfig } from '@nuxt/types'
import { NuxtOptionsRender } from '@nuxt/types/config/render'

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
    title: 'dev.frontend.besthome.sabr.com.tr',
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
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['normalize.css/normalize.css', '~/sass/theme.sass'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/slider-swiper.js',
    '~plugins/v-click-outside.js',
    { src: '~plugins/vue-scrollmagic.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
  ],

  styleResources: {
    sass: ['~/sass/_mixins.sass', '~/sass/_colors.sass'],
  },

  /**
   * Loading config
   */
  loading: {
    color: '#59cc93',
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
  ],

  i18n: {
    locales: ['ru', 'en'],
    defaultLocale: 'en',
    vueI18n: '~/config/i18n.js',
  },

  svgSprite: {
    publicPath: '/_nuxt/',
  },

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
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
  },

  redirect: [{ from: '^(\\/[^\\?]*[^\\/])(\\?.*)?$', to: '$1/$2' }],

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
          localIdentName: isDev ? '[local]_[hash:base64:4]' : '[hash:base64:4]',
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
