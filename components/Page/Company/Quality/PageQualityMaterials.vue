<template lang="pug">
  section(:class="$style['container']")
    div(:class="$style['container__header']")
      h2
        | {{ $t('pages.company_quality.materials.title') }}
      div
        p
          | {{ $t('pages.company_quality.materials.sub_title') }}
        p
          | {{ $t('pages.company_quality.materials.text') }}
    div(:class="$style['container__body']")
      svg-icon(
        v-for="(item, index) in logos"
        :key="index"
        :name="`quality-logo/${item}`"
      )
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class PageQualityMaterials extends Vue {
  public logos: Array<string> = [
    'knauf',
    'mitsubishi',
    'grohe',
    'franke',
    'mapei',
    'jotun',
    'siemens',
    'kutahya',
    'blum',
    'creavit',
    'bocchi',
    'betsan',
  ]
}
</script>

<style lang="sass" module>
.container
  @media (max-width: 1176px)
    padding-right: 24px
    padding-left: 24px

  &__header,
  &__body
    display: flex
    justify-content: space-between
    max-width: 1152px
    width: 100%
    margin: 0 auto

  &__header
    h2
      +desktop-text-style-5
      color: $color-black-48
      margin: 0

    div
      color: $color-black-100
      max-width: 592px
      width: 100%

      @media (max-width: 1080px)
        max-width: 100%

      p
        +desktop-text-style-4
        margin: 0

      p:last-child
        +desktop-text-style-6
        margin-top: 32px

    @media (max-width: 1000px)
      flex-direction: column

      div p
        +desktop-text-style-6

  &__body
    margin-top: 64px
    padding: 38px
    grid-column-gap: 100px
    grid-row-gap: 32px
    display: flex
    flex-wrap: wrap
    justify-content: space-between

    @media (max-width: 760px)
      display: grid
      grid-template-columns: 1fr 1fr
      grid-column-gap: 10px
      justify-items: center
      grid-row-gap: 12px
      padding: 16px
      margin-top: 32px
      
    svg
      width: 194px
      height: 97px
      fill: $color-black-8
      transition: fill 0.25s ease

      @media (max-width: 760px)
        width: 80%

      &:hover
        fill: $color-black-100
</style>
