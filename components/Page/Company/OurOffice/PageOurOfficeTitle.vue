<template lang="pug">
  div(:class="$style['title']")
    div(:class="$style['title__container']")
      div(:class="$style['title__container-textbox']")
        h1(
          :class="$style['title__container-title']"
          v-html="data.title"
        )
        p(
          :class="$style['title__container-subtitle']"
          v-html="data.sub_title"
        )
      div(:class="$style['title__container-slider']")
        swiper(ref="swiper" :class="$style['slider']" class="swiper" :options="swiperOption")
          swiper-slide(
            v-for="(slideImage, slideIndex) in slides"
            :key="slideIndex"
            :class="$style['slide']"
          )
            img(
              loading="lazy"
              decoding="async"
              :class="['swiper-lazy', $style['slide__image']]"
              :data-src="$img(`/pages/company/our-office/${slideImage}`, $store.state.supportWebP ? { format: 'webp' } : {})"
            )
            div(class="swiper-lazy-preloader swiper-lazy-preloader-white")
          div(slot="pagination" :class="$style['pagination']")
            div(:class="$style['buttons']")
              button(:class="[$style['swiper-button-prev']]" @click.prevent="$refs.swiper.swiperInstance.slidePrev()")
                | {{ $i18n.locale === 'ru' ? 'Назад' : 'Prev' }}
              div(:class="['swiper-pagination-progressbar', $style['swiper-pagination-progressbar']]")
              button(:class="[$style['swiper-button-next']]" @click.prevent="$refs.swiper.swiperInstance.slideNext()")
                | {{ $i18n.locale === 'ru' ? 'Вперед' : 'Next' }}
      div(
        :class="$style['title__container-play_button']"
        @click="showVideo"
        data-cursor-text
        v-magnetic
      )
        svg-icon(name="play-icon" v-magnetic)
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import CommonSubscribe from '~/components/Common/CommonSubscribe.vue'
import { modalsTriggerMixin } from '~/mixins/modals'
import Magnetic from '~/directives/magnetic'
import { SwiperOptions } from 'swiper'

interface IOurOfficeTitle {
  title: string
  sub_title: string
}

@Component({
  components: {
    TypoText,
    CommonSubscribe,
  },
  mixins: [modalsTriggerMixin],
  directives: { Magnetic },
})
export default class PageOurOfficeTitle extends Vue {
  @Prop({ type: Object, default: () => {} }) data!: IOurOfficeTitle

  public slides: Array<string> = [
    'slide-1.jpg',
    'slide-2.jpg',
    'slide-3.jpg',
  ]

  public swiperOption: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 32,
    centeredSlides: true,
    lazy: true,
    preloadImages: false,
    grabCursor: true,
    mousewheel: {
      forceToAxis: true,
    },
    pagination: {
      el: '.swiper-pagination-progressbar',
      type: 'progressbar',
    },
  }

  public showVideo() {
    this.showModal({
      name: 'modal-video',
      modal: () => import('~/components/Modal/Video/ModalVideo.vue'),
      props: {
        src: 'https://storage.yandexcloud.net/besthome/video/office-v2-720.mp4',
      },
      options: {
        height: 'auto',
        width: '100%',
      },
      events: {
        'before-open': () => {
          document.documentElement.classList.add('modal-fullwidth-is-open', 'modal-video-is-open')
        },
        'before-close': () => {
          if (document.body.getElementsByClassName('vm--container').length <= 1) {
            document.documentElement.classList.remove(
              'modal-fullwidth-is-open',
              'modal-video-is-open',
            )
          }

          this.$root.$emit('cursor-mover:reset')
        },
      },
    })
  }
}
</script>

<style lang="sass" module>
.title
  max-width: 100%
  background: $color-black-96

  &__container
    max-width: 1488px
    margin: 0 auto
    padding: 0 24px
    display: flex
    position: relative
    grid-gap: 32px

    @media (max-width: 1080px)
      flex-direction: column

    &-textbox
      color: $color-white-96
      position: absolute
      top: 179px
      right: 144px
      display: flex
      flex-direction: column
      max-width: 808px
      z-index: 2

      @media (max-width: 1080px)
        max-width: 608px
        position: initial
        margin-left: auto
        margin-right: auto
        text-align: left

    &-title
      +desktop-display-style-1
      margin: 0

      @media (max-width: 1080px)
        +desktop-display-style-2

      @media (max-width: 640px)
        +desktop-display-style-3

    &-subtitle
      +desktop-text-style-5
      align-self: flex-end
      max-width: 480px
      margin: 0 80px 0 0

      @media (max-width: 1080px)
        align-self: flex-start
        margin: 24px 0 0

      @media (max-width: 640px)
        +desktop-text-style-6
        margin-right: 80px

    &-play_button
      position: absolute
      bottom: 0
      right: 579px
      display: flex
      align-items: center
      justify-content: center
      height: 125px
      width: 125px
      border-radius: 50%
      background-color: $color-blue-100
      cursor: pointer

      @media (max-width: 1080px)
        top: 190px
        bottom: auto
        right: calc((100vw - 608px) / 2)
        width: 80px
        height: 80px

      @media (max-width: 640px)
        top: 190px
        bottom: auto
        right: 24px
        width: 80px
        height: 80px

      @media (max-width: 420px)
        top: auto
        bottom: -146px
        right: 24px
        width: 60px
        height: 60px

      svg
        height: 84px
        width: 84px
        padding: 26px
        fill: $color-white-100

        @media (max-width: 420px)
          width: 42px
          height: 42px
          padding: 8px

.slider
  max-width: 608px
  margin-bottom: 87px

  @media (max-width: 1080px)
    margin-bottom: initial

.slide
  display: flex
  position: relative
  justify-content: center

  img
    width: 608px
    max-width: 100%
    object-fit: cover
    object-position: center
    height: 670px

    @media (max-width: 1080px)
      height: initial
      min-height: 350px

  &__image
    transition: opacity 0.25s ease
    opacity: 0

  &__image[class*="swiper-lazy-loaded"]
    opacity: 1

.pagination
  margin-top: 20px
  max-width: 383px
  margin-left: auto

  @media (max-width: 1080px)
    max-width: 100%

.swiper-pagination-progressbar
  position: relative !important
  height: 2px
  flex: 1 1 auto
  background: $color-white-4
  max-width: 860px
  width: 100%

  span
    background: $color-white-96 !important

.swiper-button-prev,
.swiper-button-next
  +desktop-text-style-7
  display: block
  margin-left: auto
  outline: none
  padding: 0
  background-color: transparent
  border: none
  color: $color-white-48

.swiper-button-next
  color: $color-white-100

.buttons
  display: flex
  grid-gap: 24px
  align-items: center
</style>
