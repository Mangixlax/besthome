<template lang="pug">
  div(:class="{ [$style['menu']]: true, [$style['open']]: menuIsOpen, [$style['has-top-line']]: !topLineIsHidden }")
    div(
      :class="[$style['menu__burger'], offsetBurger && $style['fix-to-top']]"
      @click="menuIsOpen = !menuIsOpen"
    )
      svg-icon(:name="menuIsOpen ? 'close' : 'burger-menu'")
    div(:class="$style['menu__content']")
      top-line(v-if="!topLineIsHidden" @close="onToggleHiddenMode")
      logo(:class="$style['logo']")
      div(:class="$style['menu__content-scrollable']")
        base-header-info(:class="$style['menu__content-info']")
        base-header-mobile-menu-pages
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace, Watch } from 'nuxt-property-decorator'
import BaseHeaderNavigation from '~/components/BaseHeader/BaseHeaderNavigation.vue'
import TypoText from '~/components/Base/TypoText.vue'
import TopLine from '~/components/TopLine/TopLine.vue'
import BaseHeaderInfo from '~/components/BaseHeader/BaseHeaderInfo.vue'
import Logo from '~/components/Logo.vue'
import { SettingsTopLineState } from '~/store/SettingsTopLine'
import BaseHeaderMobileMenuPages from '~/components/BaseHeaderMobile/BaseHeaderMobileMenuPages.vue'

const SettingsTopLineStore = namespace('SettingsTopLine')

@Component({
  components: {
    BaseHeaderMobileMenuPages,
    Logo,
    BaseHeaderInfo,
    TopLine,
    TypoText,
    BaseHeaderNavigation,
  },
})
export default class BaseHeaderMobile extends Vue {
  @SettingsTopLineStore.Getter('isHidden') topLineIsHidden!: SettingsTopLineState['hidden']
  @SettingsTopLineStore.Action('toggleHiddenMode') onToggleHiddenMode!: () => void

  /**
   * This variable determines menu is opened or closed
   */
  public menuIsOpen: boolean = false
  public offsetBurger: boolean = false
  /**
   * Toggle 'menu-open' attribute on body when menu is opened or closed
   */
  @Watch('menuIsOpen')
  onChangeMenuIsOpen(isOpen: boolean) {
    if (isOpen) {
      document.body.setAttribute('menu-open', '')
    } else {
      document.body.removeAttribute('menu-open')
    }
  }  

  /**
   * Close menu when $route is changed
   */
  @Watch('$route')
  onChangeRoute() {
    this.menuIsOpen = false
    const regex = /properties/
    if ((regex as any).test(this.$route.path)) {
      this.offsetBurger = true
    } else {
      this.offsetBurger = false
    }
  }
}
</script>

<style lang="sass" module>
body[menu-open]
  overflow: hidden

.menu
  @media (min-width: 1024px)
    display: none

  &__burger
    display: flex
    position: fixed
    top: 24px
    right: 24px
    z-index: 1000
    width: 42px
    height: 42px
    align-items: center
    justify-content: center
    border-radius: 50%
    box-shadow: inset 0 0 0 1px rgba($color-black-100, 0.04)
    transition: background-color 0.25s ease
    background-color: $color-white-100
    transition: all 0.3s ease
    svg
      width: 17px
      height: 13px
      fill: $color-black-100
      transition: fill 0.25s ease 0.10s

    .open &
      background-color: $color-black-100
      box-shadow: none

      svg
        width: 24px
        height: 24px
        fill: $color-white-100

    .has-top-line &
      top: 72px

    &.fix-to-top
      position: absolute
      top: 72px 

  &__content
    opacity: 0
    pointer-events: none
    position: fixed
    width: 100vw
    height: 100vh
    overflow-y: hidden
    z-index: 998
    background: $color-white-100
    top: 0
    left: 0
    display: flex
    flex-direction: column
    align-items: flex-start

    .open &
      opacity: 1
      pointer-events: all

    &-info
      margin-top: 40px
      margin-left: 24px
      margin-bottom: 24px

    &-scrollable
      overflow-y: scroll
      width: 100%
      height: 100%

.logo
  margin-top: 13px
  margin-left: 24px
</style>
