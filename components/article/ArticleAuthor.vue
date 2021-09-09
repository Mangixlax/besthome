<template lang="pug">
  div(:class="$style['author']")
    img(
      :src="$img(`/s1${data.avatar.path}`, $store.state.supportWebP ? { format: 'webp' } : {})"
      :class="$style['author-avatar']"
    )
    div(:class="$style['author-name']")
      | {{ data.name }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Jsonld } from 'nuxt-jsonld'

@Jsonld
@Component({
  components: {},
})
export default class ArticleAuthor extends Vue {
  @Prop({ type: Object, default: () => {} }) data!: Object
}
</script>

<style lang="sass" module>
.author
  display: flex
  justify-content: center
  flex-direction: column
  margin: 0 auto
  max-width: 558px
  text-align: center
  align-items: center

  &-avatar
    height: 81px
    border-radius: 50%
    margin-bottom: 14px

  &-name
    display: flex
    grid-gap: 0.25em
    +style-6
    color: $color-black-96
</style>
