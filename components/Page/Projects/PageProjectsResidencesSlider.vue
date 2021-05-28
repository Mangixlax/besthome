<template lang="pug">
  div(:class="$style['container']")
    div(:class="$style['container__header']")
      typo-text(
        tag="h2"
        version="style-3"
        :class="$style['container__header-title']"
      ) Residences offer
      typo-text(
        tag="p"
        version="style-7"
        :class="$style['container__header-text']"
      ) Choose the right apartment for your needs, taste, and possibilities.
      typo-text(
        tag="p"
        version="style-7"
        :class="$style['container__header-text']"
      ) We offer apartments with 1 - 4 separate rooms.
    common-tabs(:class="$style['tabs']")
      common-tab(title="1 rooms")
        div(:class="$style['container__body']")
          swiper(ref="swiper_1" :class="$style['slider']" class="swiper" :options="swiperOption")
            swiper-slide(
              v-for="(slide,i) in projectsSliderData"
              :key="i"
              :class="$style['slide']"
            )
              div(:class="$style['container__body-image']")
                img(:src="require(`@/assets/images/projects-residences-slider/1-rooms/${slide}`)")
              div(:class="$style['container__body-description']")
                typo-text(
                  tag="p"
                  version="style-4"
                  :class="$style['container__body-description']"
                ) From
                typo-text(
                  tag="p"
                  version="style-2"
                  :class="$style['container__body-description']"
                ) 44.53m²
                typo-text(
                  tag="p"
                  version="style-7"
                  :class="$style['container__body-description']"
                ) We offer apartments with 1 - 4 separate rooms.
            div(slot="pagination" :class="$style['navigation']")
              div(:class="['swiper-pagination-progressbar', $style['swiper-pagination-progressbar']]")
                div(class="status-bar")
              div(:class="$style['buttons']")
                button(:class="[$style['swiper-button-prev']]" @click.prevent="$refs.swiper_1.swiperInstance.slidePrev()")
                  svg-icon(name="slider-prev-arrow-blue")
                button(:class="[$style['swiper-button-next']]" @click.prevent="$refs.swiper_1.swiperInstance.slideNext()")
                  svg-icon(name="slider-next-arrow-blue")
      common-tab(title="2 rooms")
        div(:class="$style['container__body']")
          swiper(ref="swiper_2" :class="$style['slider']" class="swiper" :options="swiperOption")
            swiper-slide(
              v-for="(slide,i) in projectsSliderData"
              :key="i"
              :class="$style['slide']"
            )
              div(:class="$style['container__body-image']")
                img(:src="require(`@/assets/images/projects-residences-slider/1-rooms/${slide}`)")
              div(:class="$style['container__body-description']")
                typo-text(
                  tag="p"
                  version="style-4"
                  :class="$style['container__body-description']"
                ) From
                typo-text(
                  tag="p"
                  version="style-2"
                  :class="$style['container__body-description']"
                ) 44.53m²
                typo-text(
                  tag="p"
                  version="style-7"
                  :class="$style['container__body-description']"
                ) We offer apartments with 1 - 4 separate rooms.
            div(slot="pagination" :class="$style['navigation']")
              div(:class="['swiper-pagination-progressbar', $style['swiper-pagination-progressbar']]")
                div(class="status-bar")
              div(:class="$style['buttons']")
                button(:class="[$style['swiper-button-prev']]" @click.prevent="$refs.swiper_2.swiperInstance.slidePrev()")
                  svg-icon(name="slider-prev-arrow-blue")
                button(:class="[$style['swiper-button-next']]" @click.prevent="$refs.swiper_2.swiperInstance.slideNext()")
                  svg-icon(name="slider-next-arrow-blue")
      common-tab(title="2,5 rooms")
        div(:class="$style['container__body']")
          swiper(ref="swiper_3" :class="$style['slider']" class="swiper" :options="swiperOption")
            swiper-slide(
              v-for="(slide,i) in projectsSliderData"
              :key="i"
              :class="$style['slide']"
            )
              div(:class="$style['container__body-image']")
                img(:src="require(`@/assets/images/projects-residences-slider/1-rooms/${slide}`)")
              div(:class="$style['container__body-description']")
                typo-text(
                  tag="p"
                  version="style-4"
                  :class="$style['container__body-description']"
                ) From
                typo-text(
                  tag="p"
                  version="style-2"
                  :class="$style['container__body-description']"
                ) 44.53m²
                typo-text(
                  tag="p"
                  version="style-7"
                  :class="$style['container__body-description']"
                ) We offer apartments with 1 - 4 separate rooms.
            div(slot="pagination" :class="$style['navigation']")
              div(:class="['swiper-pagination-progressbar', $style['swiper-pagination-progressbar']]")
                div(class="status-bar")
              div(:class="$style['buttons']")
                button(:class="[$style['swiper-button-prev']]" @click.prevent="$refs.swiper_3.swiperInstance.slidePrev()")
                  svg-icon(name="slider-prev-arrow-blue")
                button(:class="[$style['swiper-button-next']]" @click.prevent="$refs.swiper_3.swiperInstance.slideNext()")
                  svg-icon(name="slider-next-arrow-blue")
      common-tab(title="3 rooms")
        div(:class="$style['container__body']")
          swiper(ref="swiper_2" :class="$style['slider']" class="swiper" :options="swiperOption")
            swiper-slide(
              v-for="(slide,i) in projectsSliderData"
              :key="i"
              :class="$style['slide']"
            )
              div(:class="$style['container__body-image']")
                img(:src="require(`@/assets/images/projects-residences-slider/1-rooms/${slide}`)")
              div(:class="$style['container__body-description']")
                typo-text(
                  tag="p"
                  version="style-4"
                  :class="$style['container__body-description']"
                ) From
                typo-text(
                  tag="p"
                  version="style-2"
                  :class="$style['container__body-description']"
                ) 44.53m²
                typo-text(
                  tag="p"
                  version="style-7"
                  :class="$style['container__body-description']"
                ) We offer apartments with 1 - 4 separate rooms.
            div(slot="pagination" :class="$style['navigation']")
              div(:class="['swiper-pagination-progressbar', $style['swiper-pagination-progressbar']]")
                div(class="status-bar")
              div(:class="$style['buttons']")
                button(:class="[$style['swiper-button-prev']]" @click.prevent="$refs.swiper_2.swiperInstance.slidePrev()")
                  svg-icon(name="slider-prev-arrow-blue")
                button(:class="[$style['swiper-button-next']]" @click.prevent="$refs.swiper_2.swiperInstance.slideNext()")
                  svg-icon(name="slider-next-arrow-blue")
      common-tab(title="4 rooms")
        div(:class="$style['container__body']")
          swiper(ref="swiper_2" :class="$style['slider']" class="swiper" :options="swiperOption")
            swiper-slide(
              v-for="(slide,i) in projectsSliderData"
              :key="i"
              :class="$style['slide']"
            )
              div(:class="$style['container__body-image']")
                img(:src="require(`@/assets/images/projects-residences-slider/1-rooms/${slide}`)")
              div(:class="$style['container__body-description']")
                typo-text(
                  tag="p"
                  version="style-4"
                  :class="$style['container__body-description']"
                ) From
                typo-text(
                  tag="p"
                  version="style-2"
                  :class="$style['container__body-description']"
                ) 44.53m²
                typo-text(
                  tag="p"
                  version="style-7"
                  :class="$style['container__body-description']"
                ) We offer apartments with 1 - 4 separate rooms.
            div(slot="pagination" :class="$style['navigation']")
              div(:class="['swiper-pagination-progressbar', $style['swiper-pagination-progressbar']]")
                div(class="status-bar")
              div(:class="$style['buttons']")
                button(:class="[$style['swiper-button-prev']]" @click.prevent="$refs.swiper_2.swiperInstance.slidePrev()")
                  svg-icon(name="slider-prev-arrow-blue")
                button(:class="[$style['swiper-button-next']]" @click.prevent="$refs.swiper_2.swiperInstance.slideNext()")
                  svg-icon(name="slider-next-arrow-blue")    
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import TypoText from '~/components/Base/TypoText.vue'
import CommonTab from '~/components/Common/CommonTab.vue'
import CommonTabs from '~/components/Common/CommonTabs.vue'

export default {
  name: 'PagesMestaBlisko',
  components: {
    Swiper,
    SwiperSlide,
    TypoText,
    CommonTab,
    CommonTabs,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        pagination: {
          el: '.swiper-pagination-progressbar',
          type: 'progressbar',
        },
      },
      projectsSliderData: [
        '1-rooms-1.jpg',
        '1-rooms-2.jpg',
        '1-rooms-3.jpg',
        '1-rooms-4.jpg',
        '1-rooms-5.jpg',
        '1-rooms-6.jpg',
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
  padding: 80px 0
  margin: 0 auto

  &__header
    max-width: 912px
    margin: 0 auto
    padding: 0 24px

    &-title
      text-align: center
      margin: 0
      padding: 24px 0 32px

    &-text
      text-align: center
      margin: 0

  &__body
    width: 100%
    background-color: $color-black-4
    padding: 80px 24px

    &-image
      padding: 16px 28px

    &-description
      display: flex
      margin-left: 32px
      flex-direction: column
      justify-content: center

      p
        margin: 0

.slider
  max-width: 911px !important
  min-width: 0 !important

.slide
  // width: auto !important
  display: flex

  @media (max-width: 600px)
    flex-direction: column

  img
    object-fit: cover
    width: 100%

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
