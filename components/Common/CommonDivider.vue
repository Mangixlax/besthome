<template lang="pug">
  div(
    :class="{\
      [$style['space']]: true,\
      [$style['space--small']]: data.height === 'small',\
      [$style['space--middle']]: data.height === 'middle',\
      [$style['space--large']]: data.height === 'large',\
      [$style['space--extra-large']]: data.height === 'x-large',\
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

    @media (max-width: 1025px)
      height: 16px

  &--middle
    height: 64px

    @media (max-width: 1025px)
      height: 32px

  &--large
    height: 128px

    @media (max-width: 1025px)
      height: 64px

  &--extra-large
    height: 172px

    @media (max-width: 1025px)
      height: 86px

  &--light
    background: $color-white-100

  &--dark
    background: $color-black-96
</style>
