<template lang="pug">
  main
    page-company-history-title(:historyPageTitle="$t('pages.company_history.header')")
    page-company-years-slider(:sliderHistory="$t('pages.company_history.history_slider')")
    base-post(
      :data="{\
        image: require(`~/assets/images/pages/company/history/image-1.jpg`),\
        text: [\
          `<h3>${$t('pages.company_history.post_1.title')}</h3>`,\
          `<p>${$t('pages.company_history.post_1.paragraph_with_link')}`,\
          `<a href='#'>${$t('pages.company_history.post_1.link')}</a>.</p>`,\
        ].join(''),\
        align: 'left',\
        block_flip: false,\
      }"
    )
</template>

<script lang="ts">
import PageCompanyHistoryTitle from '~/components/Page/Company/PageCompanyHistoryTitle.vue'
import PageCompanyYearsSlider from '~/components/Page/Company/PageCompanyYearsSlider.vue'
import BasePost from '~/components/Base/BasePost.vue'
import TypoText from '~/components/Base/TypoText.vue'
import metaGenerator from '~/config/meta.js'
import { Component, Vue } from 'nuxt-property-decorator'
import { delay } from '~/lib/utils'
import { getSiteUrl } from '@/lib/utils'

@Component({
  components: { PageCompanyHistoryTitle, BasePost, TypoText, PageCompanyYearsSlider },
  head(): any {
    const title = this.$i18n.t('pages.company_history.header.title') + ' ' + this.$i18n.t('seo_title')

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
          href: getSiteUrl(this.localePath({ name: 'company-history' }, 'en'), true),
        },
        {
          rel: 'alternate',
          hreflang: 'ru',
          href: getSiteUrl(this.localePath({ name: 'company-history' }, 'ru'), true),
        },
      ],
    }
  },
})
export default class CompanyHistoryPage extends Vue {
  created() {
    this.$store.commit('setLightTheme')

    if (process.server) {
      this.$store.commit('PageTransition/animate', false)
    }

    this.$store.commit('setLogoSubTitle', this.$t('header.logo.company'))
    this.$store.commit('setBreadcrumbs', [
      {
        name: this.$t('breadcrumbs.history'),
        route: {
          name: 'company-history',
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

<style lang="sass" module></style>
