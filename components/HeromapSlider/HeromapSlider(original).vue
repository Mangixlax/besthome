<template lang="pug">
  section(:class="$style['container']")
    div(ref="container" :class="$style['container__map']")
      img(
        v-if="data.background"
        ref="image"
        :src="data.background"
        :class="$style['container__map-image']"
        loading="lazy"
      )
      div(
        v-if="data.svg_html"
        ref="container"
        :class="[$style['container__map-svg'], 'container__map-svg']"
        v-html="data.svg_html"
      )
      typo-text(
        tag="div"
        v-if="data.text"
        v-html="data.text"
        :class="$style['container__map-text']"
      ) 
    div(:class="$style['container__slider']")
      swiper(ref="mySwiper" :class="$style['slider']" class="swiper" :options="swiperOption" @slideChange="onSlideChange")
        swiper-slide(
          v-for="(slide, i) in data.slides"
          :key="i"
          :class="$style['slide']"
        )
          div(v-if="slide.image")
            img(:src="slide.image")
          div(:class="$style['slide__textbox']")
            typo-text(
              tag="div"
              version="style-4"
              v-html="slide.title"
              :class="$style['slide__textbox-text']"
            ) 
            typo-text(
              tag="div"
              version="style-7"
              v-html="slide.text"
              :class="$style['slide__textbox-text']"
            )
        div(slot="pagination" :class="$style['navigation']")
          div(:class="['swiper-pagination-progressbar', $style['swiper-pagination-progressbar']]")
            div(class="status-bar")
          div(:class="$style['buttons']")
            button(:class="[$style['swiper-button-prev']]" @click.prevent="$refs.mySwiper.swiperInstance.slidePrev()" )
              svg-icon(name="slider-prev-arrow-blue")
            button(:class="[$style['swiper-button-next']]" @click.prevent="$refs.mySwiper.swiperInstance.slideNext()")
              svg-icon(name="slider-next-arrow-blue")
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'HeromapSlider',
  components: {
    Swiper,
    SwiperSlide,
    TypoText,
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
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
        spaceBetween: 64,
        pagination: {
          el: '.swiper-pagination-progressbar',
          type: 'progressbar',
        },
        speed: 500,
      },
    }
  },
  methods: {
    setActiveSlide(index) {
      if (this.data.slides.length) {
        const slideCode = this.data.slides[index].point_code
        const $activeSlide = this.$refs.container.querySelector(`[id="${slideCode}"]`)

        ;(this.$refs.container.querySelectorAll('.' + this.$style['active']) || []).forEach((el) => { 
          el.classList.remove(this.$style['active'])
        })
        
        if ($activeSlide) {
          $activeSlide.classList.add(this.$style['active'])
        }
        
      }
    },
    
    onSlideChange(swiper) {
      this.setActiveSlide(swiper.realIndex)
    }
  },
  mounted() {
    this.setActiveSlide(0)
  }
}
</script>

<style lang="sass" module>
.container
  width: 100%
  padding: 80px 0
  position: relative

  &__body
    padding-top: 48px
    margin: 0 auto
    position: relative

  &__map
    width: 100%
    max-width: 1392px
    padding: 0 24px
    margin: 0 auto
    height: auto
    margin: 0 auto
    position: relative

    @media (max-width: 900px)
      display: none

    &-image
      width: 100%

    &-svg
      position: absolute
      bottom: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 9

      circle
        stroke-width: 0
        stroke: transparent
        transition: all 0.3s ease

        &.active
          stroke-width: 5px
          stroke: white
          r: 5
          fill: transparent 
    
    &-text
      position: absolute
      display: flex
      flex-direction: column
      grid-gap: 32px
      top: 50%
      left: 25%
      transform: translate(-25%, -50%)
      margin: 0
      color: $color-white-100
      max-width: 520px

      @media (max-width: 1400px)
        top: 25%
        transform: translate(-25%, -25%)
        grid-gap: 12px

      h1,h2,h3,h4,h5
        +style-1
        margin: 0
      p
        +style-5
        margin: 0

  &__slider
    margin-top: -160px

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
    justify-items: start

  &__textbox
    max-width: 487px
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

    @media (max-width: 700px)
      padding: 48px 0 0

    &-text
      margin: 0
      
  img
    object-fit: cover
    max-width: 720px
    justify-self: center

    @media (max-width: 900px)
      max-width: 100%

.swiper-pagination-progressbar
  position: relative !important
  height: 2px
  flex: 1 1 auto
  position: relative
  background: $color-blue-4
  max-width: 860px
  width: 100%


.navigation
  max-width: 992px
  margin: 0 auto
  margin-top: 56px
  display: flex
  flex-direction: row-reverse
  justify-content: space-between
  align-items: center
  grid-gap: 32px

  @media (max-width: 700px)
    margin-top: 12px
    
.swiper-button-prev
  display: block
  margin-left: auto
  outline: none
  padding: 0
  width: 32px
  height: 32px
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
  width: 32px
  height: 32px
  background-color: transparent
  border: none

  svg
    width: 32px
    height: 32px

.buttons
  display: flex
  grid-gap: 24px
</style>