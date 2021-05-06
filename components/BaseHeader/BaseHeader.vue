<template lang="pug">
  header(:class="$style['header']")
    div(:class="$style['header__inner']")
      logo(:class="$style['header__logo']")
      nav(:class="$style['header__nav']")
        base-header-navigation
      base-header-info(align-right hide-on-mobile)
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import BaseHeaderNavigation from '~/components/BaseHeader/BaseHeaderNavigation.vue'
import TypoText from '~/components/Base/TypoText.vue'
import BaseHeaderInfo from '~/components/BaseHeader/BaseHeaderInfo.vue'
import Logo from '~/components/Logo.vue'

@Component({
  components: { Logo, BaseHeaderInfo, TypoText, BaseHeaderNavigation },
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
  background-color: $color-white
  z-index: 2

  @media (max-width: 1054px)
    position: static
    height: 97px

  &__inner
    display: flex
    align-items: center
    max-width: 1248px
    width: 100%
    height: 100%

    @media (max-width: 1248px + 32px)
      margin: 0 24px

  &__logo
    margin-right: 30px

  &__nav
    display: flex
    height: 100%
    flex-grow: 1

    @media (max-width: 1054px)
      display: none
</style>
