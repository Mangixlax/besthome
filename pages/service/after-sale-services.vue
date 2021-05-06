<template lang="pug">
  main
    base-image-title(:imageTitleData="afrteSalesServiceImageTitle")
      typo-text(
        tag="p"
        version="style-5"
      ) We understand that many of our clients do not speak foreign languages and are not familiar with Alanya. At the same time, we also know that they have a lot of questions when arranging their life and they need a range of services to make their stay in Turkey more comfortable.
      typo-text(
        tag="p"
        version="style-5"
      ) That is why our team has an after-sales service manager who speaks many foreign languages, including Russian.
    page-service-list-card(:listCardData="TurkishCitizenshipListCard")
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import BaseImageTitle from '~/components/Base/BaseImageTitle.vue'
import PageServiceListCard from '~/components/Page/Service/PageServiceListCard.vue'

export default {
  name: 'after-sale-services',
  components: { TypoText, BaseImageTitle, PageServiceListCard },
  data() {
    return {
      afrteSalesServiceImageTitle: {
        header: 'After-sale services',
        text: [
          'Buying a property in Alanya, Turkey is only the first step on the way to a comfortable holiday or a profitable investment.',
        ],
        filename: 'service-after-sale-services-bg.jpg',
      },
      TurkishCitizenshipListCard: {
        header: {
          title: 'Some of the services provided by our company:',
        },
        list: [
          'Shuttle service from/to Antalya airport and Gazipasa;',
          'Rent a car;',
          'Help in buying furniture and interior design;',
          'Renting out your apartments;',
          'Apartment cleaning service;',
          'Assistance in obtaining a residence permit and citizenship.',
        ],
      },
    }
  },
}
</script>

<style lang="sass" module></style>
