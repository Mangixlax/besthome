<template lang="pug">
  ol(:class="$style['breadcrumbs']")
    li(:class="$style['breadcrumbs__item']")
      typo-text(
        tag="nuxt-link"
        version="style-8"
        :to="localePath('index')"
        title="Home"
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
        :title="crumb.route.name"
        :class="[$style['breadcrumbs__item-link'], i === breadcrumbs.length - 1 && $style['disabled']]"
        :disabled="true"
      ) {{crumb.name}}
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import { Component, Vue } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'

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
export default class BaseBreadCrumbs extends Vue {}
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

      &.disabled
        pointer-events: none
</style>
