<template lang="pug">
  main
    base-project-navigation
    page-projects-title(:data="{ header: 'The future is generous space' }")
    page-projects-four-columns(:columns="pageProjectsFourColumns")
    base-post-two-image(
      :data="{\
        block_flip: false,\
        text_align: 'left',\
        text: [\
          `<h3>${$t('pages.service_introductory_tour.post_7.title')}</h3>`,\
          `<p>${$t('pages.service_introductory_tour.post_7.paragraph_1')}</p>`,\
          `<p>${$t('pages.service_introductory_tour.post_7.paragraph_2')}</p>`,\
        ].join(''),\
        images: [\
          require(`~/assets/images/investors/portrait-1.jpg`),\
          require(`~/assets/images/pages/service/introductory-tour/landscape-1.jpg`),\
        ],\
      }"
    )
    //page-projects-residences-slider
    //page-projects-infrastructure-slider
    base-scroll-line(:data="$t('pages.projects_experiences.scroll_line_data')")
    //page-projects-photos-slider
    base-subscribe(:subscribe-data="$t('footer.subscribe')" whiteTheme)
    base-accordions(:accordions-data="$t('footer.accordions')")
    footer-fast-links
</template>

<script lang="ts">
import BaseProjectNavigation from '~/components/Base/BaseProjectNavigation.vue'
import PageProjectsTitle from '~/components/Page/Projects/PageProjectsTitle.vue'
import PageProjectsFourColumns from '~/components/Page/Projects/PageProjectsFourColumns.vue'
import BasePostTwoImage from '~/components/Base/BasePostTwoImage.vue'
import BasePost from '~/components/Base/BasePost.vue'
import TypoText from '~/components/Base/TypoText.vue'
import BaseScrollLine from '~/components/Base/BaseScrollLine.vue'
import PageProjectsResidencesSlider from '~/components/Page/Projects/PageProjectsResidencesSlider.vue'
import PageProjectsInfrastructureSlider from '~/components/Page/Projects/PageProjectsInfrastructureSlider.vue'
import PageProjectsPhotosSlider from '~/components/Page/Projects/PageProjectsPhotosSlider.vue'
import BaseSubscribe from '~/components/Base/BaseSubscribe.vue'
import BaseAccordions from '~/components/Base/BaseAccordions.vue'
import FooterFastLinks from '~/components/Footer/FooterFastLinks.vue'
import { Context } from '@nuxt/types'

export default {
  name: 'experiences',
  components: {
    BaseProjectNavigation,
    PageProjectsTitle,
    PageProjectsFourColumns,
    BasePostTwoImage,
    BasePost,
    TypoText,
    PageProjectsInfrastructureSlider,
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
  data() {
    return {
      pageProjectsFourColumns: [
        {
          title: 'Live fully',
          filename: 'three-columns-1.jpg',
          to: {
            name: 'service-online-purchase',
          },
          hovered: false,
        },
        {
          title: 'Live carefree',
          filename: 'three-columns-2.jpg',
          to: {
            name: 'service-introductory-tour',
          },
          hovered: false,
        },
        {
          title: 'Live naturally',
          filename: 'three-columns-3.jpg',
          to: {
            name: 'service-online-purchase',
          },
          hovered: false,
        },
        {
          title: 'Live better',
          filename: 'three-columns-3.jpg',
          to: {
            name: 'service-online-purchase',
          },
          hovered: false,
        },
      ],
    }
  },
}
</script>

<style lang="sass" module></style>
