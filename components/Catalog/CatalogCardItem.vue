<template lang="pug">
  nuxt-link(
    :class="$style['catalog-card']"
    :to="localePath({\
      name: 'properties-slug-apartments-id',\
      params: {\
        slug: $route.params.slug,\
        id: itemData.id\
      }\
    })"
  )
    div(:class="$style['catalog-card__header']")
      typo-text(
        tag="div"
        version="style-10"
        :class="{\
          [$style['catalog-card__header-status']]: true,\
          [$style['catalog-card__header-status--available']]: itemData.status === 1,\
        }"
      ) {{ $t('pages.apartments.status_' + itemData.status) }}
      typo-text(
        tag="div"
        version="style-6"
        :class="$style['catalog-card__header-area']"
      ) {{ getArea }}m
        typo-text(
          tag="span"
          version="style-9"
        ) 2
    div(:class="$style['catalog-card__image']")
      img(
        v-if="itemData.planning"
        :src="itemData.planning"
        loading="lazy"
        :class="$style['catalog-card__image-img']"
      )
    div(:class="$style['catalog-card__footer']")
      typo-text(
        tag="div"
        version="style-5"
        :class="$style['catalog-card__footer-price']"
      ) {{ itemData.price.toLocaleString('ru') }}
        typo-text(
          tag="span"
          version="style-8"
        ) €
      div(:class="$style['catalog-card__footer-info']")
        div(:class="$style['catalog-card__footer-item']")
          typo-text(
            tag="div"
            version="style-7"
            :class="$style['catalog-card__footer-item-category']"
          ) {{ $t('pages.apartments.block') }}
          typo-text(
            tag="div"
            version="style-5"
            :class="$style['catalog-card__footer-item-value']"
          ) {{ itemData.block.name }}
        div(:class="$style['catalog-card__footer-item']")
          typo-text(
            tag="div"
            version="style-7"
            :class="$style['catalog-card__footer-item-category']"
          ) {{ $t('pages.apartments.floor') }}
          typo-text(
            tag="div"
            version="style-5"
            :class="$style['catalog-card__footer-item-value']"
          ) {{ itemData.floor.number }}
        div(:class="$style['catalog-card__footer-item']")
          typo-text(
            tag="div"
            version="style-7"
            :class="$style['catalog-card__footer-item-category']"
          ) {{ $t('pages.apartments.rooms') }}
          typo-text(
            tag="div"
            version="style-5"
            :class="$style['catalog-card__footer-item-value']"
          ) {{ itemData.room.number }}
            typo-text(version="style-7" tag="sup")
              | {{ itemData.room.ad_number ? `+${itemData.room.ad_number}` : ''}}
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({ components: { TypoText } })
export default class CatalogCardItem extends Vue {
  @Prop({ type: Object, default: () => ({}) }) itemData!: any

  get getArea() {
    return (this.itemData.area || '').replace(/\.00.*/gm, '')
  }
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
  text-decoration: none
  color: inherit

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
      text-transform: uppercase
      letter-spacing: 0.24em

      &--available
        background-color: $color-blue-72

    &-area
      display: flex

  &__image
    width: 100%
    height: 339px
    padding: 8px
    display: flex
    align-items: center
    justify-content: center

    img
      object-fit: cover
      max-height: 100%
      max-width: 100%

  &__footer
    margin-top: auto

    &-price
      display: flex
      grid-gap: 2px

      &-value
        text-decoration: none
        color: $color-black-100

    &-info
      display: flex
      margin-top: 8px

    &-item
      display: flex
      align-items: center

      & +&
        margin-left: 16px

      &-category
        color: $color-black-72
        margin-right: 6px
</style>
