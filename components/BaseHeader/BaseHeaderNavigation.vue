<template lang="pug">
  ul(:class="$style['nav']")
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
        :title="item.title"
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
            :title="childItem.title"
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
import { Component, namespace } from 'nuxt-property-decorator'
import TypoText from '~/components/Base/TypoText.vue'
import { NavigationListItem } from '~/store/Navigation'

const NavigationStore = namespace('Navigation')

@Component({ components: { TypoText } })
export default class BaseHeaderNavigation extends Vue {
  @NavigationStore.Getter('getHeaderNavigationList')
  private headerNavigationList!: NavigationListItem[]

  public itemHasChildren(item: NavigationListItem) {
    return item.children && (item.children || []).length
  }

  public dropdownIndex: any = null
}
</script>

<style lang="sass" module>
.nav
  display: flex
  padding: 0
  margin: 0
  list-style: none
  height: 100%

  &__item
    position: relative
    height: 100%
    display: flex
    align-items: center
    justify-content: center
    padding-left: 8px
    padding-right: 16px

    &:hover .dropdown
      pointer-events: all
      opacity: 1

    &-link
      color: rgba($color-black, 0.88)
      text-decoration: none

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
      color: $color-blue
      top: -5px
      margin-left: 3px

    &-dropdown
      margin-left: 3px

    &-icon
      width: 18px
      height: 18px
      fill: $color-black

      &.flip
        transform: rotate(180deg)

.dropdown
  display: flex
  flex-direction: column
  padding: 0 0 16px 0
  margin: 0
  list-style: none
  position: absolute
  left: -32px
  top: 92px
  background-color: $color-white
  box-shadow: 0 20px 40px -16px rgba(17, 17, 17, 0.16)
  pointer-events: none
  opacity: 0
  transition: opacity 0.25s ease
  width: max-content
  margin-top: -17px

  &__item
    position: relative
    height: 100%
    display: flex
    align-items: center
    padding: 4px 30px 4px 30px

    &-link
      color: $color-black
      text-decoration: none

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
      color: $color-blue
      top: -5px
      margin-left: 8px
</style>
