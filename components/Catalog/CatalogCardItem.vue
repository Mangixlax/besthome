<template lang="pug">
  div(:class="$style['catalog-card']")
    div(
      :class="$style['catalog-card__header']"
    )
      div(:class="$style['catalog-card__header-status']")
        typo-text(
          tag="p"
          version="style-10"
        ) {{ card.status }}
      div(:class="$style['catalog-card__header-area']")
        typo-text(
          tag="p"
          version="style-6"
        ) {{ card.area }}
        typo-text(
          tag="p"
          version="style-6"
        ) m²
    div(:class="$style['catalog-card__image']")
      img(
        :src="require(`@/assets/images/catalog/${card.image}`)"
        :class="$style['catalog-card__image-img']"
      )
    div(:class="$style['catalog-card__footer']")
      div(:class="$style['catalog-card__footer-price']")
        typo-text(
          tag="nuxt-link"
          version="style-5"
            :to="localePath({\
            name: 'company-our-team-id',\
            params: {\
              id: card.id\
            }\
          })"
          :class="$style['catalog-card__footer-price-value']"
        ) {{ card.price }}
        typo-text(
          tag="p"
          version="style-7"
          :class="$style['catalog-card__footer-price-category']"
        ) €
      div(:class="$style['catalog-card__footer-info']")
        div(:class="$style['catalog-card__footer-item']")
          typo-text(
            tag="p"
            version="style-7"
            :class="$style['catalog-card__footer-item-category']"
          ) Block
          typo-text(
            tag="p"
            version="style-5"
            :class="$style['catalog-card__footer-item-value']"
          ) {{ card.block }}
        div(:class="$style['catalog-card__footer-item']")
          typo-text(
            tag="p"
            version="style-7"
            :class="$style['catalog-card__footer-item-category']"
          ) Floor
          typo-text(
            tag="p"
            version="style-5"
            :class="$style['catalog-card__footer-item-value']"
          ) {{ card.floor }}
        div(:class="$style['catalog-card__footer-item']")
          typo-text(
            tag="p"
            version="style-7"
            :class="$style['catalog-card__footer-item-category']"
          ) Room
          typo-text(
            tag="p"
            version="style-5"
            :class="$style['catalog-card__footer-item-value']"
          ) {{ card.room }}
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({ components: { TypoText } })
export default class CatalogCardItem extends Vue {
  @Prop({ type: Object, default: () => ({}) }) card!: any
}
</script>

<style lang="sass" module>
.catalog-card
  display: flex
  min-width: 287px
  width: 100%
  height: 551px
  flex-direction: column
  padding: 32px
  position: relative

  &:hover
    background-color: $color-blue-4

  &:hover &__header-area
    color: $color-blue-100

  &:hover &__footer-item-value
    color: $color-blue-100

  &:hover &__footer-price-value
    color: $color-blue-100

  &:hover &__footer-price-category
    color: $color-blue-100

  &__header
    display: flex
    justify-content: space-between
    margin-bottom: 24px

    &-status
      background-color: $color-black-100
      color: $color-white-100
      padding: 6px 12px

    &-area
      display: flex

  &__image
    width: 250px
    height: 3231px

  &__footer

    &-price
      display: flex
      grid-gap: 2px

      &-value
        text-decoration: none
        color: $color-black-100

        &::after
          content: ""
          position: absolute
          top: 0
          right: 0
          bottom: 0
          left: 0

    &-info
      display: flex

    &-item
      display: flex
      margin-right: 16px
      align-items: center

      &-category
        color: $color-black-72
        margin-right: 6px

  p
    margin-top: 0
    margin-bottom: 0
</style>
