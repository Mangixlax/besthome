<template lang="pug">
  section(:class="$style['container']")
    typo-text(
      tag="h2"
      version="style-5"
    ) {{ $t('pages.our_office.about.title') }}
    typo-text(
      tag="p"
      version="style-5"
    ) {{ $t('pages.our_office.about.sub_title') }}
    div(:class="$style['container__body']")
      typo-text(
        tag="div"
        version="style-3"
      ) {{ $t('pages.our_office.about.hero_title') }}
      img(src="~/assets/images/our-office/about.jpg" loading="lazy")
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {
    TypoText,
  },
})
export default class PageOurOfficeAbout extends Vue {}
</script>

<style lang="sass" module>
.container
  background-color: $color-black-96

  &__body, & > h2, & > p
    max-width: 1248px
    margin: 0 auto
    padding: 0 40px

    @media (max-width: 940px)
      padding: 0 24px

  & > h2
    margin-bottom: 8px
    color: $color-white-48

  & > p
    color: $color-white-100

  &__body
    width: 100%
    height: 493px
    position: relative
    margin-top: 64px

    & > div:nth-child(1)
      color: $color-white-100
      max-width: 600px
      position: absolute
      top: 50%
      transform: translateY(-50%)
      z-index: 2

    & > img
      max-height: 100%
      max-width: 851px
      position: absolute
      right: 0
      top: 0
      z-index: 1
      margin-right: 40px

      @media (max-width: 940px)
        margin-right: 0
        max-width: 100%
        left: 0
        height: 100%
        width: 100%
        object-fit: cover
</style>
