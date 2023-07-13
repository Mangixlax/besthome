<template lang="pug">
  section(:class="{\
    [$style['tree']]: true,\
    [$style['hovered']]: isHovered,\
  }")
    div(:class="$style['tree__header']")
      h2(:class="$style['tree__header-title']") {{ title }}
      p(:class="$style['tree__header-description']")
        | {{ description }}
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
          div(:class="[$style['icon'], column.hovered && $style['icon--hover']]")
            svg-icon(:name="`${column.icon}-hover`")
            svg-icon(:name="column.icon")
          h3
            nuxt-link(  
              :to="localePath(column.to)"
              v-html="column.title"
              :data-cursor-text="dataCursor"
              data-cursor-off-exclusion
            )
          div(ref="text" :class="$style['tree__columns-content-text']")
            typo-text(
              tag="p"
              version="style-6"
              v-html="column.text"
            )
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({
  components: { TypoText },
})
export default class TreeColumns extends Vue {
  @Prop({ type: String, default: '' }) title!: string
  @Prop({ type: String, default: '' }) description!: string
  @Prop({ type: Array, default: () => [] }) columns!: Array<Object>
  @Prop({ type: String, default: '' }) dataCursor!: string

  public isHovered: boolean = false

  public onHoverItem(index: number) {
    this.isHovered = true
    ;(this.columns[index] as any).hovered = true
    ;((this.$refs.text as any)[index] as any).style.height =
      (this.$refs.text as any)[index].querySelector('p').clientHeight + 'px'
  }

  public onLeaveItem(index: number) {
    this.isHovered = false
    ;(this.columns[index] as any).hovered = false
    ;(this.$refs.text as any)[index].style.height = 0
  }
}
</script>

<style lang="sass" module>
.icon
  position: relative
  width: 72px
  height: 72px

  & > svg
    position: absolute
    left: 0
    top: 0

    &:first-child
      opacity: 0
      transform: scale(0.8)

    &:last-child
      opacity: 1
      transform: scale(1.2)

  @media (min-width: 1225px)
    &--hover
      & > svg
        &:first-child
          opacity: 1
          transform: scale(1.2)

        &:last-child
          opacity: 0
          transform: scale(0.8)

  @media (max-width: 700px)
    height: 48px
    width: 48px

.tree
  display: flex
  flex-direction: column
  height: 880px
  position: relative

  @media (max-width: 1224px)
    height: auto

  &__header
    position: absolute
    top: 0
    left: 0
    right: 0
    z-index: 4
    text-align: center
    opacity: 1
    transform: translate3d(0, 0, 0)
    transition: opacity 0.3s ease, transform 0.3s ease
    padding-top: 160px

    @media (max-width: 1224px)
      padding: 24px
      position: static
      text-align: left

    @media (min-width: 1225px)
      .hovered &
        opacity: 0
        transform: translate3d(0, -10%, 0)

    & > *
      max-width: 864px
      margin-left: auto
      margin-right: auto

      @media (max-width: 1224px)
        max-width: 100%

    &-title
      +style-3
      margin-top: 0
      margin-bottom: 0

    &-description
      +style-6
      margin-top: 40px
      margin-bottom: 0

      @media (max-width: 1224px)
        margin-top: 24px

  &__columns
    display: flex
    justify-content: space-between
    height: 100%
    padding: 0 24px

    @media (max-width: 1224px)
      flex-direction: column
      margin-top: 24px
      padding: 8px 0 24px 0

    &-item
      width: 33.33%
      height: 100%
      padding: 64px 0
      position: relative
      cursor: pointer

      & + &::before
        content: ""
        position: absolute
        top: 0
        left: 0
        height: 1px
        width: 100%
        background: $color-black-4

      &:not(:first-child):not(:last-child)
        padding-left: 32px
        padding-right: 32px

      @media (max-width: 1300px)
        padding-left: 32px
        padding-right: 32px

        &:first-child
          padding-left: 64px

        &:last-child
          padding-right: 64px

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

    &-content
      max-width: 288px
      margin: 0 auto
      position: absolute
      bottom: 90px
      left: 0
      right: 0
      z-index: 3
      display: flex
      flex-direction: column
      text-align: center
      align-items: center

      @media (max-width: 1224px)
        position: static
        text-align: left
        flex-direction: row-reverse
        max-width: 100%
        width: 100%
        justify-content: space-between
        align-items: center

      svg
        height: 72px
        width: 72px
        fill: #0066CC
        transition: fill 0.25s ease, stroke 0.25s ease, opacity 0.25s ease, transform 0.25s ease

        @media (max-width: 700px)
          height: 48px
          width: 48px

      h3
        margin: 0

      a
        +style-4
        display: block
        color: $color-black-100
        text-decoration: none
        transition: color 0.25s ease

        @media (min-width: 1023px)
          margin-top: 24px

        &:after
          content: ''
          position: absolute
          top: 0
          left: 0
          bottom: 0
          right: 0

      &-text
        +style-6
        color: $color-white-100
        margin-top: 24px
        transition: height 0.5s ease, opacity 0.25s ease 0.1s
        height: 0
        overflow: hidden
        opacity: 0

        @media (max-width: 1224px)
          display: none

        p
          margin: 0

    @media (min-width: 1225px)
      &-item:hover &-image-overlay
        height: 0

      &-item:hover &-content svg
        fill: $color-white-100
        stroke: transparent

      &-item:hover &-content a
        color: $color-white-100

      &-item:hover &-content-text
        opacity: 1
</style>
