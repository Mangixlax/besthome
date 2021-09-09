<template lang="pug">
  section(:class="$style['catalog-cards']")
    div(:class="$style['catalog-cards__container']")
      catalog-card-item(
        v-for="(itemData, key) in list"
        :key="key"
        :item-data="itemData"
      )
    div(
      v-if="!(list || []).length"
      :class="$style['catalog-cards__empty']"
    ) {{ $t('pages.apartments.empty_list.text') }}
      span(
        @click="goToFeedback"
        :class="$style['catalog-cards__empty-link']"
      ) {{ $t('pages.apartments.empty_list.link') }}
      | .
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import CatalogCardItem from '~/components/Catalog/CatalogCardItem.vue'
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({
  components: { TypoText, CatalogCardItem },
})
export default class CatalogCards extends Vue {
  @Prop({ type: Array, default: () => [] }) list?: Array<any>

  public goToFeedback() {
    this.$router.push(this.localePath({ name: 'feedback' }))
  }
}
</script>

<style lang="sass" module>
.catalog-cards
  width: 100%

  &__container
    width: 100%
    grid-gap: 0px
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(330px, 1fr))
    justify-items: center
    justify-content: center

    & > div
      border-top: 1px solid $color-black-4
      border-right: 1px solid $color-black-4

      @media (min-width: 1455px)
        &:nth-child(3n+3)
          border-right: none

      @media (max-width: 1454px)
        &:nth-child(even)
          border-right: none

      @media (max-width: 1124px)
         border-right: none

  &__empty
    align-items: center
    justify-content: center
    flex-direction: row
    flex-wrap: wrap
    +style-4
    margin: 100px 0

    &-link
      cursor: pointer
      color: $color-blue-88
      margin: 0 0.25em
</style>
