<template lang="pug">
  section(:class="$style['fastlinks']")
    h3(:class="$style['fastlinks-title']") {{ title }}
    ol(:class="$style['fastlinks__list']")
      li(
        v-for="(link, i) in list"
        :key="i"
        :class="$style['fastlinks__item']"
      )
        a(:class="$style['fastlinks__item-link']" href="#") 
          span(:class="$style['fastlinks__item-link--underline']") 
            | {{link.name}}
          svg-icon(name="link-arrow")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class BaseFastLinks extends Vue {
  @Prop({ type: String, required: true })
  private title!: string

  @Prop({ type: Array, required: true })
  private list!: Array<Object>
}
</script>

<style lang="sass" module>
.fastlinks
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center

  &-title
    color: rgba(17, 17, 17, 1)
    margin-bottom: 8px
    +style-6($with-media: false)

  &__list
    display: flex
    flex-direction: column
    list-style: none
    padding: 0
    margin: 0
    justify-content: center

  &__item
    display: flex
    align-items: center

    &-link
      display: flex
      align-items: center
      text-decoration: none
      margin-bottom: 8px
      color: rgba(17, 17, 17, 0.88)
      +style-8($with-media: false)

      &--underline
        text-decoration: underline
        text-underline-offset: 7px
        text-decoration-color: rgba(17, 17, 17, 0.16)

      svg
        width: 18px
        height: 18px
</style>
