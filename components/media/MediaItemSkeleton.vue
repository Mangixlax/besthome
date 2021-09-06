<template lang="pug" functional>
  div(
    :class="[\
      $style['item'],\
      !props.horizontal ? $style['vertical'] : ''\
    ]"
  )
</template>

<script>
export default {
  name: 'MediaItemSkeleton',
  props: {
    horizontal: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="sass" module>
.item
  position: relative
  border-radius: 10px
  display: inline-block
  width: 48%
  height: 228px
  vertical-align: middle
  overflow: hidden
  background-color: $mute-gray
  background-image: linear-gradient(90deg, rgba(25, 31, 46, 0) 0%, rgba(25, 31, 46, 0.06) 50%, rgba(25, 31, 46, 0) 100%)
  background-size: 200% 100%
  background-position: 200% center
  background-repeat: no-repeat
  animation: loading 1.5s infinite

  &.vertical
    width: 288px
    height: 456px

  &:not(:last-child)
    margin-right: 40px

@keyframes loading
  to
    background-position: -200% center
</style>
