<template lang="pug">
  section(
    :class="{\
      [$style['post']]: true,\
      [$style['flip']]: data.block_flip\
    }"
  )
    div(:class="$style['post__container']")
      div(:class="$style['post__imagebox']")
        img(:src="data.images[0]" loading="lazy")
      div(:class="$style['post__contentbox']")
        div(:class="$style['post__image']")
          img(:src="data.images[1]" loading="lazy")
        div(
          :class="{\
            [$style['post__text']]: true,\
            [$style['post__text--flipped']]: data.align === 'right',\
          }"
          v-html="data.text"
        )
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

interface IData {
  text: string,
  block_flip: boolean,
  align: string
  images: Array<string>
}

@Component
export default class BasePostTwoImage extends Vue {
  @Prop({ type: Object, default: () => ({}) }) data!: IData
  /**
   * @TODO Add flip and textFlip props
   */
}
</script>

<style lang="sass" module>
.post
  width: 100%

  a
    text-decoration: underline
    text-decoration-color: $color-blue-16
    text-underline-offset: 7px
    color: $color-blue-100

  h2, h3
    +style-3

  h2, h3, h4, p
    margin: 0

  &__container
    display: grid
    grid-template-columns: repeat(2, minmax(300px, 624px))
    justify-content: space-between
    margin: 0 auto
    max-width: 1296px
    padding: 80px 24px

    @media (max-width: 1200px)
      justify-content: center
      display: grid
      grid-template-columns: 1fr 1fr
      padding: 40px 24px

    @media (max-width: 900px)
      display: flex
      flex-direction: column
      align-items: center
      padding: 32px 24px
      grid-gap: 32px

  &__imagebox
    max-width: 624px
    width: 100%
    padding-right: 144px
    padding-bottom: 90px

    @media (min-width: 900px)
      img
        box-shadow: -32px 32px 0 rgba(17, 17, 17, 0.04)

        .flip &
          box-shadow: 32px 32px 0 rgba(17, 17, 17, 0.04)

    @media (max-width: 1200px)
      display: flex
      justify-content: center

    @media (max-width: 900px)
      padding-right: initial
      padding-bottom: initial
      
    .flip &
      order: 2

      @media (max-width: 900px)
        order: 1

    img
      height: 90%
      object-fit: cover
      max-width: 100%
      justify-self: center

      @media (max-width: 900px)
        max-width: 100%
        width: 100%
        padding-right: 0
        padding-left: 0
        padding-bottom: 0

    .flip &
      padding-left: 144px
      padding-right: 0

      @media (max-width: 900px)
        padding-right: 0
        padding-left: 0
        padding-bottom: 0

  &__contentbox
    max-width: 624px
    width: 100%
    display: flex
    flex-direction: column-reverse
    justify-content: flex-end

    @media (min-width: 900px)
      img
        box-shadow: 32px 32px 0 rgba(17, 17, 17, 0.04)

        .flip &
          box-shadow: -32px 32px 0 rgba(17, 17, 17, 0.04)

    @media (max-width: 1200px)
      padding: 0

  &__image
    height: 50%

    img
      object-fit: cover
      height: 100%
      width: 100%

  &__text
    display: flex
    flex-direction: column
    justify-content: center
    grid-gap: 16px
    padding-left: 0
    padding-right: 192px
    padding-bottom: 150px
    +style-5

    @media (max-width: 1200px)
      max-width: 600px
      padding-left: 60px
      padding-right: initial

    @media (max-width: 900px)
      margin: 32px 0
      padding: 0px
      order: 2

    &--flipped
      order: 1
      padding-left: 192px
      padding-right: 0

      @media (max-width: 1200px)
        max-width: 600px
        padding-left: 50px

      @media (max-width: 900px)
        padding: 0
        order: -1
</style>
