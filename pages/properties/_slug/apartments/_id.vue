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
              div(
                ref="svgPlanning"
                :class="$style['apartment__image-background-item']"
                v-html="svgPlanning"
              )
            div(:class="$style['apartment__footer']")
              div(
                ref="miniature"
                :class="$style['apartment__miniature']"
                v-html="apartment.project.miniature_html"
              )
      client-only
        div(
          ref="aside"
          :class="{\
            [$style['info__aside']]: true,\
            [$style['info__aside--fixed']]: $store.state.stickyNavigation,\
            [$style['info__aside--fixed-bottom']]: asideIsFixedBottom\
          }"
        )
          catalog-apartment-card(:card="apartment")
      div(v-if="hasFeatures" :class="[$style['block'], $style['features']]")
        section(:class="$style['block-inner']")
          h2 {{ $t('pages.apartments.additional_features') }}
          div(:class="$style['features__text']" v-html="apartment.additional_text")
          ul(:class="$style['features__list']")
            li(v-if="apartment.project.to_sea" :class="$style['features__list-item']")
              span(:class="$style['features__list-item-key']") {{ $t('pages.apartments.to_sea') }}
              span(:class="$style['features__list-item-value']") {{ apartment.project.to_sea }}{{ $t('pages.apartments.m') }}
            li(v-if="apartment.project.to_rest" :class="$style['features__list-item']")
              span(:class="$style['features__list-item-key']") {{ $t('pages.apartments.to_rest') }}
              span(:class="$style['features__list-item-value']") {{ apartment.project.to_rest }}{{ $t('pages.apartments.m') }}
            li(v-if="apartment.project.start_building" :class="$style['features__list-item']")
              span(:class="$style['features__list-item-key']") {{ $t('pages.apartments.start_building') }}
              span(:class="$style['features__list-item-value']") {{ apartment.project.start_building }}
            li(v-if="apartment.project.end_building" :class="$style['features__list-item']")
              span(:class="$style['features__list-item-key']") {{ $t('pages.apartments.end_building') }}
              span(:class="$style['features__list-item-value']") {{ apartment.project.end_building }}
            li(
              v-for="(advantage, index) in apartment.advantages"
              :key="index"
              :class="$style['features__list-item']"
            )
              span(:class="$style['features__list-item-key']") {{ advantage.title }}
              span(:class="$style['features__list-item-value']") {{ getAdvantageValue(advantage) }}
      div(v-if="apartment.complete_sets.length" :class="[$style['block'], $style['equipment']]")
        section(:class="$style['block-inner']")
          h2 {{ $t('pages.apartments.equipments') }}
          page-projects-infrastructure-slider(
            :data="{ items: apartment.complete_sets }"
            :padding="false"
          )
      //div(:class="[$style['block'], $style['tour']]")
      //  h2 {{ $t('pages.apartments.photo_tour') }}
      //  page-projects-apartment-slider(:card="apartment")
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
import {
  IProjectApartment,
  IProjectApartmentAdvantage,
  IProjectApartmentCompleteSet,
} from '~/store/Catalog'
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
      // Fetch apartment data
      const apartment = await ctx.store.dispatch('Catalog/fetchApartment', ctx.params.id)

      // Show error page if has error in response
      if (Object.keys(apartment || { error: '' }).indexOf('error') !== -1) {
        resolve(ctx.error({}))
      }

      // Redirect to new apartment slug if project.slug and params.slug not equal
      if (apartment.project.slug !== ctx.params.slug) {
        resolve(
          ctx.redirect(
            ctx.localePath({
              name: 'properties-slug-apartments-id',
              params: {
                slug: apartment.project.slug,
                id: apartment.id,
              },
            }),
          ),
        )
      }

      let svgPlanning = ''

      // If apartment has a planning
      if (apartment.planning) {
        // Fetch svg code of apartment planning
        svgPlanning = await ctx.$axios.$get(apartment.planning)
      }

      resolve({
        svgPlanning,
      })
    })
  },
  scrollToTop: true,
})
export default class PropertiesSlugApartmentsApartmentPage extends Vue {
  public svgPlanning: string = ''

  public asideIsFixedBottom: boolean = false

  get apartment(): IProjectApartment {
    return this.$store.getters['Catalog/getApartment'] as IProjectApartment
  }

  get hasFeatures(): boolean {
    return (
      this.apartment.project.to_sea ||
      this.apartment.project.to_rest ||
      this.apartment.project.start_building ||
      this.apartment.project.end_building ||
      this.apartment.advantages?.length
    )
  }

  public getAdvantageValue(advantage: IProjectApartmentAdvantage) {
    if (advantage.type) {
      if (advantage.type === '1') {
        return advantage.value === '1' ? 'Есть' : 'Нет'
      }

      if (advantage.type === '2') {
        return advantage.value === '1' ? 'Да' : 'Нет'
      }

      if (advantage.type === '3') {
        return advantage.value
      }
    }

    return ''
  }

  public onScroll() {
    this.asideIsFixedBottom =
      (this.$refs.wrapper as Element).clientHeight -
        window.scrollY -
        (this.$refs.aside as Element).clientHeight -
        50 <
      0
  }

  public async mounted() {
    await this.$nextTick()

    document.addEventListener('scroll', this.onScroll)
    this.onScroll()

    // Remove old class and set new class for styling a text in svg
    ;((this.$refs.svgPlanning as Element).querySelectorAll('text') || []).forEach((el: Element) => {
      el.setAttribute('class', '')
      el.classList.add(this.$style['svg-text'])
    })

    await this.$nextTick()

    // Select miniature
    const polygon: Element = (this.$refs.miniature as Element).querySelector(
      `#bfloor-${this.apartment.block?.name.toLowerCase()}-${this.apartment.floor.number}`,
    ) as Element

    if (polygon) {
      polygon.classList.add(this.$style['selected'])
    }
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

  &__footer
    display: flex

  &__layout
    height: 60px
    position: relative

    img
      max-height: 60px
      height: 100%

    div
      position: absolute
      left: 0
      top: 0

  &__miniature
    max-height: 60px
    height: 100%

    polygon.selected
      fill: $color-black-100

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

    @media (max-height: 700px)
      top: 120px
      padding: 32px 64px

    @media (max-width: 900px)
      position: static

    &--fixed-bottom
      position: absolute
      bottom: 92px
      top: auto

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

.svg-text
  +style-6
  font-size: 6px
  color: $color-black-100
</style>
