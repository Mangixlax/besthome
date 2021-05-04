<template lang="pug">
  section(:class="$style['article']")
    div(:class="$style['article__container']")
      typo-text(
        tag="h1"
        version="style-1"
        :class="$style['article__container-title']"
      ) {{ investorsPage.title }}
      typo-text(
        tag="p"
        version="style-5"
        :class="$style['article__container-text']"
      ) {{ investorsPage.text}}
      div(:class="$style['content__link']")
        typo-text(
          tag="p"
          version="style-5"
          :class="$style['content__link-text']"
        ) {{ investorsPage.linkToProjects.text}}
        typo-text(
          tag="nuxt-link"
          version="style-5"
          :to="investorsPage.linkToProjects.route"
          :title="investorsPage.linkToProjects.link"
          :class="$style['content__link-text--underline']"
        ) {{ investorsPage.linkToProjects.link }}
        | .
        typo-text(
          tag="nuxt-link"
          version="none"
          :to="investorsPage.linkToProjects.route"
          :title="investorsPage.linkToProjects.link"
          :class="$style['content__link-arrow']"
        )
          svg-icon(name="link-arrow-blue")      
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'PageCompanyTitle',
  components: { TypoText },
  data() {
    return {
      investorsPage: {
        title: 'Turkey - Real estate investment in Alanya',
        text:
          'Over the past 10 years, the Republic of Turkey has replenished its treasury with foreign investment of $ 100 billion. What attracts investors from Russia, the United States and Europe? Economic stability, political liberality to foreign investors, high quality of construction, relatively low taxes on the purchase of apartments and houses. And in recent years, the possibility of obtaining Turkish citizenship under a simplified scheme has also been added.',
        linkToProjects: {
          text: 'To date, the company has',
          link: '30 completed projects',
          route: '/projects',
        },
      },
    }
  },
}
</script>

<style lang="sass" module>
.article
  width: 100%

  &__container
    display: flex
    flex-direction: column
    max-width: 912px
    padding: 80px 24px
    margin: 0 auto

    &-title
      margin: 0
      margin-bottom: 40px

    &-text
      margin:0
      margin-bottom: 16px

.content__link
  display: flex
  align-items: center

  &-text
    margin: 0

    &--underline
      text-decoration: underline
      text-decoration-color: $color-blue-16
      text-underline-offset: 7px
      color: $color-blue-100
      margin-left: 0.5em

  &-arrow
    height: 26px

    svg
      height: 26px
      width: 26px
</style>