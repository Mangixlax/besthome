<template lang="pug">
  ul(:class="$style['headings']")
    li(
      :class="$style['headings__item']"
      v-for="(item, index) in list"
      :key="index"
    )
      a(
        :class="$style['headings__item-link']"
        :href="`#ahead_${item.index}`"
        :title="item.text"
        @click.prevent="scrollToHead(`ahead_${item.index}`)"
      )
        span {{ item.text }}
</template>

<script>
export default {
  name: 'ArticleAsideContent',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    scrollToHead(header_id) {
      this.$scrollTo(`#${header_id}`, 500, { offset: -100 })
    },
  },
}
</script>

<style lang="sass" module>
.headings
  position: sticky
  top: 150px
  list-style: none
  padding: 26px 0 26px 144px
  margin: 0
  background: $color-white-100
  z-index: 2

  @media (max-width: 1440px)
    padding-left: 0

  li:not(:last-child)
    margin-bottom: 20px

  h3
    margin: 0
    padding: 0

  ul
    padding-left: 40px
    height: 100%
    display: flex
    flex-direction: column
    grid-gap: 20px
    position: sticky
    top: 150px
    margin-top: 1rem

  a
    +style-6
    cursor: pointer
    color: rgba(25, 31, 46, 0.8)
    border: none
    text-decoration: none
    position: relative
    display: flex
    align-items: center
    grid-gap: 16px

    &::before
      content: ""
      height: 1px
      width: 24px
      background-color: $color-black-16
</style>
