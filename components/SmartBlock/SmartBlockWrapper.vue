<template lang="pug">
  section(:class="$style['link-banner-wrapper']")
    smart-block-card(
      v-for="(smartBlockCard, i) in data"
      :key="i"
      :class="$style[`col-${smartBlockCard.card_data.columns}`]"
      :card="smartBlockCard"
    )
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import SmartBlockCard from '~/components/SmartBlock/SmartBlockCard.vue'
import { IProject } from '~/store/Catalog'

@Component({
  components: { SmartBlockCard },
})
export default class LinkBannerWrapper extends Vue {
  @Prop({ type: Array, default: () => [] })
  private data!: IProject[]
}
</script>

<style lang="sass" module>
.link-banner-wrapper
  display: grid
  grid-template-columns: repeat(6, 1fr)
  padding: 0 64px
  margin-bottom: 80px
  grid-column-gap: 64px
  grid-row-gap: 80px

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
