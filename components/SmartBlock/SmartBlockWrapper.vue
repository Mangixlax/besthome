<template lang="pug">
  div(:class="$style['link-banner-wrapper']")
    smart-block-card(
      v-for="(smartBlockCard, i) in smartBlockInfo"
      :key="i"
      :class="$style[`col-${smartBlockCard.col}`]"
      :card="smartBlockCard"
    )
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SmartBlockCard from '~/components/SmartBlock/SmartBlockCard.vue'

@Component({
  components: { SmartBlockCard },
})
export default class LinkBannerWrapper extends Vue {
  data() {
    return {
      smartBlockInfo: [
        {
          to: { name: 'index' },
          imageSrc: 'smart-block-1.jpg',
          title: 'Secondary housing',
          header: 'Greenday Park BestHome 48',
          text: 'Sold out',
          textPosition: 'bottom',
          textAlign: 'right',
          col: '1',
        },
        {
          to: { name: 'index' },
          imageSrc: 'smart-block-2.jpg',
          title: 'Secondary housing',
          header: 'Greenday Park BestHome 48',
          text: 'Sold out',
          textPosition: 'bottom',
          textAlign: 'right',
          col: '1',
        },
        {
          to: { name: 'index' },
          imageSrc: 'smart-block-3.jpg',
          title: 'Secondary housing',
          header: 'Greenday Park BestHome 48',
          text: 'Sold out',
          textPosition: 'bottom',
          textAlign: 'right',
          col: '1',
        },
        {
          to: { name: 'index' },
          imageSrc: 'smart-block-4.jpg',
          title: 'Secondary housing',
          header: 'Greenday Park<br>BestHome 48',
          text: 'Sold out',
          textPosition: 'top',
          textAlign: 'center',
          col: '2',
        },
        {
          to: { name: 'index' },
          imageSrc: 'smart-block-4.jpg',
          title: 'Secondary housing',
          header: 'Greenday Park BestHome 48',
          text: 'Sold out',
          textPosition: 'center',
          textAlign: 'right',
          col: '2',
        },
        {
          to: { name: 'index' },
          imageSrc: 'smart-block-4.jpg',
          title: 'Secondary housing',
          header: 'Greenday Park BestHome 48',
          text: 'Sold out',
          textPosition: 'center',
          textAlign: 'right',
          col: '3',
        },
      ],
    }
  }
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
