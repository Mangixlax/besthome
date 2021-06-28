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

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import BaseImageTitle from '~/components/Base/BaseImageTitle.vue'
import PageServiceListCard from '~/components/Page/Service/PageServiceListCard.vue'
import BaseTextContainer from '~/components/Base/BaseTextContainer.vue'
import { Context } from '@nuxt/types'

export default {
  name: 'after-sale-services',
  components: { TypoText, BaseImageTitle, PageServiceListCard, BaseTextContainer },
  async asyncData(ctx: Context): Promise<object | void> {
    ctx.store.commit('setLogoSubTitle', ctx.app.i18n.t('header.logo.service'))
    ctx.store.commit('setBreadcrumbs', [
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
      {
        name: ctx.app.i18n.t('breadcrumbs.after_sales_services'),
        route: {
          name: 'service-after-sales-services',
        },
      },
    ])
  },
}
</script>

<style lang="sass" module></style>
