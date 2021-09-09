<template lang="pug">
  main
    media-title(:data="getFavoriteArticlesList")
    media-list(:data="getArticlesList")
      template(slot="categories")
        div(
          v-for="(category, index) in categories"
          :key="index"
          @click.prevent="selectCategory(category.value)"
          :class="[$style['category'], getSelectedCategory === category.value && $style['active']]"
          v-html="category.label"
        )
</template>

<script lang="ts">
import MediaTitle from '~/components/Media/MediaTitle.vue'
import MediaList from '~/components/Media/MediaList.vue'
import { Context } from '@nuxt/types'
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import metaGenerator from '~/config/meta.js'
import { getSiteUrl, delay } from '@/lib/utils'
import { IArticle, IMediaFilter, MediaState } from '~/store/Media'

export interface ICategoryOption {
  label: string
  value: number | null
}

@Component({
  components: {
    MediaTitle,
    MediaList,
  },
  head(): any {
    const title =
      this.$i18n.locale === 'ru'
        ? 'Новости рынка недвижимости в Турции от BestHome'
        : 'Real estate market news in Turkey from BestHome'

    const description =
      this.$i18n.locale === 'ru'
        ? 'Вся информация по рынку недвижимости в Алании, Турция. Цены на квартиры,  какую недвижимость покупать как инвестиции, динамика цен на недвижимость, коммерческая недвижимость, отзывы реальных покупателей. Последние новости от застройщиков Алании.'
        : 'All information on the real estate market in Alanya, Turkey. Prices for apartments, what kind of real estate to buy as an investment, the dynamics of real estate prices, commercial real estate, reviews of real buyers. The latest news from the developers of Alanya.'

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
    await ctx.store.dispatch('Media/fetchFavoriteArticlesList')

    // Reset selected filters on first visit to page
    ctx.store.commit('Media/setFilters', {})

    // Fetch default posts
    await ctx.store.dispatch('Media/fetchArticlesList')

    // Set breadcrumbs
    ctx.store.commit('setBreadcrumbs', [
      {
        name: ctx.app.i18n.t('breadcrumbs.media'),
        route: {
          name: 'projects',
        },
      },
    ])

    // Hide overlay
    setTimeout(() => {
      ctx.store.commit('PageTransition/animate', false)
    }, 500)

    return {}
  },
})
export default class MediaPage extends Vue {
  public categories: ICategoryOption[] = [
    {
      label: this.$t('pages.media.list.all') as string,
      value: null,
    },
    {
      label: this.$t('pages.media.list.news') as string,
      value: 1,
    },
    {
      label: this.$t('pages.media.list.promotions') as string,
      value: 2,
    },
  ]

  get getSelectedCategory(): IMediaFilter['category_id'] {
    return (this.$store.getters['Media/getSelectedFilters'] as IMediaFilter).category_id
  }

  get getArticlesList(): IArticle[] {
    return this.$store.getters['Media/getArticlesList']
  }

  get getFavoriteArticlesList(): IArticle[] {
    return this.$store.getters['Media/getFavoriteArticlesList']
  }

  get isLoading(): MediaState['loading'] {
    return this.$store.getters['Media/getLoading']
  }

  public async selectCategory(categoryId: IMediaFilter['category_id']) {
    if (this.isLoading) return

    // Set category id
    this.$store.commit('Media/setSelectedFilter', { key: 'category_id', value: categoryId })
    // Reset current page
    this.$store.commit('Media/setSelectedFilter', { key: 'page', value: 1 })

    // Fetch articles with new selected category
    this.$store.commit('Media/setLoading', true)
    await this.$store.dispatch('Media/fetchArticlesList')
    this.$store.commit('Media/setLoading', false)
  }
}
</script>

<style lang="sass" module>
.category
  opacity: 0.5

.active
  opacity: 1
</style>
