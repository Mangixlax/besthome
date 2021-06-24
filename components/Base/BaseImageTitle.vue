<template lang="pug">
  section(:class="[$style['image-title'], large && $style['large']]")
    div(:class="$style['image-title__box']") 
      div(
        :style="{ backgroundImage: `url(${ filename })` }"
        :class="$style['image-title__container']"
      )
        div(v-if="imageTitleData" :class="$style['image-title__title']")
          typo-text(
            tag="h1"
            version="style-1"
            :class="$style['image-title__title-header']"
          ) {{ imageTitleData.header }}
          typo-text(
            v-for="(paragraph, i) in imageTitleData.text"
            :key="i"
            tag="p"
            version="style-5"
            :class="$style['image-title__title-text']"
          ) {{ paragraph }}
      div(:class="$style['image-title__undertext']")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import TypoText from '~/components/Base/TypoText.vue'

@Component({ components: { TypoText } })
export default class BaseImageTitle extends Vue {
  @Prop({ type: Object, default: () => {} }) imageTitleData!: object
  @Prop({ type: String, default: '' }) filename!: string
  @Prop({ type: Boolean, default: false }) large!: boolean
}
</script>

<style lang="sass" module>
.image-title
  width: 100%

  &__box
    
  &__container
    display: flex
    align-items: center
    min-height: 800px
    height: 70vh
    padding: 80px 24px
    margin: 0 24px
    background-size: cover
    background-repeat: no-repeat
    background-position-x: center
    position: relative

    @media (max-width: 900px)
      margin: 0 24px
      min-height: auto

    .large &
      max-width: 1440px
      min-height: 880px

    &::before
      content: ''
      position: absolute
      top: 0
      bottom: 0
      right: 0
      left: 0
      background: rgba(17, 17, 17, 0.45)

    @media (max-width: 900px)
      align-items: center
      padding: 40px 24px
      margin-bottom: 40px

  &__title
    z-index: 1
    max-width: 863px
    margin: 0 auto
    color: $color-white-100

    &-header
      margin: 0
      margin-bottom: 16px

    &-text
      margin: 0

  &__undertext
    max-width: 912px
    padding: 0 24px
    margin: 0 auto
</style>
