<template lang="pug">
  main
    base-project-navigation
    page-projects-title(:project-review-title-data="$t('pages.projects_review.header')")
    base-scroll-line(:scroll-line-info="$t('pages.projects_experiences.scroll_line_data')")
    page-projects-panorama
    base-subscribe(:subscribe-data="$t('footer.subscribe')" whiteTheme)
    base-accordions(:accordions-data="$t('footer.accordions')")
    footer-fast-links
</template>

<script lang="ts">
import BaseProjectNavigation from '~/components/Base/BaseProjectNavigation.vue'
import PageProjectsTitle from '~/components/Page/Projects/PageProjectsTitle.vue'
import BasePost from '~/components/Base/BasePost.vue'
import TypoText from '~/components/Base/TypoText.vue'
import BaseScrollLine from '~/components/Base/BaseScrollLine.vue'
import PageProjectsPanorama from '~/components/Page/Projects/PageProjectsPanorama.vue'
import BaseSubscribe from '~/components/Base/BaseSubscribe.vue'
import BaseAccordions from '~/components/Base/BaseAccordions.vue'
import FooterFastLinks from '~/components/Footer/FooterFastLinks.vue'

export default {
  name: 'experiences',
  components: {
    BaseProjectNavigation,
    PageProjectsTitle,
    BasePost,
    TypoText,
    BaseScrollLine,
    PageProjectsPanorama,
    BaseSubscribe,
    BaseAccordions,
    FooterFastLinks,
  },
}
</script>

<style lang="sass" module></style>
