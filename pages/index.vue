<template lang="pug">
  main
    page-welcome
      typo-text(tag="h1" version="style-2" v-html="$t('pages.home.header.title')")
      typo-text(
        v-for="(text1,i) in  $t('pages.home.header.text1')"
        :key="i"
        tag="p" 
        version="style-5"
        ) {{ text1 }}
      typo-text(tag="p" version="style-5")
        i18n(path="pages.home.header.text2" tag="span" version="style-5")
          template(v-slot:link)
            nuxt-link(:to="localePath({ name: 'projects' })")
              | {{ $t('pages.home.header.text2_link') }}
        common-link-icon(:variants="['stroke-blue']")
      div(:class="$style['hero__container']")
        div(:class="$style['hero__double-circle']")
      template(slot="prepend")
        div(:class="$style['hero__container']")
          div(:class="$style['hero__video-link']" @click="showVideo" data-cursor-text)
            svg-icon(:class="$style['hero__video-icon-text']" name="hero-link-circle-text")
            div(:class="$style['hero__video-icon-circle-wrapper']" v-magnetic)
              svg-icon(:class="$style['hero__video-icon-circle']" name="hero-link-circle")
    hero-slider(:slides="$t('pages.home.hero_slider_data.hero_slider')")
    link-banner-wrapper
      link-banner(
        :image-src="require('~/assets/images/pages/home/secondary-housing.jpg')"
        :to="{ name: 'secondary-housing' }"
        :title="$t('pages.home.link_baner.baner_1.title')"
        :text="$t('pages.home.link_baner.baner_1.text')"
        text-align="right"
        :data-cursor-text="$t('pages.home.link_baner.baner_1.data-cursor-text')"
        data-cursor-off-exclusion
      )
      link-banner(
        :image-src="require('~/assets/images/pages/home/for-investors.jpg')"
        :to="{ name: 'investors' }"
        :title="$t('pages.home.link_baner.baner_2.title')"
        :text="$t('pages.home.link_baner.baner_2.text')"
        text-align="center"
        :data-cursor-text="$t('pages.home.link_baner.baner_2.data-cursor-text')"
        data-cursor-off-exclusion
      )
    tree-columns(
      :title="$t('pages.home.tree_columns.title')"
      :description="$t('pages.home.tree_columns.description')"
      :columns="$t('pages.home.tree_columns.columns')"
      :data-cursor="$t('pages.home.tree_columns.data_cursor')"
    )
    common-consultant-slider(:slider-data="$t('footer.consultant_slider')")
    base-accordions(:accordions-data="$t('footer.accordions')")
    base-subscribe(:subscribe-data="$t('footer.subscribe')")
    footer-fast-links
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import TypoText from '~/components/Base/TypoText.vue'
import HeroSlider from '~/components/HeroSlider/HeroSlider.vue'
import PageWelcome from '~/components/Page/PageWelcome.vue'
import CommonConsultantSlider from '~/components/Common/CommonConsultantSlider.vue'
import BaseAccordions from '~/components/Base/BaseAccordions.vue'
import BaseSubscribe from '~/components/Base/BaseSubscribe.vue'
import FooterFastLinks from '~/components/Footer/FooterFastLinks.vue'
import { IHeroSlide } from '~/types/HeroSlider'
import LinkBannerWrapper from '~/components/LinkBanner/LinkBannerWrapper.vue'
import LinkBanner from '~/components/LinkBanner/LinkBanner.vue'
import TreeColumns from '~/components/TreeColumns/TreeColumns.vue'
import Magnetic from '~/directives/magnetic'
import CommonLinkIcon from '~/components/Common/CommonLinkIcon.vue'
import { modalsTriggerMixin } from '~/mixins/modals'
import { Context } from '@nuxt/types'

@Component({
  components: {
    CommonLinkIcon,
    TreeColumns,
    LinkBanner,
    LinkBannerWrapper,
    PageWelcome,
    CommonConsultantSlider,
    HeroSlider,
    TypoText,
    BaseAccordions,
    BaseSubscribe,
    FooterFastLinks,
  },
  directives: { Magnetic },
  mixins: [modalsTriggerMixin],
})
export default class IndexPage extends Vue {
  created() {
    this.$store.commit('setLogoSubTitle', 'Construction')
    this.store.commit('setBreadcrumbs', [])
  }

  public showVideo() {
    this.showModal({
      name: 'modal-video',
      modal: () => import('~/components/Modal/Video/ModalVideo.vue'),
      options: {
        height: 'auto',
        width: '100%',
        // scrollable: false,
        // classes: [".v--modal-fullscreen"]
      },
      events: {
        'before-open': () => {
          document.documentElement.classList.add('modal-fullwidth-is-open', 'modal-video-is-open')
        },
        'before-close': () => {
          if (document.body.getElementsByClassName('vm--container').length <= 1) {
            document.documentElement.classList.remove(
              'modal-fullwidth-is-open',
              'modal-video-is-open',
            )
          }
        },
      },
    })
  }
}
</script>

<style lang="sass" module>
.hero__container
  max-width: 912px
  width: 100%
  margin: 0 auto
  height: 0
  position: relative

  @media (max-width: 1300px)
    margin: 0
    padding: 0 64px

  @media (max-width: 1060px)
    display: none
    &:first-child
      order: 4

.hero__double-circle
    position: absolute
    right: -176px
    bottom: -283px
    display: block
    width: 429px
    height: 303px
    background: url("~/assets/images/hero/hero-double-circle.png") no-repeat center
    background-size: 429px 303px

    @media (max-width: 1060px)
      right: auto
      left: -80px
      top: 140px
      bottom: auto

.hero__video
  &-link
    position: absolute
    top: 40px
    right: -144px
    width: 144px
    height: 144px
    display: flex
    align-items: center
    justify-content: center
    cursor: pointer

    &:hover
      animation-play-state: paused

    @media (max-width: 1060px)
      margin: 0
      top: 20px
      right: 20px
      width: 112px
      height: 112px

  &-icon-text
    position: absolute
    width: 144px
    height: 144px
    left: 0
    top: 0
    animation: circle 12s linear infinite
    animation-play-state: inherit

    @media (max-width: 1060px)
      width: 112px
      height: 112px

  &-icon-circle
    position: absolute
    width: 64px
    height: 64px
    left: 40px
    top: 40px

    @media (max-width: 1060px)
      left: 24px
      top: 24px

    &-wrapper
      position: absolute
      width: 144px
      height: 144px
      left: 0
      top: 0

      @media (max-width: 1060px)
        width: 112px
        height: 112px

@keyframes circle
  100%
    transform: rotate(360deg)
</style>
