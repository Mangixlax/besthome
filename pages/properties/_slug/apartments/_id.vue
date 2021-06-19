<template lang="pug">
  main 123
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'

@Component({
  async asyncData(ctx: Context): Promise<void | object> {
    return new Promise((resolve) => {
      resolve({})
    })
  },
})
export default class PropertiesSlugApartmentsApartmentPage extends Vue {}
</script>

<style lang="sass" module>

</style>
