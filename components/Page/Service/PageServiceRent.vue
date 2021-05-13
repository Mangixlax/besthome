<template lang="pug">
  section(:class="$style['rent']")
    div(:class="$style['rent__container']")
      article(:class="$style['rent__article']")
        typo-text(
          tag="h1"
          version="style-2"
          :class="$style['rent__article-title']"
        ) {{ allAboutRent.title }}
        typo-text(
          v-for="(paragraph, i) in allAboutRent.text"
          :key="i"
          tag="p"
          version="style-6"
          :class="$style['rent__article-text']"
        ) {{ paragraph }}
      div(:class="$style['rent__cards']")
        div(
          v-for="(card, i) in allAboutRent.cards"
          :key="i"
          :class="[$style[`rent__cards-card`], $style[`card-${i}`]]"
        )
          typo-text(
            tag="p"
            version="style-5"
            :class="$style['rent__cards-text']"
        ) {{ card }}
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'pageServiceRent',
  components: { TypoText },
  props: {
    allAboutRent: {
      type: Object,
      default: () => Object,
    },
  },
}
</script>

<style lang="sass" module>
.rent
  width: 100%

  &__container
    max-width: 1040px
    padding: 80px 24px
    margin: 0 auto

  &__article
    margin-bottom: 64px

    &-title
      margin: 0 0 32px

    &-text
      margin: 0

  &__cards
    display: grid
    grid-template-columns: 1fr 1fr 1fr 1fr

    @media (max-width: 900px)
      grid-template-columns: 1fr 1fr

    @media (max-width: 600px)
      grid-template-columns: 1fr

    &-card
      padding: 32px
      height: 280px

      &.card-0
        border: 1px solid  $color-blue-16

      &.card-1
        background: $color-blue-4

      &.card-2
        background: $color-blue-8

      &.card-3
        background: $color-blue-16

    &-text
        margin: 0
</style>
