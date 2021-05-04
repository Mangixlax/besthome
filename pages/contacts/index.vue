<template lang="pug">
  main
    page-contacts-map
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import PageContactsMap from '~/components/Page/Contacts/PageContactsMap.vue'

@Component({
  components: { PageContactsMap },
})
export default class IndexPage extends Vue {}
</script>

<style lang="sass" module></style>
