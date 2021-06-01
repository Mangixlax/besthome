<template lang="pug">
  section(:class="[$style['fastlinks'], show && $style['show']]")
    h3(:class="$style['fastlinks-title']" @click="onClick") {{ title }}
    div(:style="{ height: contentHeight }")
      ol(:class="$style['fastlinks__list']" ref="linkContainer")
        li(
          v-for="(link, i) in list"
          :key="i"
          :class="$style['fastlinks__item']"
        )
          a(:class="$style['fastlinks__item-link']" href="#")
            span(:class="$style['fastlinks__item-link--underline']")
              | {{ link.name }}
            svg-icon(name="link-arrow")
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

  public show: boolean = this.active
  public contentHeight: string = '0px'

  onClick() {
    if (this.show) {
      this.hideAccordion()
    } else {
      this.showAccordion()
    }

    if (this.$parent.$children.length) {
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


  @media (max-width: 411px)
    padding: 0 24px

    & + &:before
      content: ""
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 1px
      display: inline-block
      background-color: $color-black-4

  @media (max-width: 411px)
    width: 100%

  > div
    overflow: hidden
    transition: all 1s ease

    @media (min-width: 410px)
      height: auto !important

  &-title
    display: flex
    color: rgba(17, 17, 17, 1)
    white-space: nowrap
    margin: 0px
    margin-bottom: 10px
    position: relative
    justify-content: space-between
    align-items: center

    +style-6($with-media: false)

    @media (max-width: 409px)
      cursor: pointer
      margin-top: 16px
      margin-bottom: 16px

      &::after
        content: ""
        width: 24px
        height: 24px
        background-image: url(@/assets/sprite/svg/fastlinks-accordion-plus.svg)

        .show &
          background-image: url(@/assets/sprite/svg/fastlinks-accordion-minus.svg)

  &__list
    display: flex
    flex-direction: column
    list-style: none
    padding: 0
    margin: 0
    justify-content: center
    margin-bottom: 17px

    &:last-child
      padding-bottom: 17px

  &__item
    display: flex
    align-items: center

    &-link
      display: flex
      flex-wrap: nowrap
      align-items: center
      text-decoration: none
      margin-bottom: 8px
      color: rgba(17, 17, 17, 0.88)
      +style-8($with-media: false)

      &--underline
        white-space: nowrap
        text-decoration: underline
        text-underline-offset: 7px
        text-decoration-color: rgba(17, 17, 17, 0.16)

      svg
        width: 18px
        height: 18px
</style>
