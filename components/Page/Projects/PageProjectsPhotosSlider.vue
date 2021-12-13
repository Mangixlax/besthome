<template lang="pug">
  div(:class="$style['container']")
    div(:class="$style['container__header']")
      typo-text(
        tag="h2"
        version="style-4"
        v-html="data.header"
      )
    div(:class="$style['container__body']")
      swiper(ref="swiper" :class="$style['slider']" class="swiper" :options="swiperOption")
        swiper-slide(
          v-for="(slide, i) in data.items"
          :key="i"
          :class="$style['slide']"
        )
          div(:class="$style['container__body-image']")
            img(:data-src="slide" class="swiper-lazy")
            div(class="swiper-lazy-preloader-blue swiper-lazy-preloader")
        div(slot="pagination" :class="$style['navigation']")
          div(:class="['swiper-pagination-progressbar', $style['swiper-pagination-progressbar']]")
            div(class="status-bar")
          div(:class="$style['buttons']")
            button(:class="[$style['swiper-button-prev']]" @click.prevent="$refs.swiper.swiperInstance.slidePrev()")
              svg-icon(name="slider-prev-arrow-blue")
            button(:class="[$style['swiper-button-next']]" @click.prevent="$refs.swiper.swiperInstance.slideNext()")
              svg-icon(name="slider-next-arrow-blue")
      div(:class="$style['footer']" v-html="data.under_text")
</template>

<script lang="ts">
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import TypoText from '~/components/Base/TypoText.vue'
import PageCompanyPersonalCard from '~/components/Page/Company/PageCompanyPersonalCard.vue'
import { Component, Vue, Prop } from 'nuxt-property-decorator'

interface IPhotoSlider {
  header: string
  under_text: string
  items: Array<string>
}

@Component({
  components: {
    Swiper,
    SwiperSlide,
    TypoText,
    PageCompanyPersonalCard,
  },
})
export default class PageProjectsPhotosSlider extends Vue {
  @Prop({ type: Object, default: () => {} }) data!: IPhotoSlider

  public swiperOption: any = {
    lazy: {
      threshold: 50,
      loadPrevNext: true,
      loadPrevNextAmount: 6,
    },
    watchSlidesVisibility : true,
    preloadImages: false,
    
    breakpoints: {
      // when window width is >= 900px
      900: {
        slidesPerView: 1,
        spaceBetween: 32,
      },
      1200: {
        slidesPerView: 'auto',
        spaceBetween: 64,
        centeredSlides: false,
        watchSlidesVisibility: true
      },
    },
    centeredSlides: false,
    spaceBetween: 64,
    pagination: {
      el: '.swiper-pagination-progressbar',
      type: 'progressbar',
    },
  }
}
</script>

<style lang="sass" module>
.container
  max-width: 100%
  padding: 80px 0 80px 96px
  margin: 0 auto

  @media (max-width: 1000px)
    padding: 40px 24px

  &__header
    max-width: 912px
    margin: 0 auto

    h2
      margin: 0

  &__body
    padding: 80px 0 0 0

    @media (max-width: 900px)
      padding: 40px 0

    &-image
      position: relative
      padding-bottom: 66.6%
      height: 0

      img
        position: absolute
        border: none !important
        background: transparent !important
        top: 0
        left: 0
        width: 100%
        height: 100%
        object-fit: cover
        
      img:not([src]) 
        visibility: hidden

  @media (min-width: 1200px)
    width: auto !important

.slide
  position: relative
  width: 50% !important
  height: auto
  
  @media (max-width: 900px)
    width: 100% !important

.navigation
  max-width: 1296px
  margin: 0 auto
  margin-top: 56px
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
  flex-wrap: wrap
  +style-5

  & > *:first-child
    margin-top: 0

  & > *:last-child
    margin-bottom: 0

  a
    white-space: nowrap
    text-decoration: underline
    text-decoration-color: $color-blue-16
    text-underline-offset: 7px
    color: $color-blue-100
</style>
