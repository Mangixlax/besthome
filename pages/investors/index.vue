<template lang="pug">
  main
    page-investors-title(:investors-page="$t('pages.investors.header')")
    base-post(
      :data="{\
        image: require(`~/assets/images/pages/investors/image-1.jpg`),\
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
        image: require(`~/assets/images/pages/investors/image-2.jpg`),\
        text: [\
          `<h3>${$t('pages.investors.post_2.title')}</h3>`,\
          ...$t('pages.investors.post_2.paragraph_1').map((p) => `<p>${p}<p>`),\
          `<p>${$t('pages.investors.post_2.paragraph_with_link')}`,\
          `<a href='${this.localePath({ name: 'properties-slug-about', params: { slug: 'besthome-20-cleopatra-select-7' } })}'>${$t('pages.investors.post_2.link')}</a>.</p>`\
        ].join(''),\
        align: 'right',\
        block_flip: true,\
      }"
    )
    base-post(
      :data="{\
        image: require(`~/assets/images/pages/investors/image-3.jpg`),\
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
          ` <a href='${this.localePath({ name: 'properties-slug-about', params: { slug: 'best-home-36-37-the-legend-12' } })}'>${$t('pages.investors.post_4.link')}</a>.</p>`,\
        ].join(''),\
        images: [\
          require(`~/assets/images/pages/investors/portrait-1.jpg`),\
          require(`~/assets/images/pages/investors/landscape-1.jpg`)\
        ],\
      }"
    )
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import PageInvestorsTitle from '~/components/Page/Investors/PageInvestorsTitle.vue'
import PageInvestorsAdvice from '~/components/Page/Investors/PageInvestorsAdvice.vue'
import BasePost from '~/components/Base/BasePost.vue'
import BaseScrollLine from '~/components/Base/BaseScrollLine.vue'
import BasePostTwoImage from '~/components/Base/BasePostTwoImage.vue'
import TypoText from '~/components/Base/TypoText.vue'
import { Context } from '@nuxt/types'
import { Route } from 'vue-router'
import { NavigationGuardNext } from 'vue-router/types/router'

@Component({
  components: {
    PageInvestorsTitle,
    PageInvestorsAdvice,
    BasePost,
    BasePostTwoImage,
    BaseScrollLine,
    TypoText,
  },
  asyncData(ctx: Context): void {
    ctx.store.commit('setLogoSubTitle', ctx.app.i18n.t('header.logo.investors'))
    ctx.store.commit('setBreadcrumbs', [
      {
        name: ctx.app.i18n.t('breadcrumbs.about'),
        route: {
          name: 'company-about',
        },
      },
      {
        name: ctx.app.i18n.t('breadcrumbs.our_difference'),
        route: {
          name: 'company-advantages',
        },
      },
      {
        name: ctx.app.i18n.t('breadcrumbs.history'),
        route: {
          name: 'company-history',
        },
      },
      {
        name: ctx.app.i18n.t('breadcrumbs.investments'),
        route: {
          name: 'investors',
        },
      },
    ])
  },
  beforeRouteEnter(to: Route, from: Route, next: NavigationGuardNext) {
    next((vm: Vue) => {
      vm.$store.commit('setPageLoadingStatus', false)
    })
  },
})
export default class InvestorsPage extends Vue {}
</script>
