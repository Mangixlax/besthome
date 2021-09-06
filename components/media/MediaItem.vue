<template lang="pug">
  div(
    :class="[\
      $style['item'],\
      itemData.is_full && itemData.poster && $style['item--full-bg'],\
      !horizontal ? $style['vertical'] : '',\
      fullList ? $style['full-list'] : '',\
      getTextColorStyle,\
    ]"
    data-item
  )
    div(:class="$style['item-wrap']")
      div(:class="$style['item__img-wrap']")
        div(
          :class="[\
            $style['item__img'],\
            !horizontal && !itemData.is_full ? $style['top-img'] : '',\
            horizontal && !itemData.is_full ? $style['right-img'] : '',\
          ]"
        )
          //- lazy-image(
          //-   :image='itemData.poster'
          //-   fix-src-sizes='600px'
          //-   big-loader
          //-   :aspect-ratio='aspectRatio'
          //-   force-cover
          //-   :title='itemData.title'
          //-   :alt='itemData.poster.alt ? itemData.poster.alt : itemData.title'
          //- )
        div(v-if='itemData.is_full' :class="$style['item__img-overlay']" :style='getOverlay')
      div(:class="$style['item__text']")
        div(:class="[$style['item__text-block'], $style['item__text-block--lines-' + titleLines]]")
          typo-text(tag='h3' version='head-style-3' ref='mediaTitle')
            | {{ itemData.title }}
          typo-text(v-if='titleLines < 3' version='primary-small') {{ renderExcerpt }}
        div(:class="$style['item__text-info']")
          typo-text(tag='span' version='primary-tiny' :class="$style['item__text-info-date']")
            | {{ itemData.published_at }}
          typo-text(tag='span' version='primary-tiny' :class="$style['item__text-info-view']")
            | {{ itemData.views }}
            view-icon
    nuxt-link(:to='itemUrl' v-slot='{ href, route }')
      a(:href='href' :class="$style['item__link']" @click.prevent='goToRoute(route)' :title='itemData.title')
    nuxt-link(:to='itemUrl' v-slot='{ href }')
      button-link-icon(
        tag='a'
        :href='href'
        :class="$style['item__link-button']"
        target='_blank'
        rel='nofollow'
        :title="($i18n.locale === 'ru' ? `Открыть статью ${itemData.title} в новой вкладке` : `Open article ${itemData.title} in new tab`)"
      )
</template>

<script>
// import { hexToRGB } from '@/lib/utils'
// import ViewIcon from '@/components/svg/icon/View'
// import { navigationExtends } from '@/mixins/routes'
// import LazyImage from '@/components/vue-lazy-image-loading/component/LazyImage'
// import ButtonLinkIcon from '@/components/common/ButtonLinkIcon'

export default {
  name: 'MediaItem',
  components: {
    ButtonLinkIcon,
    LazyImage,
    ViewIcon,
  },
  props: {
    itemData: {
      type: Object,
      default: () => {},
    },
    /**
     * Ориентация блоков новостей, может принимать значения: vertical, horizontal
     */
    orientation: {
      type: String,
      default: 'horizontal',
    },
    horizontal: {
      type: Boolean,
      default: true,
    },
    /**
     * Пропс, который определяет что блоки новостей будут находится не в скролящемся блоке, а будут полным списком
     */
    fullList: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      titleLines: 1,
    }
  },
  async mounted() {
    await this.$nextTick()
    if (this.$refs.mediaTitle) {
      this.titleLines = this.$refs.mediaTitle.scrollHeight / 34
    }
  },
  computed: {
    itemUrl() {
      return this.localePath({
        name: 'media-article',
        params: { article: this.itemData.slugs[this.$i18n.locale] },
      })
    },
    aspectRatio() {
      if (this.$store.state.isMobileWindow) {
        if (this.horizontal) {
          return 0.39
        }

        if (this.itemData.is_full) {
          return 1.17
        }

        return 0.5
      }

      if (this.horizontal) {
        return 0.38
      }

      if (this.itemData.is_full) {
        return 1.5855
      }

      return 0.7855
    },
    renderExcerpt() {
      return this.itemData.excerpt // this.itemData.excerpt.length > 100 ? this.itemData.excerpt.substr(0, 100) + '...' : this.itemData.excerpt
    },
    getOverlay() {
      const image_color = this.itemData.poster.color
      let overlay = ''

      if (image_color) {
        if (this.horizontal) {
          const overlay_array = [
            [hexToRGB(image_color, 1), '0%'].join(' '),
            [hexToRGB(image_color, 0.928268), '7.17%'].join(' '),
            [hexToRGB(image_color, 0.861272), '13.87%'].join(' '),
            [hexToRGB(image_color, 0.794789), '20.52%'].join(' '),
            [hexToRGB(image_color, 0.725228), '27.48%'].join(' '),
            [hexToRGB(image_color, 0.629991), '37%'].join(' '),
            [hexToRGB(image_color, 0.55176), '44.82%'].join(' '),
            [hexToRGB(image_color, 0), '60.94%'].join(' '),
          ].join(',')

          overlay = `linear-gradient(135deg, ${overlay_array})`
        } else {
          const overlay_array = [
            [hexToRGB(image_color, 0.1), '40%'].join(' '),
            [hexToRGB(image_color, 0.5), '50%'].join(' '),
            [hexToRGB(image_color, 0.6), '60%'].join(' '),
            [hexToRGB(image_color, 0.8), '80%'].join(' '),
            [hexToRGB(image_color, 1), '100%'].join(' '),
          ].join(',')

          overlay = `linear-gradient(180deg, ${overlay_array})`
        }
      }

      return {
        'background-image': overlay,
      }
    },
    getTextColorStyle() {
      if (this.itemData.is_full) {
        const image_color = this.itemData.poster.color

        if (image_color) {
          const r = parseInt(image_color.substr(0, 2), 16)
          const g = parseInt(image_color.substr(2, 2), 16)
          const b = parseInt(image_color.substr(4, 2), 16)
          const yiq = (r * 299 + g * 587 + b * 114) / 1000
          return yiq >= 128 ? this.$style.black : this.$style.white
        }

        return this.$style.black
      }

      return ''
    },
  },
}
</script>

<style lang="sass" module>
.item
  position: relative
  border-radius: 16px
  display: inline-block
  width: 48%
  height: 228px
  vertical-align: middle
  overflow: hidden

  &__link
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    display: block
    height: 100%
    width: 100%
    z-index: 4

  &__link-button
    position: absolute
    right: 16px
    top: 16px
    z-index: 4

  &:not(:last-child)
    margin-right: 40px

  &.full-list
    width: auto

    &:not(:last-child)
      margin-right: 0

    +mobile
      height: 336px
      width: 216px

      .item
        &-wrap
          align-items: flex-end

        &__img
          &.right-img
            > span
              width: 100%
              height: 50%
              margin: 0

        &-text
          padding: 16px 0 16px 16px

      h3
        margin-bottom: 12px

  &-wrap
    display: flex
    align-items: center
    height: 100%

  &__img
    width: 100%
    height: 100%
    background-position: top right
    background-repeat: no-repeat
    background-size: contain
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out
    will-change: transform
    transform: scale(1)
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    opacity: 1

    .vertical &
      height: 50%

    &.top-img
      > span
        height: 100%

    &.right-img
      > span
        width: 50%
        margin: 0 0 0 auto

    img
      width: 100%
      height: 100%
      object-fit: cover

    &-wrap
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 2
      border-radius: 16px
      overflow: hidden
      transition: transform 0.3s ease-in-out
      will-change: transform
      transform: scale(1)
      background-color: $mute-gray

    &-overlay
      position: absolute
      top: -4px
      left: -4px
      right: 0
      bottom: -4px
      z-index: 2
      pointer-events: none

  &__text
    position: relative
    z-index: 4
    white-space: normal
    padding: 32px 8px 28px 20px
    display: flex
    flex-flow: column nowrap
    align-items: flex-start
    height: 100%
    width: 50%

    &-block
      overflow: hidden
      height: 129px

      h3
        color: rgba(25, 31, 46, 0.96)
        margin-bottom: 17px
        margin-top: 0

      > p
        color: rgba(25, 31, 46, 0.88)
        max-width: 260px
        display: inline-block
        margin: 0
        max-height: 76px
        min-height: 76px
        overflow: hidden
        display: -webkit-box
        -webkit-line-clamp: 3
        -webkit-box-orient: vertical

        +mobile
          max-height: 64px
          min-height: 64px

      &--lines-1

      &--lines-2
        > p
          -webkit-line-clamp: 2
          min-height: 36px
          max-height: 46px

      &--lines-3

    &-info
      display: flex
      flex-flow: row nowrap
      margin-top: auto

      span
        position: relative
        color: $coal-1

      &-date
        padding-right: 20px

        &:after
          content: '·'
          position: absolute
          top: 50%
          right: 9px
          transform: translateY(-50%)
          color: $coal-5

      &-view
        display: flex !important
        align-items: center

        svg
          margin-left: 8px
          height: auto !important

    +mobile
      padding: 20px 16px 16px

      span
        max-width: 200px

      &-info
        margin-top: 14px

  &--full-bg.white
    .item
      &__img
        &:after
          background: rgba(25, 31, 46, 0.32)

      &__text-block
        h3
          color: rgba(255, 255, 255, 0.96)

        p
          color: rgba(255, 255, 255, 0.88)

      &__text-info
        span
          color: rgba(255, 255, 255, 0.88)

        &-date
          &:after
            color: #fff

        &-view
          svg
            path
              fill: rgba(255, 255, 255, 0.8) !important

  +mobileWithTablet
    width: 604px

  +mobile
    height: 168px
    width: 432px

    &:not(:last-child)
      margin-right: 24px

    h3
      margin-bottom: 12px

  &.vertical
    width: 288px
    height: 456px

    &:not(:last-child)
      margin-right: 32px

    .item
      &-wrap
        align-items: flex-end

      &__text
        height: 50%
        width: 100%

    +mobile
      height: 336px

      &:not(:last-child)
        margin-right: 16px

      .item
        &-text
          padding: 16px 0 16px 16px

      h3
        margin-bottom: 16px

  &--full-bg.vertical &__text
    height: 100%
    justify-content: flex-end

    &-block
      height: auto

    &-info
      margin-top: 22px

  &:hover
    .item__img
      transform: scale(1.05)

      &-wrap
        transform: scale(0.99)
</style>
