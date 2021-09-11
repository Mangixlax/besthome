<template lang="pug">
  div(:class="$style['container__slider']")
    div(:class="$style['container__body']")
      swiper(ref="swiper" :class="$style['slider']" class="swiper" :options="swiperOption")
        swiper-slide(
          v-for="(slide,i) in projectsSliderData"
          :key="i"
          :class="$style['slide']"
        )
          div(:class="$style['container__body-image']")
            img(
              :src="$img(`/projects-photos-slider/${slide}`, $store.state.supportWebP ? { format: 'webp' } : {})"
              loading="lazy"
              decoding="async"
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
