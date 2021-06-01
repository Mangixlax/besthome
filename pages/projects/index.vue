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
    base-accordions(:accordions-data="$t('footer.accordions')")
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
  async asyncData(ctx: Context): Promise<void> {
    ctx.store.commit('setLogoSubTitle', 'Projects')
    await ctx.store.dispatch('Catalog/fetchProjects')
  },
})
export default class ProjectsPage extends Vue {}
</script>
