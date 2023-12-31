<template lang="pug">
  main
    base-text-container(
      :data="{\
        text: [\
            `<h1>${$t('pages.privacy-policy.title')}</h1>`,\
            ...$t('pages.privacy-policy.text').map((p) => `<p>${p}<p>`)\
          ].join('')\
      }"
    )
    base-seo-content
</template>

<script lang="ts">
import BaseTextContainer from '~/components/Base/BaseTextContainer.vue'
import { Component, Vue } from 'nuxt-property-decorator'
import { delay } from '~/lib/utils'
import metaGenerator from '~/config/meta'
import { getSiteUrl } from '@/lib/utils'
import BaseSeoContent from '~/components/Base/BaseSeoContent.vue'

@Component({
  components: {
    BaseTextContainer,
    BaseSeoContent,
  },
  head(): any {
    const title = this.$i18n.t('pages.privacy-policy.title') + ' ' + this.$i18n.t('seo_title')

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
          href: getSiteUrl(this.localePath({ name: 'privacy-policy' }, 'en'), true),
        },
        {
          rel: 'alternate',
          hreflang: 'ru',
          href: getSiteUrl(this.localePath({ name: 'privacy-policy' }, 'ru'), true),
        },
      ],
    }
  },
})
export default class PrivacyPolicyPage extends Vue {
  created() {
    this.$store.commit('setLightTheme')

    if (process.server) {
      this.$store.commit('PageTransition/animate', false)
    }

    this.$store.commit('Catalog/setPageSeoContent', '')
    this.$store.commit('setLogoSubTitle', 'Construction')
    this.$store.commit('setBreadcrumbs', [
      {
        name: this.$t('breadcrumbs.privacy_policy'),
        route: {
          name: 'privacy-policy',
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
