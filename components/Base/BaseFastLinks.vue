<template lang="pug">
  section(:class="[$style['fastlinks'], show && $style['show'], isDarkTheme && $style['dark']]")
    h3(:class="$style['fastlinks-title']" @click="onClick")
      | {{ title }}
      svg-icon(v-if="!show" name="fastlinks-accordion-plus")
      svg-icon(v-else name="fastlinks-accordion-minus")
    div(:style="{ height: contentHeight }")
      ol(:class="$style['fastlinks__list']" ref="linkContainer")
        li(
          v-for="(link, i) in list"
          :key="i"
          :class="$style['fastlinks__item']"
        )
          nuxt-link(
            :class="$style['fastlinks__item-link']"
            :to="localePath(link.route)"
            :title="link.name"
          )
            span(:class="$style['fastlinks__item-link--underline']")
              | {{ link.name }}
    slot(:name="`link-${$vnode.key}`")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class BaseFastLinks extends Vue {
  @Prop({ type: String, required: true })
  private title!: string

  @Prop({ type: Array, required: true })
  private list!: Array<Object>

  @Prop({ type: Boolean, default: false })
  private active!: boolean

  @Prop({ type: Boolean, default: false })
  private isDarkTheme!: boolean

  public show: boolean = this.active
  public contentHeight: string = '0px'

  onClick() {
    if (this.show) {
      this.hideAccordion()
    } else {
      this.showAccordion()
    }

    if (this.$parent?.$children.length) {
      for (const $child of this.$parent.$children) {
        if (
          ($child as any)._name.includes('BaseFastLinks') &&
          (this as any)._uid !== ($child as any)._uid
        ) {
          ;($child as this).hideAccordion()
        }
      }
    }
  }

  hideAccordion() {
    this.contentHeight = '0px'
    this.show = false
  }

  showAccordion() {
    this.contentHeight = (this.$refs.linkContainer as Element).clientHeight + 'px'
    this.show = true
  }

  mounted() {
    console.log(this.$slots)

    if (this.active) {
      this.showAccordion()
    }
  }
}
</script>

<style lang="sass" module>
.fastlinks
  display: flex
  flex-direction: column
  position: relative

  @media (max-width: 600px)
    & + &:before
      content: ""
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 1px
      display: inline-block
      background-color: $color-black-4

    &.dark + &:before
      background-color: $color-white-4

  @media (max-width: 600px)
    width: 100%

  > div
    overflow: hidden
    transition: all 1s ease

    @media (min-width: 600px)
      height: auto !important

  &-title
    display: flex
    color: $color-black-100
    white-space: nowrap
    position: relative
    justify-content: space-between
    align-items: center
    +desktop-text-style-6
    margin: 15px 0 10px

    .dark &
      color: $color-white-96

    svg
      display: none

    @media (max-width: 600px)
      cursor: pointer
      margin-top: 16px
      margin-bottom: 16px

      svg
        display: inline-block
        width: 24px
        height: 24px
        stroke: $color-black-96

        .dark &
          stroke: $color-white-96

  &__list
    display: flex
    flex-direction: column
    list-style: none
    padding: 0
    justify-content: center
    margin: 0 0 17px

  &__item
    display: flex
    align-items: center

    & + &
      margin-top: 8px

    &-link
      display: flex
      flex-wrap: nowrap
      align-items: center
      text-decoration: none
      color: $color-black-88
      +desktop-text-style-8

      .dark &
        color: $color-white-88

      &--underline
        white-space: nowrap
        text-decoration: underline
        text-underline-offset: 7px
        text-decoration-color: $color-black-16

        .dark &
          text-decoration-color: $color-white-16

      svg
        width: 18px
        height: 18px
</style>
