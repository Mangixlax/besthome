<template lang="pug">
  header(
    :class="{\
      [$style['header']]: true,\
      [$style['header--sticky']]: $store.state.stickyHeader,\
      [$style['header--dark']]: isDarkTheme,\
      [$style['header--transparent']]: isTransparent\
    }"
    @mouseenter="isTransparent = false"
    @mouseleave="onScroll"
  )
    div(:class="$style['header__inner']")
      logo(:class="$style['header__logo']")
      nav(:class="$style['header__nav']")
        base-header-navigation(:dark="isDarkTheme")
      base-header-info(align-right hide-on-mobile :dark="isDarkTheme")
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'nuxt-property-decorator'
import BaseHeaderNavigation from '~/components/BaseHeader/BaseHeaderNavigation.vue'
import TypoText from '~/components/Base/TypoText.vue'
import BaseHeaderInfo from '~/components/BaseHeader/BaseHeaderInfo.vue'
import Logo from '~/components/Logo.vue'

@Component({
  components: { Logo, BaseHeaderInfo, TypoText, BaseHeaderNavigation },
})
export default class BaseHeader extends Vue {
  public isTransparent: boolean = false

  get isDarkTheme(): boolean {
    return this.$store.getters['isDarkTheme']
  }

  public onScroll() {
    if (this.isDarkTheme) {
      this.isTransparent = window.scrollY === 0
    }
  }

  created() {
    this.$store.commit('setStickyHeader', this.$route.path)
  }

  mounted() {
    document.addEventListener('scroll', this.onScroll)
    this.onScroll()
  }

  beforeDestroy() {
    document.removeEventListener('scroll', this.onScroll)
  }
}
</script>

<style lang="sass" module>
.header
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  height: 92px
  position: relative
  background-color: $color-white-100
  z-index: 35
  transition: background-color 0.5s ease

  &--dark
    background-color: $color-black-72

  &--dark#{&}--transparent
    background-color: transparent

  &--sticky
    position: sticky
    top: 0

    @media (max-width: 1054px)
      position: static
      height: 97px

  &__inner
    display: flex
    align-items: center
    max-width: 1296px
    padding: 0 24px
    width: 100%
    height: 100%

  &__logo
    margin-right: 30px
    margin-left: -1px

    @media (max-width: 1248px + 32px)
      margin-right: 12px

  &--dark &__logo svg
    fill: $color-white-100

  &--dark &__logo span
    color: $color-white-100

  &__nav
    display: flex
    height: 100%
    flex-grow: 1

    @media (max-width: 1023px)
      display: none
</style>
