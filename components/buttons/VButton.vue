<template lang="pug">
  component(
    :is="isComponent"
    v-bind="listenAttrs"
    v-on="$listeners"
    :class="[\
      $style['btn'],\
      variant && $style[variant],\
      full && $style['full'],\
      responsive && $style['responsive'],\
      smallIcon && $style['small-icon'],\
      $style[`padding-variant-${paddingVariant}`]\
    ]"
    :disabled="disabled"
  )
    span(
      v-if="$slots['icon-prepend']"
      :class="[$style['icon'], $style['icon--prepend']]"
    )
      slot(name="icon-prepend")
    typo-text(
      tag="span"
      :version="textVariant"
    )
      slot
    span(
      v-if="$slots['icon-append']"
      :class="[$style['icon'], $style['icon--append']]"
    )
      slot(name="icon-append")
</template>

<script>
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'VButton',
  components: {
    TypoText
  },
  props: {
    isComponent: {
      type: String,
      default: 'button',
    },
    variant: {
      type: String,
      default: 'blue',
    },
    textVariant: {
      type: String,
      default: 'label-large',
    },
    paddingVariant: {
      type: [String, Number],
      default: '1',
    },
    full: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    responsive: {
      type: Boolean,
      default: false,
    },
    smallIcon: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    listenAttrs() {
      return {
        ...(this.isComponent === 'button' && { type: 'button' }),
        ...this.$attrs,
      }
    },
  },
}
</script>

<style lang="sass" module>
.full
  width: 100%

.btn
  +style-7
  display: flex
  align-items: center
  justify-content: center
  background-color: transparent
  cursor: pointer
  border: none

  &[disabled]
    cursor: not-allowed
    opacity: 0.4

  span:not(.icon)
    display: flex
    align-items: center

.icon
  width: 24px
  height: 24px
  display: block
  position: relative

  .small-icon &
    width: 16px
    height: 16px

  svg
    width: 100%
    height: 100%

  &--prepend
    margin-right: 12px

  &--append
    margin-left: 12px

.padding-variant-1
  padding: 10px 0px

  &.light
    padding: 13px 31px

  &.responsive
    +mobile
      padding: 10px 16px

.padding-variant-2
  padding: 12px 18px

.gold-black
  background-color: gold
  color: gold
  box-shadow: 0 0 24px rgba(gold, 0)

  // svg
  //   fill: $gold-1

.blue
  background-color: $color-blue-100
  color: $color-white-100
  transition: color 0.25s ease, box-shadow 0.25s ease

  // svg
  //   fill: $white-1

  &:hover
    will-change: color, box-shadow
    box-shadow: 0 0 24px rgba (gold, 0.3)

.alternative
  background-color: grey
  color: white
  box-shadow: 0 0 24px rgba(grey, 0)
  transition: color 0.25s ease, box-shadow 0.25s ease

  &:hover
    will-change: color, box-shadow
    box-shadow: 0 0 24px rgba(grey, 0.3)

.black
  background-color: black
  color: white
  box-shadow: 0 0 24px rgba(26, 27, 41, 0)
  transition: color 0.25s ease, box-shadow 0.25s ease

  &:hover
    will-change: color, box-shadow
    box-shadow: 0 0 24px rgba(26, 27, 41, 0.16)

.light
  border: 1px solid wheat
  color: black
  transition: color 0.25s ease, border-color 0.25s ease

  &:hover
    will-change: color
    border-color: blue
</style>
