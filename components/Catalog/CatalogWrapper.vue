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
        slot(:is-card-display="isCardDisplay")
        div(:class="{\
          [$style['catalog__content-overlay']]: true,\
          [$style['catalog__content-overlay--show']]: $store.state.Catalog.loading\
        }")
      div(
        :class="[$style['catalog__filter'], filterDarkMode && $style['catalog__filter--dark']]"
        @click="showFilter"
      )
        typo-text(
          v-if="!isFilterReady"
          :class="$style['catalog__filter-button']"
          tag="div"
          version="style-6"
        ) Filter
        catalog-filter-list(v-if="isFilterReady" :filter-dark-mode="filterDarkMode")
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import { modalsTriggerMixin } from '@/mixins/modals'
import Magnetic from '~/directives/magnetic'
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({
  components: {
    TypoText,
    CatalogFilterList: () => import('~/components/Catalog/Filter/CatalogFilterList.vue'),
  },
  directives: {
    // @ts-ignore
    Magnetic,
  },
  mixins: [modalsTriggerMixin],
})
export default class CatalogWrapper extends Vue {
  @Prop({ type: Boolean, default: false }) filterDarkMode?: boolean

  public isCardDisplay: boolean = true
  public isFilterReady: boolean = false

  public onResize() {
    this.isFilterReady = window.innerWidth > 1000
  }

  public showFilter() {
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
  }

  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<style lang="sass" module>
.catalog
  width: 100%
  max-width: 1440px
  margin: 0 auto
  padding: 80px 64px

  @media (max-width: 820px)
    padding: 40px 0

  &__container
    display: flex

  &__content
    width: 100%
    position: relative

    &-overlay
      position: absolute
      left: 0
      right: 0
      top: 0
      bottom: 0
      background-color: $color-white-40
      z-index: 1
      opacity: 0
      pointer-events: none
      transition: opacity 0.25s ease

      &--show
        opacity: 1
        pointer-events: auto

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
    background: $color-blue-100
    min-width: 320px

    &--dark
      background: $color-black-96

    &-button
      display: none

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
      min-width: auto

      &-button
        display: block
</style>
