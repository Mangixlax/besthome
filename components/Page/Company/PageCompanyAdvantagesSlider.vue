<template lang="pug">
  section(:class="$style['container']")
    div(:class="$style['container__header']")
      typo-text(
        tag="h2"
        version="style-4"
      ) {{ sliderData.title }}
      div(:class="$style['buttons']")
        button(:class="[$style['swiper-button-prev']]" @click.prevent="$refs.swiper.swiperInstance.slidePrev()")
          svg-icon(name="slider-prev-arrow-blue")
        button(:class="[$style['swiper-button-next']]" @click.prevent="$refs.swiper.swiperInstance.slideNext()")
          svg-icon(name="slider-next-arrow-blue")
    div(:class="$style['container__body']")
      swiper(ref="swiper" :class="$style['slider']" class="swiper" :options="swiperOption")
        swiper-slide(
          v-for="(slide, i) in sliderData.slider"
          :key="i"
          :class="$style['slide']"
        )
          div
            img(:src="require(`@/assets/images/company-advantages-slider/${slide.image || 'person-1.png'}`)" loading="lazy")
          div(:class="$style['slide__textbox']")
            typo-text(
              tag="p"
              version="style-6"
              :class="$style['slide__textbox-text']"
              v-html="slide.text"
            )
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'BaseConpanyAdvantagesSlider',
  components: {
    Swiper,
    SwiperSlide,
    TypoText,
  },
  props: {
    sliderData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        breakpoints: {
          // when window width is >= 250
          250: {},
          // when window width is >= 600px
          600: {
            // centeredSlides: false,
          },
          // when window width is >= 900px
          900: {},
        },
        centeredSlides: true,
        spaceBetween: 128,
        pagination: {
          el: '.swiper-pagination-progressbar',
          type: 'progressbar',
        },
        speed: 500,
        loop: true,
      },
    }
  },
}
</script>

<style lang="sass" module>
.container
  width: 100%
  padding: 80px 0

  @media (max-width: 900px)
    padding: 32px 24px

  &__header
    display: flex
    max-width: 912px
    margin: 0 auto
    position: relative
    justify-content: space-between

    h2
      margin: 0

  &__body
    padding-top: 48px
    margin: 0 auto
    position: relative

.slide
  display: flex
  max-width: 992px   !important
  max-height: 480px !important
  position: relative
  opacity: 1
  transition: opacity 0.2s ease

  @media (max-width: 900px)
    display: grid
    grid-template-columns: 1fr 1fr
    align-items: center
    max-width: 100%   !important
    max-height: 100%  !important

  @media (max-width: 700px)
    grid-template-columns: 1fr
    justify-items: center

  &__textbox
    max-width: 455px
    max-height: 208px
    position: absolute
    background-color: $color-white-100
    right: 0
    margin-bottom: -104px
    bottom: 50%
    padding: 48px
    box-shadow: 0 40px 60px $color-black-16

    @media (max-width: 900px)
      position: static
      margin-bottom: 0
      padding: 24px
      width: 100%
      box-shadow: none

    &-text
      margin: 0

  img
    object-fit: cover
    max-width: 720px
    justify-self: center

    @media (max-width: 900px)
      max-width: 100%

  &:not(:global(.swiper-slide-active))
    opacity: 0.2

.footer
  max-width: 952px
  width: 100%
  margin-top: 32px
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
</style>
