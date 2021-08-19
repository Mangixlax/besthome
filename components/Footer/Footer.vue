<template lang="pug">
  footer(:class="$style['footer']")
    common-divider(
      :data="{\
        height: 'large',\
        color: isDarkTheme ? 'dark' : 'light',\
      }"
    )
    footer-company-description
    common-divider(
      :data="{\
        height: 'large',\
        color: isDarkTheme ? 'dark' : 'light',\
      }"
    )
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
import CommonDivider from '~/components/Common/CommonDivider.vue'

@Component({
  components: {
    CommonDivider,
    BaseBreadCrumbs,
    FooterCompanyDescription,
    FooterSiteMap,
    FooterCopyright,
  },
})
export default class Footer extends Vue {
  get isDarkTheme(): boolean {
    return this.$store.getters['isDarkTheme']
  }
}
</script>

<style lang="sass" module>
.footer
  position: relative
  width: 100%
  background: $color-black-8

.cookies
  position: absolute
  top: -367px
</style>
