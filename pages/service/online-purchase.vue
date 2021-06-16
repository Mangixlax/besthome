<template lang="pug">
  main
    base-image-title(
      :filename="require(`~/assets/images/pages/service/legal-support/title.jpg`)"
    )
    page-service-purchase
</template>

<script lang="ts">
import BaseImageTitle from '~/components/Base/BaseImageTitle.vue'
import PageServicePurchase from '~/components/Page/Service/PageServicePurchase.vue'
import { Context } from '@nuxt/types'

export default {
  name: 'online-purchase',
  components: { BaseImageTitle, PageServicePurchase },
  async asyncData(ctx: Context): Promise<object | void> {
    ctx.store.commit('setLogoSubTitle', ctx.app.i18n.t('header.logo.service'))
  },
}
</script>

<style lang="sass" module></style>
