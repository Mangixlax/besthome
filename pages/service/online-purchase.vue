<template lang="pug">
  main
    base-image-title(
      :image-title-data="$t('pages.service_online_purchase.image_title')"
      :filename="$img(`/pages/service/online-purchace/title.jpg`, $store.state.supportWebP ? { format: 'webp' } : {})"
    )
    page-service-purchase
    base-seo-content
</template>

<script lang="ts">
import BaseImageTitle from '~/components/Base/BaseImageTitle.vue'
import PageServicePurchase from '~/components/Page/Service/PageServicePurchase.vue'
import BaseSeoContent from '~/components/Base/BaseSeoContent.vue'
import { Context } from '@nuxt/types'
import metaGenerator from '~/config/meta.js'
import { Component, Vue } from 'nuxt-property-decorator'
import { delay } from '~/lib/utils'
import { getSiteUrl } from '@/lib/utils'

@Component({
  components: {
    BaseImageTitle,
    PageServicePurchase,
    BaseSeoContent,
  },
  head(): any {
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
      }),
      link: [
        {
          rel: 'canonical',
          href: getSiteUrl(this.localePath(this.$route.path), true),
        },
        {
          rel: 'alternate',
          hreflang: 'x-default',
          href: getSiteUrl(this.localePath({ name: 'service-online-purchase' }, 'en'), true),
        },
        {
          rel: 'alternate',
          hreflang: 'ru',
          href: getSiteUrl(this.localePath({ name: 'service-online-purchase' }, 'ru'), true),
        },
      ],
    }
  },
})
export default class ServiceOnlinePurchasePage extends Vue {
  created() {
    this.$store.commit('setLightTheme')

    if (process.server) {
      this.$store.commit('PageTransition/animate', false)
    }

    this.$store.commit('Catalog/setPageSeoContent', '')
    this.$store.commit('setLogoSubTitle', this.$t('header.logo.service'))
    this.$store.commit('setBreadcrumbs', [
      {
        name: this.$t('breadcrumbs.online_purchase'),
        route: {
          name: 'service-online-purchase',
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
