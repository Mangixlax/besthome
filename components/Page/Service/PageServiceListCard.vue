<template lang="pug">
  section(:class="$style['list-card']")
    div(:class="$style['list-card__container']")
      div(:class="$style['list-card__header']")
        typo-text(
          tag="h4"
          version="style-4"
          :class="$style['list-card__header-title']"
        ) {{ listCardData.header.title }}
        typo-text(
          v-for="(paragraph, i) in listCardData.header.text"
          :key="`text_${i}`"
          tag="p"
          version="style-5"
          :class="$style['list-card__header-text']"
        ) {{ paragraph }}
        typo-text(
          v-for="(paragraph, i) in listCardData.header.subtext"
          :key="`subtext_${i}`"
          tag="p"
          version="style-5"
          :class="$style['list-card__header-text']"
        ) {{ paragraph }}
      ul(:class="$style['list']")
        li(
          v-for="(item, i) in listCardData.list"
          :key="`list_${i}`"
          :class="$style['list__item']"
        )
          typo-text(   
              tag="p"
              version="style-6"
              :class="$style['list__item-text']"
            ) {{ item }}
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'PageServiceListCard',
  components: { TypoText },
  props: {
    listCardData: Object,
    default: () => {},
  },
}
</script>

<style lang="sass" module>
.list-card
  width: 100%

  &__container
    display: flex
    max-width: 912px
    padding: 80px 24px
    margin: 0 auto

    @media (max-width: 900px)
      flex-direction: column
      align-items: center
      padding: 40px 24px

  &__header
    max-width: 416px
    padding-right: 40px
    margin-bottom: 24px

    @media (max-width: 900px)
      padding-right: initial
      
    &-title
      margin: 0
      max-width: 300px

    &-text
      margin: 0
      margin-top: 16px

.list
  list-style: none
  max-width: 416px
  padding: 0

  &__item
    margin: 0
    margin-bottom: 26px
    display: flex
    align-items: center

    &::before
        content: ""
        min-height: 8px
        min-width: 8px
        border-radius: 4px
        margin-right: 44px
        display: inline-block
        background-color: $color-blue-100

    &-text
      margin: 0
</style>
