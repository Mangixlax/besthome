<template lang="pug">
  section(:class="$style['copyright']")
    div(:class="$style['copyright__container']")
      typo-text(
        tag="p"
        version="style-8(with-media: false)"
        :class="$style['copyright__container-text']"
      ) © BestHome Construction, 2021 {{ $t('footer.footer_copyright.rights') }}
      div(:class="$style['copyright__changelang']")
        typo-text(
          tag="p"
          version="style-8(with-media: false)"
          :class="$style['copyright__changelang-text']"
        ) {{ $t('footer.footer_copyright.language') }}
        base-select-language(:list="['RU','EN']")
    div(:class="$style['copyright__information']")
      ul(:class="$style['copyright__list']")
        li(
          v-for="(copyrightItem, i) in copyrightItems"
          :key="i"
          :class="$style['copyright__item']"
          )
            nuxt-link(
              :to="localePath(copyrightItem.to)"
              :class="$style['copyright__item-link']"
            ) {{ copyrightItem.name }}
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import BaseFastLinks from '~/components/Base/BaseFastLinks.vue'
import BaseSelectLanguage from '~/components/Base/BaseSelectLanguage.vue'
import TypoText from '~/components/Base/TypoText.vue'
import { Jsonld } from 'nuxt-jsonld'

interface ICopyrightItems {
  name: string
  to: any
}
@Jsonld
@Component({
  components: { BaseFastLinks, BaseSelectLanguage, TypoText },
})
export default class FooterCopyright extends Vue {
  public copyrightItems: Array<ICopyrightItems> = [
    {
      name: 'Privacy Policy',
      to: { name: 'privacy-policy' },
    },
    {
      name: 'Terms of Use',
      to: { name: 'term-of-use' },
    },
  ]

  jsonld() {
    const json = {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      image: [require('@/assets/sprite/svg/logo.svg')],
      logo: require('@/assets/sprite/svg/logo.svg'),
      '@id': 'https://besthome.com.tr/',
      url: 'https://besthome.com.tr/',
      name: 'BestHome Real Estate',
      address: [
        {
          '@type': 'PostalAddress',
          streetAddress: 'Tugayoğlu sokak No 18/1',
          addressLocality: 'Alanya',
          addressRegion: 'Antalya',
          postalCode: '07400',
          addressCountry: 'Turkey',
        },
      ],
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 36.54621832413793,
        longitude: 32.03344315049577,
      },
      hasMap: 'https://goo.gl/maps/GQ9d8WPAsrPe974L9',
      priceRange: '$$$',
      telephone: '+90 530 547-44-15',
      contactPoint: ['+905305474415'].map((phone) => ({
        '@type': 'ContactPoint',
        telephone: phone,
        contactType: 'Customer service',
        email: 'info@besthome.com.tr',
        areaServed: ['RU', 'TR'],
        contactOption: ['HearingImpairedSupported', 'TollFree'],
        availableLanguage: [
          {
            '@type': 'Language',
            name: 'Russian',
          },
          {
            '@type': 'Language',
            name: 'English',
          },
          {
            '@type': 'Language',
            name: 'Turkish',
          },
        ],
      })),
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
    }

    if (this.$i18n.locale === 'ru') {
      json.address = [
        {
          '@type': 'PostalAddress',
          streetAddress: 'Tugayoğlu sokak No 18/1',
          addressLocality: 'Аланья',
          addressRegion: 'Анталия',
          postalCode: '07400',
          addressCountry: 'Турция',
        },
      ]
      json.url = 'https://gold-ahiskali.com/ru/'
      json['@id'] = 'https://gold-ahiskali.com/ru/'
    }

    return json
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
    margin: 32px 24px
    flex-wrap: wrap

    &-text
      margin: 0
      color: $color-black-64

  &__changelang
    display: flex

    &-text
      margin: 0
      color: $color-black-64
      padding-right: 4px
      white-space: nowrap
      line-height: 36px

  &__information
    display: flex
    justify-content: center
    padding: 0 24px 129px

    @media (max-width: 800px)
      justify-content: start
      padding: 0 24px 32px

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
        margin-bottom: 1.5px
        border-radius: 3px
        display: inline-block
        background-color: $color-black-16

    @media (max-width: 800px) and (min-width: 412px)
      &:nth-child(3n):before
        content: ""
        width: 3px
        height: 3px
        margin-right: 12px
        margin-bottom: 1.5px
        border-radius: 3px
        display: inline-block
        background-color: $color-black-16

      &:nth-child(3n+2):before
        content: ""
        width: 3px
        height: 3px
        margin-right: 12px
        margin-bottom: 1.5px
        border-radius: 3px
        display: inline-block
        background-color: $color-black-16

    @media (max-width: 411px) and (min-width: 1px)
      &:nth-child(2n):before
        content: ""
        width: 3px
        height: 3px
        margin-right: 12px
        margin-bottom: 1.5px
        border-radius: 3px
        display: inline-block
        background-color: $color-black-16

      &:nth-child(2n+1)
        margin-left: 0
</style>
