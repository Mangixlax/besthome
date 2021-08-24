<template lang="pug">
  section(:class="$style['container']")
    div(:class="$style['image']")
      img(
        :src="$img(`/quality/knauf.jpg`, $store.state.supportWebP ? { format: 'webp' } : {})"
        loading="lazy"
        decoding="async"
      )
    div(:class="$style['info']")
      svg-icon(name="knauf")
      p(
        v-for="(p, index) in $t('pages.company_quality.knauf')"
        :key="index"
        v-html="p"
      )
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class PageQualityKnauf extends Vue {}
</script>

<style lang="sass" module>
.container
  display: flex
  justify-content: space-between
  background-color: $color-black-4

  @media (max-width: 1080px)
    flex-direction: column-reverse

.image
  max-width: 414px
  width: 100%
  margin-left: calc((100vw - 1152px) / 2)
  margin-right: 40px

  @media (max-width: 1176px)
    margin-left: 0
    padding-left: 24px
    padding-right: 24px
    margin-top: 40px

  @media (max-width: 1080px)
    max-width: 100%

  img
    width: 100%

.info
  margin-right: calc((100vw - 1152px) / 2)
  max-width: 592px
  width: 100%

  @media (max-width: 1176px)
    margin-right: 0
    padding-left: 24px
    padding-right: 24px

  @media (max-width: 1080px)
    max-width: 100%

  svg
    width: 132px
    height: 65px
    fill: $color-black-8

  p:nth-child(2)
    +desktop-text-style-5
    color: $color-black-100
    margin: 20px 0

  p:nth-child(3)
    +desktop-text-style-6
    color: $color-black-48
    margin: 0
</style>
