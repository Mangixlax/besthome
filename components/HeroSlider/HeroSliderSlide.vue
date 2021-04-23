<template lang="pug">
  div(:class="[$style['slide'], isCurrent && $style['slide--current']]")
    div(:class="$style['slide__counter']")
      | Projects {{ slideIndex }} of {{ maxSlideIndex }}
    a(:class="$style['slide__caption']") {{ slideData.title }}
    div(:class="[$style['slide__caption'], $style['slide__caption--next']]") {{ nextSlideData.title }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class HeroSliderSlide extends Vue {
  @Prop({ type: Boolean, default: false })
  private isCurrent!: boolean

  @Prop({ type: [String, Number], default: false })
  private slideIndex!: string | number

  @Prop({ type: [String, Number], default: false })
  private maxSlideIndex!: string | number

  @Prop({ type: Object, required: true })
  private slideData!: {
    title: string
    description: string
  }

  @Prop({ type: Object, required: true })
  private nextSlideData!: {
    title: string
    description: string
  }
}
</script>

<style lang="sass" module>
.slide
  display: none

  &--current
    display: block
</style>
