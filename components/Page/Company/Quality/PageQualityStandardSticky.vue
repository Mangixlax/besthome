<template lang="pug">
  section(:class="$style['container']")
    div(:class="$style['sticky__image-wrapper']")
      div(:class="$style['sticky__image']")
        img(
          :src="$img(`/quality/bath-room.jpg`, $store.state.supportWebP ? { format: 'webp' } : {})"
          loading="lazy"
          decoding="async"
        )
        div(:class="[$style['point'], $style['point-1'], activePointIndex === 0 && $style['point--active']]")
          div(:class="$style['point__number']") 01
          div(
            :class="$style['point__image']"
            :style="{\
              backgroundImage: `url(${$img(`/quality/bath-room.jpg`, $store.state.supportWebP ? { format: 'webp' } : {})})`,\
              backgroundSize: '500%',\
              backgroundPositionX: '24%',\
              backgroundPositionY: '43%'\
            }"
          )
        div(:class="[$style['point'], $style['point-2'], activePointIndex === 1 && $style['point--active']]")
          div(:class="$style['point__number']") 02
          div(
            :class="$style['point__image']"
            :style="{\
              backgroundImage: `url(${$img(`/quality/bath-room.jpg`, $store.state.supportWebP ? { format: 'webp' } : {})})`,\
              backgroundSize: '500%',\
              backgroundPositionX: '7%',\
              backgroundPositionY: '43%'\
            }"
          )
        div(:class="[$style['point'], $style['point-3'], activePointIndex === 2 && $style['point--active']]")
          div(:class="$style['point__number']") 03
          div(
            :class="$style['point__image']"
            :style="{\
              backgroundImage: `url(${$img(`/quality/bath-room.jpg`, $store.state.supportWebP ? { format: 'webp' } : {})})`,\
              backgroundSize: '500%',\
              backgroundPositionX: '39%',\
              backgroundPositionY: '99%'\
            }"
          )
        div(:class="[$style['point'], $style['point-4'], activePointIndex === 3 && $style['point--active']]")
          div(:class="$style['point__number']") 04
          div(
            :class="$style['point__image']"
            :style="{\
              backgroundImage: `url(${$img(`/quality/bath-room.jpg`, $store.state.supportWebP ? { format: 'webp' } : {})})`,\
              backgroundSize: '500%',\
              backgroundPositionX: '100%',\
              backgroundPositionY: '99.6%'\
            }"
          )
    div(:class="$style['sticky__info']")
      h2 {{ $t('pages.company_quality.standard.title') }}
      ul(ref="list")
        li(:class="{ [$style['active']]: activePointIndex === 0 }")
          div 01
          h3 {{ $t('pages.company_quality.standard.list[0].title') }}
          p {{ $t('pages.company_quality.standard.list[0].text[0]') }}
        li(:class="{ [$style['active']]: activePointIndex === 1 }")
          div 02
          h3 {{ $t('pages.company_quality.standard.list[1].title') }}
          p {{ $t('pages.company_quality.standard.list[1].text[0]') }}
        li(:class="{ [$style['active']]: activePointIndex === 2 }")
          div 03
          h3 {{ $t('pages.company_quality.standard.list[2].title') }}
          p {{ $t('pages.company_quality.standard.list[2].text[0]') }}
          p {{ $t('pages.company_quality.standard.list[2].text[1]') }}
        li(:class="{ [$style['active']]: activePointIndex === 3 }")
          div 04
          h3 {{ $t('pages.company_quality.standard.list[3].title') }}
          p {{ $t('pages.company_quality.standard.list[3].text[0]') }}
          div
            | {{ $t('pages.company_quality.standard.link') }}
            a(href="#" :title="$t('pages.company_quality.standard.line_ramp')")
              span {{ $t('pages.company_quality.standard.line_ramp') }}
              svg-icon(name="external-link-arrow")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class PageQualityStandardSticky extends Vue {
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
  max-width: 1152px
  margin: 0 auto
  display: flex
  justify-content: space-between

  @media (max-width: 1176px)
    margin-left: 24px
    margin-right: 24px

  @media (max-width: 1080px)
    flex-direction: column

.point
  position: absolute

  &-1
    top: 38%
    left: 31%

  &-2
    top: 41%
    left: 13%

  &-3
    top: 85%
    left: 37%

  &-4
    top: 87%
    left: 85%

  &__number
    background-color: $color-black-100
    color: $color-white-100
    width: 27px
    height: 27px
    display: flex
    align-items: center
    justify-content: center
    +desktop-text-style-9

  &__image
    display: block
    width: 145px
    height: 145px
    border: 3px solid $color-white-100
    border-radius: 50%
    position: absolute
    left: 50%
    top: 50%
    transform: translateY(-50%) translateX(-50%) scale(0)
    opacity: 0
    transition: transform 0.25s ease, opacity 0.25s ease

    @media (max-width: 1080px)
      display: none

  &--active &__image
    transform: translateY(-50%) translateX(-50%) scale(1)
    opacity: 1

.sticky
  &__image
    position: sticky
    top: 120px
    z-index: 1

    &-wrapper
      max-width: 414px
      width: 100%

    img
      width: 100%

  &__info
    max-width: 592px
    width: 100%

    h2
      +desktop-text-style-4
      color: $color-black-100
      margin: 0

      @media (max-width: 1080px)
        margin-top: 24px

    ul
      list-style: none
      margin: 80px 0 0
      padding: 0

      @media (max-width: 1080px)
        margin-top: 40px

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
