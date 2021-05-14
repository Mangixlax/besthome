<template lang="pug">
  div(:class="$style['link-banner-wrapper']")
    smart-block-card(
      v-for="(smartBlockCard, i) in smartBlockData"
      :key="i"
      :class="$style[`col-${smartBlockCard.col}`]"
      :card="smartBlockCard"
    )
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import SmartBlockCard from '~/components/SmartBlock/SmartBlockCard.vue'

@Component({
  components: { SmartBlockCard },
})
export default class LinkBannerWrapper extends Vue {
  @Prop({ type: Array, default: () => [] })
  private smartBlockData!: Object
}
</script>

<style lang="sass" module>
.link-banner-wrapper
  display: grid
  grid-template-columns: repeat(6, 1fr)
  padding: 0 64px
  margin: 64px 0
  grid-gap: 64px

  @media (max-width: 1224px)
    padding: 0 24px
    margin: 24px 0
    grid-gap: 24px

  @media (max-width: 900px)
    flex-direction: column

    & > div
      width: 100%

.col
  min-height: 600px

.col-1
  grid-column: span 2

.col-2
  grid-column: span 3

.col-3
  grid-column: span 6
</style>
