<template lang="pug">
  section(
    :class="{\
      [$style['text']]: true,\
      [$style['text--right']]: textAlign === 'right',\
      [$style['text--center']]: textAlign === 'center',\
      [$style['text--blue']]: textColor === 'blue',\
    }"
  )
    slot
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({ components: { TypoText } })
export default class BaseTextContainer extends Vue {
  @Prop({ type: String, default: '' }) textAlign!: string
  @Prop({ type: String, default: '' }) textColor!: string
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

  &--blue
    color: $color-blue-100

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
