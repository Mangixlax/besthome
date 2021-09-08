<template lang="pug">
  section(:class="$style['media-list']" v-bind="$attrs")
    div(:class="$style['media-list__header']")
      p(:class="$style['media-list__header-title']")
        | {{ $t('pages.media.list.title')}}
      div(:class="$style['media-list__category']")
        p(:class="$style['media-list__header-description']")
          | {{ $t('pages.media.list.description')}}
        div(:class="$style['media-list__category-list']")
          slot(name="categories")
    div(:class="$style['media-list__container']")
      media-card(
        v-for="(card, index) in data"
        :key="index"
        :data="card"
      )
    div(:class="$style['media-list__footer']")
      div(:class="$style['media-list__footer-buttons']")
        div(
          v-if=""
          :class="$style['media-list__footer-prev']"
          @click=""
        ) {{ $i18n.locale === 'ru' ? 'Назад' : 'Prev' }}
        div(
          v-if=""
          :class="$style['media-list__footer-next']"
          @click=""
        ) {{ $i18n.locale === 'ru' ? 'Вперед' : 'Next' }}
      nav(:class="$style['media-list__footer-pagination']")
        
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import MediaCard from '~/components/Media/MediaCard.vue'
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import CommonSubscribe from '~/components/Common/CommonSubscribe.vue'

@Component({
  components: {
    TypoText,
    CommonSubscribe,
    MediaCard,
  },
})
export default class PageQualityTitle extends Vue {
  @Prop({ type: Array, default: () => [] }) data!: any
}
</script>

<style lang="sass" module>
.media-list
  width: 100%
  display: flex
  flex-direction: column
  margin: 0 auto
  max-width: 1200px
  padding: 0 24px

  &__container
    display: grid
    grid-template-columns: minmax(264px, 560px) minmax(264px, 264px) minmax(264px, 264px)
    grid-gap: 48px 32px
    grid-auto-rows: 500px

    @media (max-width: 1023px)
      grid-template-columns: 1fr 1fr

    @media (max-width: 760px)
      grid-template-columns: 1fr

    img
      width: 100%
      height: 1%

  &__header
    display: flex
    justify-content: space-between
    margin-top: 128px
    margin-bottom: 64px

    @media (max-width: 760px)
      margin: 64px 0
      flex-direction: column

    &-title
      margin: 0 0 32px 0
      +desktop-text-style-5
      color: $color-black-56

    &-description
      +desktop-text-style-5
      margin: 0
      max-width: 560px

  &__category
    display: flex
    flex-direction: column
    grid-gap: 32px
    border-bottom: solid 1px $color-black-4
    padding-bottom: 17px
    
    &-list
      +desktop-text-style-6
      display: flex
      max-width: 270px
      justify-content: space-between
      
      div
        cursor: pointer

  &__footer
    display: flex
    margin-top: 64px
    justify-content: center

    &-buttons
      display: flex
      grid-gap: 32px

    &-prev
      display: flex
      justify-content: center
      align-items: center
      margin: 40px auto 0
      height: 125px
      width: 125px
      border-radius: 50%
      +desktop-text-style-5
      padding: 6px
      line-height: 24px
      color: $color-white-100
      background-color: $color-black-16
      text-align: center
      cursor: pointer

    &-next
      display: flex
      justify-content: center
      align-items: center
      margin: 40px auto 0
      height: 125px
      width: 125px
      border-radius: 50%
      +desktop-text-style-5
      padding: 6px
      line-height: 24px
      color: $color-white-100
      background-color: $color-blue-100
      text-align: center
      cursor: pointer
</style>
