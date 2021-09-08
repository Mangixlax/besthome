<template lang="pug">
  section(:class="$style['title']" v-bind="$attrs")
    div(:class="$style['title__container']")
      div(:class="$style['title__container-textbox']")
        h1(:class="$style['title__container-title']") {{ $t('pages.media.title.title') }}
        div(:class="$style['title__container-subscribe']")
          p(
            :class="$style['title__container-description']"
            v-html="$t('pages.media.title.description')"
          )
          common-subscribe(
            :subscribe-data="$t('footer.subscribe')" 
            white-theme
            form-code="media_feedback"
          )
      div(:class="$style['title__container-imagebox']")
        media-card(
          v-for="(item, index) in 4"
          :key="index"
          :data="data[index]"
          :class="$style[`title__container-imagebox--${index + 1}`]"
        )
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
.title
  max-width: 100%

  &__container
    max-width: 1200px
    margin: 0 auto
    padding: 0 24px
    display: flex
    margin-top: 64px

    @media (max-width: 1224px)
      flex-direction: column
      align-items: center
      grid-gap: 64px

    &-textbox
      display: flex
      flex-direction: column
      color: $color-black-96
      max-width: 738px
      width: 100%
      justify-content: center
      position: relative
      z-index: 2

      @media (min-width: 1440px)
        justify-content: flex-end
        min-height: 908px

    &-title
      +desktop-display-style-1
      margin: 44px 0 40px

      @media (max-width: 1224px)
        +desktop-display-style-2
        margin-top: 0

      @media (max-width: 700px)
        +desktop-display-style-3

      @media (max-width: 360px)
        +desktop-display-style-4
        margin-bottom: 24px

      @media (min-width: 1440px)
        position: absolute
        top: 148px
        margin: 0
        width: 800px

    &-subscribe
      max-width: 414px

      @media (max-width: 1224px)
        max-width: 738px

      @media (min-width: 1440px)
        margin-bottom: 168px

    &-description
      +desktop-text-style-5
      margin: 0 0 1em

      @media (max-width: 760px)
        +desktop-text-style-6

    &-imagebox
      max-width: 560px
      display: grid
      grid-template-columns: 1fr 1fr
      grid-template-rows: minmax(200px, 475px)
      grid-gap: 32px

      @media (max-width: 760px)
        grid-template-columns: 1fr

      img
        width: 100%
        height: 1%

      &--2
        padding-top: 72px
        height: 82%

        @media (max-width: 1025px)
          padding: initial

      &--4
        margin-top: -80px
        padding-bottom: 60px
        height: 120%

        @media (max-width: 1025px)
          padding: initial
</style>
