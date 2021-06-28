<template lang="pug">
  base-text-container(
    :data="{\
       text: [\
          `<h3>${$t('pages.privacy-policy.title')}</h3>`,\
          ...$t('pages.privacy-policy.text').map((p) => `<p>${p}<p>`)\
        ].join('')\
    }"
  )
</template>

<script>
import BaseTextContainer from '~/components/Base/BaseTextContainer.vue'

export default {
  name: 'privacy-policy',
  components: {
    BaseTextContainer,
  },
  asyncData(ctx) {
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
        name: ctx.app.i18n.t('breadcrumbs.privacy_policy'),
        route: {
          name: 'privacy-policy',
        },
      },
    ])
    return {}
  },
}
</script>
