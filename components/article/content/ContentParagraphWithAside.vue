<template lang="pug" functional>
  p(
    v-if="props.block.data.text"
    v-html="props.block.data.text"
    :class="$style['p']"
  )
</template>

<script>
export default {
  name: 'ContentParagraph',
  props: {
    block: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="sass" module>
.p
  +style-5
  color: rgba(25, 31, 46, 0.8)
  margin: 0
  margin-bottom: 32px
  padding-left: 70px

  @media (max-width: 1054px)
    padding-left: 35px

  @media (max-width: 760px)
    padding-left: 0

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
      color: gol

.p + h2, h3, h4, h5, h6
  margin-top: 64px

  @media (max-width: 1054px)
    margin-top: 32px

  @media (max-width: 760px)
    margin-top: 24px

.p + p
  margin: 32px 0

  @media (max-width: 760px)
    margin: 24px 0
</style>
