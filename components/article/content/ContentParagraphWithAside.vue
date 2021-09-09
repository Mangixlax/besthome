<template lang="pug" functional>
  div(:class="$style['with-aside']")
    p(
      v-if="props.block.data.text"
      v-html="props.block.data.text"
      :class="[$style['p'], $style[`${props.block.data.variant}`]]"
    )
    p(
      v-html="props.block.data.asideText"
      :class="$style['aside']"
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
.with-aside
  position: relative

.aside
  position: absolute
  max-width: 174px
  margin: 0
  top: 0
  left: -240px
  color: $color-black-32

  +desktop-text-style-8

  @media (max-width: 1000px)
    display: none

.P1
  +desktop-text-style-3
  color: rgba(25, 31, 46, 0.8)
  margin: 0
  margin-bottom: 32px
  padding-left: 70px
  padding-right: 144px

  @media (max-width: 1440px)
    padding-right: 0

  @media (max-width: 1054px)
    padding-left: 35px

  @media (max-width: 760px)
    padding-left: 0

.P2
  +desktop-text-style-4
  color: rgba(25, 31, 46, 0.8)
  margin: 0
  margin-bottom: 32px
  padding-left: 70px
  padding-right: 144px

  @media (max-width: 1440px)
    padding-right: 0

  @media (max-width: 1054px)
    padding-left: 35px

  @media (max-width: 760px)
    padding-left: 0

.P3
  +desktop-text-style-5
  color: rgba(25, 31, 46, 0.8)
  margin: 0
  margin-bottom: 32px
  padding-left: 70px
  padding-right: 144px

  @media (max-width: 1440px)
    padding-right: 0

  @media (max-width: 1054px)
    padding-left: 35px

  @media (max-width: 760px)
    padding-left: 0

.P4
  +desktop-text-style-7
  color: rgba(25, 31, 46, 0.8)
  margin: 0
  margin-bottom: 32px
  padding-left: 70px
  padding-right: 144px

  @media (max-width: 1440px)
    padding-right: 0

  @media (max-width: 1054px)
    padding-left: 35px

  @media (max-width: 760px)
    padding-left: 0

.P5
  +desktop-text-style-8
  color: rgba(25, 31, 46, 0.8)
  margin: 0
  margin-bottom: 32px
  padding-left: 70px
  padding-right: 144px

  @media (max-width: 1440px)
    padding-right: 0

  @media (max-width: 1054px)
    padding-left: 35px

  @media (max-width: 760px)
    padding-left: 0

.with-aside + p
  margin: 32px 0

  @media (max-width: 760px)
    margin: 24px 0

.with-aside + h2
  margin-top: 64px

  @media (max-width: 1054px)
    margin-top: 32px

  @media (max-width: 760px)
    margin-top: 24px

.with-aside + h3
  margin-top: 64px

  @media (max-width: 1054px)
    margin-top: 32px

  @media (max-width: 760px)
    margin-top: 24px

.with-aside + h4
  margin-top: 64px

  @media (max-width: 1054px)
    margin-top: 32px

  @media (max-width: 760px)
    margin-top: 24px

.with-aside + h5
  margin-top: 64px

  @media (max-width: 1054px)
    margin-top: 32px

  @media (max-width: 760px)
    margin-top: 24px

.with-aside + h6
  margin-top: 64px

  @media (max-width: 1054px)
    margin-top: 32px

  @media (max-width: 760px)
    margin-top: 24px
</style>
