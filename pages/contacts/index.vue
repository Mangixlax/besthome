<template lang="pug">
  main
    page-contacts-map(:contactMap="$t('pages.contacts.contact_map')")
    common-consultant-slider(:slider-data="$t('footer.consultant_slider')")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import PageContactsMap from '~/components/Page/Contacts/PageContactsMap.vue'
import CommonConsultantSlider from '~/components/Common/CommonConsultantSlider.vue'
import { Context } from '@nuxt/types'
import { Route } from 'vue-router'
import { NavigationGuardNext } from 'vue-router/types/router'

@Component({
  components: {
    PageContactsMap,
    CommonConsultantSlider,
  },
  asyncData(ctx: Context): void {
    ctx.store.commit('setLogoSubTitle', ctx.app.i18n.t('header.logo.contacts'))
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
        name: ctx.app.i18n.t('breadcrumbs.contacts'),
        route: {
          name: 'contacts',
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
export default class IndexPage extends Vue {}
</script>

<style lang="sass" module></style>
