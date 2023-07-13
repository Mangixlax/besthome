<template lang="pug">
  div(:class="$style['container']")
    section(:class="$style['container__header']")
      h2 {{ data.title }}
      p {{ data.text }}
    section(
      ref="container"
      :class="[$style['container__body'], hovered && $style['hovered']]"
      :style="{ paddingTop: `${data.image_padding}%` }"
    )
      img(:src="data.image" loading="lazy")
      div(ref="svg" :class="$style['container__image-svg']" v-html="data.svg_html")
      ul(ref="tooltips" :class="$style['container__tooltips']")
        li(
          v-for="(item, key) in data.items"
          :key="item.point_code"
          :class="$style['container__tooltips-item']"
          :data-point-code="item.point_code"
        )
          h3(v-html="item.title")
          p(v-html="item.text")
    swiper(ref="mySwiper" :class="$style['slider']" class="swiper" :options="swiperOption" @slideChange="onSlideChange")
      swiper-slide(
        v-for="(item, i) in data.items"
        :key="i"
        :class="$style['slide']"
      )
        typo-text(tag="div" version="style-4" v-html="item.title" :class="$style['slide__title']")
        typo-text(tag="div" version="style-7" v-html="item.text" :class="$style['slide__text']")
      div(slot="pagination" :class="$style['navigation']")
        div(:class="$style['buttons']")
          button(:class="[$style['swiper-button-prev']]" @click.prevent="$refs.mySwiper.swiperInstance.slidePrev()")
            svg-icon(name="slider-prev-arrow-blue")
          button(:class="[$style['swiper-button-next']]" @click.prevent="$refs.mySwiper.swiperInstance.slideNext()")
            svg-icon(name="slider-next-arrow-blue")
</template>

<script lang="ts">
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { SwiperOptions } from 'swiper'
import TypoText from '~/components/Base/TypoText.vue'
import { SwiperComponent } from 'swiper/types'

interface IData {
  title: string
  text: string
  image: string
  svg_html: string
  image_padding: string
  items: IDataItem[]
}

interface IDataItem {
  title: string
  text: string
  point_code: string
  sort_order: number
}

@Component({
  components: {
    TypoText,
    Swiper,
    SwiperSlide,
  },
})
export default class HeroImageTooltips extends Vue {
  @Prop({ type: Object, default: () => ({}) }) data!: IData

  public swiperOption: SwiperOptions = {
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 64,
    loop: false,
    autoHeight: true,
    autoplay: false,
    pagination: {
      el: '.swiper-pagination-bullets',
      renderBullet(index, className) {
        return `<span class="${className} swiper-pagination-bullet-map"></span>`
      },
      clickable: true,
    },
  }

  public $lastMouseEnteredTooltip: HTMLElement | null = null

  public hovered: boolean = false

  public async mounted() {
    await this.$nextTick()

    // Bind events to points
    ;((this.$refs.svg as Element).querySelectorAll('div') || []).forEach((el: Element) => {
      el.addEventListener('mouseenter', this.onMouseEnterPoint)
      el.addEventListener('mouseleave', this.onMouseLeavePoint)
    })

    this.setActiveSlide(0)
  }

  public beforeDestroy() {
    ;((this.$refs.svg as Element).querySelectorAll('div') || []).forEach((el: Element) => {
      el.removeEventListener('mouseenter', this.onMouseEnterPoint)
      el.removeEventListener('mouseleave', this.onMouseLeavePoint)
    })
  }

  public onMouseEnterPoint(event: Event) {
    if (window.innerWidth <= 900) return

    const $target: Element = event.currentTarget as Element

    // Set rect of tooltip and container
    const tooltipRect: DOMRect = $target.getBoundingClientRect()
    const containerRect: DOMRect = (this.$refs.container as Element).getBoundingClientRect()

    // Remember last hovered tooltip
    this.$lastMouseEnteredTooltip = (this.$refs.tooltips as Element).querySelector(
      `[data-point-code="${$target.id}"]`,
    ) as HTMLElement

    this.hovered = true

    // If tooltip is found
    if (this.$lastMouseEnteredTooltip) {
      /**
       * Calculate top position
       */
      const tooltipOffsetTop: number = tooltipRect.y + window.scrollY
      const containerOffsetTop: number = containerRect.y + window.scrollY
      let left: number = 0
      let top: number = 0

      switch ($target.getAttribute('data-pos')) {
        case 'top':
          top =
            tooltipOffsetTop -
            containerOffsetTop -
            this.$lastMouseEnteredTooltip.clientHeight -
            tooltipRect.height / 2

          left = tooltipRect.x - containerRect.x - this.$lastMouseEnteredTooltip.clientWidth / 2 + 24
          break
        case 'left':
          top =
            tooltipOffsetTop -
            containerOffsetTop -
            this.$lastMouseEnteredTooltip.clientHeight / 2 +
            tooltipRect.height / 2

          left = tooltipRect.x - containerRect.x - this.$lastMouseEnteredTooltip.clientWidth - tooltipRect.width
          break
        case 'right':
          top =
            tooltipOffsetTop -
            containerOffsetTop -
            this.$lastMouseEnteredTooltip.clientHeight / 2 +
            tooltipRect.height / 2

          left = tooltipRect.x - containerRect.x + tooltipRect.width + 24
          break
        case 'bottom':
          top = tooltipOffsetTop - containerOffsetTop + tooltipRect.height + 24

          left = tooltipRect.x - containerRect.x - this.$lastMouseEnteredTooltip.clientWidth / 2 + 24
          break
        default:
      }

      if (top <= 0) {
        top = 24
      }

      if (top >= containerRect.height) {
        top = containerRect.height - this.$lastMouseEnteredTooltip.clientHeight - 24
      }

      /**
       * Set position styles and show tooltip
       */
      this.$lastMouseEnteredTooltip.style['left'] = left + 'px'
      this.$lastMouseEnteredTooltip.style['top'] = top + 'px'

      this.$nextTick(() => {
        this.$lastMouseEnteredTooltip?.classList.add(this.$style['show'])
        $target?.classList.add(this.$style['show'])
      })
    }
  }

  /**
   * Remove show class from tooltip after mouse leave from point
   */
  public onMouseLeavePoint() {
    if (window.innerWidth <= 900) return

    if (this.$lastMouseEnteredTooltip) {
      this.$lastMouseEnteredTooltip?.classList.remove(this.$style['show'])
    }

    ;((this.$refs.svg as Element).querySelectorAll('div') || []).forEach((el: Element) => {
      el.classList.remove(this.$style['show'])
    })

    this.hovered = false
  }

  public onSlideChange(swiper: any) {
    this.setActiveSlide(swiper.realIndex)
  }

  public setActiveSlide(index: number) {
    if (
      this.data.items?.length > 0 &&
      index < this.data.items?.length - 1 &&
      window.innerWidth <= 900
    ) {
      const slideCode: string = this.data.items[index].point_code as string
      const $activePoint: Element = (this.$refs.svg as Element).querySelector(
        `[id="${slideCode}"]`,
      ) as Element

      ;((this.$refs.svg as Element).querySelectorAll('.' + this.$style['show']) || []).forEach(
        (el: Element) => {
          el.classList.remove(this.$style['show'])
        },
      )

      if ($activePoint) {
        $activePoint.classList.add(this.$style['show'])
      }
    }
  }
}
</script>

<style lang="sass" module>
@keyframes pulse
  0%
    -moz-box-shadow: 0 0 0 0 rgba(120, 120, 120, 0.3)
    box-shadow: 0 0 0 0 rgba(120, 120, 120, 0.3)
  70%
    -moz-box-shadow: 0 0 0 1vw rgba(120, 120, 120, 0)
    box-shadow: 0 0 0 1vw rgba(120, 120, 120, 0)
  100%
    -moz-box-shadow: 0 0 0 0 rgba(120, 120, 120, 0)
    box-shadow: 0 0 0 0 rgba(120, 120, 120, 0)

.container
  width: 100%
  padding: 24px
  max-width: 1296px
  margin: 64px auto

  &__header
    max-width: 864px
    display: grid
    grid-template-columns: 0.9fr 1fr
    margin: 0 auto 48px
    grid-gap: 30px

    h2
      +style-4
      color: $color-black-100
      margin: 0

    p
      +style-7
      color: $color-black-80
      margin: 0

    @media (max-width: 900px)
      display: flex
      flex-direction: column
      
  &__body
    position: relative

    img
      max-width: 100%
      position: absolute
      left: 0
      right: 0
      top: 0
      width: 100%
      height: auto

  &__image

    &-svg
      position: absolute
      left: 0
      top: 0
      z-index: 1
      width: 100%
      height: 100%

      > div
        position: absolute
        left: 37%
        top: 32%
        width: 4vw
        height: 4vw
        background: rgba(120, 120, 120, 0.3)
        border-radius: 50%
        animation: pulse 1.5s infinite
        box-shadow: 0 0 0 rgb(120, 120, 120, 0.8)
        display: flex
        flex: 1
        flex-direction: row
        align-items: center
        justify-content: center
        cursor: pointer
        opacity: 1
        transition: opacity 0.25s ease
        will-change: opacity

        &:after
          content: ""
          position: relative
          width: 0.7vw
          height: 0.7vw
          background: transparent
          border-radius: 50%
          box-shadow: 0 0 0 0.5vw white

        @media (max-width: 900px)
          opacity: 0

          &.show
            opacity: 1

        .hovered &
          opacity: 0.3

          @media (max-width: 900px)
            opacity: 0

          &.show
            opacity: 1

  &__tooltips
    list-style: none
    margin: 0
    padding: 0

    @media (max-width: 900px)
      display: none

    &-item
      position: absolute
      left: 0
      top: 0
      width: 488px
      padding: 64px
      background-color: $color-white-100
      opacity: 0
      visibility: hidden
      transition: opacity 0.6s ease, visibility 0.6s ease, transform 0.3s ease
      pointer-events: none
      z-index: 1
      will-change: opacity, visibility, left, top
      transform: translateY(30px)

      @media (max-width: 1200px)
        padding: 32px
        width: 400px

      &.show
        visibility: visible
        opacity: 1
        transform: translateY(0)

      h1, h2, h3
        font-family: Inter, serif
        font-style: normal
        font-weight: 300
        font-size: 17px
        line-height: 32px
        letter-spacing: 0.003em
        color: $color-black-100

      p
        font-family: Inter, serif
        font-style: normal
        font-weight: normal
        font-size: 13px
        line-height: 26px
        letter-spacing: 0.003em
        color: $color-black-88

.slider
  display: none

  @media (max-width: 900px)
    display: block

  & [class*="swiper-wrapper"]
    align-items: flex-start

.slide
  padding: 24px 0
  display: flex
  flex-direction: column

  &__title
    color: $color-black-100

  &__text
    color: $color-black-80
    margin-top: 24px

.navigation
  max-width: 992px
  margin-top: 56px
  display: flex
  justify-content: space-between
  align-items: center
  grid-gap: 32px

  @media (max-width: 700px)
    margin-top: 12px

  .swiper-pagination-bullets
    display: flex

  [class*="swiper-pagination-bullet-map"]
    background: $color-white-40 !important
    border-radius: initial !important
    margin-right: 12px
    height: 1px
    width: 16px
    display: flex
    position: relative
    align-items: center
    justify-content: space-between
    flex-direction: row
    opacity: 1 !important

  [class*="swiper-pagination-bullet-active"]
    background: $color-white-100 !important

.swiper-button-prev
  display: block
  margin-left: auto
  outline: none
  padding: 0
  width: 32px
  height: 32px
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
  width: 32px
  height: 32px
  background-color: transparent
  border: none

  svg
    width: 32px
    height: 32px

.buttons
  display: flex
  grid-gap: 24px
</style>
