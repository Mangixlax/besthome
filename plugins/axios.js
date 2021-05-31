export default function ({ app, $axios, store }) {
  $axios.interceptors.request.use(function (config) {
    if (config.url.startsWith('v1/')) {
      if (process.server) {
        config.url = `http://localhost:${process.env.PORT}/api/${app.i18n.locale}/${config.url}`
      } else {
        config.url = `/api/${app.i18n.locale}/${config.url}`
      }
    }
    return config
  })
}
