<template lang="pug">
  main
    page-service-purchase
</template>

<script lang="ts">
import PageServicePurchase from '~/components/Page/Service/PageServicePurchase.vue'
import { Context } from '@nuxt/types'

export default {
  name: 'online-purchase',
  components: { PageServicePurchase },
  async asyncData(ctx: Context): Promise<object | void> {
    ctx.store.commit('setLogoSubTitle', ctx.app.i18n.t('header.logo.service'))
  },
}
</script>

<style lang="sass" module></style>
