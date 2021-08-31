<template lang="pug">
  div(:class="$style['personal-card']")
    div(
      :class="$style['personal-card__photo']"
    )
      img(
        v-if="card.avatar"
        :src="$img(`/s1${card.avatar}`, $store.state.supportWebP ? { format: 'webp' } : {})"
        loading="lazy"
        decoding="async"
        :class="$style['personal-card__photo-image']"
      )
    div(:class="$style['personal-card__name']")
      typo-text(
        tag="nuxt-link"
        version="style-5"
         :to="localePath({\
          name: 'company-our-team-id',\
          params: {\
            id: card.slug\
          }\
        })"
        :class="$style['personal-card__name-link']"
      ) {{ card.name }}
      svg-icon(name="link-arrow-blue")
    typo-text(
      tag="p"
      version="style-7"
      :class="$style['personal-card-position']"
    ) {{ card.position }}
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'PageCompanyPersonalCard',
  components: { TypoText },
  props: {
    card: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="sass" module>
.personal-card
  display: flex
  width: 276px
  height: 343px
  flex-direction: column
  background-color: $color-blue-4
  padding: 32px
  position: relative

  &__photo
    max-width: 212px
    height: 158px
    align-self: center
    margin-bottom: 16px

    &-image
      width: 100%
      max-height: 158px
      object-fit: cover
      object-position: right top

  &__name
    display: flex
    align-items: center

    &-link
      text-decoration: underline
      text-decoration-color: $color-blue-16
      text-underline-offset: 7px
      color: $color-blue-100
      white-space: nowrap

      &::after
        content: ""
        position: absolute
        top: 0
        right: 0
        bottom: 0
        left: 0

    svg
      height: 26px
      width: 26px
</style>
