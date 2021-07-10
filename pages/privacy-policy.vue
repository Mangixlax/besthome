<template lang="pug">
  base-text-container(
    :data="{\
       text: [\
          `<h1>${$t('pages.privacy-policy.title')}</h1>`,\
          ...$t('pages.privacy-policy.text').map((p) => `<p>${p}<p>`)\
        ].join('')\
    }"
  )
</template>

<script lang="ts">
import BaseTextContainer from '~/components/Base/BaseTextContainer.vue'
import { Component, Vue } from 'nuxt-property-decorator'
import { delay } from '~/lib/utils'
import metaGenerator from '~/config/meta'

@Component({
  components: {
    BaseTextContainer,
  },
  head(): any  {
    const title = this.$i18n.t('pages.privacy-policy.title')

    return {
      title,
      htmlAttrs: {
        lang: this.$i18n.locale,
        prefix: 'og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#',
      },
      meta: metaGenerator({
        title,
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
export default class PrivacyPolicyPage extends Vue {
  created() {
    if (process.server) {
      this.$store.commit('PageTransition/animate', false)
    }

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
