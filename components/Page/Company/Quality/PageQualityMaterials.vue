<template lang="pug">
  section(:class="$style['container']")
    div(:class="$style['container__header']")
      h2 Материалы
      div
        p Придумать сюда описание, возможно даже SEO текст на тему линейного трапа на пару строк (можно больше), но такой чтобы прочитать можно было.
        p Придумать сюда описание, возможно даже SEO текст на тему материалов на пару строк (можно больше), но такой чтобы прочитать можно было.
    div(:class="$style['container__body']")
      svg-icon(
        v-for="(item, index) in Array(15)"
        :key="index"
        name="knauf"
      )
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class PageQualityMaterials extends Vue {
}
</script>

<style lang="sass" module>
.container
  background-color: $color-black-4

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
    h2, p
      +desktop-text-style-5

    h2
      color: $color-black-48

    div
      color: $color-black-100
      max-width: 592px
      width: 100%

      p
        margin: 0

    @media (max-width: 1000px)
      flex-direction: column

  &__body
    margin-top: 64px
    display: flex
    flex-wrap: wrap
    justify-content: space-between

    svg
      width: 194px
      height: 97px
      fill: $color-black-8
      transition: fill 0.25s ease

      &:hover
        fill: $color-black-100

    @media (max-width: 760px)
      flex-direction: column
</style>
