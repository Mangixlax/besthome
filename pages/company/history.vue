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

<script>
import PageCompanyHistoryTitle from '~/components/Page/Company/PageCompanyHistoryTitle.vue'
import PageCompanyYearsSlider from '~/components/Page/Company/PageCompanyYearsSlider.vue'
import BasePost from '~/components/Base/BasePost.vue'
import TypoText from '~/components/Base/TypoText.vue'
import { Context } from '@nuxt/types'
import metaGenerator from '~/config/meta.js'

export default {
  name: 'legal-support',
  components: { PageCompanyHistoryTitle, BasePost, TypoText, PageCompanyYearsSlider },
  asyncData(ctx) {
    ctx.store.commit('setLogoSubTitle', ctx.app.i18n.t('header.logo.company'))
    ctx.store.commit('setBreadcrumbs', [
      {
        name: ctx.app.i18n.t('breadcrumbs.history'),
        route: {
          name: 'company-history',
        },
      },
    ])
  },
  head() {
    const title = this.$i18n.t('pages.company_history.header.title')

    const description = ''

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
}
</script>

<style lang="sass" module></style>
