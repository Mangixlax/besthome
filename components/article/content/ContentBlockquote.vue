<template lang="pug" functional>
  blockquote(
    v-if="props.block.data.text"
    :class="[\
      $style['blockquote'],\
      props.block.data.alignment === 'rigth' ? $style['rigth'] : '',\
      props.block.data.alignment === 'center' ? $style['center'] : '',\
    ]"
    v-html="props.block.data.text"
  )
</template>

<script>
export default {
  name: 'ContentBlockquote',
  props: {
    block: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="sass" module>
.blockquote
  padding: 0
  margin: 24px 0

  line-height: 26px
  color: rgba(25, 31, 46, 0.8)
  position: relative
  text-align: left
  padding-left: 64px

  +mobile
    padding-left: 32px

  &:before
    content: ''
    position: absolute
    top: 0
    left: 46px
    bottom: 0
    width: 2px
    background-color: rgba(25, 31, 46, 0.1)

    +mobile
      left: 14px

  p
    margin: 0
    padding: 0

    &:before
      left: 47px

  + blockquote
    margin: -12px 0 24px

  &.right
    text-align: right

  &.center
    text-align: center
</style>
