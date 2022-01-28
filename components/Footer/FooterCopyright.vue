<template lang="pug">
  section(:class="[$style['copyright'], isDarkTheme && $style['dark']]")
    div(:class="$style['copyright__container']")
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
      div(:class="$style['copyright__changelang']")
        p(:class="$style['copyright__changelang-text']")
          | {{ $t('footer.footer_copyright.language') }}
        base-select-language(:list="['RU','EN', 'TR']" :is-dark-theme="isDarkTheme")
    div(:class="$style['copyright__information']")
      div
        | © BestHome Construction, 2021 {{ $t('footer.footer_copyright.rights') }}
      div
        div
          | The site was made
          a(href="https://sabr.com.tr/" target="_blank") SABR
          | . Russian-Turkish digital company.
        span
          | Content under the law
          div(id="DMCA-badge")
            div(class="dm-1 dm-1-b" style="left: 0px; background-color: rgb(0, 102, 204);border: none;")
              a(href="https://www.dmca.com/" title="DMCA") DMCA
            div(class="dm-2 dm-2-b" style="background-color: rgb(255, 255, 255);border: none;")
              a(href="http://www.dmca.com/Protection/Status.aspx?ID=09d50f11-0f90-42ba-84a5-43513eabbc18" title="DMCA" style="color: rgb(17, 17, 17);") PROTECTED
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

  get isDarkTheme(): boolean {
    return this.$store.getters['isDarkTheme']
  }

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
      json.url = 'https://besthome.com.tr/'
      json['@id'] = 'https://besthome.com.tr/'
    }

    return json
  }
}
</script>

<style lang="sass" module>
.copyright
  padding-left: calc((100vw - 1152px) / 2)
  padding-right: calc((100vw - 1152px) / 2)
  background-color: $color-white-100

  &.dark
    background-color: $color-black-96

  @media (max-width: 1176px)
    padding-left: 24px
    padding-right: 24px

  &__container
    display: flex
    justify-content: space-between
    padding: 40px 0 60px
    flex-wrap: wrap

  &__changelang
    display: flex

    @media (max-width: 440px)
      margin-top: 24px

    &-text
      margin: 0
      padding-right: 4px
      white-space: nowrap
      line-height: 36px
      color: $color-black-64

      .dark &
        color: $color-white-64

  &__information
    display: flex
    justify-content: space-between
    align-items: center
    padding-bottom: 150px
    color: $color-black-64

    @media (max-width: 1100px)
      flex-direction: column
      align-items: flex-start

    .dark &
      color: $color-white-64

    & > div:last-child
      display: flex
      align-items: center

      @media (max-width: 740px)
        flex-direction: column
        align-items: flex-start
        margin-top: 12px

      & > div:first-child a
        color: $color-blue-100
        text-decoration: underline
        text-underline-offset: 7px
        text-decoration-color: $color-blue-16
        margin-left: 4px
        margin-right: 4px

      & > span:last-child
        display: flex
        align-items: center

        &, div
          margin-left: 14px

        @media (max-width: 740px)
          margin-left: 0
          margin-top: 12px

  &__list
    display: flex
    flex-wrap: wrap
    list-style: none
    margin: 0
    padding: 0

  &__item

    &-link
      text-decoration: underline
      white-space: nowrap
      color: $color-black-88
      text-decoration-color: $color-black-16
      text-underline-offset: 7px
      margin-right: 12px
      +desktop-text-style-8

      .dark &
        color: $color-white-88
        text-decoration-color: $color-white-16

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

        .dark &
          background-color: $color-white-16

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

        .dark &
          background-color: $color-white-16

      &:nth-child(3n+2):before
        content: ""
        width: 3px
        height: 3px
        margin-right: 12px
        margin-bottom: 1.5px
        border-radius: 3px
        display: inline-block
        background-color: $color-black-16

        .dark &
          background-color: $color-white-16

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

        .dark &
          background-color: $color-white-16

      &:nth-child(2n+1)
        margin-left: 0
</style>
