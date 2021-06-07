<template lang="pug">
  div(:class="[$style['filter-block'], darkMode && $style['dark-mode']]")
    div(:class="$style['filter-block__title']")
      typo-text(
        tag="p"
        version="style-7"
        :class="$style['filter-block__title-text']"
      ) {{ title }}
    ul(:class="$style['filter-block__grid']")
      li(
        v-for="(item,i) in filterItems"
        :key="i"
        :class="[$style['filter-block__grid-item'], selectedItems.indexOf(item.value) !== -1 && $style['selected']]"
        @click="addToSelectedItems(item)"
      )
        typo-text(
          tag="p"
          version="style-4"
          :class="$style['filter-block__grid-text']"
        ) {{ item.label }}
        typo-text(
          tag="p"
          version="none"
          :class="$style['filter-block__grid-subtext']"
          v-show="item.sublabel"
        ) {{ item.sublabel }}
</template>

<script>
import TypoText from '~/components/Base/TypoText.vue'
import CatalogFilterRange from '~/components/catalog/Filter/CatalogFilterRange'

export default {
  name: 'PageProjectsFilterList',
  components: {
    TypoText,
    CatalogFilterRange,
  },
  props: {
    darkMode: {
      type: Boolean,
      default: false,
    },
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
  methods: {
    addToSelectedItems(item) {
      const itemIndex = this.selectedItems.indexOf(item.value)
      if (itemIndex === -1) {
        this.selectedItems.push(item.value)
        this.$emit('change', this.selectedItems)
      } else {
        this.$delete(this.selectedItems, itemIndex)
        this.$emit('change', this.selectedItems)
      }
    },
  },
}
</script>

<style lang="sass" module>
.filter-block
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
    display: grid
    grid-template-columns: 1fr 1fr 1fr 1fr
    align-items: center
    justify-items: start
    grid-gap: 10px

    &-item
      display: flex
      border: solid 1px $color-white-4
      padding: 8px
      color: $color-white-56
      cursor: pointer

      &.selected
        background-color: $color-white-100
        color: $color-blue-100

        .dark-mode &
          color: $color-black-96

      &:hover
        background-color: $color-white-100
        color: $color-blue-100

        .dark-mode &
          color: $color-black-96

    &-text
      text-align: center
      margin: 0

    &-subtext
      display: flex
      width: 19px
      height: 30px
      margin: 0
      font-family: Didot
      font-style: normal
      font-weight: bold
      font-size: 16px
      line-height: 30px
      letter-spacing: 0.002em
</style>
