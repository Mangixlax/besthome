<template lang="pug">
  main
    base-image-title(
      :image-title-data="$t('pages.all_about_rent.image_title')"
      :filename="$img(`/pages/service/rent/title.jpg`, $store.state.supportWebP ? { format: 'webp' } : {})"
    )
    page-service-rent(:allAboutRent="$t('pages.all_about_rent')")
    base-seo-content
</template>

<script lang="ts">
import BaseImageTitle from '~/components/Base/BaseImageTitle.vue'
import PageServiceRent from '~/components/Page/Service/PageServiceRent.vue'
import BaseSeoContent from '~/components/Base/BaseSeoContent.vue'
import metaGenerator from '~/config/meta.js'
import { Component, Vue } from 'nuxt-property-decorator'
import { delay } from '~/lib/utils'
import { getSiteUrl } from '@/lib/utils'

@Component({
  components: {
    PageServiceRent,
    BaseImageTitle,
    BaseSeoContent,
  },
  head(): any {
    const title = this.$i18n.t('pages.all_about_rent.seo_title')
    const description = this.$i18n.t('pages.all_about_rent.seo_description')

    return {
      title,
      htmlAttrs: {
        lang: this.$i18n.locale,
        prefix: 'og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#',
      },
      meta: metaGenerator({
        title,
        description,
      }),
      link: [
        {
          rel: 'canonical',
          href: getSiteUrl(this.localePath(this.$route.path), true),
        },
        {
          rel: 'alternate',
          hreflang: 'x-default',
          href: getSiteUrl(this.localePath({ name: 'service-all-about-rent' }, 'en'), true),
        },
        {
          rel: 'alternate',
          hreflang: 'ru',
          href: getSiteUrl(this.localePath({ name: 'service-all-about-rent' }, 'ru'), true),
        },
      ],
    }
  },
})
export default class ServiceAllAboutRentPage extends Vue {
  created() {
    this.$store.commit('setLightTheme')

    if (process.server) {
      this.$store.commit('PageTransition/animate', false)
    }

    this.$store.commit('Catalog/setPageSeoContent', '')
    this.$store.commit('setLogoSubTitle', this.$t('header.logo.service'))
    this.$store.commit('setBreadcrumbs', [
      {
        name: this.$t('breadcrumbs.apartment_leasing'),
        route: {
          name: 'service-all-about-rent',
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
