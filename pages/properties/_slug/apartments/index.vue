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
    catalog-wrapper(ref="container")
      template(v-slot="{ isCardDisplay }")
        component(
          :is="isCardDisplay ? 'CatalogCards' : 'CatalogList'"
          :list="getApartments"
        )
    page-projects-similar-slider(:slider-data="similarApartmentsList")
    base-subscribe(:subscribe-data="$t('footer.subscribe')" white-theme)
    base-accordions(:accordions-data="$t('footer.accordions')")
    footer-fast-links
    common-divider(
      :data="{\
        height: 'middle',\
        color: 'light',\
      }"
    )
    base-seo-content
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
import BaseSeoContent from '~/components/Base/BaseSeoContent.vue'
import { Context } from '@nuxt/types'
import PageProjectsInfrastructureSlider from '~/components/Page/Projects/PageProjectsInfrastructureSlider.vue'
import PageProjectsTimeline from '~/components/Page/Projects/PageProjectsTimeline.vue'
import CatalogWrapper from '~/components/Catalog/CatalogWrapper.vue'
import PageProjectsSimilarSlider from '~/components/Page/Projects/PageProjectsSimilarSlider.vue'
import VueRouter from 'vue-router'
import { IProject, IProjectApartment } from '~/store/Catalog'
import CatalogCards from '~/components/Catalog/CatalogCards.vue'
import CatalogList from '~/components/Catalog/CatalogList.vue'
import BaseTextContainer from '~/components/Base/BaseTextContainer.vue'
import HeromapSlider from '~/components/HeromapSlider/HeromapSlider.vue'
import HeroImageTooltips from '~/components/HeroImageTooltips/HeroImageTooltips.vue'
import metaGenerator from '~/config/meta.js'
import { delay } from '~/lib/utils'
import { getSiteUrl } from '@/lib/utils'
import CommonDivider from '~/components/Common/CommonDivider.vue'

@Component({
  components: {
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
    CommonDivider,
    BaseSeoContent,
  },
  async asyncData(ctx: Context): Promise<object> {
    if (!process.server) {
      await delay(200)
      ctx.store.commit('PageTransition/animate', true)
    } else {
      ctx.store.commit('PageTransition/animate', false)
    }

    if (!ctx.params.slug) {
      ctx.redirect(
        ctx.localePath({
          name: 'projects',
        }),
      )
    }

    let project: IProject = ctx.store.getters['Catalog/getProject']

    // Dont load project from api if project already saved in store
    if (ctx.route.params.slug !== ctx.store.getters['Catalog/getProject'].slug) {
      const projectId = (ctx.route.params.slug || '').split('-').pop()

      try {
        project = await ctx.store.dispatch('Catalog/fetchProject', projectId)

        ctx.store.commit('Catalog/setProject', project)

        if (project.slug !== ctx.route.params.slug) {
          ctx.redirect(
            301,
            (ctx.app.router as VueRouter).resolve({
              name: ctx.route.name as string,
              params: { slug: project.slug },
            }).href,
          )
        }
      } catch ({ error }) {
        ctx.error({ statusCode: error.http_code })
      }
    }

    // Reset filters
    ctx.store.commit('Catalog/setFilters', {})

    // Fetch filters and save in store
    const filtersList = await ctx.store.dispatch('Catalog/fetchFilters')
    ctx.store.commit('Catalog/setFilters', filtersList)

    // Fetch apartments and save in store with meta pagination
    await ctx.store.dispatch('Catalog/fetchApartments')

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
          name: 'properties-slug',
          params: { slug: project.slug },
        },
      },
    ])

    ctx.store.commit('setLightTheme')
    ctx.store.commit('setLogoSubTitle', ctx.app.i18n.t('header.logo.projects'))
    ctx.store.commit('Catalog/setPageSeoContent', project.seo_choose_ap?.content)

    setTimeout(() => {
      ctx.store.commit('PageTransition/animate', false)
    }, 500)

    return {
      project,
    }
  },
  head(): any {
    const title = this.project.seo_choose_ap?.title
    const description = this.project.seo_choose_ap?.description

    return {
      title,
      htmlAttrs: {
        lang: this.$i18n.locale,
        prefix: 'og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#',
      },
      meta: metaGenerator({
        title,
        description,
      }),
      link: [
        {
          rel: 'canonical',
          href: getSiteUrl(this.localePath(this.$route.path), true),
        },
        {
          rel: 'alternate',
          hreflang: 'x-default',
          href: getSiteUrl(
            this.localePath(
              {
                name: 'properties-slug-apartments',
                params: this.$route.params,
              },
              'en',
            ),
            true,
          ),
        },
        {
          rel: 'alternate',
          hreflang: 'ru',
          href: getSiteUrl(
            this.localePath(
              {
                name: 'properties-slug-apartments',
                params: this.$route.params,
              },
              'ru',
            ),
            true,
          ),
        },
      ],
    }
  },
  scrollToTop: true,
})
export default class PropertiesApartmentsPageIndex extends Vue {
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
      BlockDivider: 'common-divider',
    }

    return ((this.getProject as IProject).choose_ap_data || []).map((block: any) => ({
      ...block,
      type: Object.keys(componentsRelations).includes(block.type)
        ? componentsRelations[block.type]
        : 'p',
    }))
  }

  get getApartments(): IProjectApartment[] {
    return this.$store.getters['Catalog/getApartments']
  }

  get similarApartmentsList(): IProjectApartment[] {
    return (((this.project as IProject).similar_apartments || {}) as IProjectApartment).data || []
  }

  get getProject(): IProject {
    return this.$store.getters['Catalog/getProject']
  }
}
</script>
