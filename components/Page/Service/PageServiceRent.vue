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
  components: { TypoText },
  data() {
    return {
      allAboutRent: {
        title: 'All about rent',
        text: [
          'Renting apartments and apartments in Alanya is an opportunity to provide a stable income in foreign currency.',
          'The complexes of BestHome Construction company are located only in the central areas of the city of Alanya, near the sea, have a developed infrastructure and innovative design. Thanks to these features, the properties from BestHome Construction are ideal for both long-term and short-term rentals.',
          'Regardless of whether you have purchased an apartment for a rental business or for a holiday, and want to rent your apartment only during the period when it is free, our partner company will be happy to provide all services related to the rental of your property:',
        ],
        cards: [
          'Professional photo and video shooting of your apartments',
          'Search for customers & accommodation of tenants in apartments, signing of the lease agreement',
          'Reception of apartments at the departure of tenants',
          'Ordering apartment cleaning',
        ],
      },
    }
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
