<template lang="pug">
  main
    base-project-navigation(
      :name="project.short_name"
      :slug="project.slug"
    )
    component(
      :is="block.type"
      v-for="(block, index) in blocks"
      :key="index"
      :data="block"
    )
    catalog-wrapper
      template(v-slot="{ isCardDisplay }")
        component(
          :is="isCardDisplay ? 'CatalogCards' : 'CatalogList'"
          :list="apartmentsList"
        )
    page-projects-similar-slider(:slider-data="similarApartmentsList")
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
import VueRouter, { Route } from 'vue-router'
import { CatalogState, IProject, IProjectApartment } from '~/store/Catalog'
import CatalogCards from '~/components/Catalog/CatalogCards.vue'
import CatalogList from '~/components/Catalog/CatalogList.vue'
import BaseTextContainer from '~/components/Base/BaseTextContainer.vue'
import HeromapSlider from '~/components/HeromapSlider/HeromapSlider.vue'
import { NavigationGuardNext } from 'vue-router/types/router'
import HeroImageTooltips from '~/components/HeroImageTooltips/HeroImageTooltips.vue'

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
    CatalogCards,
    CatalogList,
    BaseTextContainer,
    HeromapSlider,
    HeroImageTooltips,
  },
  async asyncData(ctx: Context): Promise<object | void> {
    ctx.store.commit('setLogoSubTitle', ctx.app.i18n.t('header.logo.projects'))

    return new Promise(async (resolve) => {
      if (!ctx.params.slug) {
        return resolve(
          ctx.redirect(
            ctx.localePath({
              name: 'projects',
            }),
          ),
        )
      }

      let project: IProject = ctx.store.getters['Catalog/getProject']

      // Dont load project from api if project already saved in store
      if (ctx.route.params.slug !== ctx.store.getters['Catalog/getProject'].slug) {
        const projectId = (ctx.route.params.slug || '').split('-').pop()
        project = await ctx.store.dispatch('Catalog/fetchProject', projectId)

        if (Object.keys(project).indexOf('error') !== -1) {
          return resolve(ctx.error({}))
        }

        ctx.store.commit('Catalog/setProject', project)

        if (project.slug !== ctx.route.params.slug) {
          return resolve(
            ctx.redirect(
              301,
              (ctx.app.router as VueRouter).resolve({
                name: ctx.route.name as string,
                params: { slug: project.slug },
              }).href,
            ),
          )
        }
      }

      await ctx.store.dispatch('Catalog/fetchApartments')

      resolve({
        project: project,
      })
    })
  },
})
export default class PropertiesApartmentsPageIndex extends Vue {
  public apartmentSliderData = {
    apartment: 'Apartment B.01.02',
    status: 2,
    area: 120,
    price: '450 400',
    block: 'B',
    floor: 4,
    room: 4,
  }

  get blocks() {
    const componentsRelations: any = {
      BlockOnePhotoText: 'base-post',
      BlockTwoPhotoText: 'base-post-two-image',
      BlockLineScroller: 'base-scroll-line',
      BlockInfrastructure: 'page-projects-infrastructure-slider',
      BlockTimeline: 'page-projects-timeline',
      BlockHeroBuilding: 'hero-building',
      BlockPhotoSlider: 'page-projects-photos-slider',
      BlockResidenceOffer: 'page-projects-residences-slider',
      BlockProjectTitle: 'page-projects-title',
      BlockTextContainer: 'base-text-container',
      BlockHeromapSlider: 'heromap-slider',
      BlockImageTooltip: 'hero-image-tooltips',
    }

    return ((this.project as IProject).choose_ap_data || []).map((block: any) => ({
      ...block,
      type: Object.keys(componentsRelations).includes(block.type)
        ? componentsRelations[block.type]
        : 'p',
    }))
  }

  get apartmentsList(): IProjectApartment[] {
    return (
      // @TODO Add type apartments data
      (((this.$store.state.Catalog as CatalogState).apartments || {}) as any).data || []
    )
  }

  get similarApartmentsList(): IProjectApartment[] {
    return (((this.project as IProject).similar_apartments || {}) as IProjectApartment).data || []
  }
}
</script>
