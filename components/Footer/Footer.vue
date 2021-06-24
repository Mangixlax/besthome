<template lang="pug">
  footer(:class="$style['footer']")
    base-coocies-card(:class="$style['coocies']")
    footer-company-description(:paragraphs="$t('footer.footer_company_description')")
    base-bread-crumbs
    footer-site-map
    footer-copyright
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import BaseBreadCrumbs from '~/components/Base/BaseBreadCrumbs.vue'
import FooterCompanyDescription from '~/components/Footer/FooterCompanyDescription.vue'
import FooterSiteMap from '~/components/Footer/FooterSiteMap.vue'
import FooterCopyright from '~/components/Footer/FooterCopyright.vue'
import BaseCoociesCard from '~/components/Base/BaseCoociesCard.vue'

@Component({
  components: {
    BaseBreadCrumbs,
    FooterCompanyDescription,
    FooterSiteMap,
    FooterCopyright,
    BaseCoociesCard,
  },
})
export default class Footer extends Vue {}
</script>

<style lang="sass" module>
.footer
  position: relative
  width: 100%
  background: $color-black-8

.coocies
  position: absolute
  top: -367px
  
</style>
