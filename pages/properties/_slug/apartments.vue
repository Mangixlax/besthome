<template lang="pug">
  main
    base-project-navigation
    component(
      :is="block.type"
      v-for="(block, index) in blocks"
      :key="index"
      :data="block"
    )
    catalog-wrapper(:project-catalog-info="projectCatalogData")
    page-projects-similar-slider(:slider-data="sliderData")
    page-projects-apartment-slider(:card="apartmentSliderData")
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
import CatalogWrapper from '~/components/Catalog/CatalogWrapper.vue'
import PageProjectsSimilarSlider from '~/components/Page/Projects/PageProjectsSimilarSlider.vue'
import PageProjectsApartmentSlider from '~/components/Page/Projects/PageProjectsApartmentSlider.vue'
import VueRouter from "vue-router"

@Component({
  components: {
    PageProjectsApartmentSlider,
    PageProjectsSimilarSlider,
    CatalogWrapper,
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

    // Dont load project from api if project already saved in store
    if (ctx.route.params.slug !== ctx.store.getters['Catalog/getProject'].slug) {
      const projectId = (ctx.route.params.slug || '').split('-').pop()
      await ctx.store.dispatch('Catalog/fetchProject', projectId)

      if (
        process.server &&
        ctx.store.getters['Catalog/getProject'].slug !== ctx.route.params.slug
      ) {
        ctx.redirect(
          301,
          (ctx.app.router as VueRouter).resolve({
            name: ctx.route.name as string,
            params: { slug: ctx.store.getters['Catalog/getProject'].slug },
          }).href,
        )
      }
    }
  },
})
export default class PropertiesApartmentsPage extends Vue {
  public projectCatalogData = [
    {
      status: 'RESERVED',
      area: 120,
      image: 'cleopatra-select/plans/plan-1.png',
      price: '450 400',
      block: 'B',
      floor: 4,
      room: 4,
    },
    {
      status: 'AVAILABLE',
      area: 44.53,
      image: 'cleopatra-select/plans/plan-2.png',
      price: '450 400',
      block: 'B',
      floor: '4',
      room: '4',
    },
    {
      status: 'SOLD',
      area: 71.1,
      image: 'cleopatra-select/plans/plan-3.png',
      price: '450 400',
      block: 'B',
      floor: '4',
      room: '4',
    },
    {
      status: 'AVAILABLE',
      area: 120,
      image: 'cleopatra-select/plans/plan-1.png',
      price: '450 400',
      block: 'B',
      floor: '4',
      room: '4',
    },
    {
      status: 'AVAILABLE',
      area: 120,
      image: 'cleopatra-select/plans/plan-1.png',
      price: '450 400',
      block: 'B',
      floor: '4',
      room: '4',
    },
    {
      status: 'AVAILABLE',
      area: 120,
      image: 'cleopatra-select/plans/plan-1.png',
      price: '450 400',
      block: 'B',
      floor: '4',
      room: '4',
    },
    {
      status: 'RESERVED',
      area: 120,
      image: 'cleopatra-select/plans/plan-1.png',
      price: '450 400',
      block: 'B',
      floor: 4,
      room: 4,
    },
    {
      status: 'AVAILABLE',
      area: 44.53,
      image: 'cleopatra-select/plans/plan-2.png',
      price: '450 400',
      block: 'B',
      floor: '4',
      room: '4',
    },
    {
      status: 'SOLD',
      area: 71.1,
      image: 'cleopatra-select/plans/plan-3.png',
      price: '450 400',
      block: 'B',
      floor: '4',
      room: '4',
    },
  ]

  public apartmentSliderData = {
    apartment: 'Apartment B.01.02',
    status: 'Reserved',
    area: 120,
    price: '450 400',
    block: 'B',
    floor: 4,
    room: 4,
  }

  public sliderData: any = [
    {
      status: 'RESERVED',
      area: 120,
      image: 'cleopatra-select/plans/plan-1.png',
      price: '450 400',
      block: 'B',
      floor: 4,
      room: 4,
    },
    {
      status: 'AVAILABLE',
      area: 44.53,
      image: 'cleopatra-select/plans/plan-2.png',
      price: '450 400',
      block: 'B',
      floor: '4',
      room: '4',
    },
    {
      status: 'SOLD',
      area: 71.1,
      image: 'cleopatra-select/plans/plan-3.png',
      price: '450 400',
      block: 'B',
      floor: '4',
      room: '4',
    },
    {
      status: 'AVAILABLE',
      area: 120,
      image: 'cleopatra-select/plans/plan-1.png',
      price: '450 400',
      block: 'B',
      floor: '4',
      room: '4',
    },
    {
      status: 'AVAILABLE',
      area: 120,
      image: 'cleopatra-select/plans/plan-1.png',
      price: '450 400',
      block: 'B',
      floor: '4',
      room: '4',
    },
    {
      status: 'AVAILABLE',
      area: 120,
      image: 'cleopatra-select/plans/plan-1.png',
      price: '450 400',
      block: 'B',
      floor: '4',
      room: '4',
    },
    {
      status: 'RESERVED',
      area: 120,
      image: 'cleopatra-select/plans/plan-1.png',
      price: '450 400',
      block: 'B',
      floor: 4,
      room: 4,
    },
    {
      status: 'AVAILABLE',
      area: 44.53,
      image: 'cleopatra-select/plans/plan-2.png',
      price: '450 400',
      block: 'B',
      floor: '4',
      room: '4',
    },
    {
      status: 'SOLD',
      area: 71.1,
      image: 'cleopatra-select/plans/plan-3.png',
      price: '450 400',
      block: 'B',
      floor: '4',
      room: '4',
    },
  ]

  get blocks() {
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

    return (this.$store.state.Catalog.project.choose_ap_data || []).map((block: any) => ({
      ...block,
      type: Object.keys(componentsRelations).includes(block.type)
        ? componentsRelations[block.type]
        : 'p',
    }))
  }
}
</script>
