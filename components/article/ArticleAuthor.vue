<template lang="pug">
  div(:class="$style['author']")
    img(
      :src="$img('/pages/quality/title/image-1.jpg', $store.state.supportWebP ? { format: 'webp' } : {})"
      :class="$style['author-avatar']"
    )
    div(:class="$style['author-name']")
      p(:class="$style['author-firstname']")
        | {{ data.lastname }} 
      p(:class="$style['author-lastname']")
        | {{ data.firstname }} 
    p(:class="$style['author-date']")
      | {{ data.date }}
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
    width: 81px
    height: 81px
    border-radius: 50%
    margin-bottom: 14px

  p
    margin: 0

  &-name
    display: flex
    grid-gap: 0.25em

    p
      +style-6
      color: $color-black-96

  &-date
    +style-8
    color: $color-black-32
</style>
