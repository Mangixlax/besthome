<template lang="pug">
  main
    base-image-title(
      :imageTitleData="$t('pages.service_after_sale_services.image_title')"
      :filename="require(`~/assets/images/pages/service/after-sale-services/title.jpg`)"
    )
    base-text-container(
      :data="{\
        text: [\
          `<p>${$t('pages.service_after_sale_services.slot_text_1')}</p>`,\
          `<p>${$t('pages.service_after_sale_services.slot_text_2')}</p>`\
        ].join('')\
      }"
    )
    page-service-list-card(:listCardData="$t('pages.service_after_sale_services.list_card')")
</template>

<script>
import TypoText from '~/components/Base/TypoText.vue'
import BaseImageTitle from '~/components/Base/BaseImageTitle.vue'
import PageServiceListCard from '~/components/Page/Service/PageServiceListCard.vue'
import BaseTextContainer from '~/components/Base/BaseTextContainer.vue'
import { Context } from '@nuxt/types'
import metaGenerator from '~/config/meta.js'

export default {
  name: 'after-sale-services',
  components: { TypoText, BaseImageTitle, PageServiceListCard, BaseTextContainer },
  async asyncData(ctx) {
    ctx.store.commit('setLogoSubTitle', ctx.app.i18n.t('header.logo.service'))
    ctx.store.commit('setBreadcrumbs', [
      {
        name: ctx.app.i18n.t('breadcrumbs.after_sales_services'),
        route: {
          name: 'service-after-sale-services',
        },
      },
    ])
  },
  head() {
    const title =
      this.$i18n.locale === 'ru'
        ? 'Сервис постобслуживания наших покупателей недвижимости в Алании от BEST HOME'
        : 'Post service for our property buyers in Alanya from BEST HOME'

    const description =
      this.$i18n.locale === 'ru'
        ? 'Послепродажный сервис обслуживания наших покупателей и обладателей недвижимости в Алании, Турции - поможет с любым вопросом в незнакомой для вас стране. Айдат, заказ воды или газа, подключение интернета и покупка мебели'
        : 'After-sales service for our buyers and owners of real estate in Alanya, Turkey - will help with any question in an unfamiliar country for you. Aydat, ordering water or gas, connecting the Internet and buying furniture'

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
