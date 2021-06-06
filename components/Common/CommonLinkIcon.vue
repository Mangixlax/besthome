<template lang="pug">
  svg-icon(
    name="link-arrow"
    :class="[$style['svg'], ...styles]"
  )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class CommonLinkIcon extends Vue {
  @Prop({ type: Array, default: ['fill-white'] }) variants!: Array<string>

  get styles() {
    return (this.variants || []).map((variant: string) => {
      const name: string = `svg--${variant}`
      return this.$style.hasOwnProperty(name) ? this.$style[name] : ''
    })
  }
}
</script>

<style lang="sass" module>
.svg
  width: 32px
  height: 32px
  vertical-align: middle

  &--fill-white
    fill: $color-white-88

  &--fill-black
    fill: $color-black-88

  &--stroke-white
    stroke: $color-white-88

  &--stroke-black
    stroke: $color-black-88

  &--stroke-blue
    stroke: $color-blue-100
</style>
