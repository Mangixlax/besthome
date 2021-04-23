<template lang="pug">
  footer(:class="$style['footer']")
    footer-fast-links
    footer-company-description
    base-bread-crumbs
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import BaseBreadCrumbs from '~/components/Base/BaseBreadCrumbs.vue'
import FooterFastLinks from '~/components/Footer/FooterFastLinks.vue' 
import FooterCompanyDescription from '~/components/Footer/FooterCompanyDescription.vue' 

@Component({
  components: { BaseBreadCrumbs, FooterFastLinks, FooterCompanyDescription }
})
export default class Footer extends Vue {} 
</script>

<style lang="sass" module>
.footer
  width: 100%
  magin: 0 auto
  background: rgba(17, 17, 17, 0.08)
</style>
