<template lang="pug">
  main(:class="$style['main']")
    page-quality-title(
      :data="$t('pages.company_quality.title')"
      :class="$style['hero-title']"
    )
    common-divider(
      :data="{\
        height: 'large',\
        color: 'light',\
      }"
    )
    common-line
    common-divider(
      :data="{\
        height: 'x-large',\
        color: 'light',\
      }"
    )
    page-quality-info(:data="$t('pages.company_quality.info')")
    common-divider(
      :data="{\
        height: 'large',\
        color: 'light',\
      }"
    )
    common-divider(
      :data="{\
        height: 'x-large',\
        color: 'light',\
      }"
    )
</template>

<script lang="ts">
import CommonDivider from '~/components/Common/CommonDivider.vue'
import { Component, Vue } from 'nuxt-property-decorator'
import { delay } from '~/lib/utils'
import metaGenerator from '~/config/meta'
import { getSiteUrl } from '@/lib/utils'
import PageQualityTitle from '~/components/Page/Company/Quality/PageQualityTitle.vue'
import PageQualityInfo from '~/components/Page/Company/Quality/PageQualityInfo.vue'
import CommonLine from '~/components/Common/CommonLine.vue'

@Component({
  components: {
    CommonLine,
    CommonDivider,
    PageQualityTitle,
    PageQualityInfo,
  },

  head(): any {
    const title = this.$i18n.t('pages.company_quality.title.title')

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
          href: getSiteUrl(this.localePath({ name: 'privacy-policy' }, 'en'), true),
        },
        {
          rel: 'alternate',
          hreflang: 'ru',
          href: getSiteUrl(this.localePath({ name: 'privacy-policy' }, 'ru'), true),
        },
      ],
    }
  },
})
export default class PrivacyPolicyPage extends Vue {
  created() {
    this.$store.commit('setLightTheme')

    if (process.server) {
      this.$store.commit('PageTransition/animate', false)
    }

    this.$store.commit('setLogoSubTitle', 'Construction')
    this.$store.commit('setBreadcrumbs', [
      {
        name: this.$t('breadcrumbs.privacy_policy'),
        route: {
          name: 'privacy-policy',
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
