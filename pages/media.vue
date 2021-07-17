<template lang="pug">
  h1 Media
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import metaGenerator from '~/config/meta.js'
import { getSiteUrl } from '@/lib/utils'

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
          href: getSiteUrl(this.localePath(this.$route.path), true),
        },
      ],
    }
  },
})
export default class MediaPage extends Vue {}
</script>
