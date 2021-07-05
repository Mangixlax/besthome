<template lang="pug">
  main
    base-image-title(
      :image-title-data="$t('pages.service_online_purchase.image_title')"
      :filename="require(`~/assets/images/pages/service/online-purchace/title.jpg`)"
    )
    page-service-purchase
</template>

<script>
import BaseImageTitle from '~/components/Base/BaseImageTitle.vue'
import PageServicePurchase from '~/components/Page/Service/PageServicePurchase.vue'
import { Context } from '@nuxt/types'
import metaGenerator from '~/config/meta.js'

export default {
  name: 'online-purchase',
  components: { BaseImageTitle, PageServicePurchase },
  async asyncData(ctx) {
    ctx.store.commit('setLogoSubTitle', ctx.app.i18n.t('header.logo.service'))
    ctx.store.commit('setBreadcrumbs', [
      {
        name: ctx.app.i18n.t('breadcrumbs.online_purchase'),
        route: {
          name: 'service-online-purchase',
        },
      },
    ])
  },
  head() {
    const title =
      this.$i18n.locale === 'ru'
        ? 'Купить квартиру в Алании от застройщика онлайн - это Просто!'
        : 'Buying an apartment in Alanya from a developer online is Easy!'

    const description =
      this.$i18n.locale === 'ru'
        ? 'Купить и оформить недвижимость в Алании, не приезжая в Турцию. Этапы: 1. Выбор жилого комплекса 2. Осмотр недвижимости по видео звонку 3. Составление договора купли-продажи 4. Оформление доверенности 5. Заказ мебели'
        : 'Buy and register real estate in Alanya without coming to Turkey. Stages: 1. Choosing a residential complex 2. Inspection of real estate by video call 3. Drawing up a sales contract 4. Drawing up a power of attorney 5. Ordering furniture'

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
