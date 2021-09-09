<template lang="pug">
  article(
    :class="$style['article']"
  )
    header(:class="$style['article__header']")
      article-author(:data="data.author")
      p(:class="$style['article__header-date']")
        | {{ data.published_at }}
      h1(:class="$style['article__header-title']") 
        | {{ data.header }}
    div(
      :class="$style['article__container']"
    )
      nav(
        :class="$style['article__container-nav']"
      )
        article-aside-content(:list="getHeadings")
      div(:class="$style['article__container-content']")
        article-render(
          v-for="(block, index) in data.content"
          :key="index"
          :index="index"
          :block="block"
        )
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import ArticleRender from '@/components/article/ArticleRender.vue'
import ArticleAuthor from '~/components/article/ArticleAuthor.vue'
import ArticleAsideContent from '@/components/article/ArticleAsideContent.vue'
import { IBlock } from '~/store/Media'

@Component({
  components: {
    ArticleRender,
    ArticleAuthor,
    ArticleAsideContent,
  },
})
export default class ArticleBlock extends Vue {
  @Prop({ type: Object, default: () => {} }) data!: Object

  get getHeadings() {
    return (this as any).data.content
      .map((block: IBlock, index: any) => {
        return { ...block, index }
      })
      .filter((block: IBlock) => block.type === 'header')
      .map((block: any) => {
        return { text: block.data.text, index: block.index }
      })
  }
}
</script>

<style lang="sass" module>
.article
  display: flex
  position: relative
  flex-direction: column

  &__header
    text-align: center

    &-date
      margin: 0
      +style-8
      color: $color-black-32

    &-title
      +style-1
      max-width: 992px
      padding: 0 24px
      margin: 0 auto
      margin-top: 64px
      margin-bottom: 148px

      @media (max-width: 1054px)
        margin-bottom: 64px

      @media (max-width: 760px)
        margin-bottom: 32px

  &__container
    display: grid
    grid-template-columns: minmax(150px, 487px) minmax(150px, 952px)
    flex-direction: column-reverse
    max-width: 1488px
    margin: 0 auto
    padding: 0 24px
    grid-gap: 24px

    @media (max-width: 1056px)
      grid-template-columns: minmax(150px, 314px) minmax(150px, 952px)
      grid-gap: 30px

    @media (max-width: 1000px)
      grid-template-columns: minmax(280px, 744px)

    &-nav
      height: 100%

      @media (max-width: 1000px)
        display: none

    &-content
      padding: 24px 0
      width: 100%

  &__nav
    display: -webkit-box
    display: flex
    -webkit-box-orient: vertical
    -webkit-box-direction: normal
    flex-direction: column
    -webkit-box-pack: start
    justify-content: flex-start
    position: relative
    padding-top: 0
    padding-bottom: 0
    margin-left: 0
    -webkit-box-flex: 1
    flex: 1

    @media (max-width: 1000px)
      display: none

a
  cursor: pointer
  color: $color-blue-80
  text-decoration: none
</style>
