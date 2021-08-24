<template lang="pug">
  main(:class="$style['main']")
    page-contacts-map(:contact-map="$t('pages.contacts.contact_map')")
    common-consultant-slider(:slider-data="$t('footer.consultant_slider')")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import PageContactsMap from '~/components/Page/Contacts/PageContactsMap.vue'
import CommonConsultantSlider from '~/components/Common/CommonConsultantSlider.vue'
import metaGenerator from '~/config/meta.js'
import { delay } from '~/lib/utils'
import { getSiteUrl } from '@/lib/utils'

@Component({
  components: {
    PageContactsMap,
    CommonConsultantSlider,
  },
  head(): any {
    const title = this.$i18n.t('pages.contacts.contact_map.title')
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
          href: getSiteUrl(this.localePath({ name: 'contacts' }, 'en'), true),
        },
        {
          rel: 'alternate',
          hreflang: 'ru',
          href: getSiteUrl(this.localePath({ name: 'contacts' }, 'ru'), true),
        },
      ],
    }
  },
  asyncData({ store }) {
    store.commit('setDarkTheme')
  }
})
export default class IndexPage extends Vue {
  created() {
    if (process.server) {
      this.$store.commit('PageTransition/animate', false)
    }

    this.$store.commit('setLogoSubTitle', this.$t('header.logo.contacts'))
    this.$store.commit('setBreadcrumbs', [
      {
        name: this.$t('breadcrumbs.contacts'),
        route: {
          name: 'contacts',
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

<style lang="sass" module>
.main
  margin-top: -92px

  @media (max-width: 1054px)
    margin-top: -97px
</style>
