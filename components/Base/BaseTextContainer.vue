<template lang="pug">
  section(
    :class="{\
      [$style['text']]: true,\
      [$style['text--right']]: textAlign === 'right',\
      [$style['text--center']]: textAlign === 'center',\
    }"
  )
    slot
</template>

<script lang="ts" scoped>
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'BaseTextContainer',
  components: { TypoText },
  props: {
    textAlign: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="sass" module>
.text
  max-width: 912px
  padding: 80px 24px
  margin: 0 auto

  &--center
    text-align: center

  &--right
    text-align: right

  & > *:first-child
    margin-top: 0

  & > *:last-child
    margin-bottom: 0

  &:is(h1, h2, h3, h4, h5, h6)
    margin-bottom: 40px

  a
    text-decoration: underline
    text-decoration-color: $color-blue-16
    text-underline-offset: 7px
    color: $color-blue-100
    margin-left: 0.5em
</style>
