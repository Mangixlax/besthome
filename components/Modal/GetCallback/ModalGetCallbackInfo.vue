<template lang="pug">
  div(:class="$style['get-callback__info']")
    div(:class="$style['get-callback__info-avatar']")
      img(:src="require(`~/assets/images/our-team/person-2.png`)", alt="alt")
    typo-text(
      tag="div"
      version="style-6"
      :class="$style['get-callback__info-name']"
    ) {{ $t('modals.get_callback.info.name') }}
    typo-text(
      tag="div"
      version="style-6"
      :class="$style['get-callback__info-position']"
    ) {{ $t('modals.get_callback.info.position') }}
    typo-text(
      tag="div"
      version="style-6"
      :class="$style['get-callback__info-languages']"
    ) {{ $t('modals.get_callback.info.languages') }}
    div(:class="$style['get-callback__info-contact']")
      a(
        href="tel: +90 530 547-44-15"
        :class="$style['get-callback__info-contact-phone']"
      ) +90 530 547-44-15
      svg-icon(name="icon-whatsup")
      svg-icon(name="icon-viber")
      svg-icon(name="icon-telegram")
    a(
      href="mailto: info@besthome.com.tr"
      :class="$style['get-callback__info-email']"
    ) info@besthome.com.tr
      svg-icon(name="link-arrow")
    typo-text(
      tag="div"
      version="style-8"
      :class="$style['get-callback__info-office']"
    ) {{ $t('modals.get_callback.info.office') }}
    div(:class="$style['get-callback__info-link']")
      typo-text(
        tag="p"
        version="style-5"
        :class="$style['get-callback__info-link-text']"
      ) {{ $t('modals.get_callback.info.link.text') }}
      typo-text(
        tag="nuxt-link"
        version="style-5"
        :to="localePath('contacts')"
        title="contacts"
        :class="$style['get-callback__info-link-text--underline']"
      ) {{ $t('modals.get_callback.info.link.link') }}
      | .
      typo-text(
        tag="nuxt-link"
        version="none"
        :to="localePath('contacts')"
        title="contacts"
        :class="$style['get-callback__info-link-arrow']"
      )
        svg-icon(name="link-arrow")
</template>

<script>
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'ModalGetCallbackInfo',
  components: {TypoText },
}
</script>

<style lang="sass" module>
.get-callback__info
    display: flex
    flex-direction: column
    padding: 48px 55px 64px 40px

    @media (max-width: 800px)
      padding: 0
    &-avatar
      height: 88px
      width: 88px
      border-radius: 50%
      margin-bottom: 16px
      display: flex
      align-items: center
      justify-content: center
      
      img
        height: 100%
        border-radius: 50%
        
    &-position
      color: $color-black-56
      margin-bottom: 16px

    &-contact
      display: flex
      align-items: center

      &-phone
        +style-7
        text-decoration: none
        margin: 0
        color: $color-black-100

      svg
        height: 20px
        width: 20px
        margin-left: 4px

    &-email
      +style-7
      display: flex
      align-items: center
      margin: 0
      color: $color-black-100
      text-decoration: underline
      text-underline-offset: 7px
      text-decoration-color: $color-black-16
      margin-bottom: 33px

      svg
        height: 32px
        width: 32px
        stroke: $color-black-100

    &-office
      color: $color-black-72
      margin-bottom: 12px

    &-link
      display: flex
      align-items: center

      &-text
        margin: 0

        &--underline
          text-decoration: underline
          text-decoration-color: $color-black-16
          text-underline-offset: 7px
          color: $color-black-100
          margin-left: 0.5em

      &-arrow
        height: 26px

        svg
          stroke: $color-black-100
          height: 32px
          width: 32px
</style>

