<template lang="pug">
  modal-container(
    :name="name"
    :class="$style['modal']"
    white-mode
  )
    template(slot="body")
      div(:class="$style['modal__body']")
        div(:class="$style['title']") {{ title }}
        swiper(
          ref="swiper"
          :class="$style['slider']"
          class="swiper"
          :options="swiperOption"
        )
          swiper-slide(
            v-for="(slide, i) in gallery"
            :key="i"
            :class="[$style['slide'], $style[`slide--${slide.variant}`]]"
          )
            div(:class="$style['slide__image']")
              img(
                loading="lazy"
                decoding="async"
                class="swiper-lazy"
                :data-src="$img(`/our-office/gallery/${slide}`, $store.state.supportWebP ? { format: 'webp' } : {})"
                @load="updateSize"
              )
              div(class="swiper-lazy-preloader swiper-lazy-preloader-white")
        div(:class="$style['pagination']")
          span {{ currentSlideNumber }}
          span
          span {{ maxSlides }}
</template>

<script lang="ts">
import ModalContainer from '~/components/Modal/base/ModalContainer.vue'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Swiper, { SwiperOptions } from 'swiper'

@Component({
  components: {
    ModalContainer,
  },
})
export default class ModalPhotoGallery extends Vue {
  @Prop({ default: '', type: String }) name!: string
  @Prop({ default: '', type: String }) title!: string
  @Prop({ default: [], type: Array }) gallery!: Array<any>

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
    spaceBetween: 40,
    slidesPerView: 'auto',
    centeredSlides: false,
  }

  public currentSlideNumber: string | number = '01'
  public maxSlides: string | number = '01'

  // @ts-ignore
  public swiperInstance: Swiper | null

  // Recalculate offsets of slides
  public updateSize() {
    if (this.swiperInstance) {
      this.swiperInstance.updateSize()
      this.swiperInstance.updateSlides()
    }
  }

  public formatNumber(value: string | number) {
    if (value < 10) {
      return '0' + value
    }

    return value
  }

  mounted() {
    this.swiperInstance = (this.$refs.swiper as Vue).swiperInstance as Swiper
    this.maxSlides = this.formatNumber((this.gallery || []).length)

    this.swiperInstance.on('slideChange', () => {
      if (this.swiperInstance) {
        this.currentSlideNumber = this.formatNumber(this.swiperInstance?.activeIndex + 1)
      }
    })
  }
}
</script>

<style lang="sass" module>
.modal
  background-color: $color-black-96

  &__body
    display: flex
    flex-direction: column

.title
  +desktop-display-style-3
  color: $color-white-100
  margin: 64px

  @media (max-width: 760px)
    margin: 64px 88px 24px 24px
    +desktop-display-style-5

.pagination
  display: flex
  align-items: center
  +desktop-text-style-5
  color: $color-white-100
  padding: 40px 64px 64px

  @media (max-width: 760px)
    padding: 20px 24px 24px

  span:nth-child(2)
    width: 64px
    height: 1px
    margin: 0 17px
    background-color: $color-white-100

.slider
  max-width: 100%
  height: calc(80vh - 136px - 56px)
  padding: 0 64px

  @media (max-width: 760px)
    padding: 0 24px
    height: calc(80vh - 76px - 30px)

.slide
  display: flex
  position: relative
  justify-content: center
  flex-direction: column
  max-width: 1024px
  max-height: 682px
  height: 100%
  width: 100%

  img
    max-width: 1024px
    max-height: 682px
    height: 100%
    width: 100%
    object-fit: cover

  &__image
    max-width: 1024px
    max-height: 682px
    height: 100%
    width: 100%
    position: relative

  &__image img
    transition: opacity 0.25s ease
    opacity: 0

  &__image img[class*="swiper-lazy-loaded"]
    opacity: 1
</style>
