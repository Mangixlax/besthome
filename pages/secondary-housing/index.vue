<template lang="pug">
  main
    page-projects-title(
      :data="{\
        header: $t('pages.secondary_housing.header.title'),\
        text: `<p>${$t('pages.secondary_housing.header.sub_title')}</p>`,\
        image: require('@/assets/images/projects/projects-title-secondary-housing.jpg')\
      }"
    )
      button(
        @click="onClickBtn"
      ) {{ $t('pages.secondary_housing.header.button') }}
    base-text-container
      typo-text(
        tag="p"
        version="style-6"
      ) {{ $t('pages.secondary_housing.article_1') }}
    catalog-wrapper(
      :project-catalog-info="SecodaryHousingCatalogData"
      :filter-dark-mode="true"
    )
    base-subscribe(:subscribe-data="$t('footer.subscribe')" whiteTheme)
    base-accordions(:accordions-data="$t('footer.accordions')")
    footer-fast-links
</template>

<script>
import { modalsTriggerMixin } from '@/mixins/modals'
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
  mixins: [modalsTriggerMixin],
  methods: {
    onClickBtn() {
      this.showModal({
        name: 'modal-choose-apartments',
        modal: () => import('@/components/Modal/ModalChooseApartments.vue'),
      })
    },
  },
  data() {
    return {
      SecodaryHousingCatalogData: [
        {
          status: 'RESERVED',
          area: 120,
          image: 'secondary-housing/image-1.jpg',
          price: '450 400',
          block: 'B',
          floor: 4,
          room: 4,
        },
        {
          status: 'AVALIBLE',
          area: 44.53,
          image: 'secondary-housing/image-2.jpg',
          price: '450 400',
          block: 'B',
          floor: '4',
          room: '4',
        },
        {
          status: 'SOLD',
          area: 71.1,
          image: 'secondary-housing/image-3.jpg',
          price: '450 400',
          block: 'B',
          floor: '4',
          room: '4',
        },
        {
          status: 'AVALIBLE',
          area: 120,
          image: 'secondary-housing/image-4.jpg',
          price: '450 400',
          block: 'B',
          floor: '4',
          room: '4',
        },
        {
          status: 'AVALIBLE',
          area: 120,
          image: 'secondary-housing/image-5.jpg',
          price: '450 400',
          block: 'B',
          floor: '4',
          room: '4',
        },
        {
          status: 'AVALIBLE',
          area: 120,
          image: 'secondary-housing/image-6.jpg',
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
