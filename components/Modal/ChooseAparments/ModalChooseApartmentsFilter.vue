<template lang="pug">
  div(:class="$style['filter']")
    typo-text(
      tag="h4"
      version="style-4"
      :class="$style['filter__title']"
    )  {{ filterData.title }}
    div(:class="$style['filter__body']")
      div(:class="$style['filter__body-rooms']")
        div(
          v-for="(card, i) in filterData.rooms"
          :key="i"
          :class="[$style['filter__body-rooms-card'], $style[`card-${i}`]]"
          @click="addToSelectedRooms(card)"
        ) {{ card.label }}
      typo-text(
        tag="p"
        version="style-7"
        :class="$style['filter__body-advantages-title']"
      ) ADVANTAGES
      ul(:class="$style['filter__body-advantages']")
        li(
          v-for="(item,i) in filterData.advantages"
          :key="i"
          :class="$style['filter__body-advantages-item']"
        )
          label(:class="$style['filter__body-advantages-label']")
            input(
              :name="item.label"
              :value="item.value"
              type="checkbox"
              :class="$style['filter__body-advantages-checkbox']"
              v-model="selectedAdvantages"
            )
            typo-text(
              tag="p"
              version="style-8"
              :class="$style['filter__body-advantages-text']"
            ) {{ item.label }}
    div(:class="$style['filter__footer']")  
      button(
        :class="$style['filter__footer-prevbutton']"
        @click="setPrevStep"
      )
        svg-icon(
          name="modals/modals-prev"
        )
        | Previos step
      button( 
        :class="$style['filter__footer-nextbutton']"
        @click="setNextStep"
      ) 
        | Go to contact
        svg-icon(
          name="modals/modals-next"
        )
</template>

<script>
import TypoText from '~/components/Base/TypoText.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'ModalChooseApartmentsProject',
  components: {
    Swiper,
    SwiperSlide,
    TypoText,
  },

  data() {
    return {
      selectedRooms: [],
      selectedAdvantages: [],
      filterData: {
        title: 'Choose the parameters your home should fulfill',
        rooms: [
          {
            label: '1 room',
            value: 1,
          },
          {
            label: '2 room',
            value: 2,
          },
          {
            label: '3 room',
            value: 3,
          },
          {
            label: '4+ room',
            value: 4,
          },
        ],
        advantages: [
          {
            label: 'Higher storey with views',
            value: 1,
          },
          {
            label: 'Investment Flat',
            value: 2,
          },
          {
            label: 'Large Balcony and Terrace',
            value: 3,
          },
          {
            label: 'Closet',
            value: 4,
          },
          {
            label: 'Sunny Side',
            value: 5,
          },
          {
            label: 'Front garden',
            value: 6,
          },
          {
            label: 'Balcony/Loggia',
            value: 7,
          },
          {
            label: 'Above Standard Area',
            value: 8,
          },
          {
            label: 'Separate WC',
            value: 9,
          },
          {
            label: 'Balcony/Terrace',
            value: 10,
          },
        ],
      },
    }
  },
  methods: {
    setPrevStep() {
      this.$emit('prevStepInfo', 1)
    },

    setNextStep() {
      this.$emit('nextStepInfo', 3)
    },
    closeModal() {
      console.log(this.$modal)
      this.$modal.hide('modal-choose-apartments')
    },
    addToSelectedRooms(card) {
      const cardIndex = this.selectedRooms.indexOf(card.value)
      if (cardIndex === -1) {
        this.selectedRooms.push(card.value)
        this.$emit('change', this.selectedRooms)
      } else {
        this.$delete(this.selectedRooms, cardIndex)
        this.$emit('change', this.selectedRooms)
      }
    },
  },
}
</script>

<style lang="sass" module>
.filter
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  grid-gap: 32px
  padding: 40px 0
  border-top: solid 1px $color-black-8
  border-bottom: solid 1px $color-black-8

  @media (max-width: 600px)
    padding: 20px 0

  &__title
    margin: 0
    padding: 24px

  &__body
    width: 100%
    max-width: 1040px
    padding: 0 24px
    margin: 0 auto

    &-rooms
      +style-4
      display: grid
      grid-template-columns: 1fr 1fr 1fr 1fr
      margin-bottom: 32px
      justify-content: center
      align-items: center
      justify-items: center

      @media (max-width: 600px)
        grid-template-columns: 1fr 1fr

      @media (max-width: 450px)
        grid-template-columns: 1fr

      &-card
        display: flex
        align-items: center
        text-align: center
        height: 360px
        width: 100%
        justify-content: center
        color: $color-blue-100
        cursor: pointer

        @media (max-width: 600px)
          height: 240px

        @media (max-width: 450px)
          height: 120px

        &.card-0
          border: 1px solid  $color-blue-16

        &.card-1
          background: $color-blue-4

        &.card-2
          background: $color-blue-8

        &.card-3
          background: $color-blue-16


      &-button
        +style-7
        color: $color-white-100
        padding: 8px 24px
        width: fit-content
        background-color: $color-blue-100
        border: none

        &.selected
          background-color: $color-black-100

    &-advantages
      list-style: none
      padding: 0
      margin: 0
      display: grid
      width: 100%
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr
      justify-content: center
      grid-gap: 16px
      flex-wrap: wrap

      @media (max-width: 850px)
        grid-template-columns: 1fr 1fr 1fr

      @media (max-width: 600px)
        grid-template-columns: 1fr 1fr

      @media (max-width: 450px)
        grid-template-columns: 1fr

      &-title
        margin-bottom: 16px

      &-item
        color: $color-black-100
        width: 100%

        &.selected
          background-color: $color-white-100
          color: $color-blue-100

      &-label
        display: flex
        align-items: center
        grid-gap: 16px

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
        white-space: nowrap
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
          background-color: $color-blue-24

  &__footer
    width: 100%
    display: flex
    justify-content: space-between
    padding: 32px

    &-prevbutton
      +style-7
      display: flex
      align-items: center
      color: $color-white-100
      padding: 16px 32px
      width: fit-content
      background-color: $color-blue-100
      border: none
      grid-gap: 12px
      height: 100%
      cursor: pointer

      @media (max-width: 800px)
        padding: 8px 16px
        grid-gap: 0

        svg
          display: none

      svg
        height: 28px
        width: 28px

    &-nextbutton
      +style-7
      display: flex
      align-items: center
      color: $color-white-100
      padding: 16px 32px
      width: fit-content
      background-color: $color-blue-100
      border: none
      grid-gap: 12px
      height: 100%
      cursor: pointer

      @media (max-width: 800px)
        padding: 8px 16px
        grid-gap: 0

        svg
          display: none

      svg
        height: 28px
        width: 28px
        stroke: $color-white-100
</style>
