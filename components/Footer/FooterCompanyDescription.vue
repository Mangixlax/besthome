<template lang="pug">
  section(:class="[$style['company'], isDarkTheme && $style['dark']]")
    h2(v-html="$t('footer.footer_company_title')")
    div(:class="$style['company__container']")
      div(
        v-if="isSeoContentView"
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
export default class FooterCompanyDescription extends Vue {
  public isSeoContentView: boolean = false

  get seoContent(): string | null {
    return this.$store.getters['Catalog/getPageSeoContent']
  }

  get isDarkTheme(): boolean {
    return this.$store.getters['isDarkTheme']
  }

  @Watch('$route.path')
  async onChangeRoute(path: string) {
    this.isSeoContentView = path.indexOf('properties') !== -1;
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

  & > h2
    +desktop-text-style-5
    color: $color-black-96
    margin-top: 0
    margin-bottom: 0
    margin-left: calc((100vw - 1152px) / 2)
    width: 100%
    max-width: 344px

    @media (max-width: 1176px)
      margin-left: 0

    @media (max-width: 900px)
      margin-bottom: 24px

  &.dark
    background-color: $color-black-96

    h2
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
      color: $color-black-48

      & + &
        margin-top: 18px

      .dark &
        color: $color-white-48
</style>
