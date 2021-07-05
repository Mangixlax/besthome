<template lang="pug">
  base-text-container(
    :data="{\
       text: [\
          `<h1>${$t('pages.term-of-use.title')}</h3>`,\
          ...$t('pages.term-of-use.text').map((p) => `<p>${p}<p>`)\
        ].join('')\
    }"
  )
</template>

<script>
import BaseTextContainer from '~/components/Base/BaseTextContainer.vue'
import metaGenerator from '~/config/meta.js'

export default {
  name: 'term-of-use',
  components: {
    BaseTextContainer,
  },
  asyncData(ctx) {
    ctx.store.commit('setBreadcrumbs', [
      {
        name: ctx.app.i18n.t('breadcrumbs.term_of_use'),
        route: {
          name: 'term-of-use',
        },
      },
    ])

    return {}
  },
  head() {
    const title = this.$i18n.t('pages.term-of-use.title')

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
