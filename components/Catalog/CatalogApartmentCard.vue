<template lang="pug">
  div(:class="$style['card']")
    typo-text(
      version="style-7"
      tag="div"
      :class="$style['card__id']"
    ) {{ $t('pages.apartments.apartment') }} {{ card.block.name }}.{{ getFloor }}.{{ getRoom }}
    typo-text(
      version="style-2"
      tag="div"
      :class="$style['card__area']"
    ) {{ getArea }}{{ $t('pages.apartments.m') }}
      typo-text(
        version="style-4"
        tag="sup"
      ) 2
    div(:class="$style['card__line']")
      div(:class="$style['card__line-key']") {{ $t('pages.apartments.status') }}
      div(:class="$style['card__line-value']") {{ $t('pages.apartments.status_' + card.status) }}
    div(:class="$style['card__line']")
      div(:class="$style['card__line-key']") {{ $t('pages.apartments.floor') }}
      div(:class="$style['card__line-value']") {{ card.floor.number }} of {{ card.total_floors }}
    div(:class="$style['card__line']")
      div(:class="$style['card__line-key']") {{ $t('pages.apartments.block') }}
      div(:class="$style['card__line-value']") {{ card.block.name }}
    div(:class="$style['card__line']")
      div(:class="$style['card__line-key']") {{ $t('pages.apartments.rooms') }}
      div(:class="$style['card__line-value']") {{ card.room.number }}{{ card.room.ad_number ? `+${card.room.ad_number}` : ''}}
    div(:class="[$style['card__line'], $style['price']]")
      div(:class="$style['card__line-key']") {{ $t('pages.apartments.price') }}
      div(:class="$style['card__line-value']")
        | {{ card.price.toLocaleString('ru') }}
        span €
    div(:class="$style['card__request']" @click="showGetCallback") {{ $t('pages.apartments.request_now') }}
    //div(:class="$style['card__pdf']")
    //  span {{ $t('pages.apartments.download_pdf') }}
    //  svg-icon(name="link-arrow-blue")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import TypoText from '~/components/Base/TypoText.vue'
import { IProjectApartment } from '~/store/Catalog'
import { modalsTriggerMixin } from '~/mixins/modals'
@Component({
  components: { TypoText },
  mixins: [modalsTriggerMixin],
})
export default class CatalogApartmentCard extends Vue {
  @Prop({ type: Object, required: true }) card!: IProjectApartment

  get getArea(): string {
    return (this.card.area || '').replace(/\.00.*/gm, '')
  }

  get getFloor(): string | number {
    if (this.card.floor.number > 9) return this.card.floor.number
    return '0' + this.card.floor.number
  }

  get getRoom(): string | number {
    if (this.card.room.number > 9) return this.card.room.number
    return '0' + this.card.room.number
  }

  public showGetCallback() {
    this.$router.push(this.localePath({ name: 'feedback' }))
  }
}
</script>

<style lang="sass" module>
.card
  display: flex
  flex-direction: column
  padding: 64px

  @media (max-width: 700px)
    padding: 24px

  &__id
    margin-left: 8px

  &__area
    margin-left: 8px
    margin-top: 10px
    margin-bottom: 24px

  &__line
    padding: 14px 0
    display: flex
    justify-content: space-between
    align-items: center

    & + &
      border-top: 1px solid $color-black-4

    &-key, &-value
      +style-6

    &-key
      color: $color-black-64

    &-value
      color: $color-black-100

      .price &
        color: $color-blue-100
        +style-5

        span
          +style-8
          position: relative
          top: -3px
          margin-left: 3px

  &__request
    background-color: $color-blue-100
    padding: 16px 32px
    display: flex
    align-items: center
    justify-content: center
    +style-6
    color: $color-white-100
    margin-bottom: 40px
    margin-top: 6px
    cursor: pointer

  &__pdf
    display: flex
    align-items: center
    justify-content: center
    padding: 16px 32px
    color: $color-blue-100
    cursor: pointer

    span
      text-decoration: underline
      text-decoration-color: $color-blue-16
      text-underline-offset: 7px

    svg
      width: 32px
      height: 32px
</style>
