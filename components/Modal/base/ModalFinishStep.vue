<template lang="pug">
  modal-container(
    v-bind="$attrs"
    :name="name"
    :class="$style['modal__finish']"
  ) 
    template(slot="header")
    template(slot="body")
      typo-text(
        tag="div"
        version="style-2"
        :class="$style['modal__finish-titile']"
      ) Thank you
      typo-text(
        tag="div"
        version="style-5"
        :class="$style['modal__finish-text']"
      ) Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</template>

<script>
import TypoText from '~/components/Base/TypoText.vue'
import ModalContainer from '~/components/Modal/base/ModalContainer'


export default {
  name: 'ModalFinishStep',
  components: {
    TypoText,
    ModalContainer,
  },

  props: {
    name: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="sass" module>
.modal__finish
  padding: 24px
</style>
