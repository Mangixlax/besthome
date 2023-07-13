<template lang="pug">
  section(:class="$style['purchase']")
    div(:class="$style['purchase__container']")
      div(
        v-for="(card, i) in $t('pages.service_online_purchase.cards')"
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
      div(:class="$style['purchase__conclusion']")
        typo-text(
          v-for="(paragraph, i) in $t('pages.service_online_purchase.conclusion')"
          :key="i"
          tag="p"
          version="style-5"
          :class="$style['purchase__conclusion-text']"
        ) {{ paragraph }}
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: { TypoText },
})
export default class PageServicePurchase extends Vue {}
</script>

<style lang="sass" module>
.purchase
  width: 100%

  &__container
    display: flex
    flex-direction: column
    align-items: flex-start
    max-width: 1040px
    padding: 80px 24px
    margin: 0 auto

    @media (max-width: 800px)
      padding: 40px 24px

    &-title
      margin: 0 0 32px

    &-text
      margin: 0 0 80px

      @media (max-width: 800px)
        margin: 0 0 40px

  &__conclusion
    max-width: 864px
    margin: 198px auto 0

    @media (max-width: 800px)
      margin: 40px auto 0

.card
  padding: 32px

  &-title
    color: $color-blue-100
    margin: 0 0 33px
    position: relative

    &::after
      content: ""
      position: absolute
      bottom: -16px
      left: 0
      right: 0
      height: 1px
      background-color: $color-blue-16

  &-text
    margin: 0

  &.card-0
    border: 1px solid $color-blue-16

  &.card-1
    background: $color-blue-4

  &.card-2
    background: $color-blue-8

  &.card-3
    background: $color-blue-16

  &.card-4
    background: $color-blue-24
</style>
