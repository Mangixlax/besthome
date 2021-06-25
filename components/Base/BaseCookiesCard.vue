<template lang="pug">
  div(v-if="isCardShow" :class="$style['cookies']")
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
        @click="onClickDecline"
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
  public isCardShow: boolean = false

  public cookieAlreadyShowedName: string = 'cookies_already_showed'

  public cookieAcceptedName: string = 'cookies_accepted'

  public defaultCookiesOptions: any = {
    maxAge: 2419200, // one month
    path: '/', // set cookie to all pages on this site
  }

  public hideBlock() {
    this.isCardShow = false
    this.$cookies.set(this.cookieAlreadyShowedName, 'true', this.defaultCookiesOptions)
  }

  public showBlock() {
    this.isCardShow = true
  }

  public onClickAccept() {
    this.hideBlock()
    this.$cookies.set(this.cookieAcceptedName, 'true', this.defaultCookiesOptions)
  }

  public onClickDecline() {
    this.hideBlock()
    this.$cookies.set(this.cookieAcceptedName, 'false', this.defaultCookiesOptions)
  }

  public mounted() {
    if (this.$cookies.get(this.cookieAlreadyShowedName) !== true) {
      this.showBlock()
    }
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
  background: $color-white-100
  box-shadow: 0 24px 32px -8px rgba(0, 0, 0, 0.12)
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
