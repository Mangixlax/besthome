<template lang="pug">
  main
    page-welcome
      typo-text(tag="h1" version="style-2") {{ $t('pages.projects.header.title') }}
      typo-text(tag="p" version="style-5") {{ $t('pages.projects.header.text1') }}
      typo-text(tag="p" version="style-5") {{ $t('pages.projects.header.text2') }}
      i18n(path="pages.projects.header.text3" tag="typo-text" version="style-5")
        template(v-slot:link)
          nuxt-link(:to="localePath({ name: 'company-about' })")
            | {{ $t('pages.projects.header.text3_link') }}
    smart-block-wrapper(:smart-block-data="$t('pages.projects_our_pojects.smart_block')")
    common-consultant-slider(:slider-data="$t('footer.consultant_slider')")
    base-subscribe(:subscribe-data="$t('footer.subscribe')")
    base-accordions(:accordions-data="$t('footer.accordions')")
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

@Component({
  components: {
    PageWelcome,
    SmartBlockWrapper,
    CommonConsultantSlider,
    SmartBlockCard,
    TypoText,
    BaseSubscribe,
    BaseAccordions,
    FooterFastLinks,
  },
  asyncData(ctx: Context): void {
    ctx.store.commit('setLogoSubTitle', 'Projects')
  },
})
export default class ProjectsPage extends Vue {}
</script>

<style lang="sass" module></style>
