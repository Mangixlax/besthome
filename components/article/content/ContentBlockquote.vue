<template lang="pug" functional>
  div(:class="$style['blockquote']")
    svg-icon(
      name="media/quotes"
      :class="$style['blockquote__icon']"
    )
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

  &__icon
    width: 30px
    height: 30px
    margin-bottom: 35px
    fill: $color-black-40

  &__text
    +desktop-text-style-4
    margin: 0
    margin-bottom: 35px

    a
      cursor: pointer
      color: $color-blue-80
      text-decoration: none

  &__author
    +desktop-text-style-6
    margin: 0

  &__caption
    +desktop-text-style-8
    margin: 0
    color: $color-black-32

    a
      cursor: pointer
      color: $color-blue-80
      text-decoration: none

.blockquote + .blockquote
  margin: 32px 0

  @media (max-width: 760px)
    margin: 24px 0

.blockquote + h2
  margin-top: 64px

  @media (max-width: 1054px)
    margin-top: 32px

  @media (max-width: 760px)
    margin-top: 24px

.blockquote + h3
  margin-top: 64px

  @media (max-width: 1054px)
    margin-top: 32px

  @media (max-width: 760px)
    margin-top: 24px

.blockquote + h4
  margin-top: 64px

  @media (max-width: 1054px)
    margin-top: 32px

  @media (max-width: 760px)
    margin-top: 24px

.blockquote + h5
  margin-top: 64px

  @media (max-width: 1054px)
    margin-top: 32px

  @media (max-width: 760px)
    margin-top: 24px

.blockquote + h6
  margin-top: 64px

  @media (max-width: 1054px)
    margin-top: 32px

  @media (max-width: 760px)
    margin-top: 24px
</style>
