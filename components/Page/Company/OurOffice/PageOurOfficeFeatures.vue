<template lang="pug">
  section(:class="$style['container']")
    header(:class="$style['container__header']")
      typo-text(
        tag="h2"
        version="style-5"
      ) {{ $t('pages.our_office.features.title') }}
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.our_office.features.sub_title') }}
    div(:class="$style['container__body']")
      div(:class="$style['features']")
        div(
          v-for="(feature, index) in features"
          :key="index"
          :class="$style['features__item']"
        )
          typo-text(
            tag="p"
            version="style-9"
            :class="$style['features__item-number']"
            v-html="feature.number"
          )
          typo-text(
            tag="p"
            version="style-4"
            :class="$style['features__item-title']"
            v-html="feature.title"
          )
          typo-text(
            tag="p"
            version="style-6"
            :class="$style['features__item-text']"
            v-html="feature.text"
          )
          typo-text(
            tag="nuxt-link"
            :to="feature.link.route"
            :class="$style['features__item-link']"
            :title="feature.link.text"
          )
            span {{ feature.link.text }}
            svg-icon(name="text-link-arrow")
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {
    TypoText,
  },
})
export default class PageOurOfficeFeatures extends Vue {
  public features: any = [
    {
      number: '01',
      title: this.$t('pages.our_office.features.items.our_project.title'),
      text: this.$t('pages.our_office.features.items.our_project.text'),
      link: {
        text: this.$t('pages.our_office.features.items.our_project.link_text'),
        route: this.localePath({ name: 'projects' }),
      },
    },
    {
      number: '02',
      title: this.$t('pages.our_office.features.items.office.title'),
      text: this.$t('pages.our_office.features.items.office.text'),
      link: {
        text: this.$t('pages.our_office.features.items.office.link_text'),
        route: this.localePath({ name: 'contacts' }),
      },
    },
    {
      number: '03',
      title: this.$t('pages.our_office.features.items.teamwork.title'),
      text: this.$t('pages.our_office.features.items.teamwork.text'),
      link: {
        text: this.$t('pages.our_office.features.items.teamwork.link_text'),
        route: this.localePath({ name: 'company-our-team' }),
      },
    },
  ]
}
</script>

<style lang="sass" module>
.container
  background-color: $color-black-96

  &__header
    max-width: 1152px
    width: 100%
    margin: 0 auto 80px
    display: flex
    justify-content: space-between
    padding: 0 24px

    @media (max-width: 1080px)
      flex-direction: column
      margin-bottom: 40px

    h2
      color: $color-white-48
      max-width: 344px

    p
      color: $color-white-100
      max-width: 560px

  &__body
    background-color: $color-white-4
    margin-left: calc((100vw - 1288px)/2)

    @media (max-width: 1280px)
      margin-left: 0

.features
  max-width: 1288px
  padding: 80px 80px 80px 128px
  display: flex
  justify-content: space-between
  row-gap: 40px

  @media (max-width: 1280px)
    padding: 80px 40px
    flex-wrap: wrap

  @media (max-width: 600px)
    padding: 50px 24px
    flex-wrap: wrap

  &__item
    max-width: 264px
    width: 100%

    @media (max-width: 600px)
      max-width: 100%

    &-number
      margin-bottom: 30px
      color: $color-white-100

    &-title
      margin-bottom: 16px
      color: $color-white-100

    &-text
      margin-bottom: 16px
      color: $color-white-48

    &-link
      color: $color-white-80
      text-decoration: none
      display: flex
      align-items: center
      outline: none

      &, svg
        transition: fill 0.25s ease, color 0.25s ease

      svg
        width: 22px
        height: 22px
        fill: $color-white-80
        margin-left: 10px

      &:hover
        color: $color-white-100

        svg
          fill: $color-white-100
</style>
