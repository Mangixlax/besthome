<template lang="pug" functional>
  div(:class="$style['top-line']")
    div(:class="$style['top-line__inner']")
      div(:class="$style['ticker']")
        div(:class="$style['ticker__content']")
          component(
            :is="injections.components.TypoText"
            v-for="(item, key) in Array(props.repeat)"
            :key="key"
            tag="p"
            version="style-7"
            :class="$style['ticker__content-text']"
            :style="{\
              animationDuration: `${props.duration}s`,\
              animationDirection: props.reverse ? 'reverse' : undefined\
            }"
          ) {{ props.content }}
      div(:class="$style['top-line__close']" @click="listeners['close']()")
        svg-icon(name="close")
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import TypoText from '~/components/Base/TypoText.vue'

@Component({
  inject: {
    components: {
      default: { TypoText },
    },
  },
  components: {
    TypoText
  }
})
export default class TopLine extends Vue {
  /**
   * Animation Duration
   */
  @Prop({ default: 40, type: Number }) duration!: number

  /**
   * Number of repeat the Slot (It's important for to short content)
   */
  @Prop({ default: 2, type: Number }) repeat!: number

  /**
   * The property specifies whether the animation is running or paused
   */
  @Prop({ default: false, type: Boolean }) paused!: boolean

  /**
   * The animation plays backwards each cycle
   */
  @Prop({ default: false, type: Boolean }) reverse!: boolean

  @Prop({ default: "", type: String}) content!: string
}
</script>

<style lang="sass" module>
@keyframes animation
  0%
    transform: translateX(0)
  100%
    transform: translateX(-100%)

.top-line
  background-color: $color-blue
  height: 54px
  display: flex
  align-items: center
  justify-content: center

  html[class*='modal-is-open'] &
    width: 100vw

  &:hover
    animation-play-state: paused

  @media (max-width: 1054px)
    height: 48px

  &__inner
    max-width: 1296px
    width: 100%
    height: 100%
    padding: 0 24px
    display: grid
    align-items: center
    justify-content: center
    grid-template-columns: 1fr 36px
    animation-play-state: inherit

  &__close
    display: flex
    align-items: center
    justify-content: flex-end
    cursor: pointer
    width: 36px
    height: 100%

    svg
      fill: $color-white
      width: 20px
      height: 20px

.ticker
  overflow: hidden
  max-width: 1212px
  width: 100%
  animation-play-state: inherit

  &__content
    width: 100000px
    animation-play-state: inherit

    &-text
      animation-name: animation
      animation-timing-function: linear
      animation-iteration-count: infinite
      animation-play-state: inherit
      float: left
      color: $color-white
      padding: 0 20px
</style>
