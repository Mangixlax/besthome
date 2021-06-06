<template lang="pug">
  main
    base-project-navigation
    page-projects-title(:filename="$t('pages.projects_review.header.filename')")
      typo-text(
        tag="h1"
        version="style-1"
      ) {{ $t('pages.projects_review.header.title') }}
    base-text-container(text-color="blue")
      typo-text(
        tag="h3"
        version="style-3"
      ) Cleopatra Select is the largest residential project in Alanya. It combines dynamic city living with calming views of nature.
    catalog-wrapper(:project-catalog-info="projectCatalogData")
    page-projects-similar-slider(:slider-data="sliderData")
    page-projects-apartment-slider(:card="apartmentSliderData")
    base-subscribe(:subscribe-data="$t('footer.subscribe')" whiteTheme)
    base-accordions(:accordions-data="$t('footer.accordions')")
    footer-fast-links
</template>

<script lang="ts">
import BaseProjectNavigation from '~/components/Base/BaseProjectNavigation.vue'
import PageProjectsTitle from '~/components/Page/Projects/PageProjectsTitle.vue'
import BaseTextContainer from '~/components/Base/BaseTextContainer.vue'
import CatalogWrapper from '~/components/Catalog/CatalogWrapper.vue'
import PageProjectsSimilarSlider from '~/components/Page/Projects/PageProjectsSimilarSlider.vue'
import PageProjectsApartmentSlider from '~/components/Page/Projects/PageProjectsApartmentSlider.vue'
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
    PageProjectsSimilarSlider,
    PageProjectsApartmentSlider,
    BaseSubscribe,
    BaseAccordions,
    FooterFastLinks,
    TypoText,
  },
  data() {
    return {
      projectCatalogData: [
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
          status: 'AVALIBLE',
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
          status: 'AVALIBLE',
          area: 120,
          image: 'cleopatra-select/plans/plan-1.png',
          price: '450 400',
          block: 'B',
          floor: '4',
          room: '4',
        },
        {
          status: 'AVALIBLE',
          area: 120,
          image: 'cleopatra-select/plans/plan-1.png',
          price: '450 400',
          block: 'B',
          floor: '4',
          room: '4',
        },
        {
          status: 'AVALIBLE',
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
          status: 'AVALIBLE',
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
      ],
      apartmentSliderData: {
        apartment: 'Apartment B.01.02',
        status: 'reserved',
        area: 120,
        price: '450 400',
        block: 'B',
        floor: 4,
        room: 4,
      },
      sliderData: [
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
          status: 'AVALIBLE',
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
          status: 'AVALIBLE',
          area: 120,
          image: 'cleopatra-select/plans/plan-1.png',
          price: '450 400',
          block: 'B',
          floor: '4',
          room: '4',
        },
        {
          status: 'AVALIBLE',
          area: 120,
          image: 'cleopatra-select/plans/plan-1.png',
          price: '450 400',
          block: 'B',
          floor: '4',
          room: '4',
        },
        {
          status: 'AVALIBLE',
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
          status: 'AVALIBLE',
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
      ],
    }
  },
}
</script>

<style lang="sass" module></style>
