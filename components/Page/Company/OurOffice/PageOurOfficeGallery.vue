<template lang="pug">
  section(:class="$style['container']")
    typo-text(
      tag="h2"
      version="style-5"
    ) {{ $t('pages.our_office.gallery.title') }}
    //typo-text(
    //  tag="p"
    //  version="style-5"
    //) {{ $t('pages.our_office.gallery.sub_title') }}
    swiper(
      ref="swiper"
      :class="$style['slider']"
      class="swiper"
      :options="swiperOption"
      @click-slide="onClickToSlide"
    )
      swiper-slide(
        v-for="(slide, i) in slides"
        :key="i"
        :class="[$style['slide'], $style[`slide--${slide.variant}`]]"
      )
        div(:class="$style['slide__title']") {{ slide.title }}
        div(:class="$style['slide__image']")
          img(
            loading="lazy"
            decoding="async"
            class="swiper-lazy"
            :data-src="$img(`/our-office/gallery/${slide.folder}/${slide.image}`, $store.state.supportWebP ? { format: 'webp', width: 700 } : { width: 700 })"
          )
          div(class="swiper-lazy-preloader swiper-lazy-preloader-white")
      div(slot="pagination" :class="$style['pagination']")
        div(:class="['swiper-pagination-progressbar', $style['swiper-pagination-progressbar']]")
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import { Component, Vue } from 'nuxt-property-decorator'
import { SwiperOptions } from 'swiper'
import { modalsTriggerMixin } from '~/mixins/modals'

@Component({
  components: {
    TypoText,
  },
  mixins: [modalsTriggerMixin],
})
export default class PageOurOfficeGallery extends Vue {
  public slides: any = [
    {
      title: this.$i18n.t('pages.our_office.gallery.hall'),
      image: 'photo-1.jpg',
      variant: 'middle',
      gallery: [1, 5],
      folder: 'hall',
    },
    {
      title: this.$i18n.t('pages.our_office.gallery.room_1'),
      image: 'photo-1.jpg',
      variant: 'top',
      gallery: [1, 2],
      folder: 'meeting-1',
    },
    {
      title: this.$i18n.t('pages.our_office.gallery.sales_director'),
      image: 'photo-1.jpg',
      variant: 'bottom',
      gallery: [1, 8],
      folder: 'sales-director',
    },
    {
      title: this.$i18n.t('pages.our_office.gallery.room_2'),
      image: 'photo-1.jpg',
      variant: 'top',
      gallery: [1, 2],
      folder: 'meeting-2',
    },
    {
      title: this.$i18n.t('pages.our_office.gallery.ceo'),
      image: 'photo-1.jpg',
      variant: 'middle',
      gallery: [1, 26],
      folder: 'director',
    },
    {
      title: this.$i18n.t('pages.our_office.gallery.key'),
      image: 'photo-1.jpg',
      variant: 'bottom',
      gallery: [1, 14],
      folder: 'key-interiors',
    },
  ]

  public swiperOption: SwiperOptions = {
    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 3,
    },
    preloadImages: true,
    grabCursor: true,
    mousewheel: {
      forceToAxis: true,
    },
    pagination: {
      el: '.swiper-pagination-progressbar',
      type: 'progressbar',
    },
    breakpoints: {
      0: {
        spaceBetween: 40,
        slidesPerView: 1,
        centeredSlides: true,
      },
      1000: {
        spaceBetween: 40,
        slidesPerView: 2,
        centeredSlides: false,
      },
      1125: {
        spaceBetween: 90,
        slidesPerView: 'auto',
        centeredSlides: false,
      },
    },
  }

  public onClickToSlide(index: number) {
    const [min, max] = this.slides[index] ? this.slides[index].gallery : []

    if (min >= 0 && max >= 0) {
      const gallery = []

      for (let i = min; i <= max; i++) {
        gallery.push(`photo-${i}.jpg`)
      }

      this.showModal({
        name: 'modal-photo-gallery',
        modal: () => import('~/components/Modal/PhotoGallery/ModalPhotoGallery.vue'),
        options: {
          pivotY: 0,
          pivotX: 0,
          height: '100%',
          width: '100%',
          adaptive: false,
        },
        props: {
          title: this.slides[index].title,
          gallery,
          folder: this.slides[index].folder,
        },
        events: {
          'before-open': () => {
            document.documentElement.classList.add('modal-fullwidth-is-open')
          },
          'before-close': () => {
            if (document.body.getElementsByClassName('vm--container').length <= 1) {
              document.documentElement.classList.remove('modal-fullwidth-is-open')
            }
          },
        },
      })
    }
  }
}
</script>

<style lang="sass" module>
.container
  background-color: $color-black-96

  & > h2, & > p
    max-width: 1248px
    margin: 0 auto
    padding: 0 40px

    @media (max-width: 940px)
      padding: 0 24px

  & > h2
    margin-bottom: 8px
    color: $color-white-100

  & > p
    color: $color-white-100

.slider
  max-width: 100%
  padding: 40px 24px 41px !important

  @media (min-width: 2000px)
    max-width: 1935px
    margin: 0 auto

  @media (min-width: 941px)
    padding: 80px 40px 82px !important

  @media (min-width: 1125px)
    padding: 80px 80px 82px !important

.slide
  display: flex
  position: relative
  justify-content: center
  flex-direction: column
  cursor: pointer

  img
    height: 344px
    width: 457px
    max-width: 100%
    object-fit: cover

  &__image
    height: 344px
    width: 457px
    position: relative
    max-width: 100%

    &:after
      content: ''
      position: absolute
      top: 0
      bottom: 0
      right: 0
      left: 0
      background-color: $color-black-24
      z-index: 1

      @media (max-width: 1125px)
        display: none

  &__image img
    transition: opacity 0.25s ease
    opacity: 0

  &__image img[class*="swiper-lazy-loaded"]
    opacity: 1

  &__title
    +desktop-display-style-5
    color: $color-white-100
    margin-bottom: 24px

  @media (min-width: 1125px)
    height: 607px !important
    width: 585px !important

    &__image
      position: absolute
      z-index: 1

    &__title
      +desktop-display-style-2
      position: absolute
      z-index: 2
      margin-bottom: 0

    &--top &__title
      top: 103px
      left: 0

    &--top &__image
      top: 0
      right: 0

    &--middle &__title
      top: 276px
      left: 0

    &--middle &__image
      top: 173px
      right: 0

    &--bottom &__title
      top: 366px
      left: 0

    &--bottom &__image
      top: 263px
      right: 0

.pagination
  margin-top: 40px

  @media (min-width: 941px)
    margin-top: 80px

.swiper-pagination-progressbar
  height: 2px
  flex: 1 1 auto
  position: relative !important
  background: $color-white-4
  max-width: 1152px
  width: 100%
  margin: 0 auto

  span
    background: $color-white-96 !important
</style>
