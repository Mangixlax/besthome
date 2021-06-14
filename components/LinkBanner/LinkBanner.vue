<template lang="pug">
  div(
    :class="{\
      [$style['link-banner']]: true,\
      [$style['link-banner--left']]: textAlign === 'left',\
      [$style['link-banner--right']]: textAlign === 'right',\
      [$style['link-banner--center']]: textAlign === 'center',\
    }"
  )
    img(
      :class="$style['link-banner__image']"
      :src="imageSrc"
      loading="lazy"
    )
    nuxt-link(
      :class="$style['link-banner__text']"
      :to="localePath(to)"
      :title="title"
      v-html="text"
    )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { RouteConfig } from '@nuxt/types/config/router'

enum ITextAlign {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
}

@Component
export default class LinkBanner extends Vue {
  @Prop({ type: Object, default: () => {}, required: true }) to!: RouteConfig
  @Prop({ type: String, default: '', required: true }) imageSrc!: string
  @Prop({ type: String, default: '', required: true }) title!: string
  @Prop({ type: String, default: '', required: true }) text!: string
  @Prop({ type: String, default: ITextAlign['LEFT'], required: true }) textAlign!: ITextAlign
}
</script>

<style lang="sass" module>
.link-banner
  display: flex
  align-items: center
  justify-content: center
  position: relative
  min-height: 272px
  padding-bottom: 30.5%
  width: 100%

  &:before
    content: ''
    position: absolute
    left: 0
    top: 0
    right: 0
    bottom: 0
    background: rgba(17, 17, 17, 0.32)
    z-index: 2

  &__image
    position: absolute
    left: 0
    right: 0
    bottom: 0
    top: 0
    width: 100%
    height: 100%
    object-fit: cover
    z-index: 1

    @media (max-width: 900px)
      height: 272px

  &__text
    +style-3
    position: absolute
    z-index: 3
    padding: 0 32px
    left: 0
    right: 0
    top: 0
    bottom: 0
    display: flex
    align-items: center
    text-decoration: none
    color: $color-white-100
    justify-content: flex-start
    text-align: left

  &--center &__text
    justify-content: center
    text-align: center

  &--right &__text
    justify-content: flex-end
    text-align: right
</style>
