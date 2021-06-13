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
import { Context } from '@nuxt/types'

export default {
  name: 'legal-support',
  components: { PageCompanyHistoryTitle, BasePost, TypoText, PageCompanyYearsSlider },
  asyncData(ctx: Context): void {
    ctx.store.commit('setLogoSubTitle', ctx.app.i18n.t('header.logo.company'))
  },
}
</script>

<style lang="sass" module></style>
