<template lang="pug">
  section(:class="$style['title']" v-bind="$attrs")
    div(:class="$style['title__container']")
      div(:class="$style['title__container-textbox']")
        h1(:class="$style['title__container-title']") {{ data.title }}
        div(:class="$style['title__container-subscribe']")
          p(
            v-for="(text, i) in data.description"
            :key="i"
            :class="$style['title__container-description']"
          ) {{ text }}
          common-subscribe(
            :subscribe-data="$t('footer.subscribe')" 
            white-theme
            form_code="quality_feedback"
          )
      div(:class="$style['title__container-imagebox']")
        div(:class="$style['title__container-imagebox-column-1']")
          img(
            :src="$img('/pages/quality/title/image-1.jpg', $store.state.supportWebP ? { format: 'webp' } : {})"
            loading="lazy"
            decoding="async"
          )
          img(
            :src="$img('/pages/quality/title/image-2.jpg', $store.state.supportWebP ? { format: 'webp' } : {})"
            loading="lazy"
            decoding="async"
          )
        div(:class="$style['title__container-imagebox-column-2']")
          img(
            :src="$img('/pages/quality/title/image-3.jpg', $store.state.supportWebP ? { format: 'webp' } : {})"
            loading="lazy"
            decoding="async"
          )
          img(
            :src="$img('/pages/quality/title/image-4.jpg', $store.state.supportWebP ? { format: 'webp' } : {})"
            :class="$style['title__container-imagebox-lastimage']"
            loading="lazy"
            decoding="async"
          )
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import CommonSubscribe from '~/components/Common/CommonSubscribe.vue'

interface IQualityTitle {
  title: string
  description: Array<string>
}

@Component({
  components: {
    TypoText,
    CommonSubscribe,
  },
})
export default class PageQualityTitle extends Vue {
  @Prop({ type: Object, default: () => {} }) data!: IQualityTitle
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

    @media (max-width: 1224px)
      flex-direction: column

    &-textbox
      display: flex
      flex-direction: column
      color: $color-black-96
      max-width: 738px
      width: 100%

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

    &-subscribe
      max-width: 414px

      @media (max-width: 1224px)
        max-width: 738px

    &-description
      +desktop-text-style-5
      margin: 0 0 1em

      @media (max-width: 700px)
        +desktop-text-style-6

    &-imagebox
      display: flex
      grid-gap: 32px

      @media (max-width: 1224px)
        align-self: center
        margin-top: 60px

      @media (max-width: 630px)
        display: none

      &-column-1
        display: flex
        flex-direction: column
        grid-gap: 32px

        img
          height: 397px
          width: 280px

      &-column-2
        display: flex
        flex-direction: column
        grid-gap: 32px
        align-self: center

        img
          height: 397px
          width: 280px

      &-lastimage
        height: 228px !important
        width: 280px
        object-fit: cover
</style>
