<template lang="pug">
  section(:class="$style['catalog']")
    div(:class="$style['catalog__container']")
      div(:class="$style['catalog__content']")
        div(:class="$style['catalog__panel']")
          form(
            action="" 
            method="method"
            :class="$style['catalog__panel-form']"
          ) 
            typo-text(
              tag="p"
              version="style-8"
            ) Sort:
            select(
              id="dropdown" 
              name="role" 
              :class="$style['catalog__panel-form-select']"
            )
              option(selected value) Recomended
          div(:class="$style['catalog__panel-display']")
            svg-icon(
              name="catalog/list-icon"
              @click="isCardDisplay = true"
              :class="{\
                [$style['active']]: isCardDisplay\
              }"
              v-magnetic
            )
            svg-icon(
              name="catalog/cards-icon"
              @click="isCardDisplay = false"
              :class="{\
                [$style['active']]: !isCardDisplay\
              }"
              v-magnetic
            )
        component(
          :is="isCardDisplay ? 'CatalogCards' : 'CatalogList'"
          :project-catalog-info="projectCatalogInfo"
        )
      catalog-filter-list(:filter-dark-mode="filterDarkMode")
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import CatalogCards from '~/components/Catalog/CatalogCards.vue'
import CatalogList from '~/components/Catalog/CatalogList.vue'
import CatalogFilterList from '~/components/Catalog/Filter/CatalogFilterList.vue'
import Magnetic from '~/directives/magnetic'

export default {
  name: 'CatalogWrapper',
  components: {
    TypoText,
    CatalogCards,
    CatalogList,
    CatalogFilterList,
  },
  directives: {
    // @ts-ignore
    Magnetic,
  },
  props: {
    filterDarkMode: {
      type: Boolean,
      default: false,
    },
    projectCatalogInfo: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isCardDisplay: true,
    }
  },
}
</script>

<style lang="sass" module>
.catalog
  width: 100%
  max-width: 1440px
  margin: 0 auto
  padding: 80px 64px

  @media (max-width: 820px)
    padding: 40px 32px

  &__container
    display: flex

  &__content
    width: 100%

  &__panel
    display: flex
    justify-content: space-between
    padding: 8px

    &-form
      display: flex
      grid-gap: 8px
      align-items: center

      &-select
        +style-8
        color: $color-blue-100
        height: 34px
        width: 224px
        border: none
        border-bottom: solid 1px $color-blue-16

    &-display
      display: flex
      padding: 16px

      svg
        height: 32px
        width: 32px
        cursor: pointer
        position: relative
        padding: 8px

        &.active
          fill: $color-blue-100
</style>
