<template lang="pug">
  section(:class="$style['container']")
    div(:class="$style['sticky__info']")
      h2 {{ $t('pages.company_quality.foundation.title') }}
      ul(ref="list")
        li(
          v-for="(item, index) in $t('pages.company_quality.foundation.list')"
          :key="`list_${index}`"
          :class="{ [$style['active']]: activePointIndex === index }"
        )
          div 0{{ index + 1 }}
          h3 {{ item.title }}
          p(v-for="(paragraph, pIndex) in item.text" :key="`paragraph_${pIndex}`") {{ paragraph }}
    div(:class="$style['sticky__image-wrapper']")
      div(:class="$style['sticky__image']")
        img(
          :src="$img(`/quality/foundation.jpg`, $store.state.supportWebP ? { format: 'webp' } : {})"
          loading="lazy"
          decoding="async"
        )
        div(:class="[$style['point'], $style['point-1'], activePointIndex === 0 && $style['point--active']]")
          div(:class="$style['point__number']") 01
        div(:class="[$style['point'], $style['point-2'], activePointIndex === 1 && $style['point--active']]")
          div(:class="$style['point__number']") 02
        div(:class="[$style['point'], $style['point-3'], activePointIndex === 2 && $style['point--active']]")
          div(:class="$style['point__number']") 03
        div(:class="[$style['point'], $style['point-4'], activePointIndex === 3 && $style['point--active']]")
          div(:class="$style['point__number']") 04
        div(:class="[$style['point'], $style['point-5'], activePointIndex === 4 && $style['point--active']]")
          div(:class="$style['point__number']") 05
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class PageQualityFoundationSticky extends Vue {
  public activePointIndex: number = 0

  public onScroll() {
    const $list = (this.$refs.list as Element).querySelectorAll('li')

    $list.forEach(($li, index) => {
      const pos: number = $li.getBoundingClientRect().top - window.innerHeight / 2
      if (pos <= 0 && pos >= -$li.clientHeight && this.activePointIndex !== index) {
        this.activePointIndex = index
      }
    })
  }

  mounted() {
    document.addEventListener('scroll', this.onScroll)
  }

  beforeDestroy() {
    document.removeEventListener('scroll', this.onScroll)
  }
}
</script>

<style lang="sass" module>
.container
  background-color: $color-black-4
  display: flex
  justify-content: space-between

  @media (max-width: 1080px)
    flex-direction: column

.point
  position: absolute

  &-1
    top: 27%
    left: 58%

  &-2
    top: 34%
    left: 43%

  &-3
    top: 44%
    left: 45%

  &-4
    top: 53%
    left: 49%

  &-5
    top: 67%
    left: 47%

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

.sticky
  &__image
    position: sticky
    top: 120px
    z-index: 1

    &-wrapper
      max-width: 592px
      width: 100%
      margin-right: calc((100vw - 1152px) / 2)

      @media (max-width: 1176px)
        margin-left: 0
        margin-right: 0
        padding-right: 24px
        padding-left: 24px
        margin-top: 24px

    img
      width: 100%

  &__info
    width: 414px
    margin-left: calc((100vw - 1152px) / 2)

    @media (max-width: 1176px)
      margin-left: 0
      margin-right: 0
      padding-right: 24px
      padding-left: 24px

    h2
      +desktop-text-style-5
      color: $color-black-48
      margin: 0

      @media (max-width: 1080px)
        margin-top: 24px

    ul
      list-style: none
      margin: 49px 0 0
      padding: 0

      li + li
        margin-top: 32px

      li
        div:first-child
          +desktop-text-style-8
          color: $color-black-48

        h3
          +desktop-text-style-5
          color: $color-black-100
          margin-top: 0
          margin-bottom: 4px

        p
          +desktop-text-style-7
          color: $color-black-48

        h3 + p
          margin-top: 0

        div:last-child
          +desktop-text-style-7
          color: $color-black-100
          margin-top: 4px
          display: flex

        a
          color: $color-blue-80
          text-decoration: none
          display: flex
          align-items: center
          outline: none
          margin-left: 4px

          &, svg
            transition: stroke 0.25s ease, color 0.25s ease

          svg
            width: 22px
            height: 22px
            stroke: $color-blue-80

          &:hover
            color: $color-blue-100

            svg
              stroke: $color-blue-100

      li.active div:first-child
        color: $color-blue-100
</style>
