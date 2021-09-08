<template lang="pug">
  main
    media-title(
      :data="getMediaFavoriteArticlesList"
    )
    media-list(
      :data="getMediaArticlesList"
    ) 
      template(slot="categories")
        div(
          @click.prevent="onClickToCategory(null)"
          :class="categoryId === null && $style['zxc']"
        ) All
        div(
          @click.prevent="onClickToCategory(1)"
          :class="categoryId === 1 && $style['zxc']"
        ) Only News
        div(
          @click.prevent="onClickToCategory(2)"
          :class="categoryId === 2 && $style['zxc']"
        ) Promotions
</template>

<script lang="ts">
import MediaTitle from '~/components/Media/MediaTitle.vue'
import MediaList from '~/components/Media/MediaList.vue'
import { Context } from '@nuxt/types'
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import metaGenerator from '~/config/meta.js'
import { getSiteUrl, delay } from '@/lib/utils'

@Component({
  components: {
    MediaTitle,
    MediaList,
  },
  head(): any {
    const title = this.$i18n.locale === 'ru' ? '' : ''

    const description = this.$i18n.locale === 'ru' ? '' : ''

    return {
      title,
      htmlAttrs: {
        lang: this.$i18n.locale,
        prefix:
          'og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http:/s/ogp.me/ns/article#',
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
      ],
    }
  },
  async asyncData(ctx: Context) {
    // if (!params.article) return error({ statusCode: 404 })

    if (!process.server) {
      await delay(200)
      ctx.store.commit('PageTransition/animate', true)
    } else {
      ctx.store.commit('PageTransition/animate', false)
    }

    // Fetch favorites posts
    await ctx.store.dispatch('Media/fetchMediaArticleFavoriteList')

    // Fetch default posts
    await ctx.store.dispatch('Media/fetchMediaArticleList')

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

    setTimeout(() => {
      ctx.store.commit('PageTransition/animate', false)
    }, 500)

    return {}
  },
})
export default class MediaPage extends Vue {
  public categoryId: string | number | null = null

  public onClickToCategory(categoryId: string | number | null = null) {
    this.categoryId = categoryId
  }

  @Watch('categoryId')
  onChangeCategoryId() {
    this.$store.dispatch('Media/fetchMediaArticleList', this.categoryId)
  }

  get getMediaArticlesList(): any {
    return this.$store.getters['Media/getMediaArticlesList']
  }

  get getMediaFavoriteArticlesList(): any {
    return this.$store.getters['Media/getMediaFavoriteArticlesList']
  }

  mounted() {
    console.log(this.getMediaArticlesList)
  }
  //  created() {
  //   this.$store.commit('setLightTheme')

  //   if (process.server) {
  //     this.$store.commit('PageTransition/animate', false)
  //   }

  //   this.$store.commit('Catalog/setPageSeoContent', '')
  //   this.$store.commit('setLogoSubTitle', 'Quality')
  //   this.$store.commit('setBreadcrumbs', [
  //     {
  //       name: this.$i18n.locale === 'ru' ? 'Наше качество' : 'Our quality',
  //       route: {
  //         name: 'company-quality',
  //       },
  //     },
  //   ])
  // }

  // async mounted() {
  //   await delay(200)
  //   this.$store.commit('PageTransition/animate', false)
  // }
}
</script>

<style lang="sass" module>
.zxc
  opacity: 0.5
</style>
