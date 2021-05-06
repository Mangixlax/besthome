<template lang="pug">
  section(:class="$style['accordeons']")
    div(:class="$style['accordeons__container']")
      common-accordeon-item(title="Our main adventage" active)
        typo-text(
          tag="p"
          version="style-6"
          :class="$style['accordeons__container-text']"
        ) EXPERIENCE: More than 1,000 foreigners from the CIS, Europe, America and the Middle East have become clients of the company. BestHome Construction has offices and representatives in such countries as Norway, Denmark, Sweden, Finland, Germany, USA, Iran, Ukraine, Kazakhstan.OFFICE: A three-storey office is located in the heart of Alanya, includes sales Department, Department of property management, after sales services, offices of architect and interior designer.QUALITY: BestHome Construction strictly adheres to the principle of "Best advertising - first-class quality".PROFITABLE INVESTMENT: The unique location of the BestHome Construction complexes in the central areas of the city, allows you to provide a stable income from renting out apartments and capital gains.RELIABILITY: BestHome Construction fully finances their projects and guarantees the legal purity of each transaction. In order to secure your deposits, BestHome Construction offers bank guarantees.DEADLINES: BestHome Construction strictly observes the deadlines for the delivery of objects.GUARANTEES: BestHome Construction prides itself on its quality, providing 5-year guarantees for the interior and exterior of buildings.SERVICES: Russian-speaking employees of the company accompany each client from the moment of conclusion of the contract until the client receives the right of ownership of the property. The purchase and sale agreement is also drawn up in Russian.PROPERTY MANAGEMENT: A subsidiary of Leader Management provides management of the complexes built by BestHome Construction, as well as provides a full range of property management services, ensuring that your administrative, financial and legal obligations related to the ownership of real estate in Turkey are fulfilled.INDIVIDUAL DESIGN: If necessary, the architect of the company will make a redevelopment, and the interior designer will develop a personal project that meets all your wishes.
      common-accordeon-item(
        title="A little about our servieses"
      )
      common-accordeon-item(
        title="Our main adventage"
      )
</template>

<script lang="ts">
import CommonAccordeonItem from '~/components/Common/CommonAccordeonItem.vue'
import TypoText from '~/components/Base/TypoText.vue'

export default {
  components: { CommonAccordeonItem, TypoText },
}
</script>

<style lang="sass" module>
.accordeons
  background: $color-black-100

  &__container
    max-width: 928px
    margin: 0 auto
    padding: 120px 32px 64px 32px

    @media (max-width: 900px)
      padding: 64px 32px 32px 32px

    &-text
      color: $color-white-88
</style>
