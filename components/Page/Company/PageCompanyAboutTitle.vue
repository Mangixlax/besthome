<template lang="pug">
  section(:class="$style['article']")
    div(:class="$style['article__container']")
      typo-text(
        tag="h1"
        version="style-1"
        :class="$style['article__container-title']"
      ) 
        | {{ companyAboutPage.title }}
      typo-text(
        tag="p"
        version="style-5"
        :class="$style['article__container-text']"
      ) 
        | {{ companyAboutPage.text}}
      div(:class="$style['content__link']")
        typo-text(
          tag="p"
          version="style-5"
          :class="$style['content__link-text']"
        ) {{ companyAboutPage.linkToProjects.text}}
        typo-text(
          tag="nuxt-link"
          version="style-5"
          :to="companyAboutPage.linkToProjects.route"
          :title="companyAboutPage.linkToProjects.link"
          :class="$style['content__link-text--underline']"
        ) {{ companyAboutPage.linkToProjects.link }}
        | .
        typo-text(
          tag="nuxt-link"
          version="none"
          :to="companyAboutPage.linkToProjects.route"
          :title="companyAboutPage.linkToProjects.link"
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
      companyAboutPage: {
        title: 'About company',
        text:
          'BestHome Construction is one of the leaders in the real estate market of Alanya. In 2004, we started working as a real estate agency. Since 2008, we have started building our own residential complexes in Alanya and its suburbs. Today, we offer our clients luxury homes and apartments in more than 30 residences on the Mediterranean coast.',
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

    @media (max-width: 900px)
      padding: 32px 24px

    &-title
      margin: 0
      margin-bottom: 40px

    &-text
      margin:0
      margin-bottom: 16px

.content__link
  display: flex
  align-items: center
  flex-wrap: wrap

  &-text
    margin: 0
    white-space: nowrap

    &--underline
      text-decoration: underline
      text-decoration-color: $color-blue-16
      text-underline-offset: 7px
      color: $color-blue-100
      margin-left: 0.5em
      white-space: nowrap

  &-arrow
    height: 26px

    svg
      height: 26px
      width: 26px
</style>
