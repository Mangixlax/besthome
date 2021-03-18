<template lang="pug">
  ul(:class="$style['nav']")
    li(
      v-for="(item, key) in menuList"
      :key="key"
      :class="$style['nav__item']"
    )
      typo-text(
        tag="nuxt-link"
        version="style-7"
        :to="{ name: 'index' }"
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
        svg-icon(name="dropdown")
      ul(
        v-if="itemHasChildren(item)"
        :class="$style['dropdown']"
      )
        li(
          v-for="(item, key) in item.children"
          :key="key"
          :class="$style['dropdown__item']"
        )
          typo-text(
            tag="nuxt-link"
            version="style-7"
            :to="{ name: 'index' }"
            :title="item.title"
            :class="$style['dropdown__item-link']"
          ) {{ item.name }}
          typo-text(
            v-if="item.indicator"
            version="style-9"
            tag="span"
            :class="$style['dropdown__item-indicator']"
          ) {{ item.indicator }}
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import TypoText from '~/components/Base/TypoText.vue'

interface NavigationListItem {
  name: string
  title?: string
  alt?: string
  indicator?: number | string
  route: object
  children?: Array<NavigationListItem>
}

@Component({ components: { TypoText } })
export default class BaseHeaderNavigation extends Vue {
  public menuList: Array<NavigationListItem> = [
    {
      name: 'Our projects',
      indicator: '30',
      route: {},
      title: 'Our projects',
      children: [
        {
          name: '%New_category% %New_category% %New_category%',
          indicator: 'new',
          route: {},
          title: '%New_category%',
        },
        {
          name: '%New_category% %New_category%',
          indicator: 'new',
          route: {},
          title: '%New_category%',
        },
        {
          name: '%New_category%',
          indicator: 'new',
          route: {},
          title: '%New_category%',
        },
        {
          name: '%New_category%',
          indicator: 'new',
          route: {},
          title: '%New_category%',
        },
        {
          name: '%New_category% %New_category% %New_category% %New_category%',
          indicator: 'new',
          route: {},
          title: '%New_category%',
        },
      ],
    },
    {
      name: 'Secondary housing',
      route: {},
      title: 'Secondary housing',
    },
    {
      name: 'Investors',
      route: {},
      title: 'Investors',
    },
    {
      name: 'How we work',
      indicator: '6',
      route: {},
      title: 'How we work',
    },
    {
      name: 'Company',
      route: {},
      title: 'Company',
      children: [
        {
          name: '%New_category%',
          indicator: 'new',
          route: {},
          title: '%New_category%',
        },
      ],
    },
    {
      name: 'Media',
      route: {},
      title: 'Media',
    },
    {
      name: 'Contact us',
      route: {},
      title: 'Contact us',
    },
  ]

  public itemHasChildren(item: NavigationListItem) {
    return item.children && (item.children || []).length
  }
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

      svg
        width: 18px
        height: 18px
        fill: $color-black

.dropdown
  display: flex
  flex-direction: column
  padding: 0
  margin: 0
  list-style: none
  position: absolute
  left: 0
  top: 92px
  background-color: $color-white
  box-shadow: 0 20px 40px -16px rgba(17, 17, 17, 0.16)
  pointer-events: none
  opacity: 0
  transition: opacity 0.25s ease
  width: max-content

  &__item
    position: relative
    height: 100%
    display: flex
    align-items: center
    padding: 4px 12px 4px 12px

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
