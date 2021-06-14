<template lang="pug">
  main
    page-company-about-title(:about-page-title="$t('pages.company_about_company.header')")
    page-company-advantages-slider(:slider-data="$t('pages.company_about_company.advantages_slider')")
    base-text-container(
      :data="{\
        text: [\
          `<h3>${$t('pages.company_about_company.article_1.title')}</h3>`,\
          ...$t('pages.company_about_company.article_1.text').map((p) => `<p>${p}<p>`)\
        ].join('')\
      }"
    )
    base-scroll-line(:data="$t('pages.company_about_company.scroll_line_data')")
    base-text-container(
      :data="{\
        text: [\
          ...$t('pages.company_about_company.article_2.text').map((p) => `<p>${p}<p>`)\
        ].join('')\
      }"
    )
</template>

<script lang="ts">
import PageCompanyAboutTitle from '~/components/Page/Company/PageCompanyAboutTitle.vue'
import PageCompanyAdvantagesSlider from '~/components/Page/Company/PageCompanyAdvantagesSlider.vue'
import BaseScrollLine from '~/components/Base/BaseScrollLine.vue'
import BasePost from '~/components/Base/BasePost.vue'
import TypoText from '~/components/Base/TypoText.vue'
import BaseTextContainer from '~/components/Base/BaseTextContainer.vue'
import { Context } from '@nuxt/types'

export default {
  name: 'introductory-tour',
  components: {
    PageCompanyAboutTitle,
    PageCompanyAdvantagesSlider,
    BaseTextContainer,
    BaseScrollLine,
    BasePost,
    TypoText,
  },
  asyncData(ctx: Context): void {
    ctx.store.commit('setLogoSubTitle', ctx.app.i18n.t('header.logo.company'))
  },
  data() {
    return {
      aboutPageScrollLineInfo: [
        {
          title: '239',
          text: 'Apartments',
        },
        {
          title: '470',
          text: 'Parking spots for bikes',
        },
        {
          title: '3800m²',
          text: 'Of common green areas',
        },
        {
          title: '1 to 4-room',
          text: 'Separate rooms',
        },
      ],
    }
  },
}
</script>

<style lang="sass" module></style>
