<template lang="pug">
  section(:class="$style['container']")
    div(:class="$style['container__header']")
      h2 {{ $t('pages.company_quality.line_gangway.title') }}
      p Придумать сюда описание, возможно даже SEO текст на тему линейного трапа на пару строк (можно больше), но такой чтобы прочитать можно было.
    div(:class="$style['container__body']")
      ul(ref="list" :class="$style['info']" @mouseleave="activePointIndex = -1")
        li(
          v-for="(item, index) in $t('pages.company_quality.line_gangway.list')"
          :key="`list_${index}`"
          @mouseenter="onMouseEnter(index)"
        )
          div 0{{ index + 1 }}
          p {{ item }}
          svg-icon(name="mid-arrow-right")
      div(
        ref="imageWrapper"
        :class="[$style['image'], activePointIndex !== -1 && $style['selected']]"
      )
        img(
          :src="$img(`/quality/line-gangway-full.jpg`, $store.state.supportWebP ? { format: 'webp' } : {})"
          loading="lazy"
          decoding="async"
        )
        img(
          v-for="(item, index) in $t('pages.company_quality.line_gangway.list')"
          :key="`img_${index}`"
          :src="$img(`/quality/line-gangway-${index + 1}.jpg`, $store.state.supportWebP ? { format: 'webp' } : {})"
          :class="{ [$style['active']]: activePointIndex === index }"
          loading="lazy"
          decoding="async"
        )
        div(
          v-for="(item, index) in $t('pages.company_quality.line_gangway.list')"
          :key="`point_${index}`"
          :class="[$style['point'], $style[`point-${index + 1}`], activePointIndex === index && $style['point--active']]"
        )
          div(:class="$style['point__number']") 0{{ index + 1 }}
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class PageQualityLineGangway extends Vue {
  public activePointIndex: number = -1

  public onMouseEnter(index) {
    if (window.innerWidth > 1156) {
      this.activePointIndex = index
    }
  }

  /**
   * Set height to container with images for optimized absolute positions of points
   */
  public onResize() {
    const $imageWrapper = this.$refs.imageWrapper as Element

    if ($imageWrapper) {
      $imageWrapper.style.height = $imageWrapper.querySelector('img').height + 'px'
    }
  }

  mounted() {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<style lang="sass" module>
.container
  background-color: $color-black-4

  @media (max-width: 1176px)
    padding-right: 24px
    padding-left: 24px

  &__header,
  &__body
    display: flex
    justify-content: space-between
    max-width: 1152px
    width: 100%
    margin: 0 auto

  &__header
    h2, p
      +desktop-text-style-5

    h2
      color: $color-black-48

    p
      color: $color-black-100
      max-width: 592px
      width: 100%
      margin: 0

    @media (max-width: 1000px)
      flex-direction: column

  &__body
    margin-top: 64px

    @media (max-width: 760px)
      flex-direction: column

.point
  position: absolute
  opacity: 1
  transition: opacity 0.25s ease

  .selected &:not(.point--active)
    opacity: 0

  &-1
    top: 24%
    left: 33%

  &-2
    top: 31%
    left: 54%

  &-3
    top: 43%
    left: 40%

  &-4
    top: 53%
    left: 24%

  &-5
    top: 53%
    left: 55%

  &-6
    top: 67%
    left: 43%

  &__number
    background-color: $color-black-100
    color: $color-white-100
    width: 27px
    height: 27px
    display: flex
    align-items: center
    justify-content: center
    +desktop-text-style-9
    transition: background-color 0.25s ease

  &--active &__number
    background-color: $color-blue-100

.image
    position: relative
    max-width: 592px
    width: 100%

    @media (max-width: 760px)
      margin-top: 40px

    img
      width: 100%
      transition: opacity 0.25s ease

      &:not(:first-child)
        opacity: 0
        position: absolute
        left: 0
        top: 0

    img.active
      opacity: 1

.info
  list-style: none
  padding: 0
  width: 414px
  margin: 0 40px 0 0

  li + li
    margin-top: 32px

  li
    display: flex
    align-items: center
    color: $color-black-48
    cursor: pointer

    div:first-child
      +desktop-text-style-9
      align-self: flex-start
      width: 48px

    p
      +desktop-text-style-6
      margin: 0
      flex-grow: 1

    &, svg
      transition: stroke 0.25s ease, color 0.25s ease

    svg
      width: 14px
      height: 14px
      fill: $color-black-48
      opacity: 0
      position: relative
      transform: translateX(-4px)
      transition: transform 0.25s ease, opacity 0.25s ease

    @media (min-width: 761px)
      &:hover
        color: $color-black-100

        svg
          fill: $color-black-100
          transform: translateX(0)
          opacity: 1
</style>
