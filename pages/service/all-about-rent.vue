<template lang="pug">
  main
    base-image-title(
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
    ctx.store.commit('setLogoSubTitle', 'Service')
  },
}
</script>

<style lang="sass" module></style>
