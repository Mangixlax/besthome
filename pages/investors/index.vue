<template lang="pug">
  main
    page-investors-title(:investors-page="$t('pages.investors.header')")
    base-post(
      :data="{\
        image: $img(`/pages/investors/image-1.jpg`, $store.state.supportWebP ? { format: 'webp' } : {}),\
        text: [\
          `<h3>${$t('pages.investors.post_1.title')}</h3>`,\
          `<p>${$t('pages.investors.post_1.paragraph_1')}</p>`,\
          `<p>${$t('pages.investors.post_1.paragraph_with_link')}`,\
          `<a href='${this.localePath({ name: 'projects' })}'>${$t('pages.investors.post_1.link')}</a>.</p>`\
        ].join(''),\
        align: 'left',\
        block_flip: false,\
      }"
    )
    page-investors-advice(:investors-page-advice="$t('pages.investors.advice_data')")
    base-post(
      :data="{\
        image: $img(`/pages/investors/image-2.jpg`, $store.state.supportWebP ? { format: 'webp' } : {}),\
        text: [\
          `<h3>${$t('pages.investors.post_2.title')}</h3>`,\
          ...$t('pages.investors.post_2.paragraph_1').map((p) => `<p>${p}<p>`),\
          `<p>${$t('pages.investors.post_2.paragraph_with_link')}`,\
          `<a href='${this.localePath({ name: 'properties-slug', params: { slug: 'besthome-20-cleopatra-select-7' } })}'>${$t('pages.investors.post_2.link')}</a>.</p>`\
        ].join(''),\
        align: 'right',\
        block_flip: true,\
      }"
    )
    base-post(
      :data="{\
        image: $img(`/pages/investors/image-3.jpg`, $store.state.supportWebP ? { format: 'webp' } : {}),\
        text: [\
          `<h3>${$t('pages.investors.post_3.title')}</h3>`,\
          `<p>${$t('pages.investors.post_3.paragraph_1')}</p>`,\
          `<p>${$t('pages.investors.post_3.paragraph_with_link')}`,\
          `<a href='${this.localePath({ name: 'projects' })}'>${$t('pages.investors.post_3.link')}</a>.</p>`\
        ].join(''),\
        align: 'left',\
        block_flip: false,\
      }"
    )
    base-scroll-line(:data="$t('pages.investors.scroll_line_data')")
    base-post-two-image(
      :data="{\
        text: [\
          ...$t('pages.investors.post_4.paragraph_1').map((p) => `<p>${p}<p>`),\
          `<p>${$t('pages.investors.post_4.paragraph_with_link')}`,\
          ` <a href='${this.localePath({ name: 'properties-slug', params: { slug: 'best-home-36-37-the-legend-12' } })}'>${$t('pages.investors.post_4.link')}</a>.</p>`,\
        ].join(''),\
        images: [\
          $img(`/pages/investors/portrait-1.jpg`, $store.state.supportWebP ? { format: 'webp' } : {}),\
          $img(`/pages/investors/landscape-1.jpg`, $store.state.supportWebP ? { format: 'webp' } : {}),\
        ],\
      }"
    )
    base-seo-content
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import PageInvestorsTitle from '~/components/Page/Investors/PageInvestorsTitle.vue'
import PageInvestorsAdvice from '~/components/Page/Investors/PageInvestorsAdvice.vue'
import BasePost from '~/components/Base/BasePost.vue'
import BaseScrollLine from '~/components/Base/BaseScrollLine.vue'
import BasePostTwoImage from '~/components/Base/BasePostTwoImage.vue'
import TypoText from '~/components/Base/TypoText.vue'
import BaseSeoContent from '~/components/Base/BaseSeoContent.vue'
import { Context } from '@nuxt/types'
import { Route } from 'vue-router'
import { NavigationGuardNext } from 'vue-router/types/router'
import metaGenerator from '~/config/meta.js'
import { delay } from '~/lib/utils'
import { getSiteUrl } from '@/lib/utils'

@Component({
  components: {
    PageInvestorsTitle,
    PageInvestorsAdvice,
    BasePost,
    BasePostTwoImage,
    BaseScrollLine,
    TypoText,
    BaseSeoContent,
  },
  head(): any {
    const title = this.$i18n.t('pages.investors.seo_title')
    const description = this.$i18n.t('pages.investors.description')

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
          href: getSiteUrl(this.localePath({ name: 'investors' }, 'en'), true),
        },
        {
          rel: 'alternate',
          hreflang: 'ru',
          href: getSiteUrl(this.localePath({ name: 'investors' }, 'ru'), true),
        },
      ],
    }
  },
})
export default class InvestorsPage extends Vue {
  created() {
    this.$store.commit('setLightTheme')

    if (process.server) {
      this.$store.commit('PageTransition/animate', false)
    }

    this.$store.commit('Catalog/setPageSeoContent', '')
    this.$store.commit('setLogoSubTitle', this.$t('header.logo.investors'))
    this.$store.commit('setBreadcrumbs', [
      {
        name: this.$t('breadcrumbs.investments'),
        route: {
          name: 'investors',
        },
      },
    ])
  }

  async mounted() {
    await delay(200)
    this.$store.commit('PageTransition/animate', false)
  }
}
</script>
