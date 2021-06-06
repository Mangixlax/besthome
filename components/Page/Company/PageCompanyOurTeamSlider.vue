<template lang="pug">
  div(:class="$style['container']")
    div(:class="$style['container__header']")
      typo-text(
        tag="h2"
        version="style-4"
      ) {{ $t('pages.our_team.slider_title') }}
    div(:class="$style['container__body']")
      swiper(ref="swiper" :class="$style['slider']" class="swiper" :options="swiperOption")
        swiper-slide(
          v-for="(card,i) in getOurCompanyCardInfo"
          :key="i"
          :class="$style['slide']"
        )
          page-company-personal-card(
            :card="card"
          )
        div(slot="pagination" :class="$style['footer']")
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
import PageCompanyPersonalCard from '~/components/Page/Company/PageCompanyPersonalCard.vue'

export default {
  name: 'PageCompanyOurTeamSlider',
  components: {
    Swiper,
    SwiperSlide,
    TypoText,
    PageCompanyPersonalCard,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: '3',
        breakpoints: {
          // when window width is >= 250
          250: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          // when window width is >= 600px
          600: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          // when window width is >= 900px
          900: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        },
        spaceBetween: 48,
        pagination: {
          el: '.swiper-pagination-progressbar',
          type: 'progressbar',
        },
      },
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
  max-width: 912px
  padding: 80px 24px
  margin: 0 auto

  &__header
    max-width: 951px
    width: 100%
    margin: 0 auto
    position: relative

    h2
      margin: 0

  &__body
    padding-top: 48px
    position: relative

.slide
  display: flex
  position: relative
  justify-content: center

  img
    object-fit: cover

.slider
  padding-bottom: 70px

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

  // span
  //   position: absolute
  //   left: 0
  //   top: 0
  //   width: 100%
  //   height: 100%
  //   transform: scale(0)
  //   transform-origin: left top
  //   background-color: #6C44AD

// .status-bar
//   background: $color-blue-100

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
