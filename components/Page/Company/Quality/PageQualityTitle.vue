<template lang="pug">
  div(:class="$style['title']")
    div(:class="$style['title__container']")
      div(:class="$style['title__container-textbox']")
        typo-text(
          tag="h1"
          version="style-1"
          :class="$style['title__container-title']"
        ) {{ data.title }}
        div(:class="$style['title__container-subscribe']")
          typo-text(
            tag="p"
            version="style-5"
            v-for="(text, i) in data.description" 
            :key="i"
            :class="$style['title__container-description']"
          ) {{ text }}
          common-subscribe(:subscribe-data="$t('footer.subscribe')" whiteTheme)
      div(:class="$style['title__container-imagebox']")
        div(:class="$style['title__container-imagebox-column-1']")
          img(src="@/assets/images/pages/quality/title/image-1.jpg")
          img(src="@/assets/images/pages/quality/title/image-2.jpg")
        div(:class="$style['title__container-imagebox-column-2']")
          img(src="@/assets/images/pages/quality/title/image-3.jpg")
          img(
            src="@/assets/images/pages/quality/title/image-4.jpg"
            :class="$style['title__container-imagebox-lastimage']"
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

    &-textbox
      display: flex
      flex-direction: column

    &-title
      margin: 0
      margin-bottom: 40px

    &-subscribe
      max-width: 414px

    &-description
      margin: 0
      margin-bottom: 1em

    &-imagebox
      display: flex
      grid-gap: 32px

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
