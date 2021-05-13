<template lang="pug">
  section(:class="$style['article']")
    div(:class="$style['article__container']")
      typo-text(
        tag="h1"
        version="style-1"
        :class="$style['article__container-title']"
      ) {{ investorsPage.title }}
      typo-text(
        tag="p"
        version="style-5"
        :class="$style['article__container-text']"
      ) {{ investorsPage.text}}
      div(:class="$style['content__link']")
          typo-text(
            tag="p"
            version="style-5"
            :class="$style['content__link-text']"
          ) {{ investorsPage.linkToProjects.text}}
          typo-text(
            tag="nuxt-link"
            version="style-5"
            :to="localePath(investorsPage.linkToProjects.route)"
            :title="investorsPage.linkToProjects.link"
            :class="$style['content__link-text--underline']"
          ) {{ investorsPage.linkToProjects.link }}
          | .
          typo-text(
            tag="nuxt-link"
            version="none"
            :to="localePath(investorsPage.linkToProjects.route)"
            :title="investorsPage.linkToProjects.link"
            :class="$style['content__link-arrow']"
          )
            svg-icon(name="link-arrow-blue")      
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'PageInvestorsTitle',
  components: { TypoText },
  props: {
    investorsPage: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="sass" module>
.article
  width: 100%

  &__container
    display: flex
    flex-direction: column
    max-width: 912px
    padding: 80px 24px
    margin: 0 auto

    @media (max-width: 1200px)
      padding: 40px 24px

    @media (max-width: 900px)
      padding: 32px 24px

    &-title
      margin: 0
      margin-bottom: 40px

    &-text
      margin:0
      margin-bottom: 16px

.content__link
  display: flex
  align-items: center
  flex-wrap: wrap

  &-text
    margin: 0
    white-space: nowrap

    &--underline
      white-space: nowrap
      text-decoration: underline
      text-decoration-color: $color-blue-16
      text-underline-offset: 7px
      color: $color-blue-100
      margin-left: 0.5em

      @media (max-width: 450px)
        margin-left: initial

  &-arrow
    height: 26px

    svg
      height: 26px
      width: 26px
</style>
