<template lang="pug">
  div(:class="$style['container']")

    logo(:class="$style['logo']")

    h1(:class="$style['h1']") {{ error.statusCode }}

    div(
      v-if="error.statusCode === 404"
      :class="$style['text']"
    )
      typo-text {{ $t('pages.error_page.404.text_1') }}
      ul
        li
          typo-text {{ $t('pages.error_page.404.text_2') }}
        li
          typo-text {{ $t('pages.error_page.404.text_3') }}
        li
          typo-text
            | {{ $t('pages.error_page.404.text_4') }}
            nuxt-link(:to="localePath({ name: 'index' })") {{ $t('pages.error_page.404.text_5') }}

    div(
      v-else
      :class="[$style['text'], $style['text--center']]"
    )
      typo-text {{ $t('pages.error_page.500.text_1') }}
      typo-text
        | {{ $t('pages.error_page.500.text_2') }}
        nuxt-link(:to="localePath({ name: 'index' })") {{ $t('pages.error_page.500.text_3') }}
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from '@/components/Logo.vue'
import TypoText from '@/components/Base/TypoText.vue'

type Error = {
  statusCode: number
  message: string
}

type ErrorText = {
  title: string
  subtitle: string
}

type ErrorTexts = {
  [key: number]: ErrorText
  default: ErrorText
}

export default Vue.extend({
  name: 'ErrorPage',
  components: {
    Logo,
    TypoText
  },
  layout: 'empty',
  props: {
    error: {
      type: Object as () => Error,
      required: true,
    },
  },

  data: () => ({
    texts: {
      404: {
        title: '404. Page not found',
        subtitle: 'Something went wrong, no such address exists',
      },
      default: {
        title: 'Unknown error',
        subtitle: 'Something went wrong, but we`ll try to figure out what`s wrong',
      },
    } as ErrorTexts,
  }),

  computed: {
    errorText(): ErrorText {
      const { statusCode } = this.error
      return this.texts[statusCode] || this.texts.default
    },
  },
})
</script>

<style lang="sass" module>
.container
  background-color: white
  min-height: 100vh
  width: 100%
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  padding: 0 30px
  z-index: 40
  position: absolute
  top: 0
  left: 0

.h1
  font-family: Oswald, serif
  font-style: normal
  font-weight: bold
  font-size: 200px
  line-height: 296px
  text-align: center
  letter-spacing: -3.5px
  margin: 0

  @include mobile
    font-size: 80px
    line-height: 146px

.logo
  padding: 0 !important

.text
  +style-5
    
  &--center
    text-align: center

  p
    margin: 0

    a
      margin: 0 4px
      text-decoration: none 
      color: $color-black-100
      border-bottom: 1px solid $color-black-100
      padding-bottom: 4px

  ul
    list-style: none
    padding-left: 34px
    margin-top: 0

    li
      position: relative

    li:before
      @include style-6
      content: '-'
      position: absolute
      left: -26px
      top: 0
</style>