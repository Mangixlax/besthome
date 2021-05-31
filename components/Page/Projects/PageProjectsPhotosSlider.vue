<template lang="pug">
  div(:class="$style['container']")
    div(:class="$style['container__header']")
      typo-text(
        tag="h2"
        version="style-4"
      ) Photos
    div(:class="$style['container__body']")
      swiper(ref="swiper" :class="$style['slider']" class="swiper" :options="swiperOption")
        swiper-slide(
          v-for="(slide,i) in projectsSliderData"
          :key="i"
          :class="$style['slide']"
        ) 
          div(:class="$style['container__body-image']")
            img(:src="require(`@/assets/images/projects-photos-slider/${slide}`)")
        div(slot="pagination" :class="$style['navigation']")
          div(:class="['swiper-pagination-progressbar', $style['swiper-pagination-progressbar']]")
            div(class="status-bar")
          div(:class="$style['buttons']")
            button(:class="[$style['swiper-button-prev']]" @click.prevent="$refs.swiper.swiperInstance.slidePrev()")
              svg-icon(name="slider-prev-arrow-blue")
            button(:class="[$style['swiper-button-next']]" @click.prevent="$refs.swiper.swiperInstance.slideNext()")
              svg-icon(name="slider-next-arrow-blue")
      div(:class="$style['footer']") 
        typo-text(
          tag="p"
          version="style-5"
          :class="$style['footer__link-text']"
        ) Cleopatra Select 
        typo-text(
          tag="nuxt-link"
          version="style-5"
          :to="localePath({ name: 'index' })"
          :class="$style['footer__link-text--underline']"
        ) сhoose an apartment
        | .
        typo-text(
          tag="nuxt-link"
          version="none"
          :to="localePath({ name: 'index' })"
          :class="$style['footer__link-arrow']"
        )
          svg-icon(name="link-arrow-blue")
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import TypoText from '~/components/Base/TypoText.vue'
import PageCompanyPersonalCard from '~/components/Page/Company/PageCompanyPersonalCard.vue'

export default {
  name: 'PageProjectsPhotosSlider',
  components: {
    Swiper,
    SwiperSlide,
    TypoText,
    PageCompanyPersonalCard,
  },
  data() {
    return {
      swiperOption: {
        breakpoints: {
          // when window width is >= 900px
          900: {
            slidesPerView: 1,
            spaceBetween: 32,
          },
          1200: {
            slidesPerView: 'auto',
            spaceBetween: 64,
          },
        },
        spaceBetween: 64,
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
  computed: {
    getOurCompanyCardInfo() {
      return this.$store.state.ourCompanyCardInfo
    },
  },
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
    padding: 80px 0

    @media (max-width: 900px)
      padding: 40px 0

.slide
  display: flex
  justify-content: center

  @media (min-width: 1200px)
    width: auto !important

  img
    object-fit: cover
    height: 100%

.navigation
  max-width: 1296px
  margin: 0 auto
  margin-top: 56px
  display: flex
  align-items: center
  justify-content: space-between
  margin-bottom: 95px

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
    width: 26px
    height: 26px

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
