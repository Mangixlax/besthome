<template lang="pug">
  section(:class="[$style['company'], isDarkTheme && $style['dark']]")
    span(v-html="$t('footer.footer_company_title')")
    div(:class="$style['company__container']")
      div(
        v-if="seoContent.length"
        v-html="seoContent"
        :class="$style['company__container-text']"
      )
      div(v-else)
        p(
          v-for="(paragraph, i) in $t('footer.footer_company_description')"
          :key="i"
          :class="$style['company__container-text']"
        ) {{ paragraph }}
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import TypoText from '~/components/Base/TypoText.vue'

@Component({ components: { TypoText } })
export default class FooterSeoContent extends Vue {
  get seoContent(): string | null {
    return this.$store.getters['Catalog/getPageSeoContent']
  }

  get isDarkTheme(): boolean {
    return this.$store.getters['isDarkTheme']
  }
}
</script>

<style lang="sass" module>
.company
  width: 100%
  display: flex
  justify-content: space-between
  background-color: $color-white-100

  @media (max-width: 1176px)
    padding: 0 24px

  @media (max-width: 900px)
    flex-direction: column
    align-items: center

  & > span
    +desktop-text-style-5
    color: $color-black-96
    margin-top: 0
    margin-bottom: 0
    margin-left: calc((100vw - 1152px) / 2)
    width: 100%
    max-width: 344px
    position: sticky
    top: 220px
    height: fit-content

    @media (max-width: 1176px)
      margin-left: 0

    @media (max-width: 900px)
      margin-bottom: 24px
      display: none

  &.dark
    background-color: $color-black-96

    span
      color: $color-white-96

  &__container
    margin-right: calc((100vw - 1152px) / 2)
    width: 100%
    max-width: 592px

    @media (max-width: 1176px)
      margin-right: 0

    .dark &
      color: $color-white-4

    &-text
      +desktop-text-style-7
      display: inline-block
      margin: 0

      h2
        +style-2
        margin: calc(64px - 1rem) 0

        @media (max-width: 1025px)
          margin: 32px 0

      p
        margin: 1em 0

      & + &
        margin-top: 18px

      .dark &
        color: $color-white-48
</style>
