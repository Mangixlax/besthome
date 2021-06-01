<template lang="pug">
  ol(:class="$style['breadcrumbs']")
    li(:class="$style['breadcrumbs__item']")
      a(:class="$style['breadcrumbs__item-link']" href="#")
        svg-icon(name="home")
    li(
      v-for="(crumb, i) in breadCrumbs"
      :key="i"
      :class="$style['breadcrumbs__item']"
    )
      a(:class="$style['breadcrumbs__item-link']" href="#") {{crumb.name}}
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class BaseBreadCrumbs extends Vue {
  public breadCrumbs: Array<object> = [
    {
      name: '%level%',
      to: {
        name: '',
        query: {},
        params: {},
      },
    },
    {
      name: '%level%',
      to: {
        name: '',
        query: {},
        params: {},
      },
    },
    {
      name: '%level%',
      to: {
        name: '',
        query: {},
        params: {},
      },
    },
    {
      name: '%level%',
      to: {
        name: '',
        query: {},
        params: {},
      },
    },
  ]
}
</script>

<style lang="sass" module>
.breadcrumbs
  display: flex
  flex-wrap: wrap
  list-style: none
  max-width: 1184px
  padding: 0 32px
  margin: 0 auto
  margin-top: 32px

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
</style>
