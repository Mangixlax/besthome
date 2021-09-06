<template lang="pug" functional>
  ul(
    :is="$options.getType(props.block)"
    :class="$style[$options.getType(props.block)]"
  )
    li(
      v-for="(item, index) in $options.getList(props.block)"
      :key="index"
      v-html="item"
      :class="$style['li']"
    )
</template>

<script>
export default {
  name: 'ContentList',
  props: {
    block: {
      type: Object,
      default: () => ({}),
    },
  },
  getList(block = {}) {
    try {
      return block.data.items.filter((item) => item.length)
    } catch (e) {
      return []
    }
  },
  getType(block = {}) {
    try {
      return block.data.style === 'unordered' ? 'ul' : 'ol'
    } catch (e) {
      return 'ul'
    }
  },
}
</script>

<style lang="sass" module>
.ul,
.ol
  padding-left: 70px

  @media (max-width: 1054px)
    padding-left: 35px

  @media (max-width: 760px)
    padding-left: 0

  & + h2, h3, h4, h5, h6
    margin-top: 64px

    @media (max-width: 1054px)
      margin-top: 32px

    @media (max-width: 760px)
      margin-top: 24px

  & + p
    margin: 32px 0

    @media (max-width: 760px)
      margin: 24px 0

  .li
    +desktop-text-style-4
    color: rgba(25, 31, 46, 0.8)

    &:not(:last-child)
      margin-bottom: 4px

  p
    padding: 0
    margin: 0

  a
    cursor: pointer
    color: rgba(25, 31, 46, 0.8)
    border: none
    text-decoration: none
    position: relative
    border-bottom: 1px solid rgba(25, 31, 46, 0.16)
    padding-bottom: 2px
    transition: border-bottom-color 0.25s ease, color 0.25s ease

    &:hover
      border-bottom-color: gold-1
      color: gold-1

  .ul,
  .ol
    padding: 0 0 0 32px
    margin: 0 0 4px

.ul
  padding-left: 100px
  .li
    position: relative

.ul[style-none]
  .li

    &:before
      display: none

.ol
  list-style-type: decimal

  .li
    margin-left: 28px
    padding-left: 4px
</style>
