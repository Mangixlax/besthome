<template lang="pug">
  div(:class="$style['header__wrapper']")
    base-select-language(:list="languageList" :is-dark-theme="isDarkTheme")
    div(
      :class="{\
        [$style['header__info']]: true,\
        [$style['header__info--align-right']]: alignRight,\
        [$style['header__info--hide-on-mobile']]: hideOnMobile,\
        [$style['dark']]: dark,\
      }"
    )
      a(href="tel:+905305474415" title="Call +90 530 547-44-15")
        span(v-html="'+90 530 547<span>-</span>44<span>-</span>15'")
      typo-text(
        tag="div"
        version="style-9"
        :class="$style['header__info-callback']"
        @click="goToFeedback"
      ) {{ $t('header.call_back')}}
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import TypoText from '~/components/Base/TypoText.vue'
import { modalsTriggerMixin } from '~/mixins/modals'
import BaseSelectLanguage from '~/components/Base/BaseSelectLanguage.vue'

@Component({
  components: { TypoText, BaseSelectLanguage },
  mixins: [modalsTriggerMixin],
})
export default class BaseHeaderInfo extends Vue {
  @Prop({ type: Boolean, default: false }) hideOnMobile!: boolean
  @Prop({ type: Boolean, default: false }) alignRight!: boolean
  @Prop({ type: Boolean, default: false }) dark!: boolean

  public languageList = [
    {
      label: 'RUS',
      value: 'ru',
    },
    {
      label: 'ENG',
      value: 'en',
    },
    {
      label: 'TUR',
      value: 'tr',
    },
  ]

  public goToFeedback() {
    this.$router.push(this.localePath({ name: 'feedback' }))
  }

  get isDarkTheme(): boolean {
    return this.$store.getters['isDarkTheme']
  }
}
</script>

<style lang="sass" module>
.header
  &__info
    display: flex
    flex-direction: column
    align-items: flex-start

    &--align-right
      align-items: flex-end

    &--hide-on-mobile
      @media (max-width: 1023px)
        display: none

    a
      +style-6($with-media: false)
      text-decoration: none
      color: $color-black-88
      transition: color 0.5s ease

      span span
        color: $color-black-24
        transition: color 0.5s ease

      @media (max-width: 1054px)
        +style-5($with-media: false)

    &.dark a
      color: $color-white-88

    &.dark a span span
      color: $color-white-24

    &-callback
      display: flex
      align-items: center
      margin-top: 4px
      padding: 0 2px 5px
      color: $color-blue-100
      border-bottom: 1px solid $color-blue-16
      cursor: pointer
      transition: color 0.5s ease, border-bottom-color 0.5s ease

    &.dark &-callback
      color: $color-white-100
      border-bottom-color: $color-white-16

  &__wrapper
    display: flex
    align-items: center
    grid-gap: 16px
</style>
