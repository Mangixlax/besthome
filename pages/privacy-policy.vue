<template lang="pug">
  base-text-container(
    :data="{\
       text: [\
          `<h1>${$t('pages.privacy-policy.title')}</h1>`,\
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
        name: ctx.app.i18n.t('breadcrumbs.privacy_policy'),
        route: {
          name: 'privacy-policy',
        },
      },
    ])
    return {}
  },
  head() {
    const title = this.$i18n.t('pages.privacy-policy.title')

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
