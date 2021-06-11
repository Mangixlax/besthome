<template lang="pug">
  section(:class="$style['catalog-list']")
    div(:class="$style['catalog-list__container']")
      ul(:class="$style['catalog-list__container-list']")
        li(:class="$style['catalog-list__container-label']")
          typo-text(
            tag="p"
            version="style-7"
          ) {{ $t('pages.apartments.status') }}
        li(:class="$style['catalog-list__container-label']")
          typo-text(
            tag="p"
            version="style-7"
          ) {{ $t('pages.apartments.block') }}
        li(:class="$style['catalog-list__container-label']")
          typo-text(
            tag="p"
            version="style-7"
          ) {{ $t('pages.apartments.floor') }}
        li(:class="$style['catalog-list__container-label']")
          typo-text(
            tag="p"
            version="style-7"
          ) {{ $t('pages.apartments.rooms') }}
        li(:class="$style['catalog-list__container-label']")
          typo-text(
            tag="p"
            version="style-7"
          ) {{ $t('pages.apartments.area') }}
        li(:class="$style['catalog-list__container-label']")
          typo-text(
            tag="p"
            version="style-7"
          ) {{ $t('pages.apartments.price') }}
      catalog-list-item(
        v-for="(list,i) in projectCatalogInfo"
        :key="i"
        :list="list"
      )
    div(:class="$style['catalog-list__empty']") {{ $t('pages.apartments.empty_list') }}
</template>

<script>
import TypoText from '~/components/Base/TypoText.vue'
import CatalogListItem from '~/components/Catalog/CatalogListItem.vue'

export default {
  name: 'CatalogList',
  components: { TypoText, CatalogListItem },
  props: {
    projectCatalogInfo: {
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
