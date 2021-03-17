module.exports = {
  apps: [
    {
      name: 'dev.frontend.besthome.sabr.com.tr',
      exec_mode: 'cluster',
      instances: 'max',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    },
  ],
}
