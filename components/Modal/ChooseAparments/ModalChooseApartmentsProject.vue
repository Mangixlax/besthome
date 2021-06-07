<template lang="pug">
  div(:class="[$style['project'], selectedPojects.length != 0 && $style['is-selected-projects']]")
    typo-text(
      tag="h4"
      version="style-4"
      :class="$style['project__title']"
    )  {{ projectData.title }}
    div(:class="$style['project__body']")
      swiper(ref="swiper_2" :class="$style['slider']" class="swiper" :options="swiperOption")
        swiper-slide(
          v-for="(slide,i) in projectData.slides"
          :key="i"
          :class="$style['slide']"
        )
          div(:class="$style['project__body-image']")
            img(:src="require(`@/assets/images/modals/modals-choose-apartments-project/${slide.image}`)")
          div(:class="$style['project__body-description']")
            typo-text(
              tag="h3"
              version="style-3"
              :class="$style['project__body-description-title']"
            ) {{ slide.title }}
            typo-text(
              tag="p"
              version="style-5"
              :class="$style['project__body-description-subtitle']"
            ) {{ slide.subtitle }}
            div(
              :class="$style['project__body-description-link']"
              v-html="slide.link"
            )
            button(
              :class="[$style['project__body-description-button'], selectedPojects.indexOf(slide.value) != -1 && $style['selected']]"
              @click="addToSelectedProjects(slide)"
              v-html="selectedPojects.indexOf(slide.value) === -1 ? 'Add to selection' : 'Delete from selection'"
            )
        div(slot="pagination" :class="$style['navigation']")
          div(:class="['swiper-pagination-progressbar', $style['swiper-pagination-progressbar']]")
            div(class="status-bar")
          div(:class="$style['buttons']")
            button(:class="[$style['swiper-button-prev']]" @click.prevent="$refs.swiper_2.swiperInstance.slidePrev()")
              svg-icon(name="slider-prev-arrow-blue")
            button(:class="[$style['swiper-button-next']]" @click.prevent="$refs.swiper_2.swiperInstance.slideNext()")
              svg-icon(name="slider-next-arrow-blue")
    div(:class="$style['project__footer']")  
      button(
        :class="$style['project__footer-prevbutton']"
        @click="closeModal"
      )
        svg-icon(
          name="modals/modals-close-square"
        )
        | Closed
      button(
        :class="$style['project__footer-nextbutton']"
        @click="setNextStep"
      ) 
        div(
          :class="$style['project__footer-selected-count']"
          v-if="selectedPojects.length"
        ) {{ selectedPojects.length }}

        | Choose an Apartment 
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
      selectedPojects: [],
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 32,
        pagination: {
          el: '.swiper-pagination-progressbar',
          type: 'progressbar',
          spaceBetween: 32,
        },
      },
      projectData: {
        title: 'Select one or more projects',
        slides: [
          {
            value: 1,
            image: 'project-1.jpg',
            title: 'Cleopatra Select',
            subtitle:
              'Cleopatra Select is conceived for people who want their home to extend beyond apartment walls. The quintessential urban life is complemented by closeness to nature. Apartments are energy-efficient and buildings are surrounded by greenery and covered with green roofs.',
            button: 'Add to selection',
          },
          {
            value: 2,
            image: 'project-1.jpg',
            title: 'Cleopatra Select',
            subtitle:
              'Cleopatra Select is conceived for people who want their home to extend beyond apartment walls. The quintessential urban life is complemented by closeness to nature. Apartments are energy-efficient and buildings are surrounded by greenery and covered with green roofs.',
            button: 'Add to selection',
          },
          {
            value: 3,
            image: 'project-1.jpg',
            title: 'Cleopatra Select',
            subtitle:
              'Cleopatra Select is conceived for people who want their home to extend beyond apartment walls. The quintessential urban life is complemented by closeness to nature. Apartments are energy-efficient and buildings are surrounded by greenery and covered with green roofs.',
            button: 'Add to selection',
          },
        ],
      },
    }
  },
  methods: {
    setNextStep() {
      this.$emit('nextStepInfo', 2)
    },

    closeModal() {
      console.log(this.$modal)
      this.$modal.hide('modal-choose-apartments')
    },

    addToSelectedProjects(slide) {
      const slideIndex = this.selectedPojects.indexOf(slide.value)
      if (slideIndex === -1) {
        this.selectedPojects.push(slide.value)
        this.$emit('change', this.selectedPojects)
      } else {
        this.$delete(this.selectedPojects, slideIndex)
        this.$emit('change', this.selectedPojects)
      }
    },
  },
}
</script>

<style lang="sass" module>
.project
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  grid-gap: 32px
  padding-top: 40px
  border-top: solid 1px $color-black-8
  border-bottom: solid 1px $color-black-8

  &__title
    margin: 0

  &__body
    width: 100%

    &-image
      min-width: 320px
      height: 400px

      img
        box-shadow: -32px -32px 0 0 $color-black-4

        @media (max-width: 800px)
          box-shadow: none

    &-description
      width: 100%
      display: flex
      flex-direction: column
      grid-gap: 16px

      &-title
        margin: 0

      &-subtitle
        margin: 0

      &-link
        +style-7

        > a
          text-decoration: underline
          text-decoration-color: $color-blue-16
          text-underline-offset: 7px
          color: $color-blue-100
          margin-right: 0.25em
          margin-left: 0.25em

        > h2, h3, h4, p
          margin: 0

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

    &-selected-cout
      border-radius: 50%
      background: $color-white-4

    &-prevbutton
      +style-7
      display: flex
      align-items: center
      color: $color-blue-100
      padding: 16px 32px
      width: fit-content
      background-color: transparent
      border: none
      grid-gap: 12px
      height: 100%
      cursor: pointer

      @media (max-width: 800px)
        padding: 8px 16px

        svg
          display: none

      svg
        height: 28px
        width: 28px

    &-nextbutton
      +style-7
      display: flex
      align-items: center
      color: $color-black-100
      padding: 16px 32px
      width: fit-content
      background-color: $color-black-4
      border: none
      grid-gap: 12px
      height: 100%
      cursor: pointer

      @media (max-width: 800px)
        padding: 8px 16px

        svg
          display: none

      .is-selected-projects &
        background-color: $color-blue-100
        color: $color-white-100

      svg
        height: 28px
        width: 28px
        stroke: $color-black-100

        .is-selected-projects &
          stroke: $color-white-100

.slider
  max-width: 911px !important
  padding-top: 32px !important
  padding-left: 32px !important

  @media (max-width: 800px)
    padding-top: initial  !important
    padding-left: initial !important

.slide
  display: flex
  grid-gap: 72px
  align-items: center
  padding: 0 24px 

  @media (max-width: 800px)
    flex-direction: column

  img
    object-fit: cover
    width: 100%

.navigation
  max-width: 1296px
  margin: 0 auto
  margin-top: 40px
  display: flex
  align-items: center
  justify-content: space-between
  padding: 0 24px

.swiper-pagination-progressbar
  position: relative !important
  height: 2px
  flex: 1 1 auto
  position: relative
  background: $color-blue-4
  max-width: 860px
  width: 100%

.swiper-button-prev
  display: block
  margin-left: auto
  outline: none
  padding: 0
  background-color: transparent
  border: none
  height: 32px

  svg
    width: 32px
    height: 32px

.swiper-button-next
  display: block
  margin-right: auto
  outline: none
  padding: 0
  background-color: transparent
  border: none
  height: 32px

  svg
    width: 32px
    height: 32px

.buttons
  margin-left: 24px
  display: flex
  grid-gap: 24px

.footer
  display: flex
  align-items: center
  max-width: 911px
  padding: 0 24px
  margin: 0 auto

  &__link
    display: flex
    align-items: center
    flex-wrap: wrap

    &-text
      margin: 0
      white-space: nowrap

      &--underline
        white-space: nowrap
        text-decoration: underline
        text-decoration-color: $color-blue-16
        text-underline-offset: 7px
        color: $color-blue-100
        margin-left: 0.5em

        @media (max-width: 450px)
          margin-left: initial

    &-arrow
      height: 26px

      svg
        height: 26px
        width: 26px
</style>
