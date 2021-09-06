<template lang="pug">
  article(
    :class="$style['article']"
  )
    header(:class="$style['article__header']")
      article-author(:data="author")
      h1(:class="$style['article__header-title']") 
        | {{ data.title }}

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
  @Prop({ type: Object, default: false }) data!: object

  public author: Object = {
    avatar: '',
    firstname: 'Aslan',
    lastname: 'Dzhangetov',
    date: 'As of august 7, 2021',
  }

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

    &-title
      +style-1
      max-width: 992px
      padding: 0 24px
      margin: 0 auto
      margin-top: 64px
      margin-bottom: 172px

      @media (max-width: 1054px)
        margin-bottom: 64px

      @media (max-width: 760px)
        margin-bottom: 32px

  &__container
    display: grid
    grid-template-columns: minmax(150px, 334px) minmax(150px, 952px)
    grid-gap: 70px
    flex-direction: column-reverse
    max-width: 1488px
    margin: 0 auto
    padding: 0 24px

    @media (max-width: 1056px)
      grid-gap: 30px

    @media (max-width: 1000px)
      grid-template-columns: minmax(280px, 744px)


    &-nav
      height: 100%

    &-content
      width: 100%
  /*&__left*/
  /*  flex-shrink: 0*/

  /*  &-block*/
  /*    display: block*/
  /*    min-height: 560px*/
  /*    height: calc(100%)*/

  /*    &__sticky*/
  /*      position: -webkit-sticky*/
  /*      position: sticky*/
  /*      background-color: transparent*/
  /*      z-index: 1*/
  /*      top: 100px*/

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

  // &__content
  //   word-wrap: break-word

  //&--grid &__content
  //  padding: 0 64px
  //
  //  +mobileWithTablet
  //    padding: 0
</style>
