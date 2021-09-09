<template lang="pug">
  div(
    v-if="data"
    :class="$style['media-card']" v-bind="$attrs"
  )
    nuxt-link(
      :to="localePath({\
        name: 'media-article',\
        params: {\
          article: data.slugs[$i18n.locale]\
        }\
      })"
      :class="$style['media-card__link']"
    )
    img(
      :class="{\
        [$style['media-card__image']]: true,\
        [$style['media-card__image--loaded']]: isLoaded,\
      }"
      :src="$img(`/s1${data.poster.path}`, $store.state.supportWebP ? { format: 'webp' } : {})"
      loading="lazy"
      decoding="async"
      @load="isLoaded = true"
    )
    p(
      v-html="data.published_at"
      :class="$style['media-card__date']"
    )
    p(
      v-html="data.title"
      :class="$style['media-card__title']"
    )
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import CommonSubscribe from '~/components/Common/CommonSubscribe.vue'
import { IArticle } from '~/store/Media'

@Component({
  components: {
    TypoText,
    CommonSubscribe,
  },
})
export default class MediaCard extends Vue {
  @Prop({ type: Object, default: () => {} }) data!: IArticle

  public isLoaded: boolean = false
}
</script>

<style lang="sass" module>
.media-card
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  position: relative
  grid-gap: 16px
  z-index: 0

  &__image
    object-fit: cover
    flex-grow: 1
    background-color: $color-black-8

    &--loaded
      background-color: transparent

  &__date
    margin: 0
    +desktop-text-style-7
    color: $color-black-56

  &__title
    margin: 0
    +desktop-text-style-4

  &__link
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    cursor: pointer
    z-index: 3

    &:hover ~ .media-card__title
      color: $color-blue-100
</style>
