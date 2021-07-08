<template lang="pug">
  div(:class="$style['filter']")
    catalog-filter-block(
      v-if="hasBlocksFilter"
      :dark-mode="filterDarkMode"
      :title="$t('catalog.block')"
      :filter-items="filterBlocksData"
    )
    catalog-filter-block(
      v-if="hasRoomsFilter"
      :dark-mode="filterDarkMode"
      :title="$t('catalog.rooms')"
      :filter-items="filterRoomsData"
      @change="onChangeRooms"
    )
    catalog-filter-range(
      v-if="hasFloorsFilter"
      :dark-mode="filterDarkMode"
      :minRangeValue="filterFloorsData.min"
      :maxRangeValue="filterFloorsData.max"
      :startMinValue="filterFloorsData.min"
      :startMaxValue="filterFloorsData.max"
      :interval="1"
      :move-adjacent-point="1"
      :title="$t('catalog.floor')"
      @change="onChangeFloors"
    )
    catalog-filter-range(
      v-if="hasPriceFilter"
      :dark-mode="filterDarkMode"
      dimension="€"
      :minRangeValue="filterPriceData.min"
      :maxRangeValue="filterPriceData.max"
      :startMinValue="filterPriceData.min"
      :startMaxValue="filterPriceData.max"
      :interval="100"
      :move-adjacent-point="1000"
      :title="$t('catalog.price')"
      @change="onChangePrice"
    )
    catalog-filter-range(
      v-if="hasAreaFilter"
      :dark-mode="filterDarkMode"
      :dimension="$t('catalog.dimension')"
      :minRangeValue="filterAreaData.min"
      :maxRangeValue="filterAreaData.max"
      :startMinValue="filterAreaData.min"
      :startMaxValue="filterAreaData.max"
      :interval="1"
      :move-adjacent-point="50"
      :title="$t('catalog.area')"
      @change="onChangeArea"
    )
    //catalog-filter-checkbox(
    //  title="ADVANTAGES"
    //  :filter-items="checkboxFilterItems"
    //)
    div(:class="$style['filter-button']")
      | {{ $t('modals.mobile_filter') }}
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import CatalogFilterBlock from '~/components/Catalog/Filter/CatalogFilterBlock.vue'
import CatalogFilterRange from '~/components/Catalog/Filter/CatalogFilterRange.vue'
import CatalogFilterCheckbox from '~/components/Catalog/Filter/CatalogFilterCheckbox.vue'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { IProjectApartmentsFilter } from '~/store/Catalog'

@Component({
  components: {
    TypoText,
    CatalogFilterBlock,
    CatalogFilterRange,
    CatalogFilterCheckbox,
  },
})
export default class CatalogFilterList extends Vue {
  @Prop({ type: Boolean, default: false }) filterDarkMode?: boolean

  get filters(): IProjectApartmentsFilter {
    return this.$store.getters['Catalog/getFilters'] || {}
  }

  get filterRoomsData(): any {
    const rooms = this.filters.rooms || []

    if (rooms.length) {
      return rooms.map((room: { id: number; number: number; ad_number?: number }) => ({
        value: room.id,
        label: room.number,
        sublabel: room.ad_number ? `+${room.ad_number}` : null,
      }))
    }

    return []
  }

  get hasRoomsFilter(): boolean {
    return this.filterRoomsData.length > 0
  }

  get filterBlocksData(): any {
    return (this.filters.blocks || []).map((block: { id: number; name: string }) => ({
      value: block.id,
      label: block.name,
    }))
  }

  get hasBlocksFilter(): boolean {
    return this.filterBlocksData.length > 0
  }

  get filterFloorsData(): { min: number; max: number } {
    return this.filters.floors || { min: 0, max: 0 }
  }

  get hasFloorsFilter(): boolean {
    return this.filterFloorsData.min !== this.filterFloorsData.max
  }

  get filterPriceData(): { min: number; max: number } {
    const price = this.filters.price || { min: 0, max: 0 }

    return {
      min: Math.floor(price.min / 100) * 100,
      max: Math.ceil(price.max / 100) * 100,
    }
  }

  get hasPriceFilter(): boolean {
    return this.filterPriceData.min !== this.filterPriceData.max
  }

  get filterAreaData(): { min: number; max: number } {
    const area = this.filters.area || { min: 0, max: 0 }

    return {
      min: Math.floor(parseFloat(area.min as string) / 100) * 100,
      max: Math.ceil(parseFloat(area.max as string) / 100) * 100,
    }
  }

  get hasAreaFilter(): boolean {
    return this.filterAreaData.min !== this.filterAreaData.max
  }

  public async onChangeFloors(values: any) {
    this.$store.commit('Catalog/setSelectedFilter', {
      key: 'floors',
      value: [...values],
    })

    await this.$store.dispatch('Catalog/fetchApartments')
  }

  public async onChangeRooms(values: any) {
    this.$store.commit('Catalog/setSelectedFilter', {
      key: 'rooms',
      value: [...values],
    })

    await this.$store.dispatch('Catalog/fetchApartments')
  }

  public async onChangePrice(values: any) {
    this.$store.commit('Catalog/setSelectedFilter', {
      key: 'price',
      value: [...values],
    })

    await this.$store.dispatch('Catalog/fetchApartments')
  }

  public async onChangeArea(values: any) {
    this.$store.commit('Catalog/setSelectedFilter', {
      key: 'area',
      value: [...values],
    })

    await this.$store.dispatch('Catalog/fetchApartments')
  }
}
</script>

<style lang="sass" module>
.filter
  display: flex
  flex-direction: column
  min-height: 100%
  padding: 32px
  grid-gap: 40px
  
  &-button
    +style-5
    padding: 5px 24px
    border: none
    cursor: pointer
    background: $color-white-100
    width: fit-content
    align-self: flex-end
    
    @media (min-width: 1000px)
      display: none
</style>
