<template lang="pug" functional>
  hr(:class="$style['hr']")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class CommonLine extends Vue {}
</script>

<style lang="sass" module>
.hr
  max-width: 1152px
  width: 100%
  height: 1px
  margin: 0 auto
  background-color: $color-black-4
  border: none

  @media (max-width: 1176px)
    margin-left: 24px
    margin-right: 24px
</style>
