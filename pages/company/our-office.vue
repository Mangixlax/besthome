<template lang="pug">
  main
    common-divider(
      :data="{\
        height: 'middle',\
        color: 'dark',\
      }"
    )
    page-our-office-title(:data="$t('pages.our_office.title')")
    common-divider(
      :data="{\
        height: 'x-large',\
        color: 'dark',\
      }"
    )
</template>

<script lang="ts">
import CommonDivider from '~/components/Common/CommonDivider.vue'
import { Component, Vue } from 'nuxt-property-decorator'
import { delay } from '~/lib/utils'
import metaGenerator from '~/config/meta'
import { getSiteUrl } from '@/lib/utils'
import PageOurOfficeTitle from '~/components/Page/Company/OurOffice/PageOurOfficeTitle.vue'
// import PageOurOfficeInfo from '~/components/Page/Company/OurOffice/PageOurOfficeInfo.vue'

@Component({
  components: {
    CommonDivider,
    PageOurOfficeTitle,
  },

  head(): any {
    const title = this.$i18n.t('pages.company_quality.our_office.title')

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
