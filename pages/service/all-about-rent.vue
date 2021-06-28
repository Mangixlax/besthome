<template lang="pug">
  main
    base-image-title(
      :image-title-data="$t('pages.all_about_rent.image_title')"
      :filename="require(`~/assets/images/pages/service/rent/title.jpg`)"
    )
    page-service-rent(:allAboutRent="$t('pages.all_about_rent')")
</template>

<script lang="ts">
import BaseImageTitle from '~/components/Base/BaseImageTitle.vue'
import PageServiceRent from '~/components/Page/Service/PageServiceRent.vue'
import { Context } from '@nuxt/types'

export default {
  name: 'all-about-rent',
  components: { PageServiceRent, BaseImageTitle },
  async asyncData(ctx: Context): Promise<object | void> {
    ctx.store.commit('setLogoSubTitle', ctx.app.i18n.t('header.logo.service'))
    ctx.store.commit('setBreadcrumbs', [
      {
        name: ctx.app.i18n.t('breadcrumbs.after_sales_services'),
        route: {
          name: 'service-after-sales-services',
        },
      },
      {
        name: ctx.app.i18n.t('breadcrumbs.turkish_citizenship'),
        route: {
          name: 'service-turkish-citizenship',
        },
      },
      {
        name: ctx.app.i18n.t('breadcrumbs.online_purchase'),
        route: {
          name: 'service-online-purchase',
        },
      },
      {
        name: ctx.app.i18n.t('breadcrumbs.legal_suppurt'),
        route: {
          name: 'service-legal-support',
        },
      },
      {
        name: ctx.app.i18n.t('breadcrumbs.inspection_trip'),
        route: {
          name: 'service-introductory-tour',
        },
      },
      {
        name: ctx.app.i18n.t('breadcrumbs.apartment_leasing'),
        route: {
          name: 'service-all-about-rent',
        },
      },
    ])
  },
}
</script>

<style lang="sass" module></style>
