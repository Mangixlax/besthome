<template lang="pug">
  section(:class="$style['article']")
    div(:class="$style['article__container']")
      typo-text(
        tag="h1"
        version="style-1"
        :class="$style['article__container-title']"
      ) 
        | {{ companyAboutHistoryPage.title }}
      typo-text(
        v-for="(paragraph, i) in companyAboutHistoryPage.text"
        :key="i"
        tag="p"
        version="style-5"
        :class="$style['article__container-text']"
      ) 
        | {{ paragraph }}
      div(:class="$style['content__link']")
        typo-text(
          tag="p"
          version="style-5"
          :class="$style['content__link-text']"
        ) 
          | {{ companyAboutHistoryPage.linkToProjects.text}}
        typo-text(
          tag="nuxt-link"
          version="style-5"
          :to="localePath(companyAboutHistoryPage.linkToProjects.route)"
          :title="companyAboutHistoryPage.linkToProjects.link"
          :class="$style['content__link-text--underline']"
        ) {{ companyAboutHistoryPage.linkToProjects.link }}
        | .
        typo-text(
          tag="nuxt-link"
          version="none"
          :to="localePath(companyAboutHistoryPage.linkToProjects.route)"
          :title="companyAboutHistoryPage.linkToProjects.link"
          :class="$style['content__link-arrow']"
        )
          svg-icon(name="link-arrow-blue")      
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'PageCompanyHistoryTitle',
  components: { TypoText },
  data() {
    return {
      companyAboutHistoryPage: {
        title: 'This is history',
        text: [
          'The history of the company "BestHome Construction" began in 2004 in Alanya, when two young people decided to start their own business in Turkey, based on long-term partnerships, a European understanding of service and respect for customers. They wanted to create a company with Turkish traditions and a European face. The new fast-growing real estate market could not have been better suited for this purpose, although even then there was already competition. But the founders of the company believed that their brainchild would be able to reach a leading position and, as later life showed, they were not mistaken in their forecasts.',
          'Based on their experience working in a leading real estate agency in Alanya, they understood that there is no product on the market that they would like to offer to demanding European customers, as well as high-quality after-sales service. Then decisions were made that determined the path of further development of the company. The first building houses the European level of quality meeting the expectations and desires of customers, the second – biting promises, create trust with clients, third – to be innovators and legislators on the real estate market of Alanya, the fourth – introducing more customers around the world the magnificent town of Alanya and great Turkish culture, to increase the value of the region.',
        ],
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
