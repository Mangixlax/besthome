<template lang="pug">
  section(:class="$style['project-navigation']")
    div(
      :class="$style['project-navigation__container']"
    )
      div(:class="$style['project-navigation__title']")
        typo-text(
          tag="h3"
          version="style-4"
          :class="$style['project-navigation__title-text']"
        ) Cleopatra Select
      div(:class="$style['project-navigation__navbar']")
        ul(:class="$style['project-navigation__navbar-list']")
          li(
            :class="$style['project-navigation__navbar-item']"
          )
            typo-text(
              tag="nuxt-link"
              :to="`/`"
              version="style-7"
              :class="$style['project-navigation__navbar-link']"
            ) Review
          li(
            :class="$style['project-navigation__navbar-item']"
          )
            typo-text(
              tag="nuxt-link"
              version="style-7"
              :to="`/`"
              :class="$style['project-navigation__navbar-link']"
            ) About
          li(:class="$style['project-navigation__navbar-item']"
          )
            typo-text(
              tag="nuxt-link"
              :to="`/`"
              version="style-7"
              :class="$style['project-navigation__navbar-link--active']"
            ) Experiences
          li(
            :class="$style['project-navigation__navbar-item']"
          )
            typo-text(
              tag="nuxt-link"
              :to="`/`"
              version="style-7"
              :class="$style['project-navigation__navbar-link']"
            ) Choose apartment
        button(
          type="submit"
          id="submit"
          :class="$style['project-navigation__navbar-submit']"  
        ) Get a consultation
        button(
          type="submit"
          id="submit"
          :class="$style['project-navigation__navbar-submit--mobile']"  
        ) Consultation
</template>

<script lang="ts" scoped>
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'BaseProjectNavigation',
  components: { TypoText },
}
</script>

<style lang="sass" module>
.project-navigation
  width: 100%

  &__container
    display: flex
    align-items: center
    justify-content: space-between
    max-width: 1296px
    padding: 8px 24px
    margin: 0 auto

  &__navbar
    display: flex
    padding: 32px 0px 32px 8px

    &-list
      list-style: none
      display: flex
      margin-left: 8px

      @media (max-width: 900px)
        display: none

    &-item
      margin-right: 24px

    &-link
      text-decoration: none
      color: $color-black-100

      &--active
        text-decoration: none
        color: $color-black-40

    &-submit
      width: 170px
      height: 48px
      border: none
      background-color: $color-blue-100
      color: $color-white-88
      +style-7

      @media (max-width: 600px)
        display: none

      &--mobile
        width: 102px
        height: 32px
        border: none
        background-color: $color-blue-100
        color: $color-white-88
        +style-7

        @media (min-width: 600px)
          display: none
</style>
