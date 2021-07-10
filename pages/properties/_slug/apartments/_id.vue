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
            swiper(ref="swiper" :class="$style['slider']" class="swiper" :options="swiperOption")
              swiper-slide(:class="$style['slide']")
                div(:class="$style['apartment__image-background-inner']")
                  div(
                    ref="svgPlanning"
                    :class="$style['apartment__image-background-item']"
                    v-html="svgPlanning"
                  )
              div(slot="pagination" :class="$style['navigation']")
                div(:class="['swiper-pagination-progressbar', $style['swiper-pagination-progressbar']]")
                  div(class="status-bar")
                div(:class="$style['buttons']")
                  button(:class="[$style['swiper-button-prev']]" @click.prevent="$refs.swiper.swiperInstance.slidePrev()")
                    svg-icon(name="slider-prev-arrow-blue")
                  button(:class="[$style['swiper-button-next']]" @click.prevent="$refs.swiper.swiperInstance.slideNext()")
                    svg-icon(name="slider-next-arrow-blue")
            div( :class="$style['apartment__footer']")
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
    div(v-if="similarApartments.length" :class="$style['block']")
      page-projects-similar-slider(:slider-data="similarApartments")
    base-subscribe(:subscribe-data="$t('footer.subscribe')" white-theme)
    base-accordions(:accordions-data="$t('footer.accordions')")
    common-consultant-slider(:slider-data="$t('footer.consultant_slider')")
    footer-fast-links
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
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
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import metaGenerator from '~/config/meta.js'
import { delay } from '~/lib/utils'

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
    Swiper,
    SwiperSlide,
  },
  async asyncData(ctx: Context): Promise<void | object> {
    ctx.store.commit('PageTransition/animate', true)

    !process.server && (await delay(200))

    // Fetch apartment data
    const { apartment, similarApartments, error } = await ctx.store.dispatch(
      'Catalog/fetchApartment',
      ctx.params.id,
    )

    // Show error page if has error in response
    if (error || Object.keys(apartment || { error: '' }).indexOf('error') !== -1) {
      ctx.error({})
    }

    // Redirect to new apartment slug if project.slug and params.slug not equal
    if (apartment.project.slug !== ctx.params.slug) {
      ctx.redirect(
        ctx.localePath({
          name: 'properties-slug-apartments-id',
          params: {
            slug: apartment.project.slug,
            id: apartment.id,
          },
        }),
      )
    }

    let svgPlanning = ''

    // If apartment has a planning
    if (apartment.plans && (apartment.plans || []).length) {
      // Fetch svg code of apartment planning
      svgPlanning = await ctx.$axios.$get(apartment.plans[0])
    }

    ctx.store.commit('setBreadcrumbs', [
      {
        name: ctx.app.i18n.t('breadcrumbs.projects'),
        route: {
          name: 'projects',
        },
      },
      {
        name: apartment.project.name,
        route: {
          name: 'properties-slug-about',
          params: {
            slug: apartment.project.slug,
          },
        },
      },
      {
        name: ctx.app.i18n.t('breadcrumbs.apartments'),
        route: {
          name: 'properties-slug-apartments',
          params: {
            slug: apartment.project.slug,
          },
        },
      },
      {
        name: apartment.name,
        route: {
          name: 'properties-slug-apartments-id',
          params: {
            slug: apartment.project.slug,
            id: apartment.id,
          },
        },
      },
    ])

    setTimeout(() => {
      ctx.store.commit('PageTransition/animate', false)
    }, 500)

    return {
      svgPlanning,
      similarApartments,
    }
  },
  head(): any {
    const title =
      this.$i18n.locale === 'ru'
        ? `${this.apartment.project.name} Аланья, купить недвижимость в Турции по цене застройщика`
        : `${this.apartment.project.name} Alanya, buy property in Turkey at the developer's price`

    const description =
      this.$i18n.locale === 'ru'
        ? `Продажа недвижимости по цене от застройщика в Алании ${this.apartment.project.name}. Официальный сайт турецкой строительной компании BEST HOME. Купить недвижимость в +город без переплат, в рассрочку и ипотеку`
        : `Sale of real estate at a price from the developer in Alanya ${this.apartment.project.name}. The official website of the Turkish construction company BEST HOME. Buy real estate in + city without overpayments, in installments and a mortgage`

    return {
      title,
      htmlAttrs: {
        lang: this.$i18n.locale,
        prefix: 'og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#',
      },
      meta: metaGenerator({
        title,
        description,
        robots: 'noindex, nofollow',
      }),
      link: [
        {
          rel: 'canonical',
          href: `${process.env.PROTOCOL}://${process.env.DOMAIN}${this.$route.path}`,
        },
      ],
    }
  },
  scrollToTop: true,
})
export default class PropertiesSlugApartmentsApartmentPage extends Vue {
  public svgPlanning: string = ''

  public asideIsFixedBottom: boolean = false

  public swiperOption: Object = {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 128,
    pagination: {
      el: '.swiper-pagination-progressbar',
      type: 'progressbar',
    },
  }

  get apartment(): IProjectApartment {
    return this.$store.getters['Catalog/getApartment'] as IProjectApartment
  }

  get hasFeatures(): boolean {
    return (
      (this.apartment.project.to_sea as number) > 0 ||
      (this.apartment.project.to_rest as number) > 0 ||
      (this.apartment.project.start_building as string) !== '' ||
      (this.apartment.project.end_building as string) !== '' ||
      ((this.apartment.advantages || []).length as number) > 0
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
    this.$store.commit('setStickyNavigation', false)

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

    this.$store.commit('PageTransition/animate', false)
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

  @media (max-width: 1300px)
    height: 100%
    padding: 0 8px

  &__footer
    display: flex
    flex-direction: column
    grid-gap: 8px
    position: absolute
    bottom: 65px

    @media (max-width: 1300px)
      bottom: 95px

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
      fill: $color-blue-100

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
    top: 80px
    right: 0
    height: 100%
    width: 100%

    @media (min-width: 1300px)
        position: absolute

    &-background
      box-sizing: border-box
      top: 0
      right: calc((100vw - 1250px) / 2)
      max-width: 696px
      width: 100%
      padding: 16px

      @media (min-width: 1300px)
        position: absolute

      @media (max-width: 1300px)
        padding: 34px 24px
        position: relative
        right: initial
        top: initial
        margin: 0 auto

      &-inner
        box-sizing: border-box
        width: 100%

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

        svg
          max-width: 100%
          max-height: 600px

.info
  margin: 0 auto
  max-width: 1248px
  width: 100%
  position: relative

  &__aside
    height: auto
    max-width: 456px
    width: 100%
    background-color: $color-white-100
    box-sizing: border-box
    z-index: 1
    position: fixed
    top: 250px
    transition-timing-function: ease
    transition-duration: 0.3s
    transition-property: top
    left: calc(50% - 630px)

    &__card
      padding: 64px

    @media (max-height: 700px)
      top: 120px

      &__card
        padding: 32px 64px

    @media (max-width: 1300px)
      position: static
      margin: 0 auto

      &__card
        padding: 32px

    @media (min-width: 1300px)

      &--fixed
        top: 250px - 92px

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
    padding: 90px 24px 0 24px
    max-width: 786px
    width: 100%
    margin-left: auto

    @media (max-width: 800px)
      padding-top: 32px
      padding-left: 24px
      padding-right: 24px

    @media (max-width: 1100px)
      margin: 0 auto

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

    @media (max-width: 700px)
      grid-template-columns: 1fr

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

.slider
  display: flex
  flex-direction: column
  grid-gap: 80px

  @media (max-width: 1300px)
    margin-bottom: 40px

.navigation
  width: 100%
  margin: 32px auto
  display: flex
  align-items: center
  justify-content: space-between

.swiper-pagination-progressbar
  position: relative !important
  height: 2px
  flex: 1 1 auto
  position: relative
  background: $color-blue-4
  max-width: 860px
  width: 100%

.swiper-button-prev
  display: block
  margin-left: auto
  outline: none
  padding: 0
  background-color: transparent
  border: none

  svg
    width: 32px
    height: 32px

.swiper-button-next
  display: block
  margin-right: auto
  outline: none
  padding: 0
  background-color: transparent
  border: none

  svg
    width: 32px
    height: 32px

.buttons
  margin-left: 24px
  display: flex
  grid-gap: 24
</style>
