<template lang="pug">
  section(:class="$style['site__map']")
    div(:class="$style['map__grid']")
      base-fast-links(
        v-for="(siteMapColumn, i) in siteMapColumns"
        :key="i"
        :title="siteMapColumn.title"
        :list="siteMapColumn.list"
        :class="$style[`map__grid-column-${i}`]"
        :active="i === 0"
      )
    div(:class="$style['map__phone']")
      typo-text(
        tag="p"
        version="style-8(with-media: false)"
        :class="$style['map__phone-text']"
      ) 
        | Сall the support service via the phone +90 530 547-44-15 or locate 
        span
          nuxt-link(
          :to="{ name: 'projects' }"
          :class="$style['map__phone-link--underline']"
        ) sales office
          | .
        nuxt-link(
          :to="{ name: 'projects' }"
          :class="$style['map__phone-link']"
        )  
          svg-icon(name="link-arrow") 
          
          
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import BaseFastLinks from '~/components/Base/BaseFastLinks.vue'
import TypoText from '~/components/Base/TypoText.vue'

interface IFastLinksColumns {
  title: string
  list: Array<IFastLink>
}

interface IFastLink {
  name: string
  to: string
}

@Component({
  components: { BaseFastLinks, TypoText },
})
export default class FooterSiteMap extends Vue {
  public siteMapColumns: Array<IFastLinksColumns> = [
    {
      title: 'Choose and buy',
      list: [
        {
          name: '%Latest project%',
          to: '/',
        },
        {
          name: '%Latest project%',
          to: '/',
        },
        {
          name: '%Latest project%',
          to: '/',
        },
        {
          name: '%Latest project%',
          to: '/',
        },
        {
          name: '%Latest project%',
          to: '/',
        },
        {
          name: '%Latest project%',
          to: '/',
        },
        {
          name: '%Latest project%',
          to: '/',
        },
        {
          name: '%Latest project%',
          to: '/',
        },
      ],
    },
    {
      title: 'Basic services',
      list: [
        {
          name: 'Introductory tour',
          to: '/',
        },
        {
          name: 'Online purchase',
          to: '/',
        },
        {
          name: 'Legal support',
          to: '/',
        },
        {
          name: 'Legal support',
          to: '/',
        },
        {
          name: 'Turkish citizenship',
          to: '/',
        },
        {
          name: 'After-sale services',
          to: '/',
        },
      ],
    },
    {
      title: 'Latest news',
      list: [
        {
          name: '%Latest news%',
          to: '/',
        },
        {
          name: '%Latest news%',
          to: '/',
        },
        {
          name: '%Latest news%',
          to: '/',
        },
        {
          name: '%Latest news%',
          to: '/',
        },
        {
          name: '%Latest news%',
          to: '/',
        },
        {
          name: '%Latest news%',
          to: '/',
        },
        {
          name: '%Latest news%',
          to: '/',
        },
      ],
    },
    {
      title: 'About company',
      list: [
        {
          name: 'Advantages',
          to: '/',
        },
        {
          name: 'Our team',
          to: '/',
        },
        {
          name: 'History',
          to: '/',
        },
        {
          name: 'Office & contact ',
          to: '/',
        },
      ],
    },
    {
      title: 'Additional services',
      list: [
        {
          name: 'Secondary housing',
          to: '/',
        },
        {
          name: 'Investors',
          to: '/',
        },
        {
          name: '%FastLink%',
          to: '/',
        },
      ],
    },
  ]
}
</script>

<style lang="sass" module>

.site__map
  max-width: 1184px
  padding: 32px 32px
  margin: 0 auto
  border-bottom: solid 1px $color-black-4

  @media (max-width: 900px) and (min-width: 150px)
    padding: 32px 24px

.map__grid
  display: grid
  grid-template-columns: 1fr 1fr 1fr 1fr
  column-gap: 48px
  grid-auto-flow: row
  align-items: start
  justify-items: start
  padding-bottom: 32px

  &-column-0
    grid-column: 1
    grid-row: 1 / 3

  &-column-1
    grid-column: 2
    grid-row: 1 / 3

  &-column-4
    grid-column: 2
    grid-row: 1 / 3
    align-self: end
    margin-top: 250px

  @media (max-width: 800px) and (min-width: 410px)
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr))
    row-gap: 20px
    column-gap: 20px
    align-items: start

    &-column-0
      grid-column: auto
      grid-row: auto

    &-column-1
      grid-column: auto
      grid-row: auto

    &-column-4
      grid-column: auto
      grid-row: auto
      margin-top: 0

  @media (max-width: 409px)
    grid-template-columns: 1fr

    &-column-0
      grid-column: auto
      grid-row: auto

    &-column-1
      grid-column: auto
      grid-row: auto

    &-column-4
      grid-column: auto
      grid-row: auto
      margin-top: 0

.map__phone

  &-text
    display: flex
    align-items: center
    flex-wrap: wrap

  span
    white-space: nowrap

  svg
    width: 18px
    height: 18px

  &-link
    display: inline-flex
    align-items: center
    margin: 0 4px
    text-decoration: none
    color: $color-blue
    cursor: pointer
    margin: 0px

    &--underline
      @extend .map__phone-link
      border-bottom: 1px solid rgba($color-blue, 0.16)
      margin-left: 4px

      @media (max-width: 600px)
        margin-left: 0px
</style>
