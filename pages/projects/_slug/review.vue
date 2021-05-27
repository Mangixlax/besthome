<template lang="pug">
  main
    base-project-navigation
    page-projects-title(:project-review-title-data="$t('pages.projects_review.header')")
    base-post-two-image(
       :portraitImage="require(`~/assets/images/investors/portrait-1.jpg`)"
       :landscapeImage="require(`~/assets/images/investors/landscape-1.jpg`)"
    )
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.investors.post_4.paragraph_1') }}
      typo-text(
        tag="p"
        version="style-5"
      )
        | {{ $t('pages.investors.post_4.paragraph_with_link') }}
        typo-text(
          tag="a"
          href="#"
          version="style-5"
        ) {{ $t('pages.investors.post_4.link') }}
        | .
    page-projects-residences-slider
    base-scroll-line(:scroll-line-info="$t('pages.projects_experiences.scroll_line_data')")
    page-projects-photos-slider
    base-subscribe(:subscribe-data="$t('footer.subscribe')" whiteTheme)
    base-accordions(:accordions-data="$t('footer.accordions')")
    footer-fast-links
</template>

<script lang="ts">
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

export default {
  name: 'experiences',
  components: {
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
  data() {
    return {
      experiencesPageScrollLineInfo: [
        {
          title: '239',
          text: 'Apartments',
        },
        {
          title: '470',
          text: 'Parking spots for bikes',
        },
        {
          title: '3800m²',
          text: 'Of common green areas',
        },
        {
          title: '1 to 4-room',
          text: 'Separate rooms',
        },
      ],
    }
  },
}
</script>

<style lang="sass" module></style>
