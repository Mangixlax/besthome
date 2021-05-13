<template lang="pug">
  main
    page-contacts-map(:contactMap="$t('pages.contacts.contact_map')")
    common-consultant-slider
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import PageContactsMap from '~/components/Page/Contacts/PageContactsMap.vue'
import CommonConsultantSlider from '~/components/Common/CommonConsultantSlider.vue'

@Component({
  components: {
    PageContactsMap,
    CommonConsultantSlider,
  },
})
export default class IndexPage extends Vue {}
</script>

<style lang="sass" module></style>
