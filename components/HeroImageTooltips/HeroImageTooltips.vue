<template lang="pug">
  div(:class="$style['container']")
    section(:class="$style['container__header']")
      h2 {{ data.title }}
      p {{ data.text }}
    section(ref="container" :class="[$style['container__body'], hovered && $style['hovered']]")
      img(:src="data.image" loading="lazy")
      div(ref="svg" :class="$style['container__image-svg']" v-html="data.svg_html")
      ul(ref="tooltips" :class="$style['container__tooltips']")
        li(
          v-for="(item, key) in data.items"
          :key="item.point_code"
          :class="$style['container__tooltips-item']"
          :data-point-code="item.point_code"
        )
          h3 {{ item.title }}
          p {{ item.text }}
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

interface IData {
  title: string
  text: string
  image: string
  svg_html: string
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
    slidesPerView: '1',
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

  public maxContainerCoords: { minX: number; maxX: number; minY: number; maxY: number } = {
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0,
  }

  public $lastMouseEnteredTooltip: Element | null = null

  public hovered: boolean = false

  public async mounted() {
    await this.$nextTick()

    // Bind events to points
    ;((this.$refs.svg as Element).querySelectorAll('svg > g') || []).forEach((el: Element) => {
      el.addEventListener('mouseenter', this.onMouseEnterPoint)
      el.addEventListener('mouseleave', this.onMouseLeavePoint)
    })

    this.setMaxContainerCoords()

    this.setActiveSlide(0)
  }

  public beforeDestroy() {
    ;((this.$refs.svg as Element).querySelectorAll('svg > g') || []).forEach((el: Element) => {
      el.removeEventListener('mouseenter', this.onMouseEnterPoint)
      el.removeEventListener('mouseleave', this.onMouseLeavePoint)
    })
  }

  public setMaxContainerCoords() {
    const $container: Element = this.$refs.container as Element

    if ($container) {
      const rect: DOMRect = $container.getBoundingClientRect()

      this.maxContainerCoords.minX = $container.offsetLeft
      this.maxContainerCoords.maxX = $container.offsetLeft + rect.width
      this.maxContainerCoords.minY = $container.offsetTop
      this.maxContainerCoords.maxY = $container.offsetTop + rect.height
    }
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
    )

    this.hovered = true

    // If tooltip is found
    if (this.$lastMouseEnteredTooltip) {
      const padding = parseInt(
        window
          .getComputedStyle(this.$lastMouseEnteredTooltip, null)
          .getPropertyValue('padding-left'),
      )

      /**
       * Calculate top position
       */
      const tooltipOffsetTop = tooltipRect.y + window.scrollY
      const containerOffsetTop = containerRect.y + window.scrollY
      let top: number = tooltipOffsetTop - containerOffsetTop + tooltipRect.height + 24

      if (top + this.$lastMouseEnteredTooltip.clientHeight > containerRect.height) {
        top = top - this.$lastMouseEnteredTooltip.clientHeight - tooltipRect.height - 48
      }

      top = top >= containerRect.height ? containerRect.height - 24 : top <= 0 ? 24 : top

      /**
       * Calculate left position
       */
      let left: number = tooltipRect.x - (this.$lastMouseEnteredTooltip.clientWidth - padding) / 2

      if (left > this.maxContainerCoords.maxX - this.$lastMouseEnteredTooltip.clientWidth) {
        left =
          left -
          (left + this.$lastMouseEnteredTooltip.clientWidth - containerRect.width) -
          24 -
          (this.$lastMouseEnteredTooltip.clientWidth - padding) / 2
      } else if (left < this.maxContainerCoords.minX) {
        left = left + (this.maxContainerCoords.minX - left)
      }

      left = left >= containerRect.width ? containerRect.width - 24 : left <= 24 ? 24 : left

      /**
       * Set position styles and show tooltip
       */
      this.$lastMouseEnteredTooltip.style['left'] = left + 'px'
      this.$lastMouseEnteredTooltip.style['top'] = top + 'px'

      this.$nextTick(() => {
        this.$lastMouseEnteredTooltip?.classList.add(this.$style['show'])
        console.log($target, this.$lastMouseEnteredTooltip, this.$style['show'])
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

    ;((this.$refs.svg as Element).querySelectorAll('svg > g') || []).forEach((el: Element) => {
      el.classList.remove(this.$style['show'])
    })

    this.hovered = false
  }

  public onSlideChange(swiper) {
    this.setActiveSlide(swiper.realIndex)
  }

  public setActiveSlide(index) {
    if (
      this.data.items?.length > 0 &&
      index < this.data.items?.length - 1 &&
      window.innerWidth <= 900
    ) {
      const slideCode = this.data.items[index].point_code
      const $activePoint = this.$refs.svg.querySelector(`[id="${slideCode}"]`)

      ;(this.$refs.svg.querySelectorAll('.' + this.$style['show']) || []).forEach((el) => {
        el.classList.remove(this.$style['show'])
      })

      if ($activePoint) {
        $activePoint.classList.add(this.$style['show'])
      }
    }
  }
}
</script>

<style lang="sass" module>
.container
  width: 100%
  padding: 24px

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

  &__body
    position: relative
    padding-top: 51.7%

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

      svg
        & > g
          cursor: pointer
          opacity: 1
          transition: opacity 0.25s ease
          will-change: opacity

          @media (max-width: 900px)
            opacity: 0

            &.show
              opacity: 1

        .hovered & > g
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
