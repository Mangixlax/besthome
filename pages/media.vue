<template lang="pug">
  h1 Media
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import metaGenerator from '~/config/meta.js'

@Component({
  head(): any {
    const title = this.$i18n.locale === 'ru' ? '' : ''

    const description = this.$i18n.locale === 'ru' ? '' : ''

    return {
      title,
      htmlAttrs: {
        lang: this.$i18n.locale,
        prefix: 'og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#',
      },
      meta: metaGenerator({
        title,
        description,
        robots: 'noindex, nofollow',
      }),
      link: [
        {
          rel: 'canonical',
          href: `${process.env.PROTOCOL}://${process.env.DOMAIN}${this.$route.path}`,
        },
      ],
    }
  },
})
export default class MediaPage extends Vue {}
</script>
