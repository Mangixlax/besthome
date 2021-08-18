<template lang="pug">
  section(:class="$style['container']")
    div(:class="$style['container__body']")
      h2 {{ $t('pages.our_office.graphs.title') }}
      div(:class="$style['content']")
        p {{ $t('pages.our_office.graphs.text') }}
        ul(:class="$style['graphs']")
          li(:class="$style['graphs__item']")
            h3(:class="$style['graphs__item-title']") {{ $t('pages.our_office.graphs.items.0.title') }}
            p(:class="$style['graphs__item-text']") {{ $t('pages.our_office.graphs.items.0.text') }}
          li(:class="$style['graphs__item']")
            h3(:class="$style['graphs__item-title']") {{ $t('pages.our_office.graphs.items.1.title') }}
            p(:class="$style['graphs__item-text']") {{ $t('pages.our_office.graphs.items.1.text') }}
          li(:class="$style['graphs__item']")
            h3(:class="$style['graphs__item-title']") {{ $t('pages.our_office.graphs.items.2.title') }}
            p(:class="$style['graphs__item-text']") {{ $t('pages.our_office.graphs.items.2.text') }}
          li(:class="$style['graphs__item']")
            h3(:class="$style['graphs__item-title']") {{ $t('pages.our_office.graphs.items.3.title') }}
            p(:class="$style['graphs__item-text']") {{ $t('pages.our_office.graphs.items.3.text') }}
        div(:class="$style['links']")
          nuxt-link(
            :to="localePath({ name: 'company-about' })"
            :title="$t('pages.our_office.graphs.link')"
          )
            span {{ $t('pages.our_office.graphs.link') }}
            svg-icon(name="text-link-arrow")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class PageOurOfficeGraphs extends Vue {}
</script>

<style lang="sass" module>
.container
  background-color: $color-black-96

  &__body
    max-width: 1248px
    width: 100%
    margin: 0 auto
    padding: 0 48px
    display: grid
    grid-template-columns: 1fr minmax(576px, 1fr)

    @media (max-width: 940px)
      padding: 0 24px
      grid-template-columns: 1fr

    & > h2
      +desktop-text-style-5
      margin: 0
      color: $color-white-48

.content
  & > p:nth-child(1)
    +desktop-text-style-4
    color: $color-white-100

.graphs
  margin: 48px 0 0
  padding: 0
  list-style: none
  display: grid
  grid-template-columns: 1fr 1fr
  grid-column-gap: 35px
  grid-row-gap: 48px

  @media (max-width: 650px)
    grid-template-columns: 1fr
    justify-content: center
    text-align: center

  &__item
    &-title
      +desktop-display-style-2
      color: $color-white-100
      margin: 0
      white-space: nowrap

      @media (max-width: 600px)
        +desktop-display-style-3

    &-text
      +desktop-text-style-6
      color: $color-white-56
      margin: 24px 0 0

.links
  margin-top: 32px
  display: grid
  grid-template-columns: 1fr 1fr
  align-items: center

  & > a
    color: $color-white-80
    text-decoration: none
    display: flex
    align-items: center
    outline: none

    &, svg
      transition: fill 0.25s ease, color 0.25s ease

    svg
      width: 22px
      height: 22px
      fill: $color-white-80
      margin-left: 10px

    &:hover
      color: $color-white-100

      svg
        fill: $color-white-100
</style>
