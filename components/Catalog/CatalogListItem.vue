<template lang="pug">
  div(:class="$style['catalog-list-item__list']")
    div(:class="$style['catalog-list-item__list-item']")
      typo-text(
        tag="div"
        version="style-10"
        :class="{\
          [$style['catalog-list-item__list-status']]: true,\
          [$style['catalog-list-item__list-status--available']]: itemData.status === 1,\
        }"
      ) {{ $t('pages.apartments.status_' + itemData.status) }}
    div(:class="$style['catalog-list-item__list-item']")
      typo-text(
        tag="p"
        version="style-5"
      ) {{ itemData.block.name }}
      typo-text(
        tag="p"
        version="style-7"
        :class="$style['catalog-list-item__list-info']"
      ) {{ $t('pages.apartments.block') }}
    li(:class="$style['catalog-list-item__list-item']")
      typo-text(
        tag="p"
        version="style-5"
      ) {{ itemData.floor.number }}
      typo-text(
        tag="p"
        version="style-7"
        :class="$style['catalog-list-item__list-info']"
      ) {{ $t('pages.apartments.floor') }}
    li(:class="$style['catalog-list-item__list-item']")
      typo-text(
        tag="p"
        version="style-5"
      ) {{ itemData.room.number }}
        typo-text(version="style-7" tag="sup")
          | {{ itemData.room.ad_number ? `+${itemData.room.ad_number}` : ''}}
      typo-text(
        tag="p"
        version="style-7"
        :class="$style['catalog-list-item__list-info']"
      ) {{ $t('pages.apartments.rooms') }}
    li(:class="$style['catalog-list-item__list-item']")
      typo-text(
        tag="p"
        version="style-5"
      ) {{ getArea }}
      typo-text(
        tag="p"
        version="style-5"
      ) m²
    li(:class="[$style['catalog-list-item__list-item'], $style['price']]")
      typo-text(
        tag="p"
        version="style-5"
      ) {{ itemData.price.toLocaleString('ru') }}
      typo-text(
        tag="p"
        version="style-8"
      ) €
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({ components: { TypoText } })
export default class CatalogListItem extends Vue {
  @Prop({ type: Object, default: () => {} }) itemData?: any

  get getArea(): string {
    return (this.itemData.area || '').replace(/\.00.*/gm, '')
  }
}
</script>

<style lang="sass" module>
.catalog-list-item__list
  list-style: none
  display: grid
  padding: 8px
  margin: 0
  grid-template-columns: 125px 1fr 1fr 1fr 1fr 1fr
  border-top: solid 1px $color-black-4
  align-items: center

  &-item
    display: flex
    align-items: center

    &.price
      align-items: start
      grid-gap: 2px

  &-status
    background-color: $color-black-100
    color: $color-white-100
    padding: 6px 12px
    text-transform: uppercase
    white-space: nowrap
    margin-right: 10px

    &--available
      background-color: $color-blue-72

  &-info
    color: $color-black-24
    margin-left: 6px
    text-transform: lowercase

  p
    margin-top: 0
    margin-bottom: 0
</style>
