<template lang="pug">
  div(:class="[$style['modal'], full && $style['full']]")

    div(:class="$style['modal__header']")

      div(:class="$style['modal__header-buttons']")
        slot(name="header")
        button(
          type="button"
          aria-label="Close modal"
          :class="$style['modal__close']"
          @click.prevent="closeModal"
        )
          modal-close(:white-mode="whiteMode")
    div(:class="$style['modal__body']")
      slot(name="body")
    div(:class="$style['modal__footer']")
      slot(name="footer")
</template>

<script>
import ModalClose from '@/components/Modal/base/ModalClose.vue'
export default {
  name: 'ModalContainer',
  components: {
    ModalClose,
  },
  props: {
    name: {
      // Modal id
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    full: {
      type: Boolean,
      default: false,
    },
    whiteMode: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeModal() {
      this.$modal.hide(this.name)
    },
  },
  mounted() {
    this.$root.$on('HIDDEN_SEARCH_MODAL', () => {
      this.$modal.hide(this.name)
    })
  },
  beforeDestroy() {
    this.$modal.hide(this.name)
    this.$root.$off('HIDDEN_SEARCH_MODAL')
  },
}
</script>

<style lang="sass" module>
.modal
  display: flex
  align-items: flex-start
  z-index: 100
  flex-direction: column
  width: 100%
  height: 100%
  h2
    margin-top: 0
    margin-bottom: 16px

  &.full
    min-width: 100%
    height: 100%

  &__header
    width: 100%
    display: flex
    margin: 0 auto

    &-buttons
      width: 100%
      display: flex
      justify-content: space-between
      align-items: center
      position: relative
      z-index: 1

  &__close
    height: 40px
    width: 40px
    padding: 0
    display: flex
    position: absolute
    top: 24px
    right: 24px
    align-items: center
    justify-content: center
    border: none
    background: none
    cursor: pointer

  &__body
    position: relative
    width: 100%
    height: 100%
    flex-direction: column

    +mobile
      margin: 0

  &__footer
    width: 100%

.full
  .modal__body
    padding: 0
    margin: 0
    height: calc(100% - 68px)
    max-width: none

  .modal__header-buttons
    top: 32px
    left: 32px
    right: 32px
    z-index: 11
    position: fixed
    width: calc(100% - 64px)
</style>
