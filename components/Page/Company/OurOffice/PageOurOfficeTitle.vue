<template lang="pug">
  div(:class="$style['title']")
    div(:class="$style['title__container']")
      div(:class="$style['title__container-textbox']")
        typo-text(
          tag="h1"
          version="style-1"
          :class="$style['title__container-title']"
          v-html="data.title"
        )
        typo-text(
          tag="p"
          version="style-5"
          :class="$style['title__container-subtitle']"
          v-html="data.sub_title"
        )
      div(:class="$style['title__container-slider']")
        swiper(ref="swiper" :class="$style['slider']" class="swiper" :options="swiperOption")
          swiper-slide(
            v-for="(slide, i) in slides"
            :key="i"
            :class="$style['slide']"
          )
            img(
              :class="$style['slide__image']"
              :src="require(`~/assets/images/pages/company/our-office/${slide}`)"
            )
          div(slot="pagination" :class="$style['pagination']")
            div(:class="$style['buttons']")
              button(:class="[$style['swiper-button-prev']]" @click.prevent="$refs.swiper.swiperInstance.slidePrev()")
                | Prev
              div(:class="['swiper-pagination-progressbar', $style['swiper-pagination-progressbar']]")
              button(:class="[$style['swiper-button-next']]" @click.prevent="$refs.swiper.swiperInstance.slideNext()")
                | Next
      div(:class="$style['title__container-play_button']")
        svg-icon(name="play-icon")
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import CommonSubscribe from '~/components/Common/CommonSubscribe.vue'

interface IOurOfficeTitle {
  title: string
  sub_title: string
}

@Component({
  components: {
    TypoText,
    CommonSubscribe,
  },
})
export default class PageOurOfficeTitle extends Vue {
  @Prop({ type: Object, default: () => {} }) data!: IOurOfficeTitle

  public slides: Array<string> = ['slide-1.jpg', 'slide-1.jpg', 'slide-1.jpg']

  public swiperOption: Object = {
    slidesPerView: 1,
    spaceBetween: 32,
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination-progressbar',
      type: 'progressbar',
    },
  }
}
</script>

<style lang="sass" module>
.title
  max-width: 100%
  background: $color-black-96

  &__container
    max-width: 1488px
    margin: 0 auto
    padding: 0 24px
    display: flex
    position: relative

    &-textbox
      color: $color-white-96
      position: absolute
      top: 179px
      right: 144px
      display: flex
      flex-direction: column
      max-width: 808px
      z-index: 2

    &-title
      margin: 0

    &-subtitle
      align-self: flex-end
      margin: 0
      max-width: 480px
      margin-right: 80px

    &-play_button
      position: absolute
      bottom: 0
      right: 579px
      display: flex
      align-items: center
      justify-content: center
      height: 125px
      width: 125px
      border-radius: 50%
      background-color: $color-blue-100
      cursor: pointer

      svg
        height: 32px
        width: 32px
        fill: $color-white-100

.slider
  max-width: 608px
  margin-bottom: 87px

.slide
  display: flex
  position: relative
  justify-content: center

  img
    width: 100%
    object-fit: cover
    height: 670px

.pagination
  margin-top: 20px

.swiper-pagination-progressbar
  position: relative !important
  height: 2px
  flex: 1 1 auto
  position: relative
  background: $color-white-4
  max-width: 860px
  width: 100%

  span
    background: $color-white-96 !important

.swiper-button-prev
  display: block
  margin-left: auto
  outline: none
  padding: 0
  background-color: transparent
  border: none
  font-family: DM Sans
  font-style: normal
  font-weight: normal
  font-size: 14px
  line-height: 22px
  color: rgba(255, 255, 255, 0.48)

.swiper-button-next
  display: block
  margin-right: auto
  outline: none
  padding: 0
  background-color: transparent
  border: none
  font-family: DM Sans
  font-style: normal
  font-weight: normal
  font-size: 14px
  line-height: 22px
  color: #FFFFFF

.buttons
  margin-left: 24px
  display: flex
  grid-gap: 24px
  align-items: center
</style>
