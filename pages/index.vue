<template lang="pug">
  main
    page-welcome
    hero-slider
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

@Component({
  components: {
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
  created() {
    this.$store.commit('setLogoSubTitle', 'Construction')
  }
}
</script>

<style lang="sass" module></style>
