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
    base-text-container(
      :data="{\
        text: `<p>${$t('pages.secondary_housing.article_1')}</p>`,\
      }"
    )
    catalog-wrapper(filter-dark-mode)
      template(v-slot="{ isCardDisplay }")
        component(
          :is="isCardDisplay ? 'CatalogCards' : 'CatalogList'"
          :list="apartmentsList"
        )
    base-subscribe(:subscribe-data="$t('footer.subscribe')" white-theme)
    base-accordions(:accordions-data="$t('footer.accordions')")
    footer-fast-links
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
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import CatalogCards from '~/components/Catalog/CatalogCards.vue'
import CatalogList from '~/components/Catalog/CatalogList.vue'
import { CatalogState, IProjectApartment } from '~/store/Catalog'

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
  },
  mixins: [modalsTriggerMixin],
  async asyncData(ctx: Context): Promise<object | void> {
    // Set subtitle
    ctx.store.commit('setLogoSubTitle', 'Secondary housing')

    return new Promise(async (resolve) => {
      ctx.store.commit('Catalog/setFilters', {})
      ctx.store.commit('Catalog/setProject', {})
      ctx.store.commit('Catalog/setProjects', [])
      // Fetch apartments to catalog list with filters
      await ctx.store.dispatch('Catalog/fetchApartments')
      resolve({})
    })
  },
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
}
</script>

<style lang="sass" module></style>
