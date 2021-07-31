<template lang="pug">
  div(
    :class="[\
      $style['modal-close'],\
      whiteMode && $style['white'],\
      darkMode && $style['dark']\
    ]"
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
    darkMode: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="sass" module>
.modal-close
  height: 42px
  width: 42px
  border-radius: 50%
  border: solid 1px $color-black-8
  display: flex
  align-items: center
  justify-content: center
  cursor: pointer

  &.white
    border: solid 1px $color-white-100

  svg
    height: 42px
    width: 42px
    stroke: black

.white
  svg
    stroke: white

.dark
  background: $color-black-100
  border-radius: 42px

  svg
    stroke: white
</style>
