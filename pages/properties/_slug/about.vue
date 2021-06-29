<template lang="pug">
  main
    base-project-navigation(
      :name="getProject.short_name"
      :slug="getProject.slug"
    )
    component(
      :is="block.type"
      v-for="(block, index) in blocks"
      :key="index"
      :data="block"
    )
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
import VueRouter, { Route } from 'vue-router'
import BaseTextContainer from '~/components/Base/BaseTextContainer.vue'
import { NavigationGuardNext } from 'vue-router/types/router'
import HeromapSlider from '~/components/HeromapSlider/HeroMapSliderNoPhoto.vue'
import { IProject } from '~/store/Catalog'
import HeroImageTooltips from '~/components/HeroImageTooltips/HeroImageTooltips.vue'

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

        ctx.store.commit('Catalog/setProject', project)
        ctx.store.commit('Catalog/setFilters', project.filters)
      }

      ctx.store.commit('setBreadcrumbs', [
        {
          name: ctx.app.i18n.t('breadcrumbs.projects'),
          route: {
            name: 'projects',
          },
        },
        {
          name: project.short_name,
          route: {
            name: 'properties-slug-about',
            params: ctx.route.params.slug,
          },
        },
      ])

      resolve({
        project: project,
      })
    })
  },
  scrollToTop: true,
})
export default class PropertiesAboutPage extends Vue {
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

    return ((this.getProject as IProject).about_data || []).map((block: any) => ({
      ...block,
      type: Object.keys(componentsRelations).includes(block.type)
        ? componentsRelations[block.type]
        : 'p',
    }))
  }

  get getProject(): IProject {
    return this.$store.getters['Catalog/getProject']
  }
}
</script>
