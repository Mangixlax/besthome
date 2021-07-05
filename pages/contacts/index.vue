<template lang="pug">
  main(:class="$style['main']")
    page-contacts-map(:contact-map="$t('pages.contacts.contact_map')")
    common-consultant-slider(:slider-data="$t('footer.consultant_slider')")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import PageContactsMap from '~/components/Page/Contacts/PageContactsMap.vue'
import CommonConsultantSlider from '~/components/Common/CommonConsultantSlider.vue'
import { Context } from '@nuxt/types'
import { Route } from 'vue-router'
import { NavigationGuardNext } from 'vue-router/types/router'
import metaGenerator from '~/config/meta.js'

@Component({
  components: {
    PageContactsMap,
    CommonConsultantSlider,
  },
  asyncData(ctx: Context): void {
    ctx.store.commit('setLogoSubTitle', ctx.app.i18n.t('header.logo.contacts'))
    ctx.store.commit('setBreadcrumbs', [
      {
        name: ctx.app.i18n.t('breadcrumbs.contacts'),
        route: {
          name: 'contacts',
        },
      },
    ])
  },
  head(): any {
    const title = this.$i18n.t('pages.contacts.contact_map.title')
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
})
export default class IndexPage extends Vue {}
</script>

<style lang="sass" module>
.main
  margin-top: -92px

  @media (max-width: 1054px)
    margin-top: -97px
</style>
