<template lang="pug">
  main
    page-welcome
    hero-slider
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import TypoText from '~/components/Base/TypoText.vue'
import HeroSlider from '~/components/HeroSlider/HeroSlider.vue'
import PageWelcome from '~/components/Page/PageWelcome.vue'

@Component({
  components: { PageWelcome, HeroSlider, TypoText },
})
export default class IndexPage extends Vue {
  created() {
    this.$store.commit('setLogoSubTitle', 'Construction')
  }
}
</script>

<style lang="sass" module></style>
