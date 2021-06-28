<template lang="pug">
  modal-container(
    v-bind="$attrs"
    :name="name"
    :white-mode="true"
    :class="{\
      [$style['modal__finish']]: true,\
      [$style['modal__finish--error']]: !success,\
    }"
  )
    template(slot="header")
      div(:class="$style['modal__header-space']")
    template(slot="body" :class="$style['modal__body']")
      typo-text(
        tag="div"
        version="style-4"
        :class="$style['modal__finish-title']"
      ) {{ title }}
      typo-text(
        v-if="text"
        tag="div"
        version="style-5"
        :class="$style['modal__finish-text']"
      ) {{ text }}
      typo-text(
        tag="div"
        version="style-5"
        :class="$style['modal__finish-text']"
      ) {{ $t('modals.finish_modal.timer') }} {{ hideTimerSeconds }} {{ $t('modals.finish_modal.sec') }}
</template>

<script>
import TypoText from '~/components/Base/TypoText.vue'
import ModalContainer from '~/components/Modal/base/ModalContainer'
import { formMixin, formPhoneMixin, formDescriptionTimerMixin } from '@/mixins/form.js'

export default {
  name: 'ModalFinishStep',
  components: {
    TypoText,
    ModalContainer,
  },
  mixins: [formDescriptionTimerMixin, formMixin, formPhoneMixin],
  data() {
    return {
      hideTimer: null,
      hideTimerSeconds: 0,
    }
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    success: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    this.hideTimerStart(() => {
      this.$modal.hide(this.name)
      this.showFinishStep = false
      this.afterFinish()
    }, 6)
  },
  beforeDestroy() {
    this.hideTimerClear()
  },
}
</script>

<style lang="sass" module>
.modal__finish
  padding: 24px 40px 48px 64px
  background-color: $color-blue-100
  color: $color-white-100

  &--error
    background-color: $color-red-100

  &-title
    margin-top: 32px
    margin-bottom: 24px

  &-text
    margin-bottom: 24px

.modal__header-space
  height: 48px

.modal__body
  margin-top: 24px
</style>
