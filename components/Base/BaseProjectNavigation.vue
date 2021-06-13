<template lang="pug">
  section(:class="$style['project-navigation']")
    div(:class="$style['project-navigation__container']")
      div(:class="$style['project-navigation__title']")
        typo-text(
          tag="h3"
          version="style-4"
          :class="$style['project-navigation__title-text']"
        ) {{ name }}
      div(:class="$style['project-navigation__navbar']")
        ul(:class="$style['project-navigation__navbar-list']")
          li(:class="$style['project-navigation__navbar-item']")
            nuxt-link(
              :to="localePath({ name: 'properties-slug-review', params: { slug } })"
              :class="$style['project-navigation__navbar-link']"
              :active-class="$style['project-navigation__navbar-link--active']"
            ) {{ $t('projects.navigation.review') }}
          li(:class="$style['project-navigation__navbar-item']")
            nuxt-link(
              :to="localePath({ name: 'properties-slug-about', params: { slug } })"
              :class="$style['project-navigation__navbar-link']"
              :active-class="$style['project-navigation__navbar-link--active']"
            ) {{ $t('projects.navigation.about') }}
          li(:class="$style['project-navigation__navbar-item']")
            nuxt-link(
              :to="localePath({ name: 'properties-slug-experiences', params: { slug } })"
              :class="$style['project-navigation__navbar-link']"
              :active-class="$style['project-navigation__navbar-link--active']"
            ) {{ $t('projects.navigation.experiences') }}
          li(:class="$style['project-navigation__navbar-item']")
            nuxt-link(
              :to="localePath({ name: 'properties-slug-apartments', params: { slug } })"
              :class="$style['project-navigation__navbar-link']"
              :active-class="$style['project-navigation__navbar-link--active']"
            ) {{ $t('projects.navigation.choose_apartment') }}
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
import { IProject } from '~/store/Catalog'

@Component({
  components: { TypoText },
  mixins: [modalsTriggerMixin]
})
export default class BaseProjectNavigation extends Vue {
  @Prop({ type: Boolean, default: false }) isActive!: boolean
  @Prop({ type: String, required: true }) name!: string
  @Prop({ type: String, required: true }) slug!: string

  public showGetCallback() {
    this.showModal({
      name: 'modal-get-callback',
      modal: () => import('~/components/Modal/GetCallback/ModalGetCallback.vue'),
      options: {
        width: '100%'
      }
    })
  }

  get projectTitle(): string {
    return (this.$store.getters['Catalog/getProject'] as IProject).name
  }

  get projectSlug(): string {
    return (this.$store.getters['Catalog/getProject'] as IProject).slug
  }
}
</script>

<style lang="sass" module>
.project-navigation
  width: 100%

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

  &__navbar
    display: flex
    padding: 22px 0px 22px 8px

    &-list
      list-style: none
      display: flex
      align-items: center
      margin: 0
      margin-left: 8px

      @media (max-width: 900px)
        display: none

    &-item
      margin-right: 24px

    &-link
      text-decoration: none
      color: $color-black-100
      white-space: nowrap
      +style-7

      &--active
        text-decoration: none
        color: $color-black-40

    &-submit
      width: fit-content
      height: 48px
      border: none
      background-color: $color-blue-100
      white-space: nowrap
      color: $color-white-88
      +style-7

      @media (max-width: 600px)
        display: none

      &--mobile
        width: fit-content
        height: 32px
        border: none
        background-color: $color-blue-100
        color: $color-white-88
        +style-7

        @media (min-width: 600px)
          display: none
</style>
