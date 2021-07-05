<template lang="pug">
  div
    top-line-select-country(v-if="!topLineLocaleIsHidden")
    //- top-line(v-if="!topLineIsHidden" @close="onToggleHiddenMode")
    base-header
    nuxt(:class="$style['transition-effect']")
    Footer(:class="$style['transition-effect']")
    base-header-mobile
    cursor-mover(v-if="!isTouchDevice")
    base-cookies-card
</template>

<script lang="ts">
import $ from 'jquery'
import Vue from 'vue'
import BaseCookiesCard from '~/components/Base/BaseCookiesCard.vue'
import { Component, Mutation, namespace, Watch } from 'nuxt-property-decorator'
import { SettingsTopLineState } from '~/store/SettingsTopLine'
import { ActionTree, MutationTree } from 'vuex'
import { RootState } from '~/store'
import TopLineSelectCountry from '~/components/TopLine/TopLineSelectCountry.vue'
import TopLine from '~/components/TopLine/TopLine.vue'
import BaseHeader from '~/components/BaseHeader/BaseHeader.vue'
import BaseHeaderMobile from '~/components/BaseHeaderMobile/BaseHeaderMobile.vue'
import CursorMover from '~/components/CursorMover.vue'
import Footer from '~/components/Footer/Footer.vue'

const SettingsTopLineStore = namespace('SettingsTopLine')

@Component({
  components: {
    BaseCookiesCard,
    TopLineSelectCountry,
    TopLine,
    BaseHeader,
    BaseHeaderMobile,
    CursorMover,
    Footer,
  },
})
export default class DefaultLayout extends Vue {
  @SettingsTopLineStore.Getter('isHidden') topLineIsHidden!: SettingsTopLineState['hidden']
  @SettingsTopLineStore.Getter('isLocaleHidden')
  topLineLocaleIsHidden!: SettingsTopLineState['localeHidden']
  @SettingsTopLineStore.Action('toggleHiddenMode') onToggleHiddenMode!: ActionTree<
    SettingsTopLineState,
    RootState
  >

  @Mutation('detectTouchDevice') detectTouchDevice!: MutationTree<RootState> | any

  get isTouchDevice() {
    return this.$store.state.isTouchDevice
  }

  /**
   * @TODO Script for testing text size of EM type
   * Don't delete this
   */
  fontResizer() {
    const body_size: JQuery = $('body')
    const frame_w: number = body_size.width() as number
    const frame_h: number = body_size.height() as number

    const font_size: number = 5 + 5 * ((frame_w * frame_h) / (1920 * 1080))

    $('html').css({ 'font-size': font_size })
  }

  registerHandlers(): void {
    this.detectTouchDevice()
    // this.fontResizer()
    window.addEventListener('resize', this.detectTouchDevice)
    // window.addEventListener('resize', this.fontResizer)
  }

  unregisterHandlers(): void {
    window.removeEventListener('resize', this.detectTouchDevice)
    // window.removeEventListener('resize', this.fontResizer)
  }

  mounted(): void {
    this.registerHandlers()
  }

  beforeDestroy(): void {
    this.unregisterHandlers()
  }
}
</script>

<style lang="sass" module>
@keyframes opacity
  0%
    opacity: 0
  100%
    opacity: 1

@keyframes opacity-out
  0%
    opacity: 1
  100%
    opacity: 0

//.transition-effect
//  transition: opacity 0.5s ease
//  animation: opacity 0.5s linear forwards
//  will-change: opacity
//
//body[loading] .transition-effect
//  animation: opacity-out 0.5s linear forwards
</style>
