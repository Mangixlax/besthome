<template lang="pug">
  div(
    :class="[$style['modal-close'], whiteMode && $style['white']]"
    v-bind="$attrs"
    v-on="$listeners"
  )
    svg-icon(name="modals/modal-close-component")
</template>

<script>
export default {
  name: 'ModalClose',
  props: {
    whiteMode: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="sass" module>
.modal-close
  height: 40px
  width: 40px
  border-radius: 50%
  border: solid 1px $color-black-8
  display: flex
  align-items: center
  justify-content: center
  cursor: pointer

  &.white
    border: solid 1px $color-white-100

  svg
    height: 40px
    width: 40px
    stroke: black

.white
  svg
    stroke: white
</style>
