<template lang="pug" functional>
  div(:class="$style['blockquote']")
    blockquote(
      v-if="props.block.data.text"
      :class="$style['blockquote__text']"
      v-html="props.block.data.text"
    )
    p(
      :class="$style['blockquote__author']"
      v-html="props.block.data.author"
    )
    p(
      :class="$style['blockquote__caption']"
      v-html="props.block.data.caption"
    )
    svg-icon(
      name="media/quotes"
      :class="$style['blockquote__icon']"
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
  mounted() {
    console.log('asd')
  }
}
</script>

<style lang="sass" module>
.blockquote
  display: flex
  flex-direction: column
  padding: 0
  margin: 24px 0
  line-height: 26px
  color: rgba(25, 31, 46, 0.8)
  position: relative
  text-align: left
  padding-left: 70px
  padding-right: 144px

  @media (max-width: 1440px)
    padding-right: 0

  @media (max-width: 1054px)
    padding-left: 35px

  @media (max-width: 760px)
    padding-left: 0
  
  +mobile
    padding-left: 32px

  &__text
    +desktop-text-style-4
    margin: 0
    margin-bottom: 40px

    a
      cursor: pointer
      color: $color-blue-80
      text-decoration: none

  &__author
    +desktop-text-style-6
    margin: 0
    
    a
      cursor: pointer
      color: $color-blue-80
      text-decoration: none

  &__caption
    +desktop-text-style-9
    margin: 0
    color: $color-black-32

    a
      cursor: pointer
      color: $color-blue-80
      text-decoration: none

  &__icon
    position: absolute
    top: 0
    left: -240px
    height: 80px
    width: 108px
</style>
