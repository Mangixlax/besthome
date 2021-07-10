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
import { Component, Watch } from 'nuxt-property-decorator'
import TypoText from '~/components/Base/TypoText.vue'
import { NavigationListItem } from '~/store/Navigation'
import BaseHeaderMobileMenuListItem from '~/components/BaseHeaderMobile/BaseHeaderMobileMenuListItem.vue'
import { delay } from '~/lib/utils'

interface secondNavigationListItem {
  pageIndex?: number
  parentListItem?: NavigationListItem
  children?: NavigationListItem[]
}

@Component({
  components: { BaseHeaderMobileMenuListItem, TypoText },
})
export default class BaseHeaderMobileMenuPages extends Vue {
  public activeMenuPageIndex: number = -1

  get mainNavigationList(): NavigationListItem[] {
    return (this.$store.getters['Navigation/getMenuByKey']('header').items || []).map((list: NavigationListItem) => {
      return {
        name: list.name || '',
        title: list.title || '',
        indicator: list.indicator || '',
        route: list.route,
        hasChildren: (list.children || []).length > 0,
      }
    })
  }

  get secondNavigationLists(): secondNavigationListItem[] {
    return (this.$store.getters['Navigation/getMenuByKey']('header').items || [])
      .map((listItem: NavigationListItem, index: number) => {
        return {
          pageIndex: index,
          parentListItem: listItem,
          children: listItem.children,
        }
      })
      .filter((list: NavigationListItem) => (list.children || []).length)
  }

  public activateMenuPage(pageIndex: number) {
    this.activeMenuPageIndex = pageIndex
  }

  /**
   * Reset menu page index when $route is changed
   * Delay for correct page transition on mobile device
   */
  @Watch('$route')
  async onChangeRoute() {
    await delay(300)
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
