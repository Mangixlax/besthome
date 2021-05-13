<template lang="pug">
  main
    page-service-rent(:allAboutRent="$t('pages.all_about_rent')")
</template>

<script lang="ts">
import PageServiceRent from '~/components/Page/Service/PageServiceRent.vue'

export default {
  name: 'all-about-rent',
  components: { PageServiceRent },
}
</script>

<style lang="sass" module></style>
