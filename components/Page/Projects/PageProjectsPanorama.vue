<template lang="pug">
  section(:class="$style['panorama']")
    div(:class="$style['panorama__container']")
      div(:class="$style['panorama__info']")
        span(:class="$style['panorama__info-text']")
          | Hold
          span(:class="$style['panorama__info-buttons']")
            button(:class="$style['panorama__info-button-1']")
              | Alt
            | /
            button(:class="$style['panorama__info-button-2']")
              | Option
          | & use mouse to navigate panorama
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'PageCompanyTitle',
  components: { TypoText },
  data() {
    return {
      projectsExperiencesPage: {
        title: 'City living with a touch of nature'
      },
    }
  },
}
</script>

<style lang="sass" module>
.panorama
  width: 100%

  &__container
    display: flex
    align-items: center
    justify-content: center
    max-width: 1360px
    min-height: 740px
    padding: 80px 24px
    margin: 0 auto
    background-image: url('~/assets/images/panorama/box.jpg')
    background-size: cover
    background-repeat: no-repeat
    background-position-x: center
    +style-1

    @media (max-width: 800px)
      min-height: 540px
      padding: 32px 24px
      line-height: 80px

  &__info
    color: $color-white-100
    max-width: 863px
    
    &-buttons
      white-space: nowrap

    &-button-1
      +style-3
      color: $color-blue-80
      padding: 24px 24px 8px 56px
      border-radius: 16px
      border: none
      margin: 0 20px

      @media (max-width: 500px)
        padding: 12px 12px 4px 28px
        margin: 0px 10px 0px 0px

    &-button-2
      +style-3
      color: $color-blue-80
      padding: 24px 24px 8px 56px
      border-radius: 16px
      border: none
      margin: 0 20px

      @media (max-width: 500px)
        padding: 12px 12px 4px 28px
        margin: 0px 10px 0px 30px
</style>
