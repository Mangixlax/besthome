<template lang="pug">
  section(ref="navigation" :class="$style['project-navigation']")
    div(:class="$style['project-navigation__container']")
      div(:class="$style['project-navigation__title']")
        typo-text(
          tag="h3"
          version="style-4"
          :class="$style['project-navigation__title-text']"
        ) {{ name }}
      div(:class="$style['project-navigation__navbar']")
        ul(:class="[$style['project-navigation__navbar-list'],  showMenu && $style['show']]")
          li(:class="$style['project-navigation__navbar-item']")
            nuxt-link(
              :to="localePath({ name: 'properties-slug-about', params: { slug } })"
              :class="$style['project-navigation__navbar-link']"
              :active-class="$style['project-navigation__navbar-link--active']"
            ) {{ $t('projects.navigation.about') }}
          li(:class="$style['project-navigation__navbar-item']")
            nuxt-link(
              :to="localePath({ name: 'properties-slug-location', params: { slug } })"
              :class="$style['project-navigation__navbar-link']"
              :active-class="$style['project-navigation__navbar-link--active']"
            ) {{ $t('projects.navigation.location') }}
          li(:class="$style['project-navigation__navbar-item']")
            nuxt-link(
              :to="localePath({ name: 'properties-slug-gallery', params: { slug } })"
              :class="$style['project-navigation__navbar-link']"
              :active-class="$style['project-navigation__navbar-link--active']"
            ) {{ $t('projects.navigation.gallery') }}
          li(:class="$style['project-navigation__navbar-item']")
            nuxt-link(
              :to="localePath({ name: 'properties-slug-apartments', params: { slug } })"
              :class="$style['project-navigation__navbar-link']"
              :active-class="$style['project-navigation__navbar-link--active']"
            ) {{ $t('projects.navigation.choose_apartment') }}
        div(@click="toggleMenu" :class="$style['project-navigation__navbar-dropdown']")
          svg-icon(name="project-navigation-dropdown")
        button(
          type="button"
          :class="$style['project-navigation__navbar-submit']"
          @click="showGetCallback"
        ) {{ $t('projects.navigation.get_a_consultation') }}
        button(
          type="button"
          :class="$style['project-navigation__navbar-submit--mobile']"
          @click="showGetCallback"
        ) {{ $t('projects.navigation.consultation') }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { modalsTriggerMixin } from '~/mixins/modals'
import TypoText from '~/components/Base/TypoText.vue'

@Component({
  components: { TypoText },
  mixins: [modalsTriggerMixin],
})
export default class BaseProjectNavigation extends Vue {
  @Prop({ type: Boolean, default: false }) isActive!: boolean
  @Prop({ type: String, required: true }) name!: string
  @Prop({ type: String, required: true }) slug!: string

  public showGetCallback() {
    this.$router.push(this.localePath({ name: 'feedback' }))
  }

  public prevFixedStatus: boolean = true
  public showMenu: boolean = false

  public onScroll() {
    if (window.scrollY >= 92) {
      this.prevFixedStatus && this.$store.commit('setStickyNavigation', true)
      this.prevFixedStatus = false
    } else {
      !this.prevFixedStatus && this.$store.commit('setStickyNavigation', false)
      this.prevFixedStatus = true
    }
  }

  public toggleMenu() {
    this.showMenu = !this.showMenu
  }

  async mounted() {
    document.addEventListener('scroll', this.onScroll)
    await this.$nextTick()
    this.onScroll()
  }

  beforeDestroy() {
    document.removeEventListener('scroll', this.onScroll)
  }
}
</script>

<style lang="sass" module>
.project-navigation
  width: 100%
  position: sticky
  top: 0
  background-color: $color-white-100
  z-index: 30

  &__container
    display: flex
    align-items: center
    justify-content: space-between
    max-width: 1296px
    padding: 8px 24px
    margin: 0 auto

  &__title
    &-text
      margin: 0

      @media (width: 320px)
        +style-4-alt

  &__navbar
    display: flex
    padding: 22px 0px 22px 8px

    &-list
      list-style: none
      display: flex
      align-items: center
      margin: 0

      @media (max-width: 900px)
        display: none
        padding-left: 24px
        width: 100%
        background: white
        padding: 0
        margin-left: 0px
        flex-direction: column
        position: absolute
        left: 0px
        top: 100%
        float: left
        padding-bottom: 12px
        align-items: flex-start

        &.show
          display: block

    &-item
      margin-right: 24px
      padding: 8px 0

      @media (max-width: 900px)
        margin-left: 24px

        &:not(:first-of-type)
          border-top: solid 1px $color-black-4

    &-link
      text-decoration: none
      color: $color-black-100
      white-space: nowrap
      +style-7

      &--active
        text-decoration: none
        color: $color-black-40

    &-dropdown
      display: flex
      align-items: center
      margin-right: 8px

      @media (min-width: 900px)
        display: none

      svg
        height: 32px
        width: 32px

    &-submit
      width: fit-content
      height: 48px
      border: none
      background-color: $color-blue-100
      white-space: nowrap
      color: $color-white-88
      +style-7
      cursor: pointer

      @media (max-width: 600px)
        display: none

      &--mobile
        width: fit-content
        height: 32px
        border: none
        background-color: $color-blue-100
        color: $color-white-88
        +style-7
        cursor: pointer

        @media (min-width: 600px)
          display: none
</style>
