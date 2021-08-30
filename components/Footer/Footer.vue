<template lang="pug">
  footer(:class="[$style['footer'], isDarkTheme && $style['dark']]")
    common-divider(
      :data="{\
        height: 'middle',\
        color: isDarkTheme ? 'dark' : 'light',\
      }"
    )
    footer-company-description
    common-divider(
      :data="{\
        height: 'small',\
        color: isDarkTheme ? 'dark' : 'light',\
      }"
    )
    base-bread-crumbs
    footer-site-map
    div(:class="$style['support']")
      | {{ $t('footer.footer_site_map.text') }}
      a(href="tel:+905305474415" title="Позвонить в офис +90 530 547-44-15") +90 530 547-44-15
      | {{ $t('footer.footer_site_map.text_2') }}
      span
        nuxt-link(
          :to="localePath({ name: 'contacts' })"
          :title="$t('footer.footer_site_map.link')"
        ) {{ $t('footer.footer_site_map.link') }}
        | .
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

.cookies
  position: absolute
  top: -367px

.support
  display: flex
  flex-wrap: wrap
  column-gap: 4px
  padding: 10px calc((100vw - 1152px) / 2)
  background-color: $color-white-100
  color: $color-black-64

  a
    color: $color-black-64
    text-decoration: none

  span a
    color: $color-blue-100
    text-decoration: underline
    text-underline-offset: 7px
    text-decoration-color: $color-blue-16

  .dark &
    background-color: $color-black-96
    color: $color-white-64

    a
      color: $color-white-64

    span a
      color: $color-blue-100

  @media (max-width: 1176px)
    padding-left: 24px
    padding-right: 24px
</style>
