<template lang="pug">
  main(itemscope itemtype="http://schema.org/Article" :class="$style['main']")
    Article(
      :data="article"
    )
    
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
// import { routeTransitions } from '@/mixins/routes'
import { metaGenerator } from '@/config/meta'
import Article from '~/components/article/Article.vue'
import ArticleAuthor from '~/components/article/ArticleAuthor.vue'
// import ArticleAsideLikes from '@/components/article/ArticleAsideLikes'
import ArticleAsideContent from '@/components/article/ArticleAsideContent.vue'
import { delay } from '~/lib/utils'
// import { getSiteUrl } from '@/lib/utils'
// import { methodsWithImages } from '@/mixins/images'

@Component({
  components: {
    Article,
    ArticleAsideContent,
    ArticleAuthor,
  },
  scrollToTop: true,

  async asyncData(ctx: Context) {
    // if (!params.article) return error({ statusCode: 404 })

    if (!process.server) {
      await delay(200)
      ctx.store.commit('PageTransition/animate', true)
    } else {
      ctx.store.commit('PageTransition/animate', false)
    }

    const article = await ctx.store.dispatch(
      'Media/fetchMediaArticleItem',
      '1',
      // params.article.split('-').pop(),
    )

    // if (Object.keys(article || {}).includes('error')) return error({ statusCode: 404, error: article })

    // Редирект со стороны сервера, если ссылка имеет другой вид
    // например, был изменен slug у записи и чтобы поисковик не потерял страницу,
    // делаем редирект на новую ссылку
    // if (article.data.slugs[app.i18n.locale] !== params.article) {
    //   return redirect(
    //     301,
    //     app.router.resolve({
    //       name: route.name,
    //       params: { article: article.data.slugs[app.i18n.locale] },
    //     }).href,
    //   )
    // }

    // await store.dispatch('media/incrementArticleViews', article.data.id)

    setTimeout(() => {
      ctx.store.commit('PageTransition/animate', false)
    }, 500)

    return {
      article: article,
      // slugs: article.data.slugs,
    }
  },
})
export default class ArticlePage extends Vue {
  async mounted() {
    await this.$root.$emit('SET_CUSTOM_SLUGS', [{ attr: 'article', slugs: this.slugs }])
  }

  async updated() {
    await this.$root.$emit('SET_CUSTOM_SLUGS', [{ attr: 'article', slugs: this.slugs }])
  }
}
</script>

<style lang="sass" module>
.main
  padding-top: 32px

.article-wrap
  display: flex
  position: relative
  flex-flow: row nowrap
  margin-bottom: 48px
  max-width: 1488px
  margin: 0 auto
  padding: 0 24px
  justify-content: center

  +mobile
    flex-flow: column-reverse nowrap

.aside
  width: 100%
  max-width: 384px

  +mobile
    margin: 24px auto
</style>
