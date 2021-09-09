<template lang="pug">
  main(itemscope itemtype="http://schema.org/Article" :class="$style['main']")
    Article(
      :data="article"
    )
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import { metaGenerator } from '@/config/meta'
import Article from '~/components/article/Article.vue'
import ArticleAuthor from '~/components/article/ArticleAuthor.vue'
import ArticleAsideContent from '@/components/article/ArticleAsideContent.vue'
import { getSiteUrl, delay } from '~/lib/utils'

@Component({
  components: {
    Article,
    ArticleAsideContent,
    ArticleAuthor,
  },
  scrollToTop: true,
  head(): any {
    const title = this.article.seo_title + ' ' + this.$i18n.t('seo_title')

    const description = this.article.seo_description

    return {
      title,
      htmlAttrs: {
        lang: this.$i18n.locale,
        prefix: 'og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#',
      },
      meta: metaGenerator({
        title,
        description,
      }),
      link: [
        {
          rel: 'canonical',
          href: getSiteUrl(this.localePath(this.$route.path), true),
        },
        {
          rel: 'alternate',
          hreflang: 'x-default',
          href: getSiteUrl(
            this.localePath(
              {
                name: 'media-article',
                params: this.$route.params,
              },
              'en',
            ),
            true,
          ),
        },
        {
          rel: 'alternate',
          hreflang: 'ru',
          href: getSiteUrl(
            this.localePath(
              {
                name: 'media-article',
                params: this.$route.params,
              },
              'ru',
            ),
            true,
          ),
        },
      ],
    }
  },
  async asyncData(ctx: Context) {

    if (!process.server) {
      await delay(200)
      ctx.store.commit('PageTransition/animate', true)
    } else {
      ctx.store.commit('PageTransition/animate', false)
    }

    const article = await ctx.store.dispatch(
      'Media/fetchMediaArticleItem',
      ctx.params.article.split('-').pop(),
    )

    ctx.store.commit('setBreadcrumbs', [
      {
        name: ctx.app.i18n.t('breadcrumbs.media'),
        route: {
          name: 'projects',
        },
      },
      {
        name: article.header,
        route: {
          name: 'properties-slug',
          params: {
            slug: article.slugs[ctx.i18n.locale],
          },
        },
      },
    ])

    setTimeout(() => {
      ctx.store.commit('PageTransition/animate', false)
    }, 500)

    return {
      article: article,
    }
  },
})
export default class ArticlePage extends Vue {
  
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
