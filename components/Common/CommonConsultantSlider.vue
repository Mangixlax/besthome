<template lang="pug">
  section(:class="$style['container']")
    div(:class="$style['container__header']")
      typo-text(
        tag="h2"
        version="style-4"
      ) {{ sliderData.title }}
    div(:class="$style['container__body']")
      swiper(ref="swiper" :class="$style['slider']" class="swiper" :options="swiperOption")
        swiper-slide(
          v-for="(slide, i) in sliderData.slides"
          :key="i"
          :class="$style['slide']"
        )
          div(:class="$style['slide__textbox']")
            typo-text(
              tag="p"
              version="style-5"
              :class="$style['slide__textbox-title']"
            ) {{ slide.greeting }}
            typo-text(
              tag="p"
              version="style-7"
              :class="$style['slide__textbox-lang']"
            ) {{ slide.languages }}
            div(:class="$style['slide__contact']")
              a(
                href="tel: +90 530 547-44-15"
                :class="$style['slide__contact-phone']"
              ) {{ slide.phone }}
              svg-icon(name="icon-whatsup")
              svg-icon(name="icon-viber")
              svg-icon(name="icon-telegram")  
            div(:class="$style['slide__link']")
              a(
                href="mailto: svetlana@besthome.com.tr"
                :class="$style['slide__link-email']"
              ) {{ slide.email }}
                svg-icon(name="link-arrow-white")
          img(:src="require(`~/assets/images/our-team/${slide.image}`)", alt="alt")
    div(:class="$style['footer']")
      div(:class="$style['footer__navigation']")
        div(:class="$style['buttons']")
          button(:class="[$style['swiper-button-prev']]" @click.prevent="$refs.swiper.swiperInstance.slidePrev()")
            svg-icon(name="slider-prev-arrow-white-56")
          button(:class="[$style['swiper-button-next']]" @click.prevent="$refs.swiper.swiperInstance.slideNext()")
            svg-icon(name="slider-next-arrow-white")
        typo-text(
          tag="p"
          version="style-7"
          :class="$style['footer__navigation-text']"
        ) {{ sliderData.navigation }}
      div(:class="['swiper-pagination-progressbar', $style['swiper-pagination-progressbar']]")
        div(class="status-bar")
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'CommonConsultantSlider',
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
        enabled: false,
        centeredSlides: true,
        spaceBetween: 128,
        pagination: {
          el: '.swiper-pagination-progressbar',
          type: 'progressbar',
        },
      },
    }
  },
}
</script>

<style lang="sass" module>
.container
  width: 100%
  background-color: $color-black-96
  padding: 120px 24px

  @media (max-width: 900px)
    padding: 48px 24px

  &__header
    display: flex
    max-width: 864px
    margin: 0 auto
    justify-content: space-between
    margin-bottom: 24px

    h2
      margin: 0
      color: $color-white-100
      max-width: 400px
      +style-3($with-media: false)

  &__body
    max-width: 1440px
    // padding: 80px 24px
    margin: 0 auto
    position: relative

.slider
  padding-bottom: 32px !important

  @media (max-width: 600px)
    padding-bottom: 0

.slide
  display: grid
  grid-template-columns: 1fr 1fr

  @media (max-width: 900px)
    display: grid
    grid-template-columns: 1fr 1fr
    max-width: 100%  !important
    max-height: 100%  !important

  @media (max-width: 700px)
    grid-template-columns: 1fr
    justify-items: center

  &__textbox
    max-width: 432px
    justify-self: end
    color: $color-white-100
    padding: 64px 0px

    @media (max-width: 700px)
      order: 2
      justify-self: start
      padding: 24px 0px

    &-title
      color: $color-white-80
      margin: 0
      margin-bottom: 32px

    &-lang
      margin: 0

  &__contact
    display: flex
    align-items: center

    &-phone
      +style-5($with-media: false)
      color: $color-white-100
      text-decoration: none
      margin: 0px

    svg
      height: 20px
      width: 20px
      margin-left: 6px

  &__link

    &-email
      display: flex
      align-items: center
      margin: 0
      color: $color-white-100
      text-decoration: underline
      text-underline-offset: 7px
      text-decoration-color: $color-white-16

      svg
        height: 32px
        width: 32px

  img
    object-fit: cover
    max-width: 304px
    height: 400px
    justify-self: center
    box-shadow: 32px 32px $color-white-4
    margin: 0 32px
    background: white

    @media (max-width: 700px)
      max-width: 100%
      box-shadow: none

    @media (max-width: 500px)
      box-shadow: none
      width: 100%
      height: 272px
      margin: 0
      justify-self: start

.footer
  max-width: 1440px
  margin: 0 auto
  margin-top: 48px
  display: grid
  grid-template-columns: 1fr 1fr
  align-items: center
  padding: 16px 0

  @media (max-width: 900px)
    margin-top: 24px

  @media (max-width: 700px)
    margin-top: 0

  &__navigation
    width: 432px
    display: flex
    align-items: center
    justify-self: end

    @media (max-width: 900px)
      width: auto
      max-width: 432px
      justify-self: start

    &-text
      margin: 0
      margin-left: 16px
      white-space: nowrap
      color: $color-white-56

      @media (max-width: 600px)
        display: none

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
  display: flex
  grid-gap: 21px
  height: 32px

.swiper-pagination-progressbar
  position: relative !important
  height: 2px
  flex: 1 1 auto
  position: relative
  background: $color-white-16 !important
  width: 40%
  justify-self: center
  margin: 0 32px

  @media (max-width: 900px)
    width: 80%

  span
    background: $color-white-100 !important
</style>
