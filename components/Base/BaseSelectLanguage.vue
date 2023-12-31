<template>
  <div
    v-click-outside="closeOutside"
    ref="selectorWrapper"
    :class="{
      [$style['select-menu']]: true,
      [$style['open']]: selectorIsOpened,
      [$style['dark']]: isDarkTheme,
      [$style['tilt-up']]: tiltUp,
      [$style['tilt-down']]: tiltDown,
      [$style['select-menu--disable-animation']]: disableAnimation,
    }"
  >
    <div :class="$style['select-menu__button']" @click="openSelector">
      <svg-icon name="select-language-arrows" />
      <ul
        :style="{
          transform: `translateY(-${selectorPosition}px)`,
        }"
      >
        <li v-for="(item, index) in selectorList" :key="index" v-html="item.label"></li>
      </ul>
    </div>
    <ul
      :style="{
        transform: `translateY(${40}px)`,
      }"
    >
      <li
        v-for="(selectorItem, index) in selectorList"
        :key="index"
        @click="chooseSelector(selectorItem.value)"
        v-html="selectorItem.label"
      ></li>
    </ul>
  </div>
</template>

<script lang="ts">
import $ from 'jquery'
import { Vue, Prop, Component } from 'nuxt-property-decorator'

@Component
export default class BaseSelectLanguage extends Vue {
  @Prop({ type: Array, default: () => [] }) list!: Array<any>
  @Prop({ type: Boolean, default: false }) isDarkTheme!: boolean

  public selectorList: Array<string> = []
  public selectModel: string = 'En'
  public selectorIsOpened: boolean = false
  public tiltUp: boolean = false
  public tiltDown: boolean = false
  public selectorPosition: number = 0
  public disableAnimation: boolean = false
  public inProcess: boolean = false

  beforeMount() {
    this.selectorList = Object.assign([], this.list)
    this.chooseSelector(this.$i18n.locale)
  }

  /**
   * Methods
   */
  openSelector() {
    if (!this.selectorIsOpened && !this.inProcess) {
      this.selectorIsOpened = true
      this.toggleTiltDown()
    }
  }

  closeOutside() {
    if (this.selectorIsOpened && !this.inProcess) {
      this.selectorIsOpened = false
      this.toggleTiltUp()
    }
  }

  chooseSelector(selectorItem: string) {
    this.$nextTick(() => {
      if (this.$i18n.locale !== selectorItem) {
        this.$i18n.setLocale(selectorItem)
      }

      if (!this.inProcess) {
        this.inProcess = true

        const newIndex: number = this.selectorList.map((e: any) => e.value).indexOf(selectorItem)

        this.selectorIsOpened = false

        this.toggleTiltUp()
        this.selectorPosition =
          newIndex * ($(this.$refs.selectorWrapper as Element).height() as number)

        setTimeout(() => {
          this.disableAnimation = true
          this.selectModel = selectorItem
          setTimeout(() => {
            this.disableAnimation = false
            this.inProcess = false
          }, 100)
        }, 1000)
      }
    })
  }

  toggleTiltUp() {
    this.tiltUp = true

    setTimeout(() => {
      this.tiltUp = false
    }, 1000)
  }

  toggleTiltDown() {
    this.tiltDown = true

    setTimeout(() => {
      this.tiltDown = false
    }, 1000)
  }
}
</script>

<style lang="sass" module>
.select-menu
  position: relative
  z-index: 1
  width: 60px
  height: 36px
  transition: box-shadow 0.3s ease

  &--disable-animation ul
    transition: none !important

  svg
    position: absolute
    top: 8px
    right: 0
    height: 18px
    width: 18px
    z-index: 10

  select,
  &__button
    font-family: inherit
    margin: 0
    border: 0
    text-align: left
    text-transform: none
    -webkit-appearance: none

  select
    pointer-events: none
    user-select: none
    opacity: 0
    padding: 10px 13px
    visibility: hidden
    font-weight: 500
    font-size: 14px
    line-height: 25px

  ul
    margin: 0
    padding: 0
    list-style: none
    position: absolute
    left: 0
    top: 0
    right: 0
    transform: translateY(0)
    transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1)
    width: 60px
    color: $color-black-88

    li
      padding: 10px 13px
      cursor: pointer

  &.dark ul
    color: $color-white-88

  & > ul
    background: var(--bg-color-red)
    color: $color-black-88
    border-radius: 6px

    li
      transition: color 0.3s ease

      &:hover
        color: $color-black-88

  &.dark
    ul
      color: $color-white-88

      &:hover
        color: $color-white-88

    & > ul
      color: $color-black-88

  &__button
    position: absolute
    left: 0
    top: 0
    right: 0
    bottom: 0
    padding: 0
    z-index: 1
    display: block
    overflow: hidden
    border-radius: 6px
    color: $color-black-88
    width: 60px
    height: 36px

    .dark &
      color: $color-white-88

  & ul
    background: transparent
    color: $color-black-88

  &.dark ul
    background: transparent
    color: $color-white-88

  &.open ul
    background: $color-black-100
    color: $color-white-88

  &.open.dark ul
    background: $color-white-100
    color: $color-black-88

  & svg
    fill: $color-black-100

  &.dark svg
    fill: $color-white-96

  &.open svg
    fill: $color-white-100

  &.dark.open svg
    fill: $color-black-96

  &:not(.open)
    & > ul
      opacity: 0
      pointer-events: none

  &.open
    &.tilt-up
      animation: tilt-up 0.4s linear forwards

    &.tilt-down
      animation: tilt-down 0.4s linear forwards

@keyframes tilt-up
  40%,
  60%
    transform: perspective(500px) rotateX(8deg)

@keyframes tilt-down
  40%,
  60%
    transform: perspective(500px) rotateX(-8deg)
</style>
