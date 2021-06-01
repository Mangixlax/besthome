<template lang="pug">
  section(:class="$style['accordions']")
    div(:class="$style['accordions__container']")
      common-accordion-item(
        v-for="(accordion, i) in accordionsData"
        :key="i"
        :title="accordion.title" 
        :active="accordion.is_active"
      ) 
        div(v-html="accordion.content")
</template>

<script lang="ts">
import CommonAccordionItem from '~/components/Common/CommonAccordionItem.vue'
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'BaseAccordions',
  components: { CommonAccordionItem, TypoText },
  props: {
    accordionsData: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="sass" module>
.accordions
  background: $color-black-100

  &__container
    max-width: 928px
    margin: 0 auto
    padding: 120px 32px 64px 32px

    @media (max-width: 900px)
      padding: 64px 32px 32px 32px

    &-text
      color: $color-white-88

.list
  list-style: none
  padding: 0
  color: $color-white-100

  &__item
    margin: 0
    display: flex
    align-items: center

    &::before
        content: ""
        min-height: 8px
        min-width: 8px
        border-radius: 4px
        margin-right: 44px
        display: inline-block
        background-color: $color-white-100

    &-text
      margin: 0
</style>
