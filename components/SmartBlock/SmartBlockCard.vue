<template lang="pug">
  article(
    :class="{\
      [$style['link-banner']]: true,\
      [$style['link-banner--h-left']]: card.card_data.horizontal_align === 'left',\
      [$style['link-banner--h-center']]: card.card_data.horizontal_align === 'center',\
      [$style['link-banner--h-right']]: card.card_data.horizontal_align === 'right',\
      [$style['link-banner--v-top']]: card.card_data.vertical_align === 'top',\
      [$style['link-banner--v-center']]: card.card_data.vertical_align === 'center',\
      [$style['link-banner--v-bottom']]: card.card_data.vertical_align === 'bottom',\
    }"
  )
    img(
      v-if="card.card_image"
      :class="$style['link-banner__image']"
      :src="card.card_image"
      loading="lazy"
    )
    section(:class="$style['link-banner__text']")
      h2(:class="$style['link-banner__header']" v-html="card.name")
      component(
        :is="card.allow_transition ? 'nuxt-link' : 'div'"
        :class="{\
          [$style['link-banner__link']]: true,\
          [$style['link-banner__link--icon']]: !card.sold_out\
        }"
        :to="card.allow_transition ? localePath({\
          name: `properties-slug-about`,\
          params: { slug: card.slug }\
        }) : null"
        :title="card.allow_transition ? card.name : null"
      )
        span(v-html="(card.sold_out || !card.apartments_count || !card.allow_transition) ? $t('projects.sold_out') : $t('projects.free_available_units', [card.apartments_count])")
        svg-icon(v-if="!card.sold_out && card.apartments_count && card.allow_transition" name="link-arrow")
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { IProject } from '~/store/Catalog'

@Component({
  components: { TypoText },
})
export default class LinkBanner extends Vue {
  @Prop({ type: Object, default: () => {}, required: true }) card!: IProject
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
    padding: 30px 32px
    left: 0
    right: 0
    top: 0
    bottom: 0
    display: flex
    flex-direction: column
    align-items: flex-start
    text-decoration: none
    color: $color-white-100
    text-align: left
    background-color: $color-black-24

  &__header
    margin: 0
    font-family: Didot, serif
    font-style: normal
    font-weight: bold
    font-size: 40px
    line-height: 64px
    letter-spacing: 0.4px

  &__link
    +style-5
    margin-top: 12px
    color: $color-white-100
    text-decoration: none

    &:after
      content: ""
      position: absolute
      left: 0
      right: 0
      top: 0
      bottom: 0

    &--icon
      display: flex
      align-items: center
      justify-content: center

    &--icon span span
      text-decoration: underline
      text-decoration-color: $color-white-16
      text-underline-offset: 7px

    &--icon svg
      width: 32px
      height: 32px
      margin-left: 5px
      stroke: $color-white

  &--h-left &__text
    align-items: flex-start
    text-align: left

  &--h-center &__text
    align-items: center
    text-align: center

  &--h-right &__text
    align-items: flex-end
    text-align: right

  &--v-top &__text
    justify-content: flex-start

  &--v-center &__text
    justify-content: center

  &--v-bottom &__text
    justify-content: flex-end
</style>
