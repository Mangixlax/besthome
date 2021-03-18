<template lang="pug">
  header(:class="$style['header']")
    div(:class="$style['header__inner']")
      nuxt-link(
        :to="{ name: 'index' }"
        :class="$style['header__logo']"
        title="BestHome Construction"
      )
        svg-icon(name="logo")
      nav(:class="$style['header__nav']")
        base-header-navigation
      div(:class="$style['header__info']")
        typo-text(
          tag="a"
          version="style-6"
          href="tel:+905305474415"
          title="Call +90 530 547-44-15"
        )
          span(v-html="'+90 530 547<span>-</span>44<span>-</span>15'")
        typo-text(
          tag="div"
          version="style-9"
          :class="$style['header__info-callback']"
        )
          | Go get a call back
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import BaseHeaderNavigation from '~/components/BaseHeader/BaseHeaderNavigation.vue'
import TypoText from '~/components/Base/TypoText.vue'
@Component({
  components: { TypoText, BaseHeaderNavigation },
})
export default class BaseHeader extends Vue {}
</script>

<style lang="sass" module>
.header
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  height: 92px
  position: sticky
  top: 0

  &__inner
    display: flex
    align-items: center
    max-width: 1248px
    width: 100%
    height: 100%

  &__logo
    display: flex
    margin-right: 30px

    svg
      width: 162px
      height: 69px
      fill: $color-black

  &__nav
    display: flex
    height: 100%
    flex-grow: 1

  &__info
    display: flex
    flex-direction: column
    align-items: flex-end

    a
      text-decoration: none
      color: rgba($color-black, 0.88)

      span span
        color: rgba($color-black, 0.2)

    &-callback
      display: flex
      align-items: center
      margin-top: 4px
      padding: 0 2px 5px
      color: $color-blue
      border-bottom: 1px solid rgba($color-blue, 0.16)
      cursor: pointer
</style>
