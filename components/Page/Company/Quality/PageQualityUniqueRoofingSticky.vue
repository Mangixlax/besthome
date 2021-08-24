<template lang="pug">
  section(:class="$style['container']")
    h2 {{ $t('pages.company_quality.unique_roofing.title') }}
    div(:class="$style['info']")
      p {{ $t('pages.company_quality.unique_roofing.text') }}
      ul(:class="$style['list']")
        li(
          v-for="(item, index) in $t('pages.company_quality.unique_roofing.list')"
          :key="index"
          :class="[$style['list__item'], activeAccordionIndex === index && $style['active']]"
          @click="onClickToItem(index)"
        )
          h3(:class="$style['list__item-header']")
            | {{ item.title }}
            svg-icon(name="accordion-v2-button")
          div(
            ref="itemsBody"
            :class="$style['list__item-body']"
            :style="{ height: index === 0 ? '100%' : '' }"
          )
            div
              p {{ item.text }}
              img(
                :src="$img(`/quality/unique-roofing-${index + 1}.jpg`, $store.state.supportWebP ? { format: 'webp' } : {})"
                loading="lazy"
                decoding="async"
              )
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'

@Component
export default class PageQualityUniqueRoofingSticky extends Vue {
  public activeAccordionIndex: number = 0

  @Watch('activeAccordionIndex')
  onChangedAccordionIndex(index: number) {
    const $items = (this.$refs.itemsBody || []) as Element[]

    if ($items.length) {
      $items.forEach(($el: Element) => {
        // @ts-ignore
        $el.style.height = ''
      })

      if ($items[index]) {
        // @ts-ignore
        const contentHeight = $items[index].querySelector('div').scrollHeight as number
        // @ts-ignore
        $items[index].style.height = contentHeight + 'px'
      }
    }
  }

  public onClickToItem(index: number) {
    if (this.activeAccordionIndex === index) {
      this.activeAccordionIndex = -1
    } else {
      this.activeAccordionIndex = index
    }
  }
}
</script>

<style lang="sass" module>
.container
  background-color: $color-black-4
  display: flex
  justify-content: space-between
  align-items: flex-start

  @media (max-width: 1080px)
    flex-direction: column

  h2
    +desktop-text-style-5
    color: $color-black-48
    margin-left: calc((100vw - 1152px) / 2)
    position: sticky
    top: 120px

    @media (max-width: 1176px)
      margin-left: 0
      margin-right: 0
      padding-left: 24px
      padding-right: 24px

    @media (max-width: 1080px)
      position: static

.info
  margin-left: 40px
  margin-right: calc((100vw - 1152px) / 2)
  max-width: 592px
  width: 100%

  @media (max-width: 1176px)
    margin-left: 0
    margin-right: 0
    padding-left: 24px
    padding-right: 24px

  @media (max-width: 1080px)
    max-width: 100%

  & > p
    +desktop-text-style-5
    color: $color-black-100

    @media (max-width: 760px)
      +desktop-text-style-6

.list
  list-style: none
  margin: 80px 0 0 0
  padding: 0

  @media (max-width: 1080px)
    margin-top: 40px

  &__item
    & + &
      margin-top: 40px
      padding-top: 40px
      border-top: 1px solid $color-black-4

      @media (max-width: 1080px)
        margin-top: 20px
        padding-top: 20px

    &-header
      +desktop-text-style-5
      color: $color-black-100
      margin: 0
      cursor: pointer
      display: flex
      justify-content: space-between
      align-items: center

      @media (max-width: 760px)
        +desktop-text-style-7

      svg
        width: 16px
        height: 16px
        transition: transform 0.25s ease
        transform: rotate(45deg)

      .active & svg
        transform: rotate(0deg)

    &-body
      padding-right: 80px
      padding-top: 0
      +desktop-text-style-8
      color: $color-black-64
      opacity: 0
      height: 0
      transition: opacity 0.25s ease, height 0.25s ease, padding-top 0.25s ease
      overflow: hidden

      @media (max-width: 1080px)
        padding-right: 0

      .active &
        opacity: 1
        padding-top: 32px

      & p
        margin: 0

      & > div *:not(:first-child)
        margin-top: 32px

  img
    width: 100%
</style>
