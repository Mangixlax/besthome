<template lang="pug">
  section(:class="$style['container']" @mouseleave="activeIndex = 0")
    div(:class="$style['timeline']")
      div(:class="$style['timeline__images']")
        img(
          v-for="(item, index) in data.items"
          :key="index"
          :src="item.image"
          :class="{\
            [$style['timeline__images--active']]: activeIndex === index,\
          }"
          loading="lazy"
        )
      div(:class="$style['timeline__content']")
        h3(:class="$style['timeline__content-title']") {{ data.header }}
        ul(:class="$style['timeline__content-info']")
          li(
            v-for="(item, index) in data.items"
            :key="index"
            :class="{\
              [$style['timeline__content-info-item']]: true,\
              [$style['timeline__content-info-item--active']]: activeIndex === index,\
            }"
            @mouseenter="activeIndex = index"
          )
            h4 {{ item.title }}
            p {{ item.subtitle }}
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import { Component, Vue, Prop } from 'nuxt-property-decorator'

interface ITimeline {
  header: string
  items: ITimelineItem[]
}

interface ITimelineItem {
  title: string
  subtitle: string
  image: string
  sort_order: number
}

@Component({
  components: {
    TypoText,
  },
})
export default class PageProjectsTimeline extends Vue {
  @Prop({ type: Object, default: () => {} }) data!: ITimeline

  public activeIndex: number = 0
}
</script>

<style lang="sass" module>
.container
  position: relative
  padding: 80px 0

@keyframes animation
  0%
    opacity: 0
  100%
    opacity: 1

.timeline
  width: 100%
  max-width: 1440px
  margin-right: auto
  margin-left: auto
  display: flex

  &__images
    width: 100%
    max-width: 720px
    position: relative
    padding-right: 64px
    padding-bottom: 64px
    padding-top: 32px

    img
      transition: opacity .8s ease 0s
      position: absolute
      top: 32px
      left: 0
      width: calc(100% - 64px)
      display: none

    img#{&}--active
      display: block
      animation: animation 0.4s linear forwards

  &__content
    display: initial
    padding-left: 64px
    width: 50%
    padding-top: 284px

    &-title
      +style-4
      letter-spacing: 0.002em
      color: $color-black-100
      padding: 8px 0
      margin: 0
      position: relative

      &:before
        content: ""
        position: absolute
        top: 0
        left: -64px
        height: calc(100% + 10px)
        border-left: 1px solid $color-blue-100

    &-info
      list-style: none
      margin: 0
      padding: 0

      &-item
        position: relative
        width: -webkit-fit-content
        cursor: default
        padding-top: 24px
        padding-bottom: 24px

        h4
          +style-5
          transition: color 0.25s ease
          letter-spacing: 0.003em
          color: $color-black-48
          margin: 0

        p
          +style-7
          transition: color 0.25s ease
          letter-spacing: 0.003em
          color: $color-black-48
          margin: 0

        &:before
          content: ""
          position: absolute
          top: 0
          left: -64px
          height: calc(100% + 10px)
          border-left: 1px solid $color-blue-100

        &:after
          content: ""
          position: absolute
          top: calc(50% - 2px)
          left: -68px
          width: 9px
          height: 9px
          border: 1px solid $color-blue-100
          box-shadow: 0 0 0 13px $color-white-100
          border-radius: 50%
          background-color: $color-white-100
          transition: background-color 0.25s ease

        &--active
          h4
            color: $color-black-64

          p
            color: $color-black-100

          &:after
            background-color: $color-blue-100
</style>
