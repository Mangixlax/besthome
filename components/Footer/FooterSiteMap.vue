<template lang="pug">
  section(:class="[$style['container'], isDarkTheme && $style['dark']]")
    div(:class="$style['container__head']")
      h2(:class="$style['container__head-title']") {{ $t('have_question') }}
      nuxt-link(
        :to="localePath({ name: 'contacts' })"
        :class="$style['container__head-link']"
        :title="$t('pages.our_office.contacts.contact_us')"
      )
        span {{ $t('pages.our_office.contacts.contact_us') }}
        svg-icon(name="text-link-arrow")
    div(:class="$style['map__grid']")
      base-fast-links(
        v-for="(siteMapColumn, i) in getSitemapColumns"
        :key="i"
        :title="siteMapColumn.title"
        :list="siteMapColumn.items"
        :class="$style[`map__grid-column-${i}`]"
        :active="i === 0"
        :is-dark-theme="isDarkTheme"
      )
</template>

<script lang="ts">
import { Component, Getter, Vue } from 'nuxt-property-decorator'
import BaseFastLinks from '~/components/Base/BaseFastLinks.vue'
import TypoText from '~/components/Base/TypoText.vue'
import DeveloperLogo from '@/components/svg/Developer.vue'
import { IMenus, NavigationListItem } from '~/store/Navigation'

@Component({
  components: { BaseFastLinks, TypoText, DeveloperLogo },
})
export default class FooterSiteMap extends Vue {
  @Getter('Navigation/getSitemapColumns') getSitemapColumns!: IMenus<NavigationListItem[]>

  get isDarkTheme(): boolean {
    return this.$store.getters['isDarkTheme']
  }
}
</script>

<style lang="sass" module>
.container
  padding: 32px calc((100vw - 1152px) / 2)
  margin: 0 auto
  background-color: $color-white-100
  display: flex
  justify-content: space-between
  position: relative

  &.dark
    background-color: $color-black-96

  &:before
    content: ''
    position: absolute
    top: 0
    left: calc((100vw - 1152px) / 2)
    right: calc((100vw - 1152px) / 2)
    height: 1px
    background-color: $color-black-4

    @media (max-width: 1176px)
      left: 24px
      right: 24px

  &.dark:before
    background-color: $color-white-4

  @media (max-width: 1176px)
    padding-left: 24px
    padding-right: 24px
    flex-wrap: wrap

  @media (max-width: 900px)
    flex-direction: column

  &__head
    width: 100%
    max-width: 374px
    margin-right: 40px

    &-title
      +desktop-display-style-4
      margin-top: 0
      margin-bottom: 32px
      color: $color-black-88

      .dark &
        color: $color-white-88

    &-link
      +desktop-text-style-6
      color: $color-blue-80
      text-decoration: none
      display: flex
      align-items: center
      outline: none

      &, svg
        transition: fill 0.25s ease, color 0.25s ease

      svg
        width: 22px
        height: 22px
        fill: $color-blue-80
        margin-left: 10px

      &:hover
        color: $color-blue-100

        svg
          fill: $color-blue-100

      .dark &
        color: $color-white-80

        svg
          fill: $color-white-80

        &:hover
          color: $color-white-100

          svg
            fill: $color-white-100

.map__grid
  display: grid
  grid-template-columns: 1fr 1fr 1fr 1fr
  column-gap: 48px
  grid-auto-flow: row
  align-items: start
  justify-items: start
  margin-bottom: 16px
  width: 100%
  
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

  @media (max-width: 1176px)
    margin-top: 24px

  @media (max-width: 900px) and (min-width: 600px)
    display: flex
    justify-content: space-between
    flex-wrap: wrap

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

  @media (max-width: 600px)
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
</style>
