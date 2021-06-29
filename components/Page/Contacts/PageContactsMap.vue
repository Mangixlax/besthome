<template lang="pug">
  section(:class="$style['contact']")
    div(:class="$style['contact__container']")
      div(:class="$style['contact__content']")
        typo-text(
          tag="h1"
          version="style-1"
          :class="$style['contact__content-title']"
        ) {{ contactMap.title }}
        typo-text(
          tag="div"
          version="style-5"
          :class="$style['contact__content-contact']"
        )
          a(
            href="tel:+90 530 547-44-15"
            :class="$style['contact__content-contact-phone']"
            @click="$emit('click-to-contact')"
          ) +90 530 547-44-15
          a(
            target="_blank"
            href="https://wa.me/905305474415"
          )
            svg-icon(name="icon-whatsup")
          a(
            target="_blank"
            href="viber://chat?number=+905305474415"
          )
            svg-icon(name="icon-viber")
          a(
            target="_blank"
            href="tg://resolve?domain=905305474415"
          )
            svg-icon(name="icon-telegram")
        typo-text(
          tag="a"
          version="style-5"
          href="mailto:info@besthome.com.tr"
          :class="$style['contact__content-email']"
        ) {{ contactMap.email }}
        typo-text(
          tag="p"
          version="style-6"
          :class="$style['contact__content-address']"
        ) {{ contactMap.address }}
        typo-text(
          tag="p"
          version="style-6"
          :class="$style['contact__content-work_time']"
        ) {{ contactMap.workTime }}
        div(:class="$style['content__link']")
          typo-text(
            tag="p"
            version="style-5"
            :class="$style['content__link-text']"
          ) {{ contactMap.linkToMap.text}}
          typo-text(
            tag="a"
            version="style-5"
            href="https://goo.gl/maps/GQ9d8WPAsrPe974L9"
            :title="contactMap.linkToMap.link"
            :class="$style['content__link-text--underline']"
          ) {{  contactMap.linkToMap.link }}
          | .
          typo-text(
            tag="a"
            version="none"
            href="https://goo.gl/maps/wAAvmLgbH4eCEyEm7"
            :title="contactMap.linkToMap.link"
            :class="$style['content__link-arrow']"
          )
            svg-icon(name="link-arrow-white")
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'

export default {
  components: { TypoText },
  props: {
    contactMap: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="sass" module>
.contact
  width: 100%
  height: 100%
  background-color: #262626

  &__container
    max-width: 1440px
    height: 720px
    margin: 0 auto
    background-image: url(~/assets/images/contacts-map-bg.jpg)
    background-repeat: no-repeat
    background-position-x: center

    @media (max-width: 1054px)
      background-position-x: 86%
      padding-top: 97px

    @media (min-width: 1055px)
      -webkit-mask: linear-gradient(to left, transparent 1%, black 5%), linear-gradient(to right, transparent 1%, black 5%)
      -webkit-mask-position: center
      -webkit-mask-repeat: no-repeat
      -webkit-mask-composite: add
      mask: linear-gradient(to left, transparent 1%, black 5%), linear-gradient(to right, transparent 1%, black 5%)
      mask-position: center
      mask-repeat: no-repeat
      mask-composite: intersect

  &__content
    max-width: 912px
    margin: 0 auto
    padding: 201px 24px 126px 24px
    display: flex
    flex-direction: column

    @media (max-width: 1054px)
     padding: 60px 24px 60px 24px

    &-title
      margin: 0 0 32px
      color: $color-white-100

      @media (max-width: 1054px)
        margin-bottom: 0

    &-contact
      text-decoration: none
      color: $color-white-100
      display: flex
      align-items: center

      a
        color: $color-white-100
        display: block
        align-items: center
        text-decoration: none

      svg
        display: block
        height: 20px
        width: 20px
        margin-left: 6px

    &-email
      margin: 0 0 32px
      color: $color-white-100
      text-decoration: none

    &-address
      max-width: 450px
      color: $color-white-56
      margin: 0

    &-work_time
      color: $color-white-56
      margin-bottom: 32px

.content__link
  display: flex
  align-items: center
  color: $color-white-100

  &-text
    margin: 0

    &--underline
      text-decoration: underline
      text-decoration-color: $color-white-16
      text-underline-offset: 7px
      color: $color-white-100
      margin-left: 0.5em

  &-arrow
    height: 26px

    svg
      height: 26px
      width: 26px
</style>
