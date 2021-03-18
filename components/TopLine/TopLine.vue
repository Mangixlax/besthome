<template lang="pug" functional>
  div(:class="$style['top-line']")
    div(:class="$style['top-line__inner']")
      div(:class="$style['ticker']")
        div(:class="$style['ticker__content']")
          component(
            :is="injections.components.TypoText"
            v-for="(item, key) in Array(props.repeat)"
            :key="key"
            tag="span"
            version="style-7"
            :class="$style['ticker__content-text']"
            :style="{\
              animationDuration: `${props.duration}s`,\
              animationDirection: props.reverse ? 'reverse' : undefined\
            }"
          ) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mauris tortor ultrices adipiscing turpis massa. Cras tincidunt donec consequat tincidunt odio quis volutpat porttitor phasellus. Eget gravida fermentum commodo turpis pretium in. Sodales fermentum gravida proin posuere penatibus sem viverra nam.
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
})
export default class TopLine extends Vue {
  /**
   * Animation Duration
   */
  @Prop({ default: 40, type: Number }) duration!: Number

  /**
   * Number of repeat the Slot (It's important for to short content)
   */
  @Prop({ default: 2, type: Number }) repeat!: Number

  /**
   * The property specifies whether the animation is running or paused
   */
  @Prop({ default: false, type: Boolean }) paused!: Boolean

  /**
   * The animation plays backwards each cycle
   */
  @Prop({ default: false, type: Boolean }) reverse!: Boolean
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

  &__inner
    max-width: 1248px
    height: 100%
    display: grid
    align-items: center
    justify-content: center
    grid-template-columns: 1fr 36px

    @media (max-width: 1248px + 32px)
      margin: 0 16px

  &__close
    display: flex
    align-items: center
    justify-content: center
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

  &__content
    width: 100000px

    &-text
      animation-name: animation
      animation-timing-function: linear
      animation-iteration-count: infinite
      float: left
      color: $color-white
      padding: 0 20px
</style>
