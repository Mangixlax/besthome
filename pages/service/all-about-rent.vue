<template lang="pug">
  main
    base-image-title(
      :image-title-data="$t('pages.all_about_rent.image_title')"
      :filename="require(`~/assets/images/pages/service/rent/title.jpg`)"
    )
    page-service-rent(:allAboutRent="$t('pages.all_about_rent')")
</template>

<script>
import BaseImageTitle from '~/components/Base/BaseImageTitle.vue'
import PageServiceRent from '~/components/Page/Service/PageServiceRent.vue'
import { Context } from '@nuxt/types'
import metaGenerator from '~/config/meta.js'

export default {
  name: 'all-about-rent',
  components: { PageServiceRent, BaseImageTitle },
  async asyncData(ctx) {
    ctx.store.commit('setLogoSubTitle', ctx.app.i18n.t('header.logo.service'))
    ctx.store.commit('setBreadcrumbs', [
      {
        name: ctx.app.i18n.t('breadcrumbs.apartment_leasing'),
        route: {
          name: 'service-all-about-rent',
        },
      },
    ])
  },
  head() {
    const title =
      this.$i18n.locale === 'ru'
        ? 'Аренда недвижимости в центре Алании. Как снять жилье в Турции?'
        : 'Real estate for rent in the center of Alanya. How to rent a house in Turkey?'

    const description =
      this.$i18n.locale === 'ru'
        ? 'Арендовать недвижимость в Алании и Махмутлар или снять квартиру в жилых комплексах на долгосрочно или посуточно на берегу Средиземного моря от собственников поможет компания BEST HOME'
        : 'BEST HOME will help you to rent real estate in Alanya and Mahmutlar or rent an apartment in residential complexes for long-term or daily rent on the shores of the Mediterranean Sea.'

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
