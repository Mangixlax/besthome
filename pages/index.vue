<template lang="pug">
  main
    page-welcome
    hero-slider(:slides="heroProjectsSlides")
    link-banner-wrapper
      link-banner(
        :image-src="require('~/assets/images/link-banner-1.jpg')"
        :to="{ name: 'index' }"
        title="Secondary housing"
        text="Secondary<br>housing"
        text-align="right"
      )
      link-banner(
        :image-src="require('~/assets/images/link-banner-2.jpg')"
        :to="{ name: 'investors' }"
        title="For investors"
        text="For investors"
        text-align="center"
      )
    page-home-consultant-slider
    base-accordeons
    base-subscribe
    footer-fast-links
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import TypoText from '~/components/Base/TypoText.vue'
import HeroSlider from '~/components/HeroSlider/HeroSlider.vue'
import PageWelcome from '~/components/Page/PageWelcome.vue'
import PageHomeConsultantSlider from '~/components/Page/Home/PageHomeConsultantSlider.vue'
import BaseAccordeons from '~/components/Base/BaseAccordeons.vue'
import BaseSubscribe from '~/components/Base/BaseSubscribe.vue'
import FooterFastLinks from '~/components/Footer/FooterFastLinks.vue'
import { IHeroSlide } from '~/types/HeroSlider'
import LinkBannerWrapper from '~/components/LinkBanner/LinkBannerWrapper.vue'
import LinkBanner from '~/components/LinkBanner/LinkBanner.vue'

const testDescription: string =
  'The project which is being constructed on a hill surrounded with green space, accompanied with unique landscapes of Alanya castle merging with sea and mountains, we are bringing you to calm and peaceful environment.'

@Component({
  components: {
    LinkBanner,
    LinkBannerWrapper,
    PageWelcome,
    PageHomeConsultantSlider,
    HeroSlider,
    TypoText,
    BaseAccordeons,
    BaseSubscribe,
    FooterFastLinks,
  },
})
export default class IndexPage extends Vue {
  public heroProjectsSlides: IHeroSlide[] = [
    {
      title: 'Cleopatra Select',
      location: { city: 'Alanya', region: 'Saray Mahalle' },
      price: 19600,
      sea: 700,
      description: testDescription,
    },
    {
      title: 'Select Cleopatra',
      location: { city: 'Alanya', region: 'Saray Mahalle' },
      price: 27100,
      sea: 400,
      description: testDescription,
    },
  ]

  created() {
    this.$store.commit('setLogoSubTitle', 'Construction')
  }
}
</script>

<style lang="sass" module></style>
