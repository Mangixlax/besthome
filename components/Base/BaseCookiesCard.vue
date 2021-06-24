<template lang="pug">
  div(:class="$style['cookies']" v-show="isCardShow" )
    typo-text(
      tag="p"
      version="style-2"
    ) {{ $t('footer.cookies.title')}}
    typo-text(
      tag="p"
      version="style-8"
    ) {{ $t('footer.cookies.text')}}
      typo-text(
        :to="localePath('term-of-use')"
        title="privacy-policy"
        tag="nuxt-link"
        version="style-8"
        :class="$style['cookies__text--underline']"
      ) {{ $t('footer.cookies.link')}}
    div
      typo-text(
        tag="button"
        version="style-7"
        :class="$style['cookies__accept']"
        @click="onClickAccept"
      ) {{ $t('footer.cookies.accept')}}
      typo-text(
        tag="button"
        version="style-7"
        :class="$style['cookies__decline']"
        @click="onClickAccept"
      ) {{ $t('footer.cookies.decline')}}
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {
    TypoText,
  },
})
export default class BaseCookiesCard extends Vue {
  public isCardShow: boolean = true

  public onClickAccept() {
    this.isCardShow = !this.isCardShow
  }
}
</script>

<style lang="sass" module>
.cookies
  position: fixed
  bottom: 24px
  left: 48px
  width: 100%
  padding: 24px 32px
  display: flex
  flex-direction: column
  grid-gap: 24px
  max-width: 325px
  background: rgba(255, 255, 255, 0.96)
  box-shadow: 0 24px 32px -8px rgba(0, 0, 0, 0.12)
  backdrop-filter: blur(20px)
  z-index: 30

  & > p
    margin: 0

  &__text--underline
    margin: 0 0.25em
    color: $color-black-100
    text-decoration: none
    border-bottom: 1px solid $color-black-16

  &__accept,
  &__decline
    padding: 5px 24px
    border: none
    cursor: pointer

  &__accept
    background: $color-black-100
    color: $color-white-100

  &__decline
    background: transparent
</style>
