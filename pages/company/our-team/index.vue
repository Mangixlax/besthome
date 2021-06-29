<template lang="pug">
  main
    page-company-our-team
</template>

<script lang="ts">
import PageCompanyOurTeam from '~/components/Page/Company/PageCompanyOurTeam.vue'
import { Context } from '@nuxt/types'

export default {
  name: 'our-team',
  components: { PageCompanyOurTeam },
  asyncData(ctx: Context): void {
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
}
</script>

<style lang="sass" module></style>
