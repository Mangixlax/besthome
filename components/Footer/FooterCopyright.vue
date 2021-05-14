<template lang="pug">
  section(:class="$style['copyright']")
    div(:class="$style['copyright__container']")
      typo-text(
        tag="p"
        version="style-8(with-media: false)"
        :class="$style['copyright__container-text']"
      ) © BestHome Construction, 2021 All rights reserved.
      div(:class="$style['copyright__changelang']")
        Typo-text(
          tag="p"
          version="style-8(with-media: false)"
          :class="$style['copyright__changelang-text']"
        ) Change language:
        base-select-language(:list="['Ru','En']" default-value="En" @change="onChangeLanguage")
    div(:class="$style['copyright__information']")
      ul(:class="$style['copyright__list']")
        li(
          v-for="(copyrightItem, i) in copyrightItems"
          :key="i"
          :class="$style['copyright__item']"
          )
            a(
              :href="copyrightItem.to"
              :class="$style['copyright__item-link']"
            ) {{ copyrightItem.name }}
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import BaseFastLinks from '~/components/Base/BaseFastLinks.vue'
import BaseSelectLanguage from '~/components/Base/BaseSelectLanguage.vue'
import TypoText from '~/components/Base/TypoText.vue'

interface ICopyrightItems {
  name: string
  to: string
}

@Component({
  components: { BaseFastLinks, BaseSelectLanguage, TypoText },
})
export default class FooterCopyright extends Vue {
  public copyrightItems: Array<ICopyrightItems> = [
    {
      name: 'Privacy Policy',
      to: '/',
    },
    {
      name: 'Use of cookies',
      to: '/',
    },
    {
      name: 'Terms of Use',
      to: '/',
    },
    {
      name: 'Sale & refund',
      to: '/',
    },
    {
      name: 'Legal information',
      to: '/',
    },
    {
      name: 'Site Map',
      to: '/',
    },
  ]

  onChangeLanguage(lang: string) {
    ;(this as any).$i18n.setLocale(lang.toLowerCase())
    this.$store.commit('setOurCompanyCardInfo', this.$i18n.t('pages.company_our_team'))
    this.$store.dispatch('Navigation/init')
  }
}
</script>

<style lang="sass" module>
.copyright
  max-width: 1184px
  margin: 0 auto

  &__container
    display: flex
    justify-content: space-between
    margin: 32px

    @media (max-width: 800px)
      flex-direction: column

    &-text
      margin: 0
      color: $color-black-64

  &__changelang
    display: flex

    &-text
      margin: 0
      color: $color-black-64
      white-space: nowrap
      line-height: 36px

  &__information
    display: flex
    justify-content: center
    padding: 0 32px
    padding-bottom: 129px

  &__list
    display: flex
    flex-wrap: wrap
    list-style: none
    justify-content: center
    margin: 0
    padding: 0

    @media (max-width: 2000px) and (min-width: 800px)
      width: 785px

    @media (max-width: 800px) and (min-width: 411px)
      width: 338px
      justify-content: start

    @media (max-width: 411px)
      width: 310px
      justify-content: start

  &__item

    &-link
      text-decoration: underline
      white-space: nowrap
      color: $color-black-88
      text-decoration-color: $color-black-16
      text-underline-offset: 7px
      margin-right: 12px
      +style-8($with-media: false)

    @media (max-width: 2000px) and (min-width: 800px)
      & + &:before
        content: ""
        width: 3px
        height: 3px
        margin-right: 12px
        border-radius: 3px
        display: inline-block
        background-color: $color-black-16

    @media (max-width: 800px) and (min-width: 412px)
      &:nth-child(3n):before
        content: ""
        width: 3px
        height: 3px
        margin-right: 12px
        border-radius: 3px
        display: inline-block
        background-color: $color-black-16

      &:nth-child(3n+2):before
        content: ""
        width: 3px
        height: 3px
        margin-right: 12px
        border-radius: 3px
        display: inline-block
        background-color: $color-black-16

    @media (max-width: 411px) and (min-width: 1px)
      &:nth-child(2n):before
        content: ""
        width: 3px
        height: 3px
        margin-right: 12px
        border-radius: 3px
        display: inline-block
        background-color: $color-black-16

      &:nth-child(2n+1)
        margin-left: 0px
</style>
