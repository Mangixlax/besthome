<template lang="pug">
  div(:class="$style['filter-checkbox']")
    div(:class="$style['filter-checkbox__title']")
      typo-text(
        tag="p"
        version="style-7"
        :class="$style['filter-checkbox__title-text']"
      ) {{ title }}
    ul(:class="$style['filter-checkbox__grid']")
      li(
        v-for="(item,i) in filterItems"
        :key="i"
        :class="$style['filter-checkbox__grid-item']"
      )
        label(:class="$style['filter-checkbox__grid-label']")
          input(
            :name="item.label"
            :value="item.value"
            type="checkbox"
            :class="$style['filter-checkbox__grid-checkbox']"
            v-model="selectedItems"
          )
          typo-text(
            tag="p"
            version="style-8"
            :class="$style['filter-checkbox__grid-text']"
          ) {{ item.label }}
</template>

<script>
import TypoText from '~/components/Base/TypoText.vue'
import CatalogFilterRange from '~/components/Catalog/Filter/CatalogFilterRange'

export default {
  name: 'PageProjectsFilterList',
  components: {
    TypoText,
    CatalogFilterRange,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    filterItems: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedItems: [],
    }
  },
  watch: {
    selectedItems: function () {
      this.$emit('change', this.selectedItems)
    },
  },
}
</script>

<style lang="sass" module>
.filter-checkbox
  display: flex
  flex-direction: column
  min-height: 98px
  grid-gap: 16px

  &__title
    color: $color-white-100

  &__grid
    list-style: none
    padding: 0
    margin: 0
    display: flex
    flex-direction: column
    justify-content: center
    grid-gap: 16px
    flex-wrap: wrap

    &-item
      color: $color-white-56
      transition: color 0.25s ease

      &.selected
        background-color: $color-white-100
        color: $color-blue-100

      &:hover
        color: $color-white-100

    &-label
      display: flex
      align-items: center
      grid-gap: 16px
      cursor: pointer

    &-checkbox
      position: absolute
      z-index: -1
      opacity: 0

      &:checked+p::before
        border-color: #0b76ef
        background-color: #0b76ef
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e")

    &-text
      display: inline-flex
      align-items: center
      user-select: none
      grid-gap: 16px
      margin: 0

      &::before
        content: ''
        display: inline-block
        width: 14px
        height: 14px
        flex-shrink: 0
        flex-grow: 0
        background-repeat: no-repeat
        background-position: center center
        background-size: 50% 50%
        background-color: $color-white-24
</style>
