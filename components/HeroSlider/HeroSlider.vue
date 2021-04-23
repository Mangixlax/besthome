<template lang="pug">
  section(

    :class="[$style['slider'], isSlidePressed && $style['pressed']]"
    data-cursor-text="Click<br>and drag"
    data-cursor-off-exclusion
  )
    div(:class="$style['slider__image-wrapper']")
      img(:class="$style['slider__image']" src="~assets/images/img.16e05b0.jpg")
    button(@click.prevent="changeCaptionsBackward" style="position: relative; z-index: 999") TEST
    div(
      ref="slider"
      :class="{\
        [$style['slide']]: true,\
      }"
    )
      div(:class="$style['slide__counter']")
        | Projects {{ currentSlideIndex + 1 }} of {{ slides.length }}
      a(
        ref="caption"
        :class="$style['slide__caption']"
        href="#"
      ) {{ slides[currentSlideIndex].title }}
      div(
        ref="captionNext"
        :class="[$style['slide__caption'], $style['slide__caption--next']]"
      ) {{ slides[nextSlideIndex].title }}
</template>

<script lang="ts">
import $ from 'jquery'
import { gsap, Power2, Power3 } from 'gsap'
import Draggable from 'gsap/dist/Draggable'
import { Component, Vue } from 'nuxt-property-decorator'
import HeroSliderSlide from '~/components/HeroSlider/HeroSliderSlide.vue'

if (process.client) {
  gsap.registerPlugin(Draggable)
}

@Component({ components: { HeroSliderSlide } })
export default class HeroSlider extends Vue {
  public slides: Array<Object> = [
    {
      title: 'Cleopatra Select',
      description: 'Alanya / Saray Mahalle  From 19600 €',
    },
    {
      title: 'Select Cleopatra',
      description: 'Alanya / Saray Mahalle  From 19600 €',
    },
    {
      title: 'Cleopatra Select',
      description: 'Alanya / Saray Mahalle  From 19600 €',
    },
    {
      title: 'Select Cleopatra',
      description: 'Alanya / Saray Mahalle  From 19600 €',
    },
  ]

  public currentSlideIndex: number = 0
  public nextSlideIndex: number = 1

  public isSlidePressed: boolean = false

  createDraggableTween(): void {
    let lastPosCaption = { x: 0, y: 0 }
    let $captionNext = this.$refs.captionNext

    Draggable.create(this.$refs.caption as Element, {
      trigger: this.$refs.slider as Element,
      type: 'x',
      throwProps: true,
      dragResistance: 0.5,
      onPress: (event: PointerEvent) => {
        lastPosCaption.x = event.x
        lastPosCaption.y = event.y

        this.isSlidePressed = true

        // Downscale caption on pressed
        gsap.to(this.$refs.caption, {
          scale: 0.9,
          ease: Power3.easeInOut,
          duration: 0.3,
        })

        // Downscale next caption on pressed
        if (($(window).width() as number) > 1200) {
          gsap.to(this.$refs.captionNext, {
            scale: 0.9,
            x: 0,
            ease: Power3.easeInOut,
            duration: 0.3,
          })
        } else {
          gsap.to(this.$refs.captionNext, {
            scale: 0.9,
            ease: Power3.easeInOut,
            duration: 0.3,
          })
        }
      },
      onDrag: function () {
        // Moves next caption when drag main caption
        gsap.to($captionNext, {
          x: this.endX,
          duration: 0.1,
        })
      },
      onRelease: (event: PointerEvent) => {
        if (lastPosCaption.x - event.x > document.body.offsetWidth / 10) {
          // Next slide
          // Move caption to left side from center
          gsap.to(this.$refs.caption, {
            opacity: '0',
            scale: 1,
            x: '-100vw',
            ease: Power2.easeInOut,
            duration: 0.5,
          })

          // Move next caption from over right side to default right point
          gsap.to(this.$refs.captionNext, {
            opacity: '1',
            x: ($(window).width() as number) > 1200 ? 0 : ($(window).width() as number) <= 600 ? '25px' : '50px',
            scale: 1,
            y: 0,
            // fontSize: ($(window).width() as number) > 600 ? '80px' : '48px',
            // lineHeight: ($(window).width() as number) > 600 ? '108px' : '72px',
            left: 0,
            ease: Power2.easeInOut,
            duration: 0.5,
            onComplete: this.changeCaptionsForward,
          })
        } else if (lastPosCaption.x - event.x < -(document.body.offsetWidth / 10)) {
          // Prev slide
          // Move caption to right side from center
          gsap.to(this.$refs.caption, {
            opacity: '0.5',
            x: ($(window).width() as number) > 1200 ? '+1000%' : '105vw',
            scale: 1,
            // fontSize: ($(window).width() as number) > 601 ? '80px' : '48px',
            ease: Power3.easeInOut,
            duration: 0.5,
          })

          // Move next caption to right side
          gsap.to(this.$refs.captionNext, {
            opacity: '0',
            y: 0,
            x: '+100%',
            scale: 1,
            ease: Power3.easeInOut,
            duration: 0.5,
            onComplete: this.changeCaptionsBackward,
          })
        } else {
          // If not changed slide
          this.isSlidePressed = false

          // Set to default position caption
          gsap.to(this.$refs.caption, {
            scale: 1,
            x: 0,
            y: 0,
            ease: Power3.easeInOut,
            duration: 0.3,
          })

          // Set to default position next caption
          gsap.to(this.$refs.captionNext, {
            scale: 1,
            x: 0,
            y: 0,
            ease: Power3.easeInOut,
            duration: 0.3,
          })
        }
      },
    })
  }

  /**
   * Callback of animation changing captions after release of prev slide
   */
  changeCaptionsBackward() {
    gsap.to(this.$refs.captionNext, {
      x: '0%',
      duration: 0.01,
      onComplete: () => {
        gsap.to(this.$refs.caption, {
          duration: 0.01,
          onComplete: () => {
            $(this.$refs.captionNext).css({
              opacity: ($(window).width() as number) > 1200 ? 0.5 : 0,
            })

            $(this.$refs.caption).css({
              opacity: 0,
            })

            this.changeSlideIndexToPrev()

            gsap.to(this.$refs.caption, {
              x: '-100%',
              scale: 1,
              // fontSize: ($(window).width() as number) > 600 ? '80px' : '48px',
              ease: Power3.easeInOut,
              duration: 0.01,
              onComplete: () => {
                gsap.to(this.$refs.caption, {
                  x: '0',
                  opacity: 1,
                  ease: Power3.easeInOut,
                  duration: 0.5,
                  onComplete: () => {
                    this.isSlidePressed = false
                  },
                })
              },
            })
          },
        })
      },
    })
  }

  changeCaptionsForward() {
    console.log('FORWARD')
    gsap.to(this.$refs.caption, {
      x: '0%',
      scale: 1,
      // fontSize: ($(window).width() as number) > 600 ? '80px' : '48px',
      // lineHeight: ($(window).width() as number) > 600 ? '108px' : '72px',
      ease: Power2.easeInOut,
      duration: 0.05,
      onComplete: () => {
        this.changeSlideIndexToNext()

        $(this.$refs.caption).css({
          opacity: '1',
        })

        $(this.$refs.captionNext).css({
          opacity: ($(window).width() as number) > 1200 ? '0.5' : '0',
          // fontSize: ($(window).width() as number) > 601 ? '80px' : '48px',
          // lineHeight: ($(window).width() as number) > 601 ? '108px' : '72px',
          left: '140%',
          x: 0,
          scale: 1,
        })

        this.isSlidePressed = false

        gsap.to(this.$refs.captionNext, {
          left: '100%',
          ease: Power2.easeInOut,
          duration: 0.5,
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
  margin: 0 64px
  width: calc(100% - 128px)
  touch-action: pan-y
  user-select: none
  perspective: 100vw
  overflow: hidden
  height: 43.2%
  min-height: 520px

  @media (max-width: 1024px)
    margin: 0 24px
    width: calc(100% - 48px)

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
        background: rgba(17, 17, 17, 0.16)

.slide
  position: absolute
  top: 64px
  left: calc((100% - 1440px)/ 2 + 22rem)
  width: 65%

  @media (max-width: 1024px)
    left: 0
    padding: 24px
    top: 0
    z-index: unset
    width: 100%

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
    width: 10%
    height: 100%
    display: block
    padding-top: 0!important
    padding-bottom: 0!important
    white-space: nowrap
    text-decoration: none
    color: $color-white-100

    @media (max-width: 1024px)
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

      @media (max-width: 1024px)
        top: 44px
</style>
