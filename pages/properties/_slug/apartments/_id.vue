<template lang="pug">
  main(:class="$style['main']")
    base-project-navigation(
      :name="apartment.project.short_name"
      :slug="apartment.project.slug"
    )
    div(ref="wrapper" :class="$style['main__wrapper']")
      div(:class="$style['apartment']")
        div(:class="$style['apartment__image']")
          div(:class="$style['apartment__image-background']")
            div(:class="$style['apartment__image-background-inner']")
              div(:class="$style['apartment__image-background-item']")
                img(:src="apartment.planning")
      div(
        ref="aside"
        :class="{\
          [$style['info__aside']]: true,\
          [$style['info__aside--fixed']]: navigationIsFixed,\
          [$style['info__aside--fixed-bottom']]: asideIsFixedBottom\
        }"
      )
        catalog-apartment-card(:card="apartment")
      div(:class="[$style['block'], $style['features']]")
        section(:class="$style['block-inner']")
          h2 Additional features
          div(:class="$style['features__text']")
            h3 Underground parking
            p Each building will have a two-floor underground parking garage, making it easy to access or exit the building. With parked vehicles removed, the neighbourhood will have a functional outdoor space for socializing.
            h3 Underground parking
            p Each building will have a two-floor underground parking garage, making it easy to access or exit the building. With parked vehicles removed, the neighbourhood will have a functional outdoor space for socializing.
          ul(:class="$style['features__list']")
            li(:class="$style['features__list-item']")
              span(:class="$style['features__list-item-key']") До пляжа
              span(:class="$style['features__list-item-value']") 270м
            li(:class="$style['features__list-item']")
              span(:class="$style['features__list-item-key']") Может быть не четное кол-во
              span(:class="$style['features__list-item-value']") Второе поле
            li(:class="$style['features__list-item']")
              span(:class="$style['features__list-item-key']") Сдача в эксплуатацию
              span(:class="$style['features__list-item-value']") 30 апреля 2022
            li(:class="$style['features__list-item']")
              span(:class="$style['features__list-item-key']") До пляжа
              span(:class="$style['features__list-item-value']") 270м
            li(:class="$style['features__list-item']")
              span(:class="$style['features__list-item-key']") Может быть не четное кол-во
              span(:class="$style['features__list-item-value']") Второе поле
            li(:class="$style['features__list-item']")
              span(:class="$style['features__list-item-key']") Сдача в эксплуатацию
              span(:class="$style['features__list-item-value']") 30 апреля 2022
            li(:class="$style['features__list-item']")
              span(:class="$style['features__list-item-key']") До пляжа
              span(:class="$style['features__list-item-value']") 270м
            li(:class="$style['features__list-item']")
              span(:class="$style['features__list-item-key']") Может быть не четное кол-во
              span(:class="$style['features__list-item-value']") Второе поле
            li(:class="$style['features__list-item']")
              span(:class="$style['features__list-item-key']") Сдача в эксплуатацию
              span(:class="$style['features__list-item-value']") 30 апреля 2022
      div(:class="[$style['block'], $style['equipment']]")
        section(:class="$style['block-inner']")
          h2 Комплектация апартаментов
          page-projects-infrastructure-slider(:data="equipmentSlides" :padding="false")
      div(:class="[$style['block'], $style['tour']]")
        h2 A tour of the apartment
        page-projects-apartment-slider(:card="apartment")
    div(:class="$style['block']")
      page-projects-similar-slider(:slider-data="[apartment,apartment,apartment,apartment]")
    base-subscribe(:subscribe-data="$t('footer.subscribe')" white-theme)
    base-accordions(:accordions-data="$t('footer.accordions')")
    common-consultant-slider(:slider-data="$t('footer.consultant_slider')")
    footer-fast-links
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import CatalogApartmentCard from '~/components/Catalog/CatalogApartmentCard.vue'
import BaseProjectNavigation from '~/components/Base/BaseProjectNavigation.vue'
import { IProjectApartment } from '~/store/Catalog'
import PageProjectsInfrastructureSlider from '~/components/Page/Projects/PageProjectsInfrastructureSlider.vue'
import PageProjectsApartmentSlider from '~/components/Page/Projects/PageProjectsApartmentSlider.vue'
import PageProjectsSimilarSlider from '~/components/Page/Projects/PageProjectsSimilarSlider.vue'
import BaseSubscribe from '~/components/Base/BaseSubscribe.vue'
import BaseAccordions from '~/components/Base/BaseAccordions.vue'
import CommonConsultantSlider from '~/components/Common/CommonConsultantSlider.vue'
import FooterFastLinks from '~/components/Footer/FooterFastLinks.vue'

@Component({
  components: {
    FooterFastLinks,
    CommonConsultantSlider,
    BaseAccordions,
    BaseSubscribe,
    PageProjectsSimilarSlider,
    PageProjectsApartmentSlider,
    PageProjectsInfrastructureSlider,
    BaseProjectNavigation,
    CatalogApartmentCard,
  },
  async asyncData(ctx: Context): Promise<void | object> {
    return new Promise(async (resolve) => {
      await ctx.store.dispatch('Catalog/fetchApartment', ctx.params.id)
      resolve({})
    })
  },
})
export default class PropertiesSlugApartmentsApartmentPage extends Vue {
  public navigationIsFixed: boolean = false
  public asideIsFixedBottom: boolean = false

  public onCheckNavigationSticky(status: boolean) {
    this.navigationIsFixed = status
  }

  public equipmentSlides: any = {
    items: [
      {
        title: 'Underground parking',
        text: 'Each building will have a two-floor underground parking garage, making it easy to access or exit the building. With parked vehicles removed, the neighbourhood will have a functional outdoor space for socializing.',
      },
      {
        title: 'Intelligent floor plans',
        text: 'Ground floor apartments will have loggias and several floor plan options to choose from. Units on top floors will have higher ceilings and terraces, and will be perfect for more demanding clients.',
      },
      {
        title: 'Underground parking',
        text: 'Each building will have a two-floor underground parking garage, making it easy to access or exit the building. With parked vehicles removed, the neighbourhood will have a functional outdoor space for socializing.',
      },
      {
        title: 'Underground parking',
        text: 'Each building will have a two-floor underground parking garage, making it easy to access or exit the building. With parked vehicles removed, the neighbourhood will have a functional outdoor space for socializing.',
      },
      {
        title: 'Intelligent floor plans',
        text: 'Ground floor apartments will have loggias and several floor plan options to choose from. Units on top floors will have higher ceilings and terraces, and will be perfect for more demanding clients.',
      },
      {
        title: 'Underground parking',
        text: 'Each building will have a two-floor underground parking garage, making it easy to access or exit the building. With parked vehicles removed, the neighbourhood will have a functional outdoor space for socializing.',
      },
    ],
  }

  get apartment(): IProjectApartment {
    return this.$store.getters['Catalog/getApartment'] as IProjectApartment
  }

  public onScroll() {
    this.asideIsFixedBottom =
      (this.$refs.wrapper as Element).clientHeight -
        window.scrollY -
        (this.$refs.aside as Element).clientHeight -
        50 <
      0
  }

  public mounted() {
    this.$root.$on('navigation:sticky', this.onCheckNavigationSticky)
    document.addEventListener('scroll', this.onScroll)
  }

  public beforeDestroy() {
    this.$root.$off('navigation:sticky', this.onCheckNavigationSticky)
    document.removeEventListener('scroll', this.onScroll)
  }
}
</script>

<style lang="sass" module>
.main
    min-height: 50vh

    &__wrapper
      position: relative

.apartment
  box-sizing: border-box
  height: 1091px
  width: 100%
  position: relative
  background: $color-black-4
  user-select: none

  &__wrapper
    box-sizing: border-box
    height: 100%
    position: absolute
    top: 0
    right: 0
    width: calc(50% - 560px + 728px)

  &__image
    box-sizing: border-box
    overflow: hidden
    position: absolute
    top: 80px
    right: 0
    height: 100%
    width: 100%

    &-background
      box-sizing: border-box
      position: absolute
      top: 0
      right: calc((100vw - 1250px) / 2)
      width: 696px
      height: 100%
      padding: 16px
      max-height: 600px

      &-inner
        box-sizing: border-box
        width: 100%
        height: 100%
        max-height: 600px

      &-item
        box-sizing: border-box
        user-select: none
        width: 100%
        height: 100%
        display: flex
        flex-flow: row nowrap
        -webkit-box-pack: center
        justify-content: center
        -webkit-box-align: center
        align-items: center

        img
          max-width: 100%
          max-height: 100%

.info
  margin: 0 auto
  max-width: 1248px
  width: 100%
  position: relative

  &__aside
    height: auto
    width: 456px
    background-color: $color-white-100
    box-sizing: border-box
    z-index: 1
    position: fixed
    top: 250px
    padding: 64px
    transition-timing-function: ease
    transition-duration: 0.3s
    transition-property: top
    left: calc(50% - 630px)

    &--fixed
      top: 250px - 92px

    &--fixed-bottom
      position: absolute
      bottom: 92px
      top: auto

    @media (max-height: 700px)
      top: 120px
      padding: 32px 64px

    @media (max-width: 900px)
      position: static

.block
  margin: 0 auto
  max-width: 1248px
  width: 100%
  position: relative

  &-inner
    box-sizing: border-box
    padding: 90px 0 0
    max-width: 738px
    width: 100%
    margin-left: auto

.features, .equipment, .tour
  h2
    +style-4
    margin: 0

.features
  &__text
    h3
      +style-5
      color: $color-black-100
      margin-top: 40px
      margin-bottom: 0

    p
      +style-7
      color: $color-black-80
      margin-top: 16px
      margin-bottom: 0

  &__list
    padding: 0
    margin: 16px 0 0
    display: grid
    grid-template-columns: 1fr 1fr
    grid-column-gap: 56px

    &-item
      padding: 14px 0
      display: flex
      justify-content: space-between
      align-items: center
      border-bottom: 1px solid $color-black-4

      &-key, &-value
        +style-6

      &-key
        color: $color-black-64

      &-value
        color: $color-black-100

        .price &
          color: $color-blue-100
          +style-5

          span
            +style-8
            position: relative
            top: -3px
            margin-left: 3px

.tour
  margin: 0 0 0 auto
  max-width: calc(50% - 630px + 736px)
</style>
