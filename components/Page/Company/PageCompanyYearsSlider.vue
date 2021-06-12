<template lang="pug">
  section(:class="$style['history']")
    swiper(ref="swiper_2" :class="$style['slider']" class="swiper" :options="swiperOption")
      swiper-slide(
        v-for="(slide,i) in sliderHistory"
        :key="i"
        :class="$style['slide']"
      )
        div(:class="$style['history__description']")
          typo-text(
            tag="h3"
            version="style-3"
            :class="$style['history__description-title']"
          ) {{ slide.title }}
          typo-text(
            tag="p"
            version="style-5"
            :class="$style['history__description-subtitle']"
          ) {{ slide.subtitle }}
          div(
            :class="$style['history__description-link']"
            v-html="slide.link"
          )
          div(
            v-if="slide.linkToProject"
            :class="$style['content__link']"
          )
            typo-text(
              tag="p"
              version="style-5"
              :class="$style['content__link-text']"
            ) {{ slide.linkToProject.text }}
            typo-text(
              tag="nuxt-link"
              version="style-5"
              :to="localePath(slide.linkToProject.route)"
              :title="slide.linkToProject.link"
              :class="$style['content__link-text--underline']"
            ) {{ slide.linkToProject.link }}
            | .
            typo-text(
              tag="nuxt-link"
              version="none"
              :to="localePath(slide.linkToProject.route)"
              :title="slide.linkToProject.link"
              :class="$style['content__link-arrow']"
            )
              svg-icon(name="link-arrow-blue")
          typo-text(
            tag="div"
            version="style-0"
            :class="$style['history__description-year']"
          ) {{ slide.year }}
        div(:class="$style['history__image']")
          img(:src="require(`@/assets/images/pages/company/history/years-image/${slide.image}`)")
      div(slot="pagination" :class="$style['navigation']")
        div(:class="$style['buttons']")
          button(:class="[$style['swiper-button-prev']]" @click.prevent="$refs.swiper_2.swiperInstance.slidePrev()")
            svg-icon(name="slider-prev-arrow-blue")
          button(:class="[$style['swiper-button-next']]" @click.prevent="$refs.swiper_2.swiperInstance.slideNext()")
            svg-icon(name="slider-next-arrow-blue")
        div(:class="['swiper-pagination-bullets', $style['swiper-pagination-bullets']]")
</template>

<script>
import TypoText from '~/components/Base/TypoText.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'PageCompanyYearsSlider',
  props: {
    sliderHistory: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    TypoText,
  },

  data() {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 32,
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination-bullets',
          renderBullet(index, className) {
            return `<span class="${className} swiper-pagination-bullet-custom"></span>`
          },
          clickable: true
        },
      },
    }
  },
}
</script>

<style lang="sass" module>
.history
  width: 100%
  padding: 80px 0
  
  @media (max-width: 800px)
    padding-top: initial  !important
    padding-left: initial !important

  &__description
    max-width: 624px
    padding-left: 182px

    @media (max-width: 1200px)
      padding-left: initial

    h3
      margin: 0

    &-year
      margin-top: 79px
      max-width: 1057px
      top: 35px
      left: 95px
      background-size: 100%
      background-position: center center
      background-repeat: no-repeat
      justify-self: end
      margin: 0
      color: $color-black-8

      @media (max-width: 700px)
        margin-top: initial   

  &__image
    max-width: 624px
    padding-left: 144px
    display: flex
    flex-direction: column

    @media (max-width: 1200px)
      padding-left: initial

    @media (max-width: 1023px)
      width: 100%
      margin-bottom: 40px

.slider
  padding: 0 24px !important

.slide
  display: flex
  max-width: 1248px !important
  align-items: flex-start

  @media (max-width: 1200px)
    grid-gap: 48px

  @media (max-width: 1023px)
    flex-direction: column-reverse
    align-items: center

  img
    height: 600px
    object-fit: cover

    @media (max-width: 1023px)
      height: 100%
      max-height: 750px
      display: block
      max-width: 100%
      height: auto
      margin: 0 auto

  &:not(:global(.swiper-slide-active))
    opacity: 0.2

.navigation
  max-width: 1200px
  margin: 0 auto
  margin-top: 40px
  display: flex
  align-items: center
  justify-content: flex-start
  flex-wrap: wrap
  padding: 0 24px

  @media (max-width: 1200px)
    margin: initial
    padding: initial
    margin-top: 40px
    
  .swiper-pagination-bullets
    display: grid !important
    grid-template-columns: repeat(18, 1fr)

    @media (max-width: 1300px)
      max-width: none

    @media (max-width: 1023px)
      display: none !important

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
  margin-right: 32px
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

.content__link
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
