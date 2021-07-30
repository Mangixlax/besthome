<template lang="pug">
  div(
    :class="{\
      [$style['space']]: true,\
      [$style['space--small']]: data.height === 'small',\
      [$style['space--middle']]: data.height === 'middle',\
      [$style['space--large']]: data.height === 'large',\
      [$style['space--light']]: data.color === 'light',\
      [$style['space--dark']]: data.color === 'dark',\
    }"
  )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

interface IDevider {
  height: string
  color: string
}

@Component
export default class CommonSpace extends Vue {
  @Prop({ type: Object, default: () => {} }) data!: IDevider
}
</script>

<style lang="sass" module>
.space
  width: 100%
  height: auto

  &--small
    height: 32px

  &--middle
    height: 64px

  &--large
    height: 128px

  &--light
    background: $color-white-100

  &--dark
    background: $color-black-96
</style>
