<template lang="pug">
  div(
    :class="{\
      [$style['link-banner']]: true,\
      [$style['link-banner--left']]: card.textPosition === 'left',\
      [$style['link-banner--right']]: card.textPosition === 'right',\
      [$style['link-banner--center']]: card.textPosition === 'center',\
      [$style['link-banner--top']]: card.textPosition === 'top',\
      [$style['link-banner--bottom']]: card.textPosition === 'bottom',\
      [$style['link-banner--text-right']]: card.textAlign === 'right',\
      [$style['link-banner--text-center']]: card.textAlign === 'center',\
    }"
  )
    img(
      :class="$style['link-banner__image']"
      :src="require(`@/assets/images/smart-block/${card.imageSrc}`)"
    )
    div(:class="$style['link-banner__text']")
      h2(
        :class="$style['link-banner__header']"
        v-html="card.header"
      )
      nuxt-link(
        :class="$style['link-banner__link']"
        :to="localePath({\
          name: `projects-slug-review`,\
          params: {\
            slug: card.to.name\
          }\
        })"
        :title="card.title"
        v-html="card.text"
      )
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({
  components: { TypoText },
})
export default class LinkBanner extends Vue {
  @Prop({ type: Object, default: () => {}, required: true }) card!: object
}
</script>

<style lang="sass" module>
.link-banner
  display: flex
  position: relative
  min-height: 600px
  width: 100%

  &__image
    position: absolute
    left: 0
    right: 0
    bottom: 0
    top: 0
    width: 100%
    height: 100%
    object-fit: cover

    @media (max-width: 900px)
      min-height: 272px

  &__text
    position: absolute
    padding: 0 32px
    left: 0
    right: 0
    top: 0
    bottom: 0
    display: flex
    flex-direction: column
    align-items: flex-start
    text-decoration: none
    color: $color-white-100
    justify-content: center
    text-align: left
    margin: 30px 0px

  &__header
    margin: 0
    +style-2

  &__link
    +style-5
    color: $color-white-100

    &::after
      content: ""
      position: absolute
      left: 0
      right: 0
      top: 0
      bottom: 0

  &--center &__text
    align-items: center

  &--text-center &__text
    align-items: center
    text-align: center

  &--right &__text
    align-items: flex-end

  &--text-right &__text
    align-items: flex-end
    text-align: right

  &--top &__text
    justify-content: flex-start

  &--bottom &__text
    justify-content: flex-end
</style>
