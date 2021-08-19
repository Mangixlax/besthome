<template lang="pug">
  section(:class="$style['container']")
    h2 Personal manager
    div(:class="$style['container__body']")
      div(:class="$style['managers__list']")
        div(
          v-for="(slide, index) in slides"
          :key="`manager-list-${index}`"
          :class="[$style['managers__list-item'], activeSlideIndex === index && $style['managers__list-item--active']]"
          @click="onClickToManager(index)"
        )
          span 0{{ index + 1 }}
          div {{ slide.name }}
      div(:class="$style['managers__slider']")
        swiper(
          ref="swiper"
          :class="$style['slider']"
          class="swiper"
          :options="swiperOption"
          @slideChange="onSlideChange"
        )
          swiper-slide(
            v-for="(slide, i) in slides"
            :key="i"
            :class="[$style['slide'], $style[`slide--${slide.variant}`]]"
          )
            div(:class="$style['slide__image']")
              img(:src="slide.image" loading="lazy")
            div(:class="$style['slide__text']") {{ slide.text }}
            div(:class="$style['slide__languages']") {{ slide.languages }}
            div(:class="$style['slide__contacts']")
              a(v-if="slide.phone" :href="`tel:${slide.phone}`")
                | {{ slide.phone }}
              a(v-if="slide.whatsapp" :href="slide.whatsapp")
                svg-icon(name="icon-whatsup")
              a(v-if="slide.viber" :href="slide.viber")
                svg-icon(name="icon-viber")
              a(v-if="slide.telegram" :href="slide.telegram")
                svg-icon(name="icon-telegram")
            div(v-if="slide.email" :class="$style['slide__link']")
              a(
                :href="`mailto:${slide.email}`"
                :class="$style['slide__link-email']"
              ) {{ slide.email }}
                svg-icon(name="link-arrow-white")
          div(slot="pagination" :class="$style['pagination']")
            button(
              :class="[$style['swiper-button-prev'], activeSlideIndex !== 0 && $style['swiper-button-prev--active']]"
              @click.prevent="$refs.swiper.swiperInstance.slidePrev()"
            )
              svg-icon(name="slider-prev-arrow-white")
            button(
              :class="[$style['swiper-button-next'], activeSlideIndex !== slides.length - 1 && $style['swiper-button-next--active']]"
              @click.prevent="$refs.swiper.swiperInstance.slideNext()"
            )
              svg-icon(name="slider-next-arrow-white")
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import { Component, Vue } from 'nuxt-property-decorator'
import Swiper from 'swiper'

@Component({
  components: {
    TypoText,
  },
})
export default class PageOurOfficeManager extends Vue {
  public slides: any = [
    {
      image: require('~/assets/images/our-team/person-2.jpg'),
      name: 'Anna Larina',
      text: 'Hello, I am Emrah Yetgin, I will answer any of your questions! We try to build with taste, use modern technologies, think through planning and landscaping of courtyards as we would do it for our own home.',
      languages: 'English, Turkish, Latvian, French, Russian',
      phone: '+90 530 547-44-15',
      whatsapp: 'https://wa.me/905305474415',
      viber: 'viber://chat?number=+905305474415',
      telegram: 'tg://resolve?domain=905305474415',
      email: 'anna@besthome.com.tr',
    },
    {
      image: require('~/assets/images/our-team/person-2.jpg'),
      name: 'Neval Onac',
      text: 'Hello, I am Emrah Yetgin, I will answer any of your questions! We try to build with taste, use modern technologies, think through planning and landscaping of courtyards as we would do it for our own home.',
      languages: 'English, Turkish, Latvian, French, Russian',
      phone: '+90 530 547-44-15',
      whatsapp: 'https://wa.me/905305474415',
      viber: 'viber://chat?number=+905305474415',
      telegram: 'tg://resolve?domain=905305474415',
      email: 'anna@besthome.com.tr',
    },
    {
      image: require('~/assets/images/our-team/person-2.jpg'),
      name: 'Roxie Cohen',
      text: 'Hello, I am Emrah Yetgin, I will answer any of your questions! We try to build with taste, use modern technologies, think through planning and landscaping of courtyards as we would do it for our own home.',
      languages: 'English, Turkish, Latvian, French, Russian',
      phone: '+90 530 547-44-15',
      whatsapp: 'https://wa.me/905305474415',
      viber: 'viber://chat?number=+905305474415',
      telegram: 'tg://resolve?domain=905305474415',
      email: 'anna@besthome.com.tr',
    },
    {
      image: require('~/assets/images/our-team/person-2.jpg'),
      name: 'Gulden Ay Gurer',
      text: 'Hello, I am Emrah Yetgin, I will answer any of your questions! We try to build with taste, use modern technologies, think through planning and landscaping of courtyards as we would do it for our own home.',
      languages: 'English, Turkish, Latvian, French, Russian',
      phone: '+90 530 547-44-15',
      whatsapp: 'https://wa.me/905305474415',
      viber: 'viber://chat?number=+905305474415',
      telegram: 'tg://resolve?domain=905305474415',
      email: 'anna@besthome.com.tr',
    },
  ]

  public activeSlideIndex: number = 0

  public swiperOption: Object = {
    spaceBetween: 40,
    slidesPerView: 1,
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination-progressbar',
      type: 'progressbar',
    },
  }

  public onSlideChange(swiper: Swiper) {
    this.activeSlideIndex = swiper.realIndex as number
  }

  public onClickToManager(managerIndex) {
    this.activeSlideIndex = managerIndex
    this.$refs.swiper && (this.$refs.swiper.swiperInstance as Swiper).slideTo(managerIndex)
  }
}
</script>

<style lang="sass" module>
.container
  background-color: $color-black-96

  & > h2, &__body
    max-width: 1248px
    margin: 0 auto
    padding: 0 40px

    @media (max-width: 940px)
      padding: 0 24px

  & > h2
    color: $color-white-48
    +desktop-text-style-5

  &__body
    display: flex
    justify-content: center
    gap: 32px
    height: 804px
    margin-top: 72px

.managers__list
  display: flex
  flex-direction: column
  justify-content: center
  width: 100%
  max-width: 416px

  @media (max-width: 940px)
    display: none

  &-item
    display: flex
    cursor: pointer

    & + &
      margin-top: 40px

    & > span,
    & > div
      transition: color 0.25s ease

    & > span
      +desktop-text-style-8
      color: $color-white-48
      width: 30px
      line-height: 26px

    & > div
      +desktop-display-style-3
      color: $color-white-48

    &--active > div
      color: $color-white-96

    &--active > span
      color: $color-blue

.managers__slider
  width: 100%
  max-width: 386px

.slider
  max-width: 100%

.slide
  display: flex
  position: relative
  justify-content: center
  flex-direction: column

  &__image
    height: 456px
    width: 386px
    max-width: 100%

    @media (max-width: 940px)
      height: auto
      width: auto

    img
      max-width: 100%
      object-fit: cover

  &__text
    +desktop-text-style-6
    color: $color-white-64
    margin-top: 32px
    margin-bottom: 32px

  &__languages
    +desktop-text-style-8
    color: $color-white-96
    margin-bottom: 12px

  &__contacts
    +desktop-text-style-8
    color: $color-white-96
    display: flex

    svg
      height: 20px
      width: 20px
      margin-left: 6px

  &__contacts a, &__link a
    color: $color-white-96
    text-decoration: none

  &__link
    margin-top: 12px

    a
      display: flex
      align-items: center
      text-decoration: underline
      text-decoration-color: $color-white-16
      text-underline-offset: 7px

      svg
        height: 32px
        width: 32px

.pagination
  margin-top: 32px
  display: flex
  grid-gap: 21px

.swiper-button-prev,
.swiper-button-next
  display: block
  outline: none
  padding: 0
  background-color: transparent
  border: none

  svg
    width: 32px
    height: 32px
    fill: $color-white-56
    transition: fill 0.25s ease

  &--active
    cursor: pointer

    svg
      fill: $color-white-100
</style>
