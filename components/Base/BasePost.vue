<template lang="pug">
  section(
    :class="{\
      [$style['post']]: true,\
      [$style['flip']]: flip\
    }"
  )
    div(:class="$style['post__container']")
      div(:class="$style['post__imagebox']")
        img(:src="filename")
      div(
        :class="{\
          [$style['post__text']]: true,\
          [$style['post__text--flipped']]: textFlip,\
        }"
      )
        slot
</template>

<script>
export default {
  name: 'BasePost',
  props: {
    flip: {
      type: Boolean,
      default: false,
    },
    textFlip: {
      type: Boolean,
      default: false,
    },
    filename: {
      type: String,
      default: '',
    },
  },
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
    margin-left: 0.5em

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

  &__imagebox
    max-width: 624px
    width: 100%

    @media (max-width: 1200px)
      display: flex
      justify-content: center

    .flip &
      order: 2

      @media (max-width: 900px)
        order: 1

    img
      height: 100%
      object-fit: cover
      max-width: 100%
      justify-self: center

      @media (max-width: 1200px)


      @media (max-width: 900px)
        max-width: 100%

  &:not(.flip) &__imagebox
    padding-right: 144px

    @media (max-width: 1200px)
      padding: 0

  &__text
    display: flex
    flex-direction: column
    justify-content: center
    grid-gap: 16px
    padding-left: 0
    padding-right: 192px

    @media (max-width: 1200px)
      max-width: 600px
      padding-left: 60px
      padding-right: initial

    @media (max-width: 900px)
      margin-top: 32px
      padding: 0px

    &--flipped
      order: 1
      padding-left: 192px
      padding-right: 96px

      @media (max-width: 1200px)
        max-width: 600px
        padding-left: 50px
        padding-right: 100px

      @media (max-width: 900px)
        padding: 0
</style>
