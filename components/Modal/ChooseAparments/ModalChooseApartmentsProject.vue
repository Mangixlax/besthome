<template lang="pug">
  div(:class="$style['project']")
    typo-text(
      tag="h4"
      version="style-4"
      :class="$style['project__title']"
    )  {{ projectData.title }}
    div(:class="$style['project__body']")
      swiper(ref="swiper" :class="$style['slider']" class="swiper" :options="swiperOption")
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
        div(slot="pagination" :class="$style['navigation']")
          div(:class="['swiper-pagination-progressbar', $style['swiper-pagination-progressbar']]")
            div(class="status-bar")
          div(:class="$style['buttons']")
            button(:class="[$style['swiper-button-prev']]" @click.prevent="$refs.swiper.swiperInstance.slidePrev()")
              svg-icon(name="slider-prev-arrow-blue")
            button(:class="[$style['swiper-button-next']]" @click.prevent="$refs.swiper.swiperInstance.slideNext()")
              svg-icon(name="slider-next-arrow-blue")
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
            image: 'project-1.jpg',
            title: 'Cleopatra Select',
            subtitle:
              'Cleopatra Select is conceived for people who want their home to extend beyond apartment walls. The quintessential urban life is complemented by closeness to nature. Apartments are energy-efficient and buildings are surrounded by greenery and covered with green roofs.',
            link: 'More<a href="#">residences Cleopatra Select</a>.',
          },
          {
            image: 'project-1.jpg',
          },
          {
            image: 'project-1.jpg',
          },
        ],
      },
    }
  },
}
</script>

<style lang="sass" module>
.project
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  grid-gap: 64px
  padding: 40px 0

  &__title
    margin: 0

  &__body
    width: 100%

    &-image
      min-width: 320px
      height: 400px

      img
        box-shadow: -32px -32px 0 0 $color-black-4

    &-description
      width: 100%
      display: flex
      flex-direction: column
      grid-gap: 16px
      margin-right: 32px

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

        > h2, h3, h4, p
          margin: 0

.slider
  max-width: 911px !important
  padding-top: 32px !important
  padding-left: 32px !important
  // padding-right: 32px !important

.slide
  display: flex
  grid-gap: 72px
  align-items: center

  @media (max-width: 600px)
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
