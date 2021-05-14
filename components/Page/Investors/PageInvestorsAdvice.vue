<template lang="pug">
  section(:class="$style['advice']")
    div(:class="$style['advice__container']")
      typo-text(
        v-for="(paragraph, i) in investorsPageAdvice.intoduction"
        :key="i"
        tag="p"
        version="style-6"
        :class="$style['advice__container-text']"
      ) {{ paragraph }}
      typo-text(
        tag="h2"
        version="style-2"
        :class="$style['advice__container-title']"
      ) {{ investorsPageAdvice.title }}
      div(:class="$style['cards']")
        section(
          v-for="(card, i) in investorsPageAdvice.cards"
          :key="i"
          :class="[$style['card'], $style[`card-${i}`]]"
        )
          typo-text(
            tag="h2"
            version="style-4"
            :class="$style['card-title']"
          ) {{ card.title }}
          typo-text(
            tag="p"
            version="style-6"
            :class="$style['card-text']"
          ) {{ card.text }}
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'PageInvestorsTitle',
  components: { TypoText },
  props: {
    investorsPageAdvice: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="sass" module>
.advice
  width: 100%

  &__container
    display: flex
    flex-direction: column
    max-width: 1040px
    padding: 80px 24px
    margin: 0 auto

    @media (max-width: 1200px)
      padding: 40px 24px

    @media (max-width: 900px)
      padding: 32px 24px

    &-title
      margin: 0
      margin-bottom: 40px
      max-width: 700px

    &-text
      margin:0
      margin-bottom: 16px

.cards
  display: flex

  @media (max-width: 900px)
    display: grid
    grid-template-columns: 1fr 1fr

  @media (max-width: 600px)
    display: grid
    grid-template-columns: 1fr

.card
  padding: 32px
  height: 474px
  max-width: 248px

  @media (max-width: 900px)
    max-width: 100%

  &-title
    color: $color-blue-100
    margin: 0
    margin-bottom: 16px
    position: relative

  &-text
    margin: 0

  &.card-0
    border: 1px solid  $color-blue-16

  &.card-1
    background: $color-blue-4

  &.card-2
    background: $color-blue-8

  &.card-3
    background: $color-blue-16

  &.card-4
    background: $color-blue-24
</style>
