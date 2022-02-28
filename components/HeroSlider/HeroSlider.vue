<template lang="pug">
  section(
    :class="[\
      $style['slider'],\
      isSliderPressed && $style['pressed'],\
      isSliderDisabled && $style['disabled']\
    ]"
  )
    div(:class="$style['slider__image-wrapper']")
      img(
        :class="$style['slider__image']"
        :src="$img(`/pages/home/hero-slider/${ slides[currentSlideIndex].image }`, $store.state.supportWebP ? { format: 'webp' } : {})"
        loading="lazy"
        decoding="async"
      )
    div(:class="$style['slider__nav']")
      div(:class="$style['slider__nav-prev']" @click="sliderTurnBackward")
        svg-icon(name="hero-slider-arrow")
      div(:class="$style['slider__nav-next']" @click="sliderTurnForward")
        svg-icon(name="hero-slider-arrow")
    div(
      ref="slider"
      :class="{\
        [$style['slide']]: true,\
      }"
      :data-cursor-text="$t('pages.home.hero_slider_data.coursor_data')"
      data-cursor-off-exclusion
    )
      div(:class="$style['slide__counter']")
        | {{ $t('pages.home.hero_slider_data.label_1') }} {{ currentSlideIndex + 1 }} {{ $t('pages.home.hero_slider_data.label_2') }} {{ slides.length }}
      div(
        ref="caption"
        :class="$style['slide__caption']"
      )
        typo-text(
          tag="h2"
          version="style-1"
          :class="$style['slide__caption-title']"
        ) {{ slides[currentSlideIndex].title }}
        typo-text(
          tag="h3"
          version="style-2"
          :class="$style['slide__caption-subtitle']"
        ) {{ slides[currentSlideIndex].sub_title }}
      div(
        ref="captionNext"
        :class="[$style['slide__caption'], $style['slide__caption--next']]"
      ) {{ slides[nextSlideIndex].title }}
      div(:class="$style['slide__info']")
        div(:class="$style['slide__info-line']")
          span(:class="$style['slide__info-text']") {{ slides[currentSlideIndex].location.city }}
          span(:class="$style['slide__info-text']") /
          span(:class="$style['slide__info-text']") {{ slides[currentSlideIndex].location.region }}
        div(:class="$style['slide__info-line']")
          span(:class="$style['slide__info-text']") {{ $t('pages.home.hero_slider_data.label_from') }}
          span(:class="$style['slide__info-text']") {{ slides[currentSlideIndex].price }}
          span(:class="$style['slide__info-text']") €
        div(:class="$style['slide__info-line']")
          svg-icon(name="swim")
          span(:class="$style['slide__info-text']") {{ slides[currentSlideIndex].sea }} {{ $t('pages.home.hero_slider_data.label_meter') }}
      div(:class="$style['slide__description']")
        | {{ slides[currentSlideIndex].description }}
</template>

<script lang="ts">
import $ from 'jquery'
import { gsap, Power2, Power3 } from 'gsap'
import Draggable from 'gsap/dist/Draggable'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import HeroSliderSlide from '~/components/HeroSlider/HeroSliderSlide.vue'
import TypoText from '~/components/Base/TypoText.vue'
import { IHeroSlide } from '~/types/HeroSlider'

if (process.client) {
  gsap.registerPlugin(Draggable)
}

@Component({ components: { HeroSliderSlide, TypoText } })
export default class HeroSlider extends Vue {
  @Prop({ type: Array, default: () => [], required: true }) slides!: IHeroSlide[]

  public currentSlideIndex: number = 0
  public nextSlideIndex: number = 1

  public isSliderPressed: boolean = false
  public isSliderDisabled: boolean = false
  public slideLinksParams: Array<string> = [
    'best-home-36-37-the-legend-12',
    'best-home-41-saga-37',
  ]

  createDraggableTween(): void {
    let lastPosCaption = { x: 0, y: 0 }
    let $captionNext = this.$refs.captionNext as Element

    Draggable.create(this.$refs.caption as Element, {
      trigger: this.$refs.slider as Element,
      type: 'x',
      throwProps: true,
      dragResistance: 0.5,
      onPress: (event: PointerEvent) => {
        lastPosCaption.x = event.x
        lastPosCaption.y = event.y

        this.isSliderPressed = true

        // Downscale caption on pressed
        gsap.to(this.$refs.caption as Element, {
          scale: 0.9,
          ease: Power3.easeInOut,
          duration: 0.3,
        })

        // Downscale next caption on pressed
        if (($(window).width() as number) > 1224) {
          gsap.to(this.$refs.captionNext as Element, {
            scale: 0.9,
            x: 0,
            ease: Power3.easeInOut,
            duration: 0.3,
          })
        } else {
          gsap.to(this.$refs.captionNext as Element, {
            scale: 0.9,
            ease: Power3.easeInOut,
            duration: 0.3,
          })
        }
      },
      onDrag: () => {
        // Moves next caption when drag main caption
        gsap.to($captionNext, {
          x: Draggable.get(this.$refs.caption as Element).endX,
          duration: 0.1,
        })
      },
      onRelease: (event: PointerEvent) => {
        const eventsX = [Math.floor(lastPosCaption.x), Math.floor(event.x)]
        const minX = Math.min(...eventsX)
        const maxX = Math.max(...eventsX)

        if (lastPosCaption.x - event.x > document.body.offsetWidth / 10 && maxX - minX > 50) {
          // Next slide
          // Move caption to left side from center
          this.sliderTurnForward()
        } else if (
          lastPosCaption.x - event.x < -(document.body.offsetWidth / 10) &&
          maxX - minX > 50
        ) {
          // Prev slide
          // Move caption to right side from center
          this.sliderTurnBackward()
        } else {
          // If not changed slide
          this.$router.push(
            this.localePath({
              name: 'properties-slug',
              params: { slug: this.slideLinksParams[this.currentSlideIndex] },
            }),
          )
          this.isSliderPressed = false

          // Set to default position caption
          gsap.to(this.$refs.caption as Element, {
            scale: 1,
            x: 0,
            y: 0,
            ease: Power3.easeInOut,
            duration: 0.3,
          })

          // Set to default position next caption
          gsap.to(this.$refs.captionNext as Element, {
            scale: 1,
            x: 0,
            y: 0,
            ease: Power3.easeInOut,
            duration: 0.3,
            onComplete: () => {
              this.isSliderDisabled = false
              Draggable.get(this.$refs.caption as Element).enable()
            },
          })
        }
      },
    })
  }

  sliderTurnBackward() {
    this.isSliderPressed = true

    gsap.to(this.$refs.caption as Element, {
      opacity: '0.5',
      x: ($(window).width() as number) > 1224 ? '+1000%' : '+105vw',
      scale: 1,
      ease: Power3.easeInOut,
      duration: 0.5,
    })

    // Move next caption to right side
    gsap.to(this.$refs.captionNext as Element, {
      opacity: '0',
      y: 0,
      x: '+100%',
      scale: 1,
      ease: Power3.easeInOut,
      duration: 0.5,
      onComplete: this.changeCaptionsBackward,
    })
  }

  /**
   * Callback of animation changing captions after release of prev slide
   */
  changeCaptionsBackward() {
    gsap.to(this.$refs.captionNext as Element, {
      x: '0%',
      duration: 0.01,
      onComplete: () => {
        gsap.to(this.$refs.caption as Element, {
          duration: 0.01,
          onComplete: () => {
            $(this.$refs.captionNext as Element).css({
              opacity: ($(window).width() as number) > 1224 ? 0.5 : 0,
            })

            $(this.$refs.caption as Element).css({
              opacity: 0,
            })

            this.changeSlideIndexToPrev()

            gsap.to(this.$refs.caption as Element, {
              x: '-100%',
              scale: 1,
              ease: Power3.easeInOut,
              duration: 0.01,
              onComplete: () => {
                gsap.to(this.$refs.caption as Element, {
                  x: '0',
                  opacity: 1,
                  ease: Power3.easeInOut,
                  duration: 0.5,
                  onComplete: () => {
                    this.isSliderPressed = false
                    this.isSliderDisabled = false
                    Draggable.get(this.$refs.caption as Element).enable()
                  },
                })
              },
            })
          },
        })
      },
    })
  }

  sliderTurnForward() {
    this.isSliderPressed = true

    gsap.to(this.$refs.caption as Element, {
      opacity: '0',
      scale: 1,
      x: '-100vw',
      ease: Power2.easeInOut,
      duration: 0.5,
    })

    // Move next caption from over right side to default right point
    gsap.to(this.$refs.captionNext as Element, {
      opacity: '1',
      x: ($(window).width() as number) > 1100 ? 0 : '24px',
      scale: 1,
      y: 0,
      // y: ($(window).width() as number) > 1100 ? 0 : (($(window).width() as number) <= 600 ? 0 : 24),
      left: 0,
      ease: Power2.easeInOut,
      duration: 0.5,
      onComplete: this.changeCaptionsForward,
    })
  }

  changeCaptionsForward() {
    gsap.to(this.$refs.caption as Element, {
      x: '0%',
      scale: 1,
      ease: Power2.easeInOut,
      duration: 0.05,
      onComplete: () => {
        this.changeSlideIndexToNext()

        $(this.$refs.caption as Element).css({
          opacity: '1',
        })

        $(this.$refs.captionNext as Element).css({
          opacity: ($(window).width() as number) > 1224 ? '0.5' : '0',
          left: '140%',
          x: 0,
          scale: 1,
        })

        this.isSliderPressed = false

        gsap.to(this.$refs.captionNext as Element, {
          left: '100%',
          ease: Power2.easeInOut,
          duration: 0.5,
          onComplete: () => {
            this.isSliderDisabled = false
            Draggable.get(this.$refs.caption as Element).enable()
          },
        })
      },
    })
  }

  changeSlideIndexToNext() {
    const currentSlideIndex = this.currentSlideIndex + 1
    const nextSlideIndex = currentSlideIndex + 1

    if (currentSlideIndex >= this.slides.length) {
      this.currentSlideIndex = 0
      this.nextSlideIndex = 1
    } else {
      this.currentSlideIndex = currentSlideIndex

      if (nextSlideIndex >= this.slides.length) {
        this.nextSlideIndex = 0
      } else {
        this.nextSlideIndex = nextSlideIndex
      }
    }
  }

  changeSlideIndexToPrev() {
    const currentSlideIndex = this.currentSlideIndex - 1
    const nextSlideIndex = currentSlideIndex - 1

    if (currentSlideIndex < 0) {
      this.currentSlideIndex = this.slides.length - 1
      this.nextSlideIndex = 0
    } else {
      this.currentSlideIndex = currentSlideIndex

      if (nextSlideIndex < 0) {
        this.nextSlideIndex = this.slides.length - 1
      } else {
        this.nextSlideIndex = nextSlideIndex
      }
    }
  }

  mounted(): void {
    // Register draggable animation
    this.createDraggableTween()
  }
}
</script>

<style lang="sass" module>
.slider
  margin: 0 24px 24px 24px
  width: calc(100% - 48px)
  touch-action: pan-y
  user-select: none
  perspective: 100vw
  overflow: hidden
  height: 43.2%
  min-height: 520px

  @media (max-width: 1224px)
    margin: 0 24px 24px
    width: calc(100% - 48px)

  &.disabled
    pointer-events: none

  &__nav
    display: flex
    align-items: center
    grid-gap: 16px
    position: absolute
    left: calc((100% - 1440px)/ 2 + 14.7rem)
    top: 128px
    opacity: 1
    transition: opacity 0.25s ease

    @media (max-width: 1100px)
      left: 24px
      top: auto
      bottom: 89px

    .pressed &
      opacity: 0

    &-prev, &-next
      cursor: pointer

      &, svg
        height: 32px
        width: 32px

    &-next
      transform: rotate(180deg)

  &__image
    height: auto
    display: block
    transition: transform .4s ease, height .4s ease, width .4s ease, top .4s linear, left .4s linear
    position: relative
    -webkit-backface-visibility: hidden
    backface-visibility: hidden
    -webkit-font-smoothing: subpixel-antialiased
    transform: perspective(1px)
    width: 100%
    will-change: height, width
    min-height: 520px
    object-fit: cover

    &-wrapper
      height: auto
      width: 100%
      -webkit-backface-visibility: hidden
      backface-visibility: hidden
      -webkit-font-smoothing: subpixel-antialiased
      position: relative

      &:after
        content: ''
        position: absolute
        top: 0
        bottom: 0
        right: 0
        left: 0
        background: rgba(17, 17, 17, 0.26)

  &-link
    &:after
      content: ''
      position: absolute
      top: 0
      bottom: 0
      right: 0
      left: 0

.slide
  position: absolute
  top: 64px
  left: calc((100% - 1440px)/ 2 + 25rem)
  width: 67%
  bottom: 64px

  @media (max-width: 1100px)
    left: 0
    padding: 24px
    top: 0
    z-index: unset
    width: 100%

  &__info
    display: flex
    align-items: center
    margin-top: 90px
    color: $color-white-100
    opacity: 1
    transition: opacity 0.25s ease

    @media (max-width: 1100px)
      display: none

    .pressed &
      opacity: 0

    &-text
      +style-5

    &-line
      display: flex
      align-items: center
      grid-gap: 6px

      & + &
        margin-left: 24px

      & svg
        fill: $color-white-100
        height: 20px
        width: 20px
        margin-right: 6px

  &__description
    margin-top: 40px
    +style-6
    color: $color-white-100
    opacity: 1
    transition: opacity 0.25s ease
    max-width: 900px

    @media (max-width: 1100px)
      display: none

    .pressed &
      opacity: 0

  &__counter
    +style-8
    color: $color-white-100
    opacity: 1
    transition: opacity 0.25s ease

    .pressed &
      opacity: 0

  &__caption
    +style-1($with-media: false)
    margin-bottom: 2rem
    height: 108px
    display: block
    padding-top: 0!important
    padding-bottom: 0!important
    white-space: nowrap
    text-decoration: none
    color: $color-white-100

    &-title
      margin: 0

    &-subtitle
      margin: 0

    @media (max-width: 1100px)
      font-size: 48px
      line-height: 72px
      font-weight: 700
      white-space: normal

    &--next
      position: absolute
      left: 100%
      top: 26px
      opacity: .5
      width: 10%

      @media (max-width: 1100px)
        top: 44px
</style>
