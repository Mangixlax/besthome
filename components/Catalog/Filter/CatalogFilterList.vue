<template lang="pug">
  div(:class="[$style['filter'], filterDarkMode && $style['dark-mode'] ]")
    catalog-filter-block(
      :dark-mode="filterDarkMode"
      title="BLOCK"
      :filter-items="blockFilterItems"
    )
    catalog-filter-block(
      :dark-mode="filterDarkMode"
      title="NUMBER OF ROOMS"
      :filter-items="roomFilterItems"
    )
    catalog-filter-range(
      :dark-mode="filterDarkMode"
      :rangeFrom="'Floor'"
      :rangeTo="'Floor'"
      :minRangeValue="1"
      :maxRangeValue="10"
      :startMinValue="2"
      :startMaxValue="9"
      :interval="1"
      :rangeMode="true"
      :formatNumberMode="true"
      inputWidth="88"
      :move-adjacent-point="1"
      title="FLOOR"
    )
    catalog-filter-range(
      :dark-mode="filterDarkMode"
      :rangeFrom="'€'"
      :rangeTo="'€'"
      :minRangeValue="1000"
      :maxRangeValue="1000000"
      :startMinValue="15000"
      :startMaxValue="950000"
      :interval="100"
      :rangeMode="true"
      :formatNumberMode="true"
      inputWidth="88"
      :move-adjacent-point="1000"
      title="PRICE"
    )
    catalog-filter-range(
      :dark-mode="filterDarkMode"
      :rangeFrom="'m²'"
      :rangeTo="' m²'"
      :minRangeValue="20"
      :maxRangeValue="500"
      :startMinValue="40"
      :startMaxValue="450"
      :interval="0.5"
      :rangeMode="true"
      :formatNumberMode="true"
      inputWidth="88"
      :move-adjacent-point="50"
      title="AREA"
    )
    catalog-filter-checkbox(
      title="ADVANTAGES "
      :filter-items="checkboxFilterItems"
    )
</template>

<script>
import TypoText from '~/components/Base/TypoText.vue'
import CatalogFilterBlock from '~/components/catalog/Filter/CatalogFilterBlock'
import CatalogFilterRange from '~/components/catalog/Filter/CatalogFilterRange'
import CatalogFilterCheckbox from '~/components/catalog/Filter/CatalogFilterCheckbox'

export default {
  name: 'PageProjectsFilterList',
  components: {
    TypoText,
    CatalogFilterBlock,
    CatalogFilterRange,
    CatalogFilterCheckbox,
  },
  props: {
    filterDarkMode: {
      type: Boolean,
      default: false,
    },
    card: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      blockFilterItems: [
        {
          label: 'A',
          value: 1,
        },
        {
          label: 'B',
          value: 2,
        },
        {
          label: 'C',
          value: 3,
        },
        {
          label: 'D',
          value: 4,
        },
      ],
      roomFilterItems: [
        {
          label: '1',
          value: 1,
        },
        {
          label: '1,5',
          value: 2,
        },
        {
          label: '1',
          value: 4,
          sublabel: '+1'
        },
        {
          label: '2',
          value: 5,
          sublabel: '+1'
        },
        
        {
          label: '3',
          value: 6,
          sublabel: '+1'
        },
        {
          label: '4',
          value: 7,
        },
      ],
      checkboxFilterItems: [
        {
          label: 'Separate toilet',
          value: 1,
        },
        {
          label: 'Closet',
          value: 2,
        },
        {
          label: 'Terrace',
          value: 3,
        },
        {
          label: 'Balcony/loggia',
          value: 4,
        },
      ],
    }
  },
}
</script>

<style lang="sass" module>
.filter
  display: flex
  flex-direction: column
  min-width: 320px
  background: $color-blue-100
  min-height: 100%
  padding: 32px
  grid-gap: 40px

  &.dark-mode
    background: $color-black-96
</style>
