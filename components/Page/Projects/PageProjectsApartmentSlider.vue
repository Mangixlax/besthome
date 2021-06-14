<template lang="pug">
  div(:class="$style['container']")
    div(:class="$style['container__cardinfo']")
      div(:class="$style['container__cardinfo-header']")
        typo-text(
          tag="p"
          version="style-7"
        ) {{ card.apartment }}
        typo-text(
          tag="h2"
          version="style-2"
        ) {{ card.area }}m²
      ul(:class="$style['container__cardinfo-list']")
        li(:class="$style['container__cardinfo-list-item']")
          typo-text(
            tag="p"
            version="style-6"
            :class="$style['container__cardinfo-list-lable']"
          ) Status
          typo-text(
            tag="p"
            version="style-6"
            :class="$style['container__cardinfo-list-value']"
          ) {{ card.status }}
        li(:class="$style['container__cardinfo-list-item']")
          typo-text(
            tag="p"
            version="style-6"
            :class="$style['container__cardinfo-list-lable']"
          ) Floor
          typo-text(
            tag="p"
            version="style-6"
            :class="$style['container__cardinfo-list-value']"
          ) {{ card.floor }}
        li(:class="$style['container__cardinfo-list-item']")
          typo-text(
            tag="p"
            version="style-6"
            :class="$style['container__cardinfo-list-lable']"
          ) Block
          typo-text(
            tag="p"
            version="style-6"
            :class="$style['container__cardinfo-list-value']"
          ) {{ card.block }}
        li(:class="$style['container__cardinfo-list-item']")
          typo-text(
            tag="p"
            version="style-6"
            :class="$style['container__cardinfo-list-lable']"
          ) Room
          typo-text(
            tag="p"
            version="style-6"
            :class="$style['container__cardinfo-list-value']"
          ) {{ card.room }}
        li(:class="$style['container__cardinfo-list-item']")
          typo-text(
            tag="p"
            version="style-6"
            :class="$style['container__cardinfo-list-lable']"
          ) Price
          div(:class="$style['container__cardinfo-list-price']")
            typo-text(
              tag="p"
              version="style-6"
              :class="$style['container__cardinfo-list-value--blue']"
            ) {{ card.price }}
            typo-text(
              tag="p"
              version="style-8"
              :class="$style['container__cardinfo-list-value--blue']"
            ) €
      div(:class="$style['container__cardinfo-footer']")
        input(
          type="button"
          value="Request now"
          :class="$style['container__cardinfo-footer-button']"
        )
        div(:class="$style['container__cardinfo-footer-link']")
          typo-text(
            tag="nuxt-link"
            version="style-5"
            :to="localePath({ name: 'index' })"
            :class="$style['container__cardinfo-footer-link--underline']"
          ) Download  PDF
          typo-text(
            tag="nuxt-link"
            version="none"
            :to="localePath({ name: 'index' })"
            :class="$style['container__cardinfo-footer-arrow']"
          )
            svg-icon(name="link-arrow-blue")
    div(:class="$style['container__slider']")
      div(:class="$style['container__header']")
        typo-text(
          tag="h2"
          version="style-4"
        ) A tour of the apartment
      div(:class="$style['container__body']")
        swiper(ref="swiper" :class="$style['slider']" class="swiper" :options="swiperOption")
          swiper-slide(
            v-for="(slide,i) in projectsSliderData"
            :key="i"
            :class="$style['slide']"
          )
            div(:class="$style['container__body-image']")
              img(:src="require(`@/assets/images/projects-photos-slider/${slide}`)" loading="lazy")
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
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'PageProjectsApartmentSlider',
  components: {
    Swiper,
    SwiperSlide,
    TypoText,
  },
  props: {
    card: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      swiperOption: {
        breakpoints: {
          // when window width is >= 900px

          1023: {
            slidesPerView: 'auto',
            spaceBetween: 64,
          },
        },
        spaceBetween: 32,
        slidesPerView: 1,
        pagination: {
          el: '.swiper-pagination-progressbar',
          type: 'progressbar',
        },
      },
      projectsSliderData: [
        'projects-photos-slider-1.jpg',
        'projects-photos-slider-2.jpg',
        'projects-photos-slider-3.jpg',
        'projects-photos-slider-1.jpg',
        'projects-photos-slider-1.jpg',
        'projects-photos-slider-2.jpg',
        'projects-photos-slider-3.jpg',
      ],
    }
  },
}
</script>

<style lang="sass" module>
.container
  width: 100%
  padding: 80px 0 80px 96px
  margin: 0 auto
  display: flex
  align-items: center
  grid-gap: 64px

  @media (max-width: 1023px)
    padding: 40px 24px
    flex-direction: column

  &__cardinfo
    display: flex
    flex-direction: column
    padding: 64px
    min-width: 456px

    @media (max-width: 600px)
      min-width: initial
      width: 100%
      padding: 24px

    &-header
      padding: 0 8px 24px 8px

      h2
        margin: 0

    &-list
      display: flex
      flex-direction: column
      padding: 0
      list-style: none
      grid-gap: 12px
      margin: 6px 0

      &-item
        display: flex
        justify-content: space-between
        padding: 8px 12px
        position: relative


        & + &:before
          content: ""
          position: absolute
          top: -6px
          left: 0
          width: 100%
          height: 1px
          display: inline-block
          background-color: $color-black-4

      &-lable
        color: $color-black-72

      &-price
        display: flex
        align-items: flex-start
        grid-gap: 3px

      &-value
        &--blue
          color: $color-blue-100

    &-footer
      display: flex
      flex-direction: column
      grid-gap: 24px
      padding-bottom: 15px

      &-button
        +style-6
        width: 100%
        padding: 16px 32px
        color: $color-white-100
        background-color: $color-blue-100
        border: none

      &-link
        display: flex
        align-items: center
        flex-wrap: wrap
        padding: 15px 0
        justify-content: center

        &--underline
          white-space: nowrap
          text-decoration: underline
          text-decoration-color: $color-blue-16
          text-underline-offset: 7px
          color: $color-blue-100
          margin-left: 0.5em

          @media (max-width: 355px)
            margin-left: initial

      &-arrow
        height: 26px

        svg
          height: 26px
          width: 26px

  &__slider
    min-width: 0
    width: 100%

  &__header
    width: 100%

    h2
      margin: 0

  &__body
    display: flex
    padding: 80px 0
    align-items: center

    @media (max-width: 900px)
      padding: 40px 0

.slide
  display: flex
  justify-content: center
  align-items: center
  width: 100%

  @media (min-width: 1023px)
    width: auto !important

  img
    display: block
    max-width: 100%
    height: auto

.navigation
  width: 100%
  margin-top: 56px
  display: flex
  align-items: center
  justify-content: space-between
  margin-bottom: 95px
  padding-right: 50px

  @media (max-width: 1023px)
    padding-right: initial

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
  margin: 0 auto
  flex-wrap: wrap

  &-link
    display: flex
    align-items: center
    flex-wrap: wrap

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
