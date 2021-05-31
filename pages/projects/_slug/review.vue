<template lang="pug">
  main
    base-project-navigation
    component(
      :is="block.type"
      v-for="(block, index) in reviewBlocks"
      :key="index"
      :data="block"
    )
    //hero-building
    //page-projects-title(:project-review-title-data="$t('pages.projects_review.header')")
    base-post-two-image(
      :data="{\
        text: [\
          `<p>${$t('pages.investors.post_4.paragraph_1')}</p>`,\
          `<p>${$t('pages.investors.post_4.paragraph_with_link')}`,\
          `<a>${$t('pages.investors.post_4.link')}</a>.</p>`,\
        ].join(''),\
        images: [\
          { path: require(`~/assets/images/investors/portrait-1.jpg`), },\
          { path: require(`~/assets/images/investors/landscape-1.jpg`), },\
        ],\
      }"
    )
    //page-projects-residences-slider
    //base-scroll-line(:scroll-line-info="$t('pages.projects_experiences.scroll_line_data')")
    //page-projects-photos-slider
    base-subscribe(:subscribe-data="$t('footer.subscribe')" whiteTheme)
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

@Component({
  components: {
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
    await ctx.store.dispatch('Catalog/fetchProject')
  },
})
export default class Review extends Vue {
  get reviewBlocks() {
    const componentsRelations: any = {
      'BlockTwoPhotoText': 'base-post-two-image',
      'BlockLineScroller': 'base-scroll-line',
    }

    const r = (this.$store.state.Catalog.project.review_data || []).map((block: any) => ({
      ...block,
      type: Object.keys(componentsRelations).includes(block.type) ? componentsRelations[block.type] : 'p',
    }))

    console.log(r)

    return r
  }
}
</script>

<style lang="sass" module></style>
