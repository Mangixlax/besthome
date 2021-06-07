<template lang="pug">
  div(:class="$style['contact']")
    typo-text(
      tag="h4"
      version="style-4"
      :class="$style['contact__title']"
    )  {{ contactData.title }}
    div(:class="$style['contact__body']")
      div(:class="$style['contact__body-methods']")
        div(
          v-for="(card, i) in contactData.methods"
          :key="i"
          :class="[$style['contact__body-methods-card'], $style[`card-${i}`]]"
        ) 
          typo-text(
            tag="h4"
            version="style-4"
            :class="$style['contact__body-methods-card-title']"
          ) {{ card.title }}
          typo-text(
            tag="p"
            version="style-7"
            :class="$style['contact__body-methods-card-description']"
          ) {{ card.description }}

          div(
            v-if="card.button"
            :class="$style['contact__body-methods-card-button']"
            @click="addToSelectedMethods(card)"
          ) {{ card.button }}
    div(:class="$style['contact__footer']")  
      button(
        :class="$style['contact__footer-prevbutton']"
        @click="setPrevStep"
      )
        svg-icon(
          name="modals/modals-prev"
        )
        | Previos step
      button( 
        :class="$style['contact__footer-nextbutton']"
        @click="addToSelectedMethods(card)"
      ) 
        | Send request 
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
      selectedMethods: [],
      contactData: {
        title: 'Choose the parameters your home should fulfill',
        methods: [
          {
            value: 1,
            title: 'Phone or email',
            description:
              'Individual approach to each client-we will select from 5 options for buying real estate, ready-made business in the field of agriculture or service sector.',
          },
          {
            value: 2,
            title: 'WhatApp',
            description:
              'After selecting this option you will be redirected to WhatsApp. The details you have entered on this site will be automatically filled into the prepared message. You only have to send it.',
            button: 'Choose',
          },
          {
            value: 3,
            title: 'Telegram',
            description:
              'After selecting this option you will be redirected to Telegram. The details you have entered on this site will be automatically filled into the prepared message. You only have to send it.',
            button: 'Choose',
          },
        ],
      },
    }
  },
  methods: {
    setPrevStep() {
      this.$emit('prevStepInfo', 2)
    },

    sendRequest() {
      this.$emit('sendData', true)
    },

    closeModal() {
      console.log(this.$modal)
      this.$modal.hide('modal-choose-apartments')
    },
    addToSelectedMethods(card) {
      const cardIndex = this.selectedMethods.indexOf(card.value)
      if (cardIndex === -1) {
        this.selectedMethods.push(card.value)
        this.$emit('change', this.selectedMethods)
      } else {
        this.$delete(this.selectedMethods, cardIndex)
        this.$emit('change', this.selectedMethods)
      }
    },
  },
}
</script>

<style lang="sass" module>
.contact
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

    &-methods
      width: 100%
      display: flex
      grid-gap: 32px

      @media (max-width: 900px)
        display: grid
        grid-template-columns: 1fr 1fr
        height: auto

      @media (max-width: 900px)
        grid-template-columns: 1fr
      &-card
        display: flex
        flex-direction: column
        align-items: center
        text-align: center
        padding: 48px 32px
        grid-gap: 16px
        height: 504px
        width: 100%
        color: $color-blue-100
        cursor: pointer

        @media (max-width: 900px)
          height: auto

        &.card-0
          border: 1px solid  $color-black-16

          @media (max-width: 900px)
            grid-column: 1 / 3
            grid-row: 1 / 2

          @media (max-width: 900px)
            grid-column: initial
            grid-row: initial

        &.card-1
          background: rgba(0, 184, 34, 0.04)

          h4
            color: rgba(0, 184, 34, 1)

          > div
            background: rgba(0, 184, 34, 1)

        &.card-2
          background: $color-blue-8

          h4
            color: $color-blue-100

          > div
            background: $color-blue-100

        &-title
          margin: 0

        &-description
          margin: 0

        &-button
          +style-7
          padding: 8px 24px
          color:  $color-white-100

      &-button
        +style-7
        color: $color-white-100
        padding: 8px 24px
        width: fit-content
        background-color: $color-blue-100
        border: none

        &.selected
          background-color: $color-black-100

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
