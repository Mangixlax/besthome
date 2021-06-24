<template lang="pug">
  modal-container(
    v-bind="$attrs"
    :name="name"
    :white-mode="true"
    :class="$style['modal__finish']"
  ) 
    template(slot="header")
      div(:class="$style['modal__header-space']")
    template(slot="body" :class="$style['modal__body']")
      typo-text(
        tag="div"
        version="style-4"
        :class="$style['modal__finish-title']"
      ) Thank you, expect a response
      typo-text(
        tag="div"
        version="style-5"
        :class="$style['modal__finish-text']"
      ) {{ fullName }} our agent is already studying the questionnaire and will contact you very soon at the specified phone number, as well as compose and send an email.
      typo-text(
        tag="div"
        version="style-5"
        :class="$style['modal__finish-text']"
      ) This window will close after {{ hideTimerSeconds }} sec.
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
  mixins: [ formDescriptionTimerMixin, formMixin, formPhoneMixin,],
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
    fullName: {
      type: String,
      default: '',
    },
  },
  mounted() {
    this.hideTimerStart(() => {
      this.$modal.hide(this.name)
      this.showFinishStep = false
      this.afterFinish()
    }, 9)
  }
}
</script>

<style lang="sass" module>
.modal__finish
  padding: 24px 40px 48px 64px
  background: $color-blue-100
  color: $color-white-100

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
