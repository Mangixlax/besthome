<template lang="pug">
  section(:class="$style['container']")
    typo-text(
      tag="h2"
      version="style-5"
    ) {{ $t('pages.our_office.about.title') }}
    typo-text(
      tag="p"
      version="style-5"
    ) {{ $t('pages.our_office.about.sub_title') }}
    swiper(ref="swiper" :class="$style['slider']" class="swiper" :options="swiperOption")
      swiper-slide(
        v-for="(slide, i) in slides"
        :key="i"
        :class="[$style['slide'], $style[`slide--${slide.variant}`]]"
      )
        typo-text(
          tag="div"
          version="style-8"
          :class="$style['slide__sup-title']"
        ) {{ slide.sup_title }}
        typo-text(
          tag="div"
          version="style-2"
          :class="$style['slide__title']"
        ) {{ slide.title }}
        div(:class="$style['slide__image']")
          img(:src="slide.image" loading="lazy")
      div(slot="pagination" :class="$style['pagination']")
        div(:class="['swiper-pagination-progressbar', $style['swiper-pagination-progressbar']]")
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {
    TypoText,
  },
})
export default class PageOurOfficeGallery extends Vue {
  public slides: any = [
    {
      title: 'Waiting room #1',
      sup_title: 'Additional name',
      image: require('~/assets/images/our-office/gallery/photo-1.jpg'),
      variant: 'middle',
    },
    {
      title: 'Waiting room #2',
      sup_title: 'Additional name',
      image: require('~/assets/images/our-office/gallery/photo-1.jpg'),
      variant: 'top',
    },
    {
      title: 'Waiting room #3',
      sup_title: 'Additional name',
      image: require('~/assets/images/our-office/gallery/photo-1.jpg'),
      variant: 'bottom',
    },
    {
      title: 'Waiting room #4',
      sup_title: 'Additional name',
      image: require('~/assets/images/our-office/gallery/photo-1.jpg'),
      variant: 'middle',
    },
    {
      title: 'Waiting room #5',
      sup_title: 'Additional name',
      image: require('~/assets/images/our-office/gallery/photo-1.jpg'),
      variant: 'top',
    },
    {
      title: 'Waiting room #6',
      sup_title: 'Additional name',
      image: require('~/assets/images/our-office/gallery/photo-1.jpg'),
      variant: 'bottom',
    },
  ]

  public swiperOption: Object = {
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
    color: $color-white-48

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

  img
    height: 344px
    width: 457px
    max-width: 100%
    object-fit: cover

  &__title
    color: $color-white-100

  &__sup-title
    color: $color-white-48

  @media (min-width: 1125px)
    height: 607px !important
    width: 585px !important

    &__image
      position: absolute
      z-index: 1

    &__title
      position: absolute
      z-index: 2

    &__sup-title
      position: absolute
      z-index: 2

    &--top &__title
      top: 103px
      left: 0

    &--top &__sup-title
      top: 76px
      left: 0

    &--top &__image
      top: 0
      right: 0

    &--middle &__title
      top: 276px
      left: 0

    &--middle &__sup-title
      top: 249px
      left: 0

    &--middle &__image
      top: 173px
      right: 0

    &--bottom &__title
      top: 366px
      left: 0

    &--bottom &__sup-title
      top: 339px
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
