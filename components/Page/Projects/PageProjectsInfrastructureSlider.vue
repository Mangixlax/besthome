<template lang="pug">
  div(:class="$style['container']")
    div(:class="$style['container__header']")
      typo-text(tag="h2" version="style-4") {{ data.name }}
    div(:class="$style['container__body']")
      swiper(ref="swiper" :class="$style['slider']" class="swiper" :options="swiperOption")
        swiper-slide(
          v-for="(slide,i) in data.items"
          :key="i"
          :class="$style['slide']"
        )
          div(:class="$style['container__body-content']")
            svg-icon(:name="`infrastructures/${slide.icon}`")
            typo-text(tag="h3" version="style-5" v-html="slide.title")
            typo-text(tag="p" version="style-7" v-html="slide.text")
        div(slot="pagination" :class="$style['navigation']")
          div(:class="['swiper-pagination-progressbar', $style['swiper-pagination-progressbar']]")
            div(class="status-bar")
          div(:class="$style['buttons']")
            button(:class="[$style['swiper-button-prev']]" @click.prevent="$refs.swiper.swiperInstance.slidePrev()")
              svg-icon(name="slider-prev-arrow-blue")
            button(:class="[$style['swiper-button-next']]" @click.prevent="$refs.swiper.swiperInstance.slideNext()")
              svg-icon(name="slider-next-arrow-blue")
      div(:class="$style['footer']" v-html="data.footer")
</template>

<script lang="ts">
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import TypoText from '~/components/Base/TypoText.vue'
import PageCompanyPersonalCard from '~/components/Page/Company/PageCompanyPersonalCard.vue'
import { Component, Vue, Prop } from 'nuxt-property-decorator'

interface ISlider {
  name: string
  footer: string
  items: ISliderItem[]
}

interface ISliderItem {
  title: string
  text: string
  icon: string
  sort_order: number
}

@Component({
  components: {
    Swiper,
    SwiperSlide,
    TypoText,
    PageCompanyPersonalCard,
  },
})
export default class PageProjectsInfrastructureSlider extends Vue {
  @Prop({ type: Object, default: () => {} }) data!: ISlider

  public swiperOption: object = {
    breakpoints: {
      // when window width is >= 900px
      600: {
        slidesPerView: 1,
        spaceBetween: 24,
      },
      900: {
        slidesPerView: 2,
        spaceBetween: 32,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 48,
      },
    },
    spaceBetween: 24,
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
  padding: 80px 0
  margin: 0 auto

  @media (max-width: 1000px)
    padding: 40px 24px

  &__header
    max-width: 864px
    margin: 0 auto

    h2
      margin: 0

  &__body
    padding: 48px 24px 0
    max-width: 864px + 48px
    margin: 0 auto

    @media (max-width: 900px)
      padding: 40px 0

    &-content
      max-width: 256px

      h3
        color: $color-black-100
        margin: 16px 0

      p
        letter-spacing: 0.003em
        color: $color-black-80

      @media (max-width: 600px)
        max-width: 100%

      svg
        width: 72px
        height: 72px

.slide
  display: flex
  justify-content: center

.navigation
  max-width: 1296px
  margin: 32px auto
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
  margin: 0 auto
  flex-wrap: wrap

  p
    +style-5

  a
    white-space: nowrap
    text-decoration: underline
    text-decoration-color: $color-blue-16
    text-underline-offset: 7px
    color: $color-blue-100

    @media (max-width: 355px)
      margin-left: initial
</style>
