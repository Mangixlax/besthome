<template lang="pug">
  main
    page-company-our-team
</template>

<script lang="ts">
import PageCompanyOurTeam from '~/components/Page/Company/PageCompanyOurTeam.vue'
import { Context } from '@nuxt/types'
import metaGenerator from '~/config/meta.js'
import { Component, Vue } from 'nuxt-property-decorator'
import { delay } from '~/lib/utils'

@Component({
  components: { PageCompanyOurTeam },
  head() {
    const title = this.$i18n.t('pages.our_team.title')

    return {
      title,
      htmlAttrs: {
        lang: this.$i18n.locale,
        prefix: 'og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#',
      },
      meta: metaGenerator({
        title,
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
})
export default class CompanyOurTeamPage extends Vue {
  created() {
    if (process.server) {
      this.$store.commit('PageTransition/animate', false)
    }

    this.$store.commit('setLogoSubTitle', this.$t('header.logo.company'))
    this.$store.commit('setBreadcrumbs', [
      {
        name: this.$t('breadcrumbs.our_team'),
        route: {
          name: 'company-our-team',
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

<style lang="sass" module></style>
