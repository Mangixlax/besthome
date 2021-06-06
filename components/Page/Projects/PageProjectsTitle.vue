<template lang="pug">
  section(
    :class="[$style['projects-title'], large && $style['large'], filename && $style['isImage'], offsetToTop && $style['offset-to-top']]"
  )
    div(
      :class="$style['projects-title__container']"
      :style="filename && { backgroundImage: `url(${require('~/assets/images/projects/' + this.filename)})` }"
    )
      div(:class="$style['projects-title__container-content']")
        slot
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'PageProjectsTitle',
  components: { TypoText },
  props: {
    filename: {
      type: String,
      default: '',
    },
    large: {
      type: Boolean,
      default: false,
    },
    offsetToTop: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="sass" module>
.projects-title
  width: 100%

  &.offset-to-top
    margin-top: -108px

  &__container
    display: flex
    align-items: center
    padding: 80px 24px
    margin: 0 64px
    background-size: cover
    background-repeat: no-repeat
    background-position-x: center
    position: relative

    @media (max-width: 900px)
      margin: 0 24px
      min-height: auto

    .isImage &
      min-height: 640px

    .large &
      max-width: 1440px
      min-height: 880px

    @media (max-width: 900px)
      align-items: center
      margin-bottom: 40px

    &-content
      max-width: 863px
      margin: 0 auto
      display: flex
      flex-direction: column
      grid-gap: 40px

      .isImage &
        color: $color-white-100

      h1
        margin: 0

      button
        background: $color-blue-100
        padding: 16px 32px
        +style-5
        color: black
        width: fit-content
        border: none
        cursor: pointer

        .isImage &
          background: $color-white-100
</style>
