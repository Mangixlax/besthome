<template lang="pug">
  div(v-if="!coociesCardIsHidden" :class="$style['cookies']")
    typo-text(
      tag="p"
      version="style-2"
    ) {{ $t('footer.cookies.title')}}
    typo-text(
      tag="p"
      version="style-8"
    ) {{ $t('footer.cookies.text')}}
      typo-text(
        :to="localePath('term-of-use')"
        title="privacy-policy"
        tag="nuxt-link"
        version="style-8"
        :class="$style['cookies__text--underline']"
      ) {{ $t('footer.cookies.link')}}
    div
      typo-text(
        tag="button"
        version="style-7"
        :class="$style['cookies__accept']"
        @click="onToggleCoociesCardHiddenMode"
      ) {{ $t('footer.cookies.accept')}}
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import { SettingsTopLineState } from '~/store/SettingsTopLine'

const SettingsTopLineStore = namespace('SettingsTopLine')

@Component({
  components: {
    TypoText,
  },
})
export default class BaseCookiesCard extends Vue {
  @SettingsTopLineStore.Action('toggleCoociesCardHiddenMode')
  onToggleCoociesCardHiddenMode!: () => void
  @SettingsTopLineStore.Getter('isCoociesCardHidden')
  coociesCardIsHidden!: SettingsTopLineState['coociesCardHidden']
}
</script>

<style lang="sass" module>
.cookies
  position: fixed
  bottom: 24px
  left: 48px
  width: 100%
  padding: 24px 32px
  display: flex
  flex-direction: column
  max-width: 384px
  background: $color-white-100
  box-shadow: 0 24px 32px -8px rgba(0, 0, 0, 0.12)
  z-index: 30

  @media (max-width: 700px)
    max-width: 272px
    left: 50%
    transform: translate(-50%, 0)

  & > p
    margin: 0
    margin-bottom: 24px

  &__text--underline
    margin: 0 0.25em
    color: $color-black-100
    text-decoration: none
    border-bottom: 1px solid $color-black-16

  &__accept,
  &__decline
    padding: 5px 24px
    border: none
    cursor: pointer

  &__accept
    background: $color-black-100
    color: $color-white-100
</style>
