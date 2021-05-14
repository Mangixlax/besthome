<template lang="pug">
  main
    page-welcome(:home-title-data="$t('pages.home.header')")
    hero-slider(:slides="$t('pages.home.hero_slider')")
    link-banner-wrapper
      link-banner(
        :image-src="require('~/assets/images/link-banner-1.jpg')"
        :to="{ name: 'index' }"
        :title="$t('pages.home.link_baner.baner_1.title')"
        :text="$t('pages.home.link_baner.baner_1.text')"
        text-align="right"
        :data-cursor-text="$t('pages.home.link_baner.baner_1.data-cursor-text')"
        data-cursor-off-exclusion
      )
      link-banner(
        :image-src="require('~/assets/images/link-banner-2.jpg')"
        :to="{ name: 'investors' }"
        :title="$t('pages.home.link_baner.baner_2.title')"
        :text="$t('pages.home.link_baner.baner_2.text')"
        text-align="center"
        :data-cursor-text="$t('pages.home.link_baner.baner_2.data-cursor-text')"
        data-cursor-off-exclusion
      )
    tree-columns(
      :title="$t('pages.home.tree_columns.title')"
      :description="$t('pages.home.tree_columns.description')"
      :columns="$t('pages.home.tree_columns.columns')"
    )
    common-consultant-slider(:slider-data="$t('footer.consultant_slider')")
    base-accordions(:accordions-data="$t('footer.accordions')")
    base-subscribe(:subscribe-data="$t('footer.subscribe')")
    footer-fast-links
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import TypoText from '~/components/Base/BaseAccordions.vue'
import HeroSlider from '~/components/HeroSlider/HeroSlider.vue'
import PageWelcome from '~/components/Page/PageWelcome.vue'
import CommonConsultantSlider from '~/components/Common/CommonConsultantSlider.vue'
import BaseAccordions from '~/components/Base/BaseAccordions.vue'
import BaseSubscribe from '~/components/Base/BaseSubscribe.vue'
import FooterFastLinks from '~/components/Footer/FooterFastLinks.vue'
import { IHeroSlide } from '~/types/HeroSlider'
import LinkBannerWrapper from '~/components/LinkBanner/LinkBannerWrapper.vue'
import LinkBanner from '~/components/LinkBanner/LinkBanner.vue'
import TreeColumns from '~/components/TreeColumns/TreeColumns.vue'

@Component({
  components: {
    TreeColumns,
    LinkBanner,
    LinkBannerWrapper,
    PageWelcome,
    CommonConsultantSlider,
    HeroSlider,
    TypoText,
    BaseAccordions,
    BaseSubscribe,
    FooterFastLinks,
  },
})
export default class IndexPage extends Vue {
  created() {
    this.$store.commit('setLogoSubTitle', 'Construction')
  }
}
</script>

<style lang="sass" module></style>
