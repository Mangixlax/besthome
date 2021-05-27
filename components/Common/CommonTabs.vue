<template lang="pug">
  div
    ul(:class="$style['tabs__header']")
      li(
        v-for="(tab, index) in tabs"
        :key="tab.title"
        @click="selectTab(index)"
        :class="[index == selectedIndex && $style['tab__selected']]"
      )
        typo-text(
          tag="p"
          version="style-5"
          :class="$style['footer__link-text']"
        ) {{ tab.title }} 
    slot
</template>

<script>
import TypoText from '~/components/Base/TypoText.vue'

export default {
  components: {
    TypoText,
  },
  props: {
    mode: {
      type: String,
      default: 'light',
    },
  },
  data() {
    return {
      selectedIndex: 0,
      tabs: [],
    }
  },
  created() {
    this.tabs = this.$children
  },
  mounted() {
    this.selectTab(0)
  },
  methods: {
    selectTab(i) {
      this.selectedIndex = i
      this.tabs.forEach((tab, index) => {
        tab.isActive = index === i
      })
    },
  },
}
</script>

<style lang="sass" module>
ul.tabs__header
  display: flex
  list-style: none
  max-width: 911px
  justify-content: space-evenly
  margin: 0 auto
  padding: 0

  @media (max-width: 900px)
    justify-content: space-between
ul.tabs__header > li
  padding: 44px 5px 11px 5px

  @media (max-width: 900px)
    text-align: center
ul.tabs__header > li p
  margin: 0
  cursor: pointer


ul.tabs__header .tab__selected
  color: $color-blue-100
  border-bottom: solid 1px $color-blue-100
</style>
