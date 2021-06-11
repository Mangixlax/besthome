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
        transition(name="component-fade" mode="out-in")
          component(
            :is="isCardDisplay ? 'CatalogCards' : 'CatalogList'"
            :project-catalog-info="projectCatalogInfo"
          )
      div(:class="$style['catalog__filter']" @click="showFilter")
        typo-text(
          tag="p"
          version="style-6"
          v-if="!isFilterReady"
        ) Filter
        catalog-filter-list(v-if="isFilterReady" :filter-dark-mode="filterDarkMode")
</template>

<script>
import TypoText from '~/components/Base/TypoText.vue'
import CatalogCards from '~/components/Catalog/CatalogCards.vue'
import CatalogList from '~/components/Catalog/CatalogList.vue'
import { modalsTriggerMixin } from '@/mixins/modals'
import Magnetic from '~/directives/magnetic'

export default {
  name: 'CatalogWrapper',
  components: {
    TypoText,
    CatalogCards,
    CatalogList,
    CatalogFilterList: () => import('~/components/Catalog/Filter/CatalogFilterList.vue'),
  },
  directives: {
    // @ts-ignore
    Magnetic,
  },
  mixins: [modalsTriggerMixin],
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
      isFilterReady: false,
    }
  },
  methods: {
    onResize() {
      if (window.innerWidth > 1000) {
        this.isFilterReady = true
      } else {
        this.isFilterReady = false
      }
    },
    showFilter() {
      if (!this.isFilterReady) {
        this.showModal({
          name: 'modal-mobile-filter',
          modal: () => import('~/components/Modal/MobileFilter/ModalMobileFilter.vue'),
          options: {
            width: '100%',
            height: 'auto',
          },
          props: {
            whiteMode: true,
          },
        })
      }
    },
  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
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

  &__filter
    @media (max-width: 1000px)
      display: flex
      align-items: center
      justify-content: center
      color: $color-white-100
      height: 72px
      width: 83px
      position: fixed
      top: 50%
      right: 0
      background: $color-blue-100
</style>
