<template lang="pug">
  ul(:class="$style['catalog-list-item__list']")
    li(:class="$style['catalog-list-item__list-item']")
      div(:class="$style['catalog-list-item__list-status']")
        typo-text(
          tag="p"
          version="style-10"
        ) {{ list.status }}
    li(:class="$style['catalog-list-item__list-item']")
      typo-text(
        tag="p"
        version="style-5"
      ) {{ list.block }}
      typo-text(
        tag="p"
        version="style-7"
        :class="$style['catalog-list-item__list-info']"
      ) block
    li(:class="$style['catalog-list-item__list-item']")
      typo-text(
        tag="p"
        version="style-5"
      ) {{ list.floor }}
      typo-text(
        tag="p"
        version="style-7"
        :class="$style['catalog-list-item__list-info']"
      ) floor
    li(:class="$style['catalog-list-item__list-item']")
      typo-text(
        tag="p"
        version="style-5"
      ) {{ list.rooms }}
      typo-text(
        tag="p"
        version="style-7"
        :class="$style['catalog-list-item__list-info']"
      ) rooms
    li(:class="$style['catalog-list-item__list-item']")
      typo-text(
        tag="p"
        version="style-5"
      ) {{ list.area }}
      typo-text(
        tag="p"
        version="style-5"
      ) m²
    li(:class="[$style['catalog-list-item__list-item'], $style['price']]")
      typo-text(
        tag="p"
        version="style-5"
      ) {{ list.price }}
      typo-text(
        tag="p"
        version="style-8"
      ) €
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'CatalogListItem',
  components: { TypoText },

  props: {
    list: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="sass" module>
.catalog-list-item__list
  list-style: none
  display: grid
  padding: 8px
  margin: 0
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr
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
  
  &-info
    color: $color-black-24
    margin-left: 6px
p
  margin-top: 0
  margin-bottom: 0
</style>
