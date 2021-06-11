<template lang="pug">
  section(:class="$style['site__map']")
    div(:class="$style['map__grid']")
      base-fast-links(
        v-for="(siteMapColumn, i) in siteMapColumns"
        :key="i"
        :title="siteMapColumn.title"
        :list="siteMapColumn.items"
        :class="$style[`map__grid-column-${i}`]"
        :active="i === 0"
      )
    div(:class="$style['map__phone']")
      typo-text(
        tag="p"
        version="style-8"
        :class="$style['map__phone-text']"
      )
        | {{ $t('footer.footer_site_map.text') }}
        a(href="tel:+905305474415" title="Call +90 530 547-44-15" :class="$style['map__phone-text-link']")
          span(v-html="'+90 530 547<span>-</span>44<span>-</span>15'")
        | {{ $t('footer.footer_site_map.text_2') }}
        span
          nuxt-link(
          :to="localePath({ name: 'contacts' })"
          :class="$style['map__phone-link--underline']"
        ) {{ $t('footer.footer_site_map.link') }}
          | .
        nuxt-link(
          :to="localePath({ name: 'contacts' })"
          :class="$style['map__phone-link']"
        )
          svg-icon(name="link-arrow")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import BaseFastLinks from '~/components/Base/BaseFastLinks.vue'
import TypoText from '~/components/Base/TypoText.vue'
import { IMenus, NavigationListItem } from '~/store/Navigation'

@Component({
  components: { BaseFastLinks, TypoText },
})
export default class FooterSiteMap extends Vue {
  get chooseAndBuy(): IMenus<NavigationListItem[]> {
    return this.$store.getters['Navigation/getMenuByKey']('footer-choose-and-buy')
  }

  get basicServices(): IMenus<NavigationListItem[]> {
    return this.$store.getters['Navigation/getMenuByKey']('footer-basic-services')
  }

  get latestNews(): IMenus<NavigationListItem[]> {
    return this.$store.getters['Navigation/getMenuByKey']('latest-news')
  }

  get aboutCompany(): IMenus<NavigationListItem[]> {
    return this.$store.getters['Navigation/getMenuByKey']('about-company')
  }

  get additionalServices(): IMenus<NavigationListItem[]> {
    return this.$store.getters['Navigation/getMenuByKey']('additional-services')
  }

  public siteMapColumns: IMenus<NavigationListItem[]>[] = [
    { ...this.chooseAndBuy },
    { ...this.basicServices },
    { ...this.latestNews },
    { ...this.aboutCompany },
    { ...this.additionalServices },
  ]
}
</script>

<style lang="sass" module>

.site__map
  max-width: 1184px
  padding: 32px 32px
  margin: 0 auto
  border-bottom: solid 1px $color-black-4

  @media (max-width: 900px) and (min-width: 411px)
    padding: 32px 24px

  @media (max-width: 410px)
    padding: 32px 0

.map__grid
  display: grid
  grid-template-columns: 1fr 1fr 1fr 1fr
  column-gap: 48px
  grid-auto-flow: row
  align-items: start
  justify-items: start
  margin-bottom: 16px

  &-column-0
    grid-column: 1
    grid-row: 1 / 3

  &-column-1
    grid-column: 2
    grid-row: 1 / 3

  &-column-4
    grid-column: 2
    grid-row: 1 / 3
    align-self: end
    margin-top: 250px

  @media (max-width: 800px) and (min-width: 410px)
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr))
    row-gap: 20px
    column-gap: 20px
    align-items: start

    &-column-0
      grid-column: auto
      grid-row: auto

    &-column-1
      grid-column: auto
      grid-row: auto

    &-column-4
      grid-column: auto
      grid-row: auto
      margin-top: 0

  @media (max-width: 409px)
    grid-template-columns: 1fr

    &-column-0
      grid-column: auto
      grid-row: auto

    &-column-1
      grid-column: auto
      grid-row: auto

    &-column-4
      grid-column: auto
      grid-row: auto
      margin-top: 0

.map__phone

  @media (max-width: 410px)
    padding: 0 24px

  &-text
    display: flex
    align-items: center
    flex-wrap: wrap
    +style-8($with-media: false)
    
    @media (max-width: 450px)
      max-width: 190px

    &-link
      +style-8($with-media: false)
      text-decoration: none
      color: rgba($color-black, 0.88)
      margin: 0 0.3em
  span
    white-space: nowrap

  svg
    width: 18px
    height: 18px

  &-link
    display: inline-flex
    align-items: center
    margin: 0 4px
    text-decoration: none
    color: $color-blue
    cursor: pointer
    margin: 0px

    &--underline
      @extend .map__phone-link
      border-bottom: 1px solid rgba($color-blue, 0.16)
      margin-left: 4px

      @media (max-width: 600px)
        margin-left: 0px
</style>
