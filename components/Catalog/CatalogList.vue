<template lang="pug">
  section(:class="$style['catalog-list']")
    div(:class="$style['catalog-list__container']")
      div(:class="$style['catalog-list__container-list']")
        typo-text(
          tag="div"
          version="style-7"
          :class="$style['catalog-list__container-label']"
        ) {{ $t('pages.apartments.status') }}
        typo-text(
          tag="div"
          version="style-7"
          :class="$style['catalog-list__container-label']"
        ) {{ $t('pages.apartments.block') }}
        typo-text(
          tag="div"
          version="style-7"
          :class="$style['catalog-list__container-label']"
        ) {{ $t('pages.apartments.floor') }}
        typo-text(
          tag="div"
          version="style-7"
          :class="$style['catalog-list__container-label']"
        ) {{ $t('pages.apartments.rooms') }}
        typo-text(
          tag="div"
          version="style-7"
          :class="$style['catalog-list__container-label']"
        ) {{ $t('pages.apartments.area') }}
        typo-text(
          tag="div"
          version="style-7"
          :class="$style['catalog-list__container-label']"
        ) {{ $t('pages.apartments.price') }}
      catalog-list-item(
        v-for="(itemData, key) in list"
        :key="key"
        :item-data="itemData"
      )
    div(
      v-if="!list.length"
      :class="$style['catalog-list__empty']"
    ) {{ $t('pages.apartments.empty_list') }}
</template>

<script>
import TypoText from '~/components/Base/TypoText.vue'
import CatalogListItem from '~/components/Catalog/CatalogListItem.vue'

export default {
  name: 'CatalogList',
  components: { TypoText, CatalogListItem },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="sass" module>
.catalog-list
  width: 100%

  &__container
    max-width: 992px

    &-list
      list-style: none
      display: grid
      padding: 8px
      margin: 0
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr
      border-top: solid 1px $color-black-4

  &__empty
    display: flex
    align-items: center
    justify-content: center
    +style-4
    margin: 100px 0
</style>
