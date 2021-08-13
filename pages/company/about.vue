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
import metaGenerator from '~/config/meta.js'
import { Component, Vue } from 'nuxt-property-decorator'
import { delay } from '~/lib/utils'
import { getSiteUrl } from '@/lib/utils'

@Component({
  components: {
    PageCompanyAboutTitle,
    PageCompanyAdvantagesSlider,
    BaseTextContainer,
    BaseScrollLine,
    BasePost,
    TypoText,
  },
  head(): any {
    const title =
      this.$i18n.locale === 'ru'
        ? 'BEST HOME Construction – лидирующая строительная компания в Алании'
        : 'BEST HOME Construction is the leading construction company in Alanya'

    const description =
      this.$i18n.locale === 'ru'
        ? 'Компания имеет собственных представителей в Германии, Америке, России, Украине, Иране, Казахстане, а также в Дании, Швеции, Норвегии и Финляндии. Компания заключила уже более 1000 успешных сделок с иностранными гражданами, проживающими в СНГ, США, Европе и на Ближнем востоке'
        : 'The company has its own representatives in Germany, America, Russia, Ukraine, Iran, Kazakhstan, as well as in Denmark, Sweden, Norway and Finland. The company has already concluded more than 1000 successful transactions with foreign citizens living in the CIS, USA, Europe and the Middle East.'

    return {
      title,
      htmlAttrs: {
        lang: this.$i18n.locale,
        prefix: 'og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#',
      },
      meta: metaGenerator({
        title,
        description,
      }),
      link: [
        {
          rel: 'canonical',
          href: getSiteUrl(this.localePath(this.$route.path), true),
        },
        {
          rel: 'alternate',
          hreflang: 'x-default',
          href: getSiteUrl(this.localePath({ name: 'company-about' }, 'en'), true),
        },
        {
          rel: 'alternate',
          hreflang: 'ru',
          href: getSiteUrl(this.localePath({ name: 'company-about' }, 'ru'), true),
        },
      ],
    }
  },
})
export default class CompanyAboutPage extends Vue {
  created() {
    if (process.server) {
      this.$store.commit('PageTransition/animate', false)
    }

    this.$store.commit('setLogoSubTitle', this.$t('header.logo.company'))
    this.$store.commit('setBreadcrumbs', [
      {
        name: this.$t('breadcrumbs.about'),
        route: {
          name: 'company-about',
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
