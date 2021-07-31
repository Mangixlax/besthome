<template lang="pug">
  modal-container(:name="name" :dark-mode="darkMode")
    template(slot="header")
      div(:class="$style['contact']")
        typo-text(
          tag="p"
          version="style-5"
          :class="$style['contact__title']"
        )  {{ data.title }}
        div(:class="$style['contact__body']")
          div(:class="$style['contact__body-methods']")
            div(
              v-for="(card, i) in data.methods"
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
              a(
                v-if="card.button"
                :href="card.link"
                target="_blank"
                :class="$style['contact__body-methods-card-button']"
                @click="closeModal()"
              ) {{ card.button }}
              a(
                v-if="card.button"
                :href="card.link"
                target="_blank"
                :class="$style['contact__body-methods-card-button--mobile']"
                @click="closeModal()"
              )
                svg-icon(:name="card.icon")
</template>

<script>
import TypoText from '~/components/Base/TypoText.vue'
import ModalContainer from '~/components/Modal/base/ModalContainer.vue'
export default {
  name: 'ModalChooseMessenger',
  components: {
    TypoText,
    ModalContainer,
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      darkMode: false,
    }
  },
  methods: {
    closeModal() {
      this.$modal.hide('modal-choose-apartments')
    },

    setModalCloseDarkMode() {
      this.darkMode = window.innerWidth < 900
    },
  },

  mounted() {
    this.setModalCloseDarkMode()
    window.addEventListener('resize', this.setModalCloseDarkMode)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.setModalCloseDarkMode)
  },
}
</script>

<style lang="sass" module>
.contact
  display: flex
  flex-direction: column
  align-items: center
  grid-gap: 40px
  padding: 64px
  border-top: solid 1px $color-black-8
  border-bottom: solid 1px $color-black-8
  padding-top: 162px !important

  @media (max-width: 600px)
    padding: 0
    min-height: 100vh
    width: 100vw

  &__title
    margin: 0
    padding: 0 24px

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
        padding: 48px 32px
        grid-gap: 16px
        width: 100%
        cursor: pointer
        position: relative

        @media (max-width: 900px)
          height: auto
          background: none !important
          flex-direction: row-reverse
          justify-content: flex-end
          padding: 0

          & + &::before
            content: ""
            position: absolute
            top: -15px
            right: 0
            width: calc(100% - 48px)
            margin-left: 72px
            height: 1px
            display: block
            background-color: $color-black-8

          h4
            +style-5
            color: $color-black-100 !important

        svg
          height: 32px
          width: 32px

          @media (min-width: 900px)
            display: none

        a
          @media (max-width: 900px)
            background: none !important

        &.card-0
          background: rgba(111, 88, 161, 0.04)

          @media (max-width: 900px)
            grid-column: 1 / 3
            grid-row: 1 / 2

          @media (max-width: 900px)
            grid-column: initial
            grid-row: initial

          h4
            color: rgba(111, 88, 161, 1)

          > a
            background: rgba(111, 88, 161, 1)
            text-decoration: none

        &.card-1
          background: rgba(0, 184, 34, 0.04)

          h4
            color: rgba(0, 184, 34, 1)

          > a
            background: rgba(0, 184, 34, 1)
            text-decoration: none

        &.card-2
          background: $color-blue-8

          h4
            color: $color-blue-100

          > a
            background: $color-blue-100
            text-decoration: none

        &-title
          margin: 0

        &-description
          margin: 0

          @media (max-width: 900px)
            display: none

        &-button
          +style-7
          padding: 8px 24px
          color:  $color-white-100
          width: fit-content

          @media (max-width: 900px)
            display: none

          &--mobile
            display: flex
            align-items: center

            @media (min-width: 900px)
              display: none

            &::before
              content: ""
              position: absolute
              top: 0
              left: 0
              right: 0
              bottom: 0

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
