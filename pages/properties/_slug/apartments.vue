<template lang="pug">
  main
    base-project-navigation
    page-projects-title(:project-title-data="$t('pages.projects_review.header')")
    base-text-container(text-color="blue")
      typo-text(
        tag="h3"
        version="style-3"
      ) Cleopatra Select is the largest residential project in Alanya. It combines dynamic city living with calming views of nature.
    catalog-wrapper
    base-subscribe(:subscribe-data="$t('footer.subscribe')" whiteTheme)
    base-accordions(:accordions-data="$t('footer.accordions')")
    footer-fast-links
</template>

<script lang="ts">
import BaseProjectNavigation from '~/components/Base/BaseProjectNavigation.vue'
import PageProjectsTitle from '~/components/Page/Projects/PageProjectsTitle.vue'
import BaseTextContainer from '~/components/Base/BaseTextContainer.vue'
import CatalogWrapper from '~/components/Catalog/CatalogWrapper.vue'
import BaseSubscribe from '~/components/Base/BaseSubscribe.vue'
import BaseAccordions from '~/components/Base/BaseAccordions.vue'
import FooterFastLinks from '~/components/Footer/FooterFastLinks.vue'
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'apartmemts',
  components: {
    BaseProjectNavigation,
    PageProjectsTitle,
    BaseTextContainer,
    CatalogWrapper,
    BaseSubscribe,
    BaseAccordions,
    FooterFastLinks,
    TypoText
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
