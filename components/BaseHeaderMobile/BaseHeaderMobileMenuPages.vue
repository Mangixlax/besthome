<template lang="pug">
  div(:class="$style['menu-pages']")
    ul(
      :class="{\
        [$style['menu-pages__items']]: true,\
        [$style['show']]: activeMenuPageIndex === -1\
      }"
    )
      base-header-mobile-menu-list-item(
        v-for="(listItem, listKey) in mainNavigationList"
        :key="`menu-item-${listKey}`"
        :name="listItem.name"
        :title="listItem.title"
        :route="listItem.hasChildren ? null : listItem.route"
        :indicator="listItem.indicator"
        :has-children="listItem.hasChildren"
        @click-children="activateMenuPage(listKey)"
      )
    ul(
      v-for="lists in secondNavigationLists"
      :key="`menu-page-${lists.pageIndex}`"
      :class="{\
        [$style['menu-pages__items']]: true,\
        [$style['show']]: activeMenuPageIndex === lists.pageIndex\
      }"
    )
      base-header-mobile-menu-list-item(
        is-parent
        :name="lists.parentListItem.name"
        :title="lists.parentListItem.title"
        :indicator="lists.parentListItem.indicator"
        @click="activateMenuPage(-1)"
      )
      base-header-mobile-menu-list-item(
        v-for="(listItem, key) in lists.children"
        :key="`menu-page-item-${key}`"
        :name="listItem.name"
        :title="listItem.title"
        :route="listItem.route"
        :indicator="listItem.indicator"
      )
      base-header-mobile-menu-list-item(
        :name="lists.parentListItem.nameInChildren"
        :title="lists.parentListItem.title"
        :route="lists.parentListItem.route"
      )
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, namespace, Watch} from 'nuxt-property-decorator'
import TypoText from '~/components/Base/TypoText.vue'
import { NavigationListItem } from '~/store/Navigation'
import BaseHeaderMobileMenuListItem from '~/components/BaseHeaderMobile/BaseHeaderMobileMenuListItem.vue'

const NavigationStore = namespace('Navigation')

interface secondNavigationListItem {
  pageIndex: Number
  parentListItem: NavigationListItem
  children: NavigationListItem[]
}

@Component({
  components: { BaseHeaderMobileMenuListItem, TypoText },
})
export default class BaseHeaderMobileMenuPages extends Vue {
  @NavigationStore.Getter('getHeaderNavigationList') headerNavigationList!: NavigationListItem[]

  public activeMenuPageIndex: Number = -1

  get mainNavigationList(): NavigationListItem[] {
    return (this.headerNavigationList || []).map((list: NavigationListItem) => {
      return {
        name: list.name || '',
        title: list.title || '',
        indicator: list.indicator || '',
        route: list.route,
        hasChildren: (list.children || []).length > 0,
      }
    })
  }

  get secondNavigationLists(): secondNavigationListItem {
    return (this.headerNavigationList || [])
      .map((listItem: NavigationListItem, index: Number) => {
        return {
          pageIndex: index,
          parentListItem: listItem,
          children: listItem.children,
        }
      })
      .filter((list: NavigationListItem) => (list.children || []).length)
  }

  activateMenuPage(pageIndex) {
    this.activeMenuPageIndex = pageIndex
  }

  /**
   * Reset menu page index when $route is changed
   */
  @Watch('$route')
  onChangeRoute() {
    this.activeMenuPageIndex = -1
  }
}
</script>

<style lang="sass" module>
.menu-pages
  position: relative

  &__items
    padding: 0
    margin: 0
    list-style: none
    display: none

    &.show
      display: block
</style>
