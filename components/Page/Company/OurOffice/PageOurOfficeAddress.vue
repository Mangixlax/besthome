<template lang="pug">
  section(:class="$style['container']")
    div(:class="$style['container__body']")
      div(:class="$style['info']")
        h2(:class="$style['info__title']" v-html="$t('pages.our_office.contacts.title')")
        ul(:class="$style['info__contacts']")
          li(:class="$style['info__contacts-item']")
            h3 {{ $t('pages.our_office.contacts.email') }}
            a(
              href="mailto:office@besthome.com.tr"
              :title="$t('pages.our_office.contacts.send_to_email', ['office@besthome.com.tr'])"
            ) office@besthome.com.tr
          li(:class="$style['info__contacts-item']")
            h3 {{ $t('pages.our_office.contacts.phone') }}
            a(
              href="tel:+905305474415"
              :title="$t('pages.our_office.contacts.call_to_phone', ['+90 530 547-44-15'])"
            ) +90 530 547-44-15
          li(:class="$style['info__contacts-item']")
            h3 {{ $t('pages.our_office.contacts.business') }}
            p
              small {{ $t('pages.our_office.contacts.work_time') }}
            p {{ $t('pages.our_office.contacts.address') }}
            p
              span {{ $t('pages.our_office.contacts.additional') }}
        nuxt-link(
          :to="localePath({ name: 'contacts' })"
          :class="$style['info__link']"
          :title="$t('pages.our_office.contacts.contact_us')"
        )
          span {{ $t('pages.our_office.contacts.contact_us') }}
          svg-icon(name="text-link-arrow")
      div(:class="$style['map']")
        img(src="~/assets/images/our-office/map.jpg" loading="lazy")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class PageOurOfficeAddress extends Vue {}
</script>

<style lang="sass" module>
.container
  background-color: $color-black-96

  &__body
    max-width: 1248px
    margin: 0 auto
    padding: 0 40px
    display: flex
    justify-content: space-between
    align-items: center

    @media (max-width: 940px)
      padding: 0 24px

.info
  max-width: 414px
  width: 100%

  &__title
    +desktop-display-style-3
    color: $color-white-100

    @media (max-width: 940px)
      +desktop-display-style-4

    @media (max-width: 360px)
      +desktop-display-style-5

  &__contacts
    list-style: none
    padding: 0
    margin: 60px 0
    max-width: 344px

    @media (max-width: 940px)
      margin: 30px 0

    &-item
      display: flex
      flex-direction: column
      row-gap: 2px

      & + &
        margin-top: 24px

      h3
        +mobile-text-style-8
        color: $color-white-64
        margin: 0

      & > a, & > p
        color: $color-white-100
        text-decoration: none
        +desktop-text-style-6
        margin: 0

      & > p span,
      & > p small
        +desktop-text-style-8

      & > p span
        color: $color-white-40

  &__link
    +desktop-text-style-6
    color: $color-white-80
    text-decoration: none
    display: flex
    align-items: center
    outline: none

    &, svg
      transition: fill 0.25s ease, color 0.25s ease

    svg
      width: 22px
      height: 22px
      fill: $color-white-80
      margin-left: 10px

    &:hover
      color: $color-white-100

      svg
        fill: $color-white-100

.map
  max-width: 560px
  width: 100%

  @media (max-width: 940px)
    display: none

  img
    width: 100%
    height: 100%
    object-fit: cover
</style>
