<template lang="pug">
  main
    page-company-our-team(:data="$store.getters['Employees/getPersons']")
    base-seo-content
</template>

<script lang="ts">
import PageCompanyOurTeam from '~/components/Page/Company/PageCompanyOurTeam.vue'
import BaseSeoContent from '~/components/Base/BaseSeoContent.vue'
import { Context } from '@nuxt/types'
import metaGenerator from '~/config/meta.js'
import { Component, Vue } from 'nuxt-property-decorator'
import { delay } from '~/lib/utils'
import { getSiteUrl } from '@/lib/utils'
import { IPerson } from '~/store/Employees'

@Component({
  components: {
    PageCompanyOurTeam,
    BaseSeoContent,
  },
  async asyncData(ctx: Context): Promise<object> {
    if (!process.server) {
      await delay(200)
      ctx.store.commit('PageTransition/animate', true)
    } else {
      ctx.store.commit('PageTransition/animate', false)
    }

    try {
      // Fetch person list
      await ctx.store.dispatch('Employees/fetchPersons')
    } catch ({ error }) {
      ctx.error({ statusCode: error.http_code })
    }

    ctx.store.commit('setLightTheme')
    ctx.store.commit('setLogoSubTitle', ctx.i18n.t('header.logo.company'))
    ctx.store.commit('Catalog/setPageSeoContent', '')

    setTimeout(() => {
      ctx.store.commit('PageTransition/animate', false)
    }, 500)

    return {}
  },
  head(): any {
    const title = this.$i18n.t('pages.our_team.title') + ' ' + this.$i18n.t('seo_title')

    return {
      title,
      htmlAttrs: {
        lang: this.$i18n.locale,
        prefix: 'og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#',
      },
      meta: metaGenerator({
        title,
      }),
      link: [
        {
          rel: 'canonical',
          href: getSiteUrl(this.localePath(this.$route.path), true),
        },
        {
          rel: 'alternate',
          hreflang: 'x-default',
          href: getSiteUrl(this.localePath({ name: 'company-our-team' }, 'en'), true),
        },
        {
          rel: 'alternate',
          hreflang: 'ru',
          href: getSiteUrl(this.localePath({ name: 'company-our-team' }, 'ru'), true),
        },
      ],
    }
  },
})
export default class CompanyOurTeamPage extends Vue {}
</script>
