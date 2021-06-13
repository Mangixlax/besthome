<template lang="pug">
  main
    page-contacts-map(:contactMap="$t('pages.contacts.contact_map')")
    common-consultant-slider(:slider-data="$t('footer.consultant_slider')")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import PageContactsMap from '~/components/Page/Contacts/PageContactsMap.vue'
import CommonConsultantSlider from '~/components/Common/CommonConsultantSlider.vue'
import { Context } from '@nuxt/types'

@Component({
  components: {
    PageContactsMap,
    CommonConsultantSlider,
  },
  asyncData(ctx: Context): void {
    ctx.store.commit('setLogoSubTitle', ctx.app.i18n.t('header.logo.contacts'))
  },
})
export default class IndexPage extends Vue {}
</script>

<style lang="sass" module></style>
