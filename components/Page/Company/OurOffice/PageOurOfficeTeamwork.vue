<template lang="pug">
  section(:class="$style['container']")
    div(:class="$style['container__body']")
      h2 {{ $t('pages.our_office.teamwork.title') }}
      div(:class="$style['content']")
        p(v-html="$t('pages.our_office.teamwork.text_1')")
        p(v-html="$t('pages.our_office.teamwork.text_2')")
        div(:class="$style['links']")
          nuxt-link(
            :to="localePath({ name: 'service-introductory-tour' })"
            :title="$t('pages.our_office.teamwork.link_1')"
          )
            span {{ $t('pages.our_office.teamwork.link_1') }}
            svg-icon(name="text-link-arrow")
          nuxt-link(
            :to="localePath({ name: 'investors' })"
            :title="$t('pages.our_office.teamwork.link_2')"
          )
            span {{ $t('pages.our_office.teamwork.link_2') }}
            svg-icon(name="text-link-arrow")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class PageOurOfficeTeamwork extends Vue {}
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
    grid-template-columns: 1fr 1fr

    @media (max-width: 940px)
      padding: 0 24px
      grid-template-columns: 1fr

    & > h2
      +desktop-text-style-5
      margin: 0
      color: $color-white-48

.content
  & > p:nth-child(1)
    +desktop-text-style-3
    color: $color-white-100

  & > p:nth-child(2)
    +mobile-text-style-6
    color: $color-white-48
    margin-top: 48px
    padding-top: 15px
    border-top: 1px solid $color-white-16

.links
  margin-top: 15px
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
