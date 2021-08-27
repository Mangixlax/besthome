<template lang="pug">
  base-text-container(
    :data="{\
       text: [\
          `<h1>${$t('pages.term-of-use.title')}</h3>`,\
          ...$t('pages.term-of-use.text').map((p) => `<p>${p}<p>`)\
        ].join('')\
    }"
  )
</template>

<script lang="ts">
import BaseTextContainer from '~/components/Base/BaseTextContainer.vue'
import metaGenerator from '~/config/meta.js'
import { Component, Vue } from 'nuxt-property-decorator'
import { delay } from '~/lib/utils'
import { getSiteUrl } from '@/lib/utils'

@Component({
  components: {
    BaseTextContainer,
  },
  head(): any {
    const title = this.$i18n.t('pages.term-of-use.title') + ' ' + this.$i18n.t('seo_title')

    return {
      title,
      htmlAttrs: {
        lang: this.$i18n.locale,
        prefix: 'og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#',
      },
      meta: metaGenerator({
        title,
      }),
      link: [
        {
          rel: 'canonical',
          href: getSiteUrl(this.localePath(this.$route.path), true),
        },
        {
          rel: 'alternate',
          hreflang: 'x-default',
          href: getSiteUrl(this.localePath({ name: 'term-of-use' }, 'en'), true),
        },
        {
          rel: 'alternate',
          hreflang: 'ru',
          href: getSiteUrl(this.localePath({ name: 'term-of-use' }, 'ru'), true),
        },
      ],
    }
  },
})
export default class TermOfUsePage extends Vue {
  created() {
    this.$store.commit('setLightTheme')

    if (process.server) {
      this.$store.commit('PageTransition/animate', false)
    }

    this.$store.commit('setLogoSubTitle', 'Construction')
    this.$store.commit('setBreadcrumbs', [
      {
        name: this.$t('breadcrumbs.term_of_use'),
        route: {
          name: 'term-of-use',
        },
      },
    ])
  }

  async mounted() {
    await delay(200)
    this.$store.commit('PageTransition/animate', false)
  }
}
</script>
