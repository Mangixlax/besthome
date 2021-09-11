<template lang="pug">
  main
    page-projects-title(
      :data="{\
        header: $t('pages.secondary_housing.header.title'),\
        text: `<p>${$t('pages.secondary_housing.header.sub_title')}</p>`,\
        image: $img(`/projects/projects-title-secondary-housing.jpg`, $store.state.supportWebP ? { format: 'webp' } : {}),\
      }"
    )
      //- button(
      //-   @click="onClickBtn"
      //- ) {{ $t('pages.secondary_housing.header.button') }}
    base-text-container(
      :data="{\
        text: `<p>${$t('pages.secondary_housing.article_1')}</p>`,\
      }"
    )
    typo-text(
      tag="h1"
      version="style-2"
      :class="$style['develop-msg']"
    ) {{ $t('page_in_develop') }}
    //catalog-wrapper(filter-dark-mode)
    //- template(v-slot="{ isCardDisplay }")
    //-   component(
    //-     :is="isCardDisplay ? 'CatalogCards' : 'CatalogList'"
    //-     :list="apartmentsList"
    //-   )
    base-subscribe(:subscribe-data="$t('footer.subscribe')" white-theme)
    base-accordions(:accordions-data="$t('footer.accordions')")
    footer-fast-links
    base-seo-content
</template>

<script lang="ts">
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
import BaseSeoContent from '~/components/Base/BaseSeoContent.vue'
import { Component, Vue } from 'nuxt-property-decorator'
import CatalogCards from '~/components/Catalog/CatalogCards.vue'
import CatalogList from '~/components/Catalog/CatalogList.vue'
import { CatalogState, IProjectApartment } from '~/store/Catalog'
import { delay } from '~/lib/utils'

@Component({
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
    CatalogCards,
    CatalogList,
    BaseSeoContent,
  },
  mixins: [modalsTriggerMixin],
})
export default class SecondaryHousingPage extends Vue {
  public onClickBtn() {
    this.showModal({
      name: 'modal-choose-apartments',
      modal: () => import('@/components/Modal/ModalChooseApartments.vue'),
    })
  }

  get apartmentsList(): IProjectApartment[] {
    return (
      // @TODO Add type apartments data
      (((this.$store.state.Catalog as CatalogState).apartments || {}) as any).data || []
    )
  }

  created() {
    this.$store.commit('setLightTheme')

    if (process.server) {
      this.$store.commit('PageTransition/animate', false)
    }

    this.$store.commit('Catalog/setPageSeoContent', '')
    this.$store.commit('setLogoSubTitle', this.$t('header.logo.secondary_housing'))
    this.$store.commit('setBreadcrumbs', [
      {
        name: this.$t('breadcrumbs.privacy_policy'),
        route: {
          name: 'privacy-policy',
        },
      },
    ])

    this.$store.commit('Catalog/setFilters', {})
    this.$store.commit('Catalog/setProject', {})
    this.$store.commit('Catalog/setProjects', [])
  }

  async mounted() {
    await delay(200)
    this.$store.commit('PageTransition/animate', false)
  }
}
</script>

<style lang="sass" module>
.develop-msg
  margin: 0
  text-align: center
  height: 300px
</style>
