<template lang="pug">
  div(
    :class="{\
      [$style['button']]: true,\
      [$style['button--offset']]: !coociesCardIsHidden,\
    }"
    @click="onButtonClick"
  ) 
    div(:class="$style['button__wrapper']")
      svg-icon(
        name="messenger/icon-viber"
        :class="$style[`button__wrapper-icon-0`]"
      )
      svg-icon(
        name="messenger/icon-whatsup"
        :class="$style[`button__wrapper-icon-1`]"
      )
      svg-icon(
        name="messenger/icon-telegram"
        :class="$style[`button__wrapper-icon-2`]"
      )
</template>

<script lang="ts">
import { Component, Prop, Vue, namespace } from 'nuxt-property-decorator'
import { modalsTriggerMixin } from '~/mixins/modals'
import { SettingsTopLineState } from '~/store/SettingsTopLine'

const SettingsTopLineStore = namespace('SettingsTopLine')

@Component({
  mixins: [modalsTriggerMixin],
})
export default class CommonMessengerButton extends Vue {
  @SettingsTopLineStore.Getter('isCoociesCardHidden')
  coociesCardIsHidden!: SettingsTopLineState['hidden']

  public onButtonClick() {
    this.showModal({
      name: 'modal-choose-messenger',
      modal: () => import('~/components/Modal/ChooseMessenger/ModalChooseMessenger.vue'),
      options: {
        height: 'auto',
        width: '100%',
        maxWidth: 1120,
      },
      props: {
        data: this.$i18n.t('modals.choose_messenger'),
      },
    })
  }
}
</script>

<style lang="sass" module>
.button
  width: 70px
  height: 70px
  border-radius: 65px
  position: fixed
  bottom: calc(env(safe-area-inset-bottom, 0) + 90px)
  left: 90px
  z-index: 999
  animation: color 18s infinite
  background: linear-gradient(95deg, rgb(250, 202, 23) 20%, rgb(255, 156, 72) 80%)
  transition: all 0.5s ease
  cursor: pointer
  
  @media (max-width: 900px)
    width: 65px
    height: 65px
    bottom: calc(env(safe-area-inset-bottom, 0) + 20px)
    left: 20px

  &--offset
    bottom: 380px

  &__wrapper
    svg
      backface-visibility: hidden
      position: absolute
      margin: auto
      top: 0
      left: 0
      right: 0
      bottom: 0
      height: 32px
      width: 32px

    &-icon-0
      animation: flipInY-0 18s infinite

    &-icon-1
      animation: flipInY-1 18s infinite

    &-icon-2
      animation: flipInY-2 18s infinite

@keyframes color
  0%, 16.6%
    background: #6F58A1

  20%, 36.6%
    background: #54B153

  40%, 56.6%
    background: #29B6F6

  60%, 76.6%
    background: #54B153

  80%, 96.6%
    background: #6F58A1

  100%
    background: #6F58A1

@keyframes flipInY-0
  0%, 16.6%
    transform: rotateY(0deg)

  20%, 36.6%
    transform: rotateY(180deg)

  // 40%, 57.14%
  //   transform: rotateY(0deg)

  60%, 76.6%
    transform: rotateY(180deg)

  80%, 100%
    transform: rotateY(0deg)

@keyframes flipInY-1
  0%, 16.6%
    transform: rotateY(180deg)

  20%, 36.6%
    transform: rotateY(0deg)

  40%, 56.6%
    transform: rotateY(180deg)

  60%, 76.6%
    transform: rotateY(0deg)

  80%, 96.6%
    transform: rotateY(180deg)

  100%
    transform: rotateY(180deg)

@keyframes flipInY-2
  0%, 16.6%
    transform: rotateY(180deg)

  20%, 36.6%
    transform: rotateY(180deg)

  40%, 56.6%
    transform: rotateY(0deg)

  60%, 76.6%
    transform: rotateY(180deg)

  80%, 96.6%
    transform: rotateY(180deg)

  100%
    transform: rotateY(180deg)
</style>
