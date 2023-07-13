<template lang="pug">
  section(:class="{\
    [$style['tree']]: true,\
    [$style['hovered']]: isHovered,\
  }")
    section(:class="$style['tree__columns']")
      article(
        v-for="(column, key) in columns"
        :key="key"
        :class="$style['tree__columns-item']"
        @mouseenter="onHoverItem(key)"
        @mouseleave="onLeaveItem(key)"
      )
        div(
          :class="$style['tree__columns-image']"
          :style="{\
            backgroundImage: `url(${$img(`/three-columns/` + column.filename, $store.state.supportWebP ? { format: 'webp' } : {})})`,\
          }"
        )
          div(:class="$style['tree__columns-image-overlay']")
        div(:class="$style['tree__columns-content']")
          h3
            nuxt-link(
              :to="localePath(column.to)"
              v-html="column.title"
              data-cursor-text="Click<br>to watch"
              data-cursor-off-exclusion
              :class="$style['tree__columns-content-link']"
            )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class PageProjectsFourColumns extends Vue {
  @Prop({ type: String, default: '' }) title!: string
  @Prop({ type: String, default: '' }) description!: string
  @Prop({ type: Array, default: () => [] }) columns!: Array<Object>

  public isHovered: boolean = false

  public onHoverItem(index: number) {
    this.isHovered = true
    ;(this.columns[index] as any).hovered = true
  }

  public onLeaveItem(index: number) {
    this.isHovered = false
    ;(this.columns[index] as any).hovered = false
  }
}
</script>

<style lang="sass" module>
.tree
  display: flex
  flex-direction: column
  height: 880px
  position: relative

  @media (max-width: 1224px)
    height: auto

  &__columns
    display: flex
    justify-content: space-between
    height: 100%
    padding: 0 64px

    @media (max-width: 1224px)
      flex-direction: column
      margin-top: 24px

    &-item
      width: 33.33%
      height: 100%
      padding: 64px 0
      position: relative
      cursor: pointer

      @media (max-width: 1224px)
        width: 100%
        padding: 24px !important

    &-image
      height: 100%
      width: 100%
      background-size: cover
      position: relative
      z-index: 1

      @media (max-width: 1224px)
        display: none

      &::before
        content: ''
        position: absolute
        top: 0
        bottom: 0
        right: 0
        left: 0
        background: rgba(17, 17, 17, 0.45)

      &-overlay
        position: absolute
        top: 0
        right: 0
        bottom: 0
        left: 0
        z-index: 2
        background-color: $color-white-100
        height: 100%
        transition: height 0.5s ease
        will-change: height

    &-content
      max-width: 288px
      margin: 0 auto
      position: absolute
      bottom: 0
      left: 0
      right: 0
      top: 0
      z-index: 3
      display: flex
      flex-direction: column
      text-align: center
      align-items: center
      justify-content: center

      @media (max-width: 1224px)
        position: static
        text-align: left
        flex-direction: row-reverse
        max-width: 100%
        width: 100%
        justify-content: space-between
        align-items: center

      &-link
        white-space: nowrap

      a
        +style-4
        margin-top: 24px
        display: block
        color: $color-black-100
        text-decoration: none
        transition: color 0.25s ease

        &:after
          content: ''
          position: absolute
          top: 0
          left: 0
          bottom: 0
          right: 0

    @media (min-width: 1225px)
      &-item:hover &-image-overlay
        height: 0

      &-item:hover &-content a
        color: $color-white-100
</style>
