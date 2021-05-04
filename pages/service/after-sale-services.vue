<template lang="pug">
  main
    page-service-list-card(:listCardData="TurkishCitizenshipListCard")
</template>

<script lang="ts">
import PageServiceListCard from '~/components/Page/Service/PageServiceListCard.vue'

export default {
  name: 'after-sale-services',
  components: { PageServiceListCard },
  data() {
    return {
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
