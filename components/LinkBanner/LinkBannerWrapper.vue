<template lang="pug">
  div(:class="$style['link-banner-wrapper']")
    slot
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class LinkBannerWrapper extends Vue {}
</script>

<style lang="sass" module>
.link-banner-wrapper
  display: flex
  align-items: center
  padding: 0 64px
  margin-top: 80px
  margin-bottom: 64px
  grid-gap: 80px

  @media (max-width: 1224px)
    padding: 0 24px
    margin-top: 24px
    margin-bottom: 24px
    grid-gap: 24px

  @media (max-width: 900px)
    flex-direction: column

    & > div
      width: 100%
</style>
