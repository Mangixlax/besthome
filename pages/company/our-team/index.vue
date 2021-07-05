<template lang="pug">
  main
    page-company-our-team
</template>

<script>
import PageCompanyOurTeam from '~/components/Page/Company/PageCompanyOurTeam.vue'
import { Context } from '@nuxt/types'
import metaGenerator from '~/config/meta.js'

export default {
  name: 'our-team',
  components: { PageCompanyOurTeam },
  asyncData(ctx) {
    ctx.store.commit('setLogoSubTitle', ctx.app.i18n.t('header.logo.company'))
    ctx.store.commit('setBreadcrumbs', [
      {
        name: ctx.app.i18n.t('breadcrumbs.our_team'),
        route: {
          name: 'company-our-team',
        },
      },
    ])
  },
  head() {
    const title = this.$i18n.t('pages.our_team.title')

    const description = ''

    return {
      title,
      htmlAttrs: {
        lang: this.$i18n.locale,
        prefix: 'og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#',
      },
      meta: metaGenerator({
        title,
        description,
        robots: 'noindex, nofollow',
      }),
      link: [
        {
          rel: 'canonical',
          href: `${process.env.PROTOCOL}://${process.env.DOMAIN}${this.$route.path}`,
        },
      ],
    }
  },
}
</script>

<style lang="sass" module></style>
