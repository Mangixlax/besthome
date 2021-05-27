<template lang="pug">
  section(
    :class="[$style['projects-title'], large && $style['large'], projectReviewTitleData.filename && $style['isImage'], offsetToTop && $style['offset-to-top']]"
  )
    div(
      :class="$style['projects-title__container']"
      :style="projectReviewTitleData.filename && { backgroundImage: `url(${require('~/assets/images/projects/' + this.projectReviewTitleData.filename)})` }"
    )
      div(:class="$style['projects-title__container-title']")
        typo-text(
          tag="h1"
          version="style-1"
        ) 
          | {{ projectReviewTitleData.title }}
</template>

<script lang="ts" scoped>
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'PageProjectsTitle',
  components: { TypoText },
  props: {
    projectReviewTitleData: {
      type: Object,
      default: () => {},
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

    &-title
      max-width: 863px
      margin: 0 auto

      h1
        max-width: 590px

      .isImage &
        color: $color-white-100
</style>
