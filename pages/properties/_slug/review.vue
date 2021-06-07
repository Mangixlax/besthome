<template lang="pug">
  main
    base-project-navigation
    component(
      :is="block.type"
      v-for="(block, index) in reviewBlocks"
      :key="index"
      :data="block"
    )
    //page-projects-infrastructure-slider
    //hero-building
    //page-projects-title(:project-review-title-data="$t('pages.projects_review.header')")
    //page-projects-residences-slider
    //base-scroll-line(:data="$t('pages.projects_experiences.scroll_line_data')")
    //page-projects-photos-slider
    base-subscribe(:subscribe-data="$t('footer.subscribe')" white-theme)
    base-accordions(:accordions-data="$t('footer.accordions')")
    footer-fast-links
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import BaseProjectNavigation from '~/components/Base/BaseProjectNavigation.vue'
import PageProjectsTitle from '~/components/Page/Projects/PageProjectsTitle.vue'
import BasePostTwoImage from '~/components/Base/BasePostTwoImage.vue'
import BasePost from '~/components/Base/BasePost.vue'
import TypoText from '~/components/Base/TypoText.vue'
import BaseScrollLine from '~/components/Base/BaseScrollLine.vue'
import PageProjectsResidencesSlider from '~/components/Page/Projects/PageProjectsResidencesSlider.vue'
import PageProjectsPhotosSlider from '~/components/Page/Projects/PageProjectsPhotosSlider.vue'
import BaseSubscribe from '~/components/Base/BaseSubscribe.vue'
import BaseAccordions from '~/components/Base/BaseAccordions.vue'
import FooterFastLinks from '~/components/Footer/FooterFastLinks.vue'
import HeroBuilding from '~/components/HeroBuilding/HeroBuilding.vue'
import { Context } from '@nuxt/types'
import PageProjectsInfrastructureSlider from '~/components/Page/Projects/PageProjectsInfrastructureSlider.vue'
import PageProjectsTimeline from '~/components/Page/Projects/PageProjectsTimeline.vue'

@Component({
  components: {
    PageProjectsInfrastructureSlider,
    PageProjectsTimeline,
    HeroBuilding,
    BaseProjectNavigation,
    PageProjectsTitle,
    BasePostTwoImage,
    BasePost,
    TypoText,
    BaseScrollLine,
    PageProjectsResidencesSlider,
    PageProjectsPhotosSlider,
    BaseSubscribe,
    BaseAccordions,
    FooterFastLinks,
  },
  async asyncData(ctx: Context): Promise<object | void> {
    ctx.store.commit('setLogoSubTitle', 'Projects')
    await ctx.store.dispatch('Catalog/fetchProject')
  },
})
export default class PropertiesReview extends Vue {
  get reviewBlocks() {
    const componentsRelations: any = {
      BlockTwoPhotoText: 'base-post-two-image',
      BlockLineScroller: 'base-scroll-line',
      BlockInfrastructure: 'page-projects-infrastructure-slider',
      BlockTimeline: 'page-projects-timeline',
      BlockHeroBuilding: 'hero-building',
      BlockPhotoSlider: 'page-projects-photos-slider',
      BlockResidenceOffer: 'page-projects-residences-slider',
      BlockProjectTitle: 'page-projects-title',
    }

    return (this.$store.state.Catalog.project.review_data || []).map((block: any) => ({
      ...block,
      type: Object.keys(componentsRelations).includes(block.type)
        ? componentsRelations[block.type]
        : 'p',
    }))
  }
}
</script>

<style lang="sass" module></style>
