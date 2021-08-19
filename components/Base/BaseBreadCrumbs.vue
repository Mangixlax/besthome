<template lang="pug">
  ol(:class="[$style['breadcrumbs'], isDarkTheme && $style['dark']]")
    li(:class="$style['breadcrumbs__item']")
      nuxt-link(
        :to="localePath('index')"
        :title="$i18n.locale === 'ru' ? 'Главная' : 'Home'"
        :class="$style['breadcrumbs__item-link']"
      )
        svg-icon(name="home")
    li(
      v-for="(crumb, i) in breadcrumbs"
      :key="i"
      :class="$style['breadcrumbs__item']"
    )
      nuxt-link(
        :to="localePath(crumb.route)"
        :title="crumb.name"
        :class="[$style['breadcrumbs__item-link'], i === breadcrumbs.length - 1 && $style['disabled']]"
      ) {{ crumb.name }}
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
import { Jsonld } from 'nuxt-jsonld'
import { getSiteUrl } from '@/lib/utils'

@Jsonld
@Component({
  computed: {
    ...mapGetters({
      breadcrumbs: 'getBreadcrumbs',
    }),
  },
})
export default class BaseBreadCrumbs extends Vue {
  jsonld() {
    const items = (this.breadcrumbs || []).map((item: any, index: number) => {
      return {
        '@type': 'ListItem',
        position: index + 2,
        item: {
          '@id': getSiteUrl(this.localePath(item.route), false),
          name: item.name,
        },
      }
    })

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@id': getSiteUrl(this.localePath('index'), false),
            name: this.$i18n.locale === 'ru' ? 'Главная' : 'Home',
          },
        },
        ...items,
      ],
    }
  }

  get isDarkTheme(): boolean {
    return this.$store.getters['isDarkTheme']
  }
}
</script>

<style lang="sass" module>
.breadcrumbs
  display: flex
  flex-wrap: wrap
  list-style: none
  margin: 0
  background-color: $color-white-100
  padding: 32px calc((100vw - 1152px) / 2)

  &.dark
    background-color: $color-black-96

  @media (max-width: 1176px)
    padding-left: 24px
    padding-right: 24px

  &__item
    display: flex
    align-items: center

    & + &:before
      content: "/"
      display: inline-block
      margin-right: 12px
      color: $color-black-24
      +desktop-text-style-5

      .dark &
        color: $color-white-24

    &-link
      display: flex
      align-items: center
      text-underline-offset: 7px
      text-decoration-color: $color-black-8
      color: $color-black-88
      margin-right: 12px
      +desktop-text-style-8

      .dark &
        color: $color-white-88
        text-decoration-color: $color-white-8

      svg
        width: 18px
        height: 18px
        fill: $color-black-80

        .dark &
          fill: $color-white-88

      &.disabled
        pointer-events: none
        color: $color-black-40
        text-decoration: none

        .dark &
          color: $color-white-40
</style>
