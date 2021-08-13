<template lang="pug">
  ol(:class="$style['breadcrumbs']")
    li(:class="$style['breadcrumbs__item']")
      typo-text(
        tag="nuxt-link"
        version="style-8"
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
      typo-text(
        tag="nuxt-link"
        version="style-8"
        :to="localePath(crumb.route)"
        :title="crumb.name"
        :class="[$style['breadcrumbs__item-link'], i === breadcrumbs.length - 1 && $style['disabled']]"
      ) {{ crumb.name }}
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import { Component, Vue } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
import { Jsonld } from 'nuxt-jsonld'
import { getSiteUrl } from '@/lib/utils'

@Jsonld
@Component({
  components: {
    TypoText,
  },
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
}
</script>

<style lang="sass" module>
.breadcrumbs
  display: flex
  flex-wrap: wrap
  list-style: none
  max-width: 1184px
  padding: 0 32px
  margin: 32px auto 0

  @media (max-width: 800px)
    padding: 0 24px

  &__item
    display: flex
    align-items: center

    & + &:before
      content: "/"
      display: inline-block
      margin-right: 12px
      color: rgba(17, 17, 17, 0.16)
      +style-5

    &-link
      display: flex
      align-items: center
      text-underline-offset: 7px
      text-decoration-color: rgba(17, 17, 17, 0.16)
      color: rgba(17, 17, 17, 0.88)
      margin-right: 12px
      +style-8($with-media: false)

      svg
        width: 18px
        height: 18px

      &.disabled
        pointer-events: none
</style>
