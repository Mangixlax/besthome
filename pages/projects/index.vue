<template lang="pug">
  main
    page-welcome
      typo-text(tag="h1" version="style-2") {{ $t('pages.projects.header.title') }}
      typo-text(tag="p" version="style-5") {{ $t('pages.projects.header.text1') }}
      typo-text(tag="p" version="style-5") {{ $t('pages.projects.header.text2') }}
      typo-text(tag="p" version="style-5")
        i18n(path="pages.projects.header.text3" tag="span" version="style-5")
          template(v-slot:link)
            nuxt-link(:to="localePath({ name: 'company-about' })")
              | {{ $t('pages.projects.header.text3_link') }}
        common-link-icon(:variants="['stroke-blue']")
    smart-block-wrapper(:data="$store.getters['Catalog/getProjects']")
    common-consultant-slider(:slider-data="$t('footer.consultant_slider')")
    base-accordions(:accordions-data="$t('pages.projects.accordions')")
    base-subscribe(:subscribe-data="$t('footer.subscribe')")
    footer-fast-links
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import SmartBlockWrapper from '~/components/SmartBlock/SmartBlockWrapper.vue'
import CommonConsultantSlider from '~/components/Common/CommonConsultantSlider.vue'
import SmartBlockCard from '~/components/SmartBlock/SmartBlockCard.vue'
import TypoText from '~/components/Base/TypoText.vue'
import BaseSubscribe from '~/components/Base/BaseSubscribe.vue'
import BaseAccordions from '~/components/Base/BaseAccordions.vue'
import FooterFastLinks from '~/components/Footer/FooterFastLinks.vue'
import PageWelcome from '~/components/Page/PageWelcome.vue'
import { Context } from '@nuxt/types'
import CommonLinkIcon from '~/components/Common/CommonLinkIcon.vue'
import metaGenerator from '~/config/meta.js'
import { delay } from '~/lib/utils'
import { getSiteUrl } from '@/lib/utils'

@Component({
  components: {
    CommonLinkIcon,
    PageWelcome,
    SmartBlockWrapper,
    CommonConsultantSlider,
    SmartBlockCard,
    TypoText,
    BaseSubscribe,
    BaseAccordions,
    FooterFastLinks,
  },
  async asyncData(ctx: Context): Promise<void | object> {
    ctx.store.commit('PageTransition/animate', false)

    try {
      // Fetch projects list
      await ctx.store.dispatch('Catalog/fetchProjects')
    } catch ({ error }) {
      ctx.error({ statusCode: error.http_code })
    }

    ctx.store.commit('setBreadcrumbs', [
      {
        name: ctx.app.i18n.t('breadcrumbs.projects'),
        route: {
          name: 'projects',
        },
      },
    ])

    // Set subtitle in logo
    ctx.store.commit('setLogoSubTitle', ctx.app.i18n.t('header.logo.projects'))
    // Set seo content in bottom of page
    ctx.store.commit('Catalog/setPageSeoContent', ctx.app.i18n.t('pages.projects.seo'))
    
    return {}
  },
  head(): any {
    const title =
      this.$i18n.locale === 'ru'
        ? 'Новостройки в Турции: купить недвижимость от застройщика - 37 комплексов'
        : 'New buildings in Turkey: buy real estate from the developer - 37 complexes'

    const description =
      this.$i18n.locale === 'ru'
        ? 'Купить квартиру в строящемся или готовом комплексе в Турции на побережье по цене от застройщика BEST HOME. Продажа элитной недорогой недвижимости в Алании. ☎ +90 530 547-44-15'
        : 'Buy an apartment in a newly built or finished complex in Turkey on the coast at a price from the developer BEST HOME. Sale of elite inexpensive real estate in Alanya. ☎ +90 530 547-44-15'

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
          href: getSiteUrl(this.localePath({ name: 'projects' }, 'en'), true),
        },
        {
          rel: 'alternate',
          hreflang: 'ru',
          href: getSiteUrl(this.localePath({ name: 'projects' }, 'ru'), true),
        },
      ],
    }
  },
})
export default class ProjectsPage extends Vue {
  async mounted() {
    this.$store.commit('setLightTheme')
    await delay(200)
    this.$store.commit('PageTransition/animate', false)
  }
}
</script>
