<template lang="pug">
  section(:class="$style['company']")
    div(:class="$style['company__container']")
      typo-text(
        v-for="(paragraph, i) in paragraphs"
        :key="i"
        tag="p"
        version="style-8"
        :class="$style['company__container-text']"
      ) {{ paragraph }}
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import TypoText from '~/components/Base/TypoText.vue'

@Component({ components: { TypoText } })
export default class FooterCompanyDescription extends Vue {
  public paragraphs: Array<string> = [
    "BestHome Construction is the leading construction company in Alanya, operating in the real estate market since 2004. Having started its activity as a real estate agency, since 2008 the company specializes in the construction and sale of residential residences 'turnkey' in the best areas of the city of Alanya. To date, the company has 30 completed projects in its assets.",
    "Our competitive advantages: provision of bank guarantees; drafting of a purchase and sale agreement in Russian that meets international standards; high quality construction with the use of modern technologies and materials certified by the Institute of Standardization of Turkey; multi-level quality control system; strict compliance with the deadlines for the delivery of objects; provision of guarantees for electricity and water supply networks, interior decoration; guarantee of legal 'purity' of transactions; support of each client from the moment of conclusion of the contract until the client receives the right of ownership of the real estate object; providing a full range of services for the maintenance and management of your property.f",
  ]
}
</script>

<style lang="sass" module>
.company
  width: 100%
  magin: 0 auto

  &__container
    padding: 32px
    margin: 0 auto
    max-width: 1184px
    border-bottom: solid 1px
    border-color: $color-black-4

    @media (max-width: 800px)
      padding: 24px 24px

    &-text
      margin: 0px
</style>
