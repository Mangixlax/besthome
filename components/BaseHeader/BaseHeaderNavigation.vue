<template lang="pug">
  ul(:class="[$style['nav'], dark && $style['dark']]")
    li(
      v-for="(item, index) in headerNavigationList"
      :key="index"
      @mouseover="dropdownIndex = index"
      @mouseout="dropdownIndex = null"
      :class="$style['nav__item']"
    )
      typo-text(
        tag="nuxt-link"
        version="style-7"
        :to="localePath(item.route)"
        :title="item.name"
        :class="$style['nav__item-link']"
      ) {{ item.name }}
      typo-text(
        v-if="item.indicator"
        version="style-9"
        tag="span"
        :class="$style['nav__item-indicator']"
      ) {{ item.indicator }}
      span(
        v-if="itemHasChildren(item)"
        :class="$style['nav__item-dropdown']"
      )
        svg-icon(
          name="dropdown"
          :class="[$style['nav__item-icon'], dropdownIndex == index && $style['flip']]"
        )
      ul(
        v-if="itemHasChildren(item)"
        :class="$style['dropdown']"
      )
        li(
          v-for="(childItem, childItemKey) in item.children"
          :key="`child-item-${childItemKey}`"
          :class="$style['dropdown__item']"
        )
          typo-text(
            tag="nuxt-link"
            version="style-7"
            :to="localePath(childItem.route)"
            :title="childItem.name"
            :class="$style['dropdown__item-link']"
          ) {{ childItem.name }}
          typo-text(
            v-if="childItem.indicator"
            version="style-9"
            tag="span"
            :class="$style['dropdown__item-indicator']"
          ) {{ childItem.indicator }}
        li(:class="$style['dropdown__item']")
          typo-text(
            tag="nuxt-link"
            version="style-7"
            :to="localePath(item.route)"
            :title="item.nameInChildren"
            :class="$style['dropdown__item-link']"
          ) {{ item.nameInChildren }}
          typo-text(
            v-if="item.indicator"
            version="style-9"
            tag="span"
            :class="$style['dropdown__item-indicator']"
          ) {{ item.indicator }}
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'nuxt-property-decorator'
import TypoText from '~/components/Base/TypoText.vue'
import { NavigationListItem } from '~/store/Navigation'

@Component({ components: { TypoText } })
export default class BaseHeaderNavigation extends Vue {
  @Prop({ type: Boolean, default: false }) dark!: boolean

  /**
   * Data
   */

  public dropdownIndex: any = null

  /**
   * Computed
   */

  get headerNavigationList(): NavigationListItem[] {
    return this.$store.getters['Navigation/getMenuByKey']('header').items
  }

  /**
   * Methods
   */

  public itemHasChildren(item: NavigationListItem) {
    return item.children && (item.children || []).length
  }
}
</script>

<style lang="sass" module>
.nav
  display: flex
  padding: 0
  list-style: none
  height: 100%
  width: 90%
  margin: 0 auto
  justify-content: space-around

  &__item
    position: relative
    height: 100%
    display: flex
    align-items: center
    justify-content: center
    padding-left: 8px
    padding-right: 16px
    z-index: 50

    @media (max-width: 1248px + 32px)
      padding-left: 4px
      padding-right: 6px

    &:hover .dropdown
      pointer-events: all
      opacity: 1

    &-link
      color: $color-black-88
      text-decoration: none
      transition: color 0.5s ease

      .dark &
        color: $color-white-88

      &:after
        content: ''
        position: absolute
        left: 0
        right: 0
        top: 0
        bottom: 0
        z-index: 1

    &-indicator
      position: relative
      color: $color-blue-100
      transition: color 0.5s ease
      top: -5px
      margin-left: 3px

      .dark &
        color: $color-white-100

    &-dropdown
      margin-left: 3px

    &-icon
      width: 18px
      height: 18px
      fill: $color-black-100
      transition: transform 0.3s ease, fill 0.5s ease

      .dark &
        fill: $color-white-100

      &.flip
        transform: rotate(180deg)

.dropdown
  display: flex
  flex-direction: column
  padding: 0 0 16px 0
  list-style: none
  position: absolute
  left: -22px
  top: 109px
  background-color: $color-white-100
  box-shadow: 0 20px 40px -16px rgba(17, 17, 17, 0.16)
  pointer-events: none
  opacity: 0
  transition: opacity 0.25s ease, background-color 0.5s ease
  width: max-content
  margin: -17px 0 0

  .dark &
    background-color: $color-black-72

  &__item
    position: relative
    height: 100%
    display: flex
    align-items: center
    padding: 4px 30px 4px 30px

    &-link
      color: $color-black-100
      text-decoration: none
      transition: color 0.5s ease

      .dark &
        color: $color-white-100

      &:after
        content: ''
        position: absolute
        left: 0
        right: 0
        top: 0
        bottom: 0
        z-index: 1

    &-indicator
      position: relative
      color: $color-blue-100
      top: -5px
      margin-left: 8px
      transition: color 0.5s ease

      .dark &
        color: $color-white-100
</style>
