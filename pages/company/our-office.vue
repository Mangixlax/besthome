<template lang="pug">
  main(:class="$style['main']")
    page-our-office-title(
      :data="$t('pages.our_office.title')"
      :class="$style['hero-title']"
    )
    common-divider(
      :data="{\
        height: 'x-large',\
        color: 'dark',\
      }"
    )
    page-our-office-features
    common-divider(
      :data="{\
        height: 'x-large',\
        color: 'dark',\
      }"
    )
    page-our-office-about
    common-divider(
      :data="{\
        height: 'large',\
        color: 'dark',\
      }"
    )
    page-our-office-gallery
    common-divider(
      :data="{\
        height: 'large',\
        color: 'dark',\
      }"
    )
    page-our-office-teamwork
    common-divider(
      :data="{\
        height: 'large',\
        color: 'dark',\
      }"
    )
    page-our-office-manager
    common-divider(
      :data="{\
        height: 'x-large',\
        color: 'dark',\
      }"
    )
    page-our-office-graphs
    common-divider(
      :data="{\
        height: 'x-large',\
        color: 'dark',\
      }"
    )
    page-our-office-address
</template>

<script lang="ts">
import CommonDivider from '~/components/Common/CommonDivider.vue'
import { Component, Vue } from 'nuxt-property-decorator'
import { delay } from '~/lib/utils'
import metaGenerator from '~/config/meta'
import { getSiteUrl } from '@/lib/utils'
import PageOurOfficeTitle from '~/components/Page/Company/OurOffice/PageOurOfficeTitle.vue'
import PageOurOfficeFeatures from '~/components/Page/Company/OurOffice/PageOurOfficeFeatures.vue'
import PageOurOfficeAbout from '~/components/Page/Company/OurOffice/PageOurOfficeAbout.vue'
import PageOurOfficeGallery from '~/components/Page/Company/OurOffice/PageOurOfficeGallery.vue'
import PageOurOfficeTeamwork from '~/components/Page/Company/OurOffice/PageOurOfficeTeamwork.vue'
import PageOurOfficeGraphs from '~/components/Page/Company/OurOffice/PageOurOfficeGraphs.vue'
import PageOurOfficeManager from '~/components/Page/Company/OurOffice/PageOurOfficeManager.vue'
import PageOurOfficeAddress from '~/components/Page/Company/OurOffice/PageOurOfficeAddress.vue'

@Component({
  components: {
    PageOurOfficeAddress,
    PageOurOfficeManager,
    PageOurOfficeGraphs,
    PageOurOfficeTeamwork,
    PageOurOfficeGallery,
    PageOurOfficeAbout,
    PageOurOfficeFeatures,
    CommonDivider,
    PageOurOfficeTitle,
  },
  head(): any {
    const title = (this.$i18n.t('pages.our_office.title.title') as string).replace('<br>', ' ')

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
          href: getSiteUrl(this.localePath({ name: 'company-our-office' }, 'en'), true),
        },
        {
          rel: 'alternate',
          hreflang: 'ru',
          href: getSiteUrl(this.localePath({ name: 'company-our-office' }, 'ru'), true),
        },
      ],
    }
  },
  asyncData({ store }) {
    store.commit('setDarkTheme')
  }
})
export default class PrivacyPolicyPage extends Vue {
  created() {
    if (process.server) {
      this.$store.commit('PageTransition/animate', false)
    }

    this.$store.commit('setLogoSubTitle', this.$i18n.locale === 'ru' ? 'Наш офис' : 'Our office')
    this.$store.commit('setBreadcrumbs', [
      {
        name: this.$i18n.locale === 'ru' ? 'Наш офис' : 'Our office',
        route: {
          name: 'company-our-office',
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

.hero-title
  padding-top: 156px
</style>
