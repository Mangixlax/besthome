<template lang="pug" functional>
  hr(v-bind="data.attrs" :class="$style['hr']")
</template>

<script>
export default {
  name: 'ContentDivider',
  props: {
    block: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="sass" module>
.hr
  position: relative
  width: 100%
  height: 28px
  margin: 12px 0
  border: none

  &:before
    content: '* * *'
    position: absolute

    color: rgba(25, 31, 46, 0.4)
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
</style>
