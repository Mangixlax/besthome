<template lang="pug">
  section(:class="$style['track']")
    div(:class="$style['coocies__card']" v-show="isCardShow" )
      typo-text(
        tag="p"
        version="style-2"
        :class="$style['coocies__card-title']"
      ) {{ $t('footer.coocies.title')}}
      typo-text(
        tag="p"
        version="style-8"
        :class="$style['coocies__card-text']"
      ) {{ $t('footer.coocies.text')}}
        typo-text(
          :to="localePath('term-of-use')"
          title="privacy-policy"
          tag="nuxt-link"
          version="style-8"
          :class="$style['coocies__card-text--underline']"
        ) {{ $t('footer.coocies.link')}}
      div()
        button(:class="$style['coocies__card-accept']" @click="hideCard") {{ $t('footer.coocies.accept')}}
        button(:class="$style['coocies__card-decline']" @click="hideCard") {{ $t('footer.coocies.decline')}}
</template>

<script>
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'BaseCoociesCard',
  components: {
    TypoText,
  },
  data() {
    return {
      isCardShow: true,
    }
  },
  methods: {
    hideCard() {
      this.isCardShow = !this.isCardShow
    },
  },
}
</script>

<style lang="sass" module>
.track
  height: 100%
  
.coocies__card
  position: sticky
  top: 91px
  width: 100%
  padding: 24px 32px
  display: flex
  flex-direction: column
  grid-gap: 24px
  max-width: 325px
  background: rgba(255, 255, 255, 0.96)
  box-shadow: 0px 24px 32px -8px rgba(0, 0, 0, 0.12)
  backdrop-filter: blur(20px)
  z-index: 30

  & > p
    margin: 0

  &-text

    &--underline
      margin: 0 0.25em
      color: $color-black-100
      text-decoration: none
      border-bottom: 1px solid $color-black-16

  &-accept
    +style-7
    padding: 5px 24px
    border: none
    background: $color-black-100
    color: $color-white-100

  &-decline
    +style-7
    padding: 5px 24px
    border: none
    background: transparent

.coocies__link
  display: flex
</style>
