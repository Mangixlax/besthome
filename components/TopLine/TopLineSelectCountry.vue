<template lang="pug">
  div(:class="$style['selsect-language']")
    div(:class="$style['selsect-language__container']")
      div(:class="$style['selsect-language__text']")
        typo-text(
          tag="span"
          version="style-8"
        ) {{ $t('header.select_locale.text') }}
      div(:class="$style['selsect-language__select']")
        div(:class="$style['selsect-language__select-form']")
          select(
            v-model="language"
            :class="$style['selsect-language__select-form-select']"
          )
            option(value="en") English
            option(value="ru") Russian
          button(
            type="button"
            :class="$style['selsect-language__select-form-button']"
            @click="onSubmit"
          ) {{ $t('header.select_locale.next') }}
        div(:class="$style['selsect-language__close']" @click="onClose")
          svg-icon(name="close")
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import TypoText from '~/components/Base/TypoText.vue'

@Component({ components: { TypoText } })
export default class TopLineSelectCountry extends Vue {
  public language: string = this.$i18n.locale.toLowerCase()

  public onSubmit() {
    this.$i18n.setLocale(this.language.toLowerCase())
    this.$store.commit('setOurCompanyCardInfo', this.$i18n.t('pages.company_our_team'))
    this.$store.dispatch('SettingsTopLine/toggleLocaleHiddenMode')
  }

  public onClose() {
    this.$store.dispatch('SettingsTopLine/toggleLocaleHiddenMode')
  }
}
</script>

<style lang="sass" module>
.selsect-language
  width: 100%
  background-color: $color-blue
  display: flex
  align-items: center
  justify-content: center

  &__container
    max-width: 1296px
    width: 100%
    padding: 14px 24px
    display: flex
    grid-gap: 32px
    align-items: center
    justify-content: space-between

    @media (max-width: 800px)
      grid-gap: 24px
      flex-direction: column-reverse

  &__text
    color: $color-white-100
    margin: 0

  &__select
    display: flex
    align-items: center
    grid-gap: 32px

    @media (max-width: 800px)
      grid-gap: 16px

    &-form
      display: flex
      align-items: center
      grid-gap: 16px

      &-select
        +style-8
        color: $color-white-100
        height: 34px
        width: 250px
        border: none
        background: $color-blue-100
        border-bottom: solid 1px $color-white-16

        @media (max-width: 800px)
          width: 115px

        &:focus
          outline: none

      &-button
        +style-7
        border: none
        color: $color-white-100
        background: $color-white-16
        width: fit-content
        padding: 8px 24px

  &__close
    display: flex
    align-items: center
    justify-content: center
    cursor: pointer
    width: 36px
    height: 100%

    svg
      fill: $color-white
      width: 20px
      height: 20px
</style>
