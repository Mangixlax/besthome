<template lang="pug" functional>
  p(
    v-if="props.block.data.text"
    v-html="props.block.data.text"
     :class="[$style['p'], $style[`${props.block.data.variant}`]]"
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

  created() {
    console.log(this.name)
  }
}
</script>

<style lang="sass" module>
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

  a
    cursor: pointer
    color: $color-blue-80
    text-decoration: none

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

  a
    cursor: pointer
    color: $color-blue-80
    text-decoration: none

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

  a
    cursor: pointer
    color: $color-blue-80
    text-decoration: none

.p + p
  margin: 32px 0

  @media (max-width: 760px)
    margin: 24px 0

.p + h2
  margin-top: 64px

  @media (max-width: 1054px)
    margin-top: 32px

  @media (max-width: 760px)
    margin-top: 24px

.p + h3
  margin-top: 64px

  @media (max-width: 1054px)
    margin-top: 32px

  @media (max-width: 760px)
    margin-top: 24px

.p + h4
  margin-top: 64px

  @media (max-width: 1054px)
    margin-top: 32px

  @media (max-width: 760px)
    margin-top: 24px

.p + h5
  margin-top: 64px

  @media (max-width: 1054px)
    margin-top: 32px

  @media (max-width: 760px)
    margin-top: 24px

.p + h6
  margin-top: 64px

  @media (max-width: 1054px)
    margin-top: 32px

  @media (max-width: 760px)
    margin-top: 24px
</style>
