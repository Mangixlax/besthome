<template lang="pug">
  section(:class="$style['catalog-cards']")
    div(:class="$style['catalog-cards__container']")
      catalog-card-item(
        v-for="(card,i) in projectCatalogInfo"
        :key="i"
        :card="card"
      )
</template>

<script>
import TypoText from '~/components/Base/TypoText.vue'
import CatalogCardItem from '~/components/Catalog/CatalogCardItem.vue'

export default {
  name: 'CatalogCards',
  components: { TypoText, CatalogCardItem },
  props: {
    projectCatalogInfo: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="sass" module>
.catalog-cards
  width: 100%

  &__container
    width: 100%
    grid-gap: 0px
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(330px, 1fr))
    justify-items: center
    justify-content: center

    & > div
      border-top: 1px solid $color-black-4
      border-right: 1px solid $color-black-4

      @media (min-width: 1455px)
        &:nth-child(3n+3)
          border-right: none

      @media (max-width: 1454px)
        &:nth-child(even)
          border-right: none

      @media (max-width: 1124px)
         border-right: none
</style>
