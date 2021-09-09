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
          :class="[categoryId === null && $style['active'], $style['category']]"
        ) {{ $t('pages.media.list.all') }}
        div(
          @click.prevent="onClickToCategory(1)"
          :class="[categoryId === 1 && $style['active'], $style['category']]"
        ) {{ $t('pages.media.list.news') }}
        div(
          @click.prevent="onClickToCategory(2)"
          :class="[categoryId === 2 && $style['active'], $style['category']]"
        ) {{ $t('pages.media.list.promotions') }}
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
    const title = this.$i18n.locale === 'ru' ? 'Новости рынка недвижимости в Турции от BestHome' : 'Real estate market news in Turkey from BestHome'

    const description = this.$i18n.locale === 'ru' ? 'Вся информация по рынку недвижимости в Алании, Турция. Цены на квартиры,  какую недвижимость покупать как инвестиции, динамика цен на недвижимость, коммерческая недвижимость, отзывы реальных покупателей. Последние новости от застройщиков Алании.' : 'All information on the real estate market in Alanya, Turkey. Prices for apartments, what kind of real estate to buy as an investment, the dynamics of real estate prices, commercial real estate, reviews of real buyers. The latest news from the developers of Alanya.'

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

    ctx.store.commit('setBreadcrumbs', [
      {
        name: ctx.app.i18n.t('breadcrumbs.projects'),
        route: {
          name: 'projects',
        },
      },
    ])

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
}
</script>

<style lang="sass" module>
.category
  opacity: 0.5

.active
  opacity: 1
</style>
