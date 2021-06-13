<template lang="pug">
  section(
    :class="{\
      [$style['text']]: true,\
      [$style['text--right']]: data.text_position === 'right',\
      [$style['text--center']]: data.text_position === 'center',\
      [$style['text--blue']]: data.color === 'blue',\
    }"
    v-html="data.text"
  )
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import { Component, Prop, Vue } from 'nuxt-property-decorator'

interface IData {
  text: string
  text_position: string
  color: string
}

@Component({ components: { TypoText } })
export default class BaseTextContainer extends Vue {
  @Prop({ type: Object, default: () => {} }) data!: IData
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

  h2
    +style-4

  h3
    +style-3

  p
    +style-5

  a
    text-decoration: underline
    text-decoration-color: $color-blue-16
    text-underline-offset: 7px
    color: $color-blue-100
    margin-left: 0.5em
</style>
