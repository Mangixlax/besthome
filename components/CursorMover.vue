<template lang="pug">
  div(
    ref="cursor"
    :class="{\
      [$style['cursor']]: true,\
      [$style['cursor--visible']]: visibleCursor,\
      [$style['cursor--active']]: activeCursor,\
      [$style['cursor--pointer']]: pointerCursor,\
      [$style['cursor--text']]: textCursor,\
      [$style['cursor--off-exclusion']]: offExclusion,\
    }"
  )
    div(ref="revert" :class="$style['cursor__revert']")
      div(:class="$style['cursor__text']")
        div(v-html="text")
      div(:class="$style['cursor__media']")
        div(:class="$style['cursor__media-box']")
</template>

<script lang="ts">
import Vue from 'vue'
import gsap from 'gsap'
import $ from 'jquery'
import { Component, Watch } from 'nuxt-property-decorator'
import TypoText from '~/components/Base/TypoText.vue'

@Component({
  components: { TypoText },
})
export default class CursorMover extends Vue {
  public visibleCursor: boolean = false
  public activeCursor: boolean = false
  public pointerCursor: boolean = false
  public textCursor: boolean = false
  public text: string | null = ''
  public offExclusion: boolean = false
  public vel: { x: number; y: number } = { x: 0, y: 0 }
  public pos: { x: number; y: number } = { x: 0, y: 0 }
  public speed: number = 0.1
  public body: JQuery | null = null

  @Watch('$route')
  onRouteChanged(route: any) {
    this.hideCursor()
    this.deactivateCursor()
    this.onMouseLeavePointer()
    this.onMouseLeaveText()
  }

  mounted() {
    this.body = $('body')
    this.bindEvents()
    this.move(true)
    this.renderCursor()
  }

  beforeDestroy() {
    this.unbindEvents()
  }

  hideCursor(): void {
    this.visibleCursor = false
  }

  showCursor(): void {
    this.visibleCursor = true
  }

  activateCursor(): void {
    this.activeCursor = true
  }

  deactivateCursor(): void {
    this.activeCursor = false
  }

  disableExclusion(): void {
    this.offExclusion = true
  }

  enableExclusion(): void {
    this.offExclusion = false
  }

  onMouseMove(e: JQuery.Event): any {
    if (!this.$refs.cursor) return false

    gsap.to(this.pos, {
      x: e.clientX || 0,
      y: e.clientY || 0,
      overwrite: true,
      ease: 'expo.out',
      duration: this.visibleCursor ? this.speed : 0,
      // @ts-ignore
      onUpdate: () => {
        return (this.vel = { x: e.clientX || 0 - this.pos.x, y: e.clientY || 0 - this.pos.y })
      },
    })

    this.showCursor()
  }

  move(canMove: boolean = true): any {
    if (((0 === this.vel.y || 0 === this.vel.x) && !canMove) || !this.$refs.cursor) return false

    gsap.set(this.$refs.cursor, {
      x: this.pos.x,
      y: this.pos.y,
    })
  }

  renderCursor(): void {
    requestAnimationFrame(this.renderCursor)
    this.move()
  }

  onMouseEnterPointer(): void {
    this.pointerCursor = true
  }

  onMouseLeavePointer(): void {
    this.pointerCursor = false
  }

  onMouseEnterText(e: MouseEvent | any): void {
    const currentTarget = e.currentTarget as Element

    this.textCursor = true
    this.text = (e.currentTarget as Element).getAttribute('data-cursor-text')

    if (currentTarget.hasAttribute('data-cursor-off-exclusion')) {
      this.disableExclusion()
    }
  }

  onMouseLeaveText(): void {
    this.textCursor = false
    this.text = ''

    this.enableExclusion()
  }

  cursorMoverReset() {
    this.textCursor = false
    this.text = ''
    this.pointerCursor = false
  }

  bindEvents(): void {
    this.body &&
      this.body
        .on('mouseleave', this.hideCursor)
        .on('mouseenter', this.showCursor)
        .on('mousemove', this.onMouseMove)
        .on('mousedown', this.activateCursor)
        .on('mouseup', this.deactivateCursor)
        .on('mouseenter', 'a,label,input,textarea,button,[data-cursor-pointer]', this.onMouseEnterPointer)
        .on('mouseleave', 'a,label,input,textarea,button,[data-cursor-pointer]', this.onMouseLeavePointer)
        .on('mouseenter', 'h1,[data-cursor-text]', this.onMouseEnterText)
        .on('mouseleave', 'h1,[data-cursor-text]', this.onMouseLeaveText)

    this.$root.$on('cursor-mover:reset', this.cursorMoverReset)
  }

  unbindEvents(): void {
    this.body &&
      this.body
        .off('mouseleave', this.hideCursor)
        .off('mouseenter', this.showCursor)
        .off('mousemove', this.onMouseMove)
        .off('mousedown', this.activateCursor)
        .off('mouseup', this.deactivateCursor)
        .off('mouseenter', 'a,input,textarea,button,[data-cursor-pointer]', this.onMouseEnterPointer)
        .off('mouseleave', 'a,input,textarea,button,[data-cursor-pointer]', this.onMouseLeavePointer)
        .off('mouseenter', 'h1,[data-cursor-text]', this.onMouseEnterText)
        .off('mouseleave', 'h1,[data-cursor-text]', this.onMouseLeaveText)

    this.$root.$off('cursor-mover:reset', this.cursorMoverReset)
  }
}
</script>

<style lang="sass" module>
.cursor
  position: fixed
  top: 0
  left: 0
  z-index: 999999999
  contain: layout style size
  pointer-events: none
  will-change: transform
  transition: opacity 0.3s, color 0.4s
  mix-blend-mode: exclusion

  &:before
    content: ""
    position: absolute
    display: block
    transform: scale(0)
    background-color: $color-white-100
    border-radius: 50%
    transition: opacity 0.1s, transform 0.25s ease-in-out, background-color 0.25s ease
    top: -40px
    left: -40px
    width: 80px
    height: 80px

  &--off-exclusion
    mix-blend-mode: normal

    &:before
      background-color: $color-black-100

  &--off-exclusion &__text
    color: $color-white-100

  &--visible:before
    transform: scale(0.12)

  &#{&}--visible#{&}--active:before
    transform: scale(0.23)
    transition-duration: 0.2s

  &--pointer:before
    transform: scale(0.23)

  &--slider:before
    transform: scale(0.28)

  &#{&}--visible#{&}--text:before
    transform: scale(1)

  &--text &__text
    opacity: 1
    transform: scale(1)

  &--text#{&}--active &__text,
  &--text#{&}--active#{&}--visible:before
    transform: scale(0.8)

  &__revert
    display: block

  &__text
    position: absolute
    top: -18px
    left: -18px
    width: 36px
    height: 36px
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    white-space: nowrap
    transform: scale(0) rotate(10deg)
    opacity: 0
    color: $color-black
    +style-8
    line-height: 18px
    text-align: center
    letter-spacing: -0.01em
    transition: opacity 0.4s, transform 0.3s

  &__media
    display: none
    position: absolute
    width: 350px
    height: 350px
    margin: -175px 0 0 -175px

    @media (min-width: 1600px)
      width: 430px
      height: 430px
      margin: -215px 0 0 -215px

    &-box
      position: relative
      width: 100%
      height: 100%
      overflow: hidden
      transform: scale(0) translateZ(0)
      transform-origin: center center
      padding: 1px
      opacity: 0
      border-radius: 50%
      //noinspection CssInvalidPropertyValue
      -webkit-mask-image: -webkit-radial-gradient(circle, #fff 100%, #000 100%)
      transition: opacity 0.2s 0.2s, transform 0.35s
</style>
