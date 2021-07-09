import axios from 'axios'

const exclude_routes = ['/_icons*', '/media', '/search', '/en/_icons*', '/en/media', '/en/search']

const cache_time = 1000 * 60 * 60 // Cache sitemap for 1 hour

const default_sitemap_options = {
  hostname: process.env.PROTOCOL + '://' + process.env.DOMAIN,
  exclude: exclude_routes,
  trailingSlash: true,
  gzip: true,
  cacheTime: cache_time,
  i18n: {
    locales: ['ru', 'en'],
    routesNameSeparator: '___',
  },
  defaults: {
    lastmod: new Date(),
  },
}

const addSitemap = ({ sitemap_name = '', extra_exclude_routes = [], start_url = '' }) => {
  return Object.assign({}, default_sitemap_options, {
    path: `/sitemap-${sitemap_name}.xml`,
    exclude: Object.assign([], exclude_routes, extra_exclude_routes),
    cacheTime: cache_time,
    defaults: {
      lastmod: new Date(),
    },
    i18n: {
      locales: ['ru', 'en'],
      routesNameSeparator: '___',
    },
    routes: () => {
      return axios
        .get(`${process.env.API_URL}/api/ru/v1/sitemaps/${sitemap_name}`)
        .then(({ data }) => {
          const locations = []

          data.forEach((record) => {
            Object.keys(record.slug).forEach((url_key) => {
              locations.push({
                url: `/${url_key === 'ru' ? '' : 'en/'}/${record.slug[url_key]}/`,
                links: [
                  {
                    url: `/${record.slug.ru}/`,
                    lang: 'ru',
                  },
                  {
                    url: `/en/${record.slug.en}/`,
                    lang: 'en',
                  },
                ],
                lang: url_key,
                lastmod: record.updated_at,
              })
            })
          })

          return locations
        })
    },
  })
}

const sitemaps = []

sitemaps.push(Object.assign({}, default_sitemap_options, { path: '/sitemap-static.xml' }))

sitemaps.push(
  addSitemap({
    sitemap_name: 'projects',
    extra_exclude_routes: ['/**', '/en/**'],
  }),
)

sitemaps.push(
  addSitemap({
    sitemap_name: 'apartments',
    extra_exclude_routes: ['/**', '/en/**'],
  }),
)

export default Object.assign({}, default_sitemap_options, {
  path: '/sitemap.xml',
  exclude: exclude_routes,
  sitemaps,
})
