<template lang="pug">
  nuxt-link(
    :to="localePath({ name: 'index' })"
    :class="[$style['link'], light && $style['light']]"
    title="BestHome Construction"
  )
    svg-icon(name="logo" :class="$style['logo']")
    typo-text(
      tag="span"
      version="style-10"
      :class="$style['text']"
    ) {{ extendSubTitle ? extendSubTitle : logoSubTitle }}
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Getter, Prop} from 'nuxt-property-decorator'
import TypoText from '~/components/Base/TypoText.vue'
import type { RootState } from '~/store'

@Component({
  components: { TypoText },
})
export default class Logo extends Vue {
  @Getter('getLogoSubTitle') logoSubTitle!: RootState['logoSubTitle']
  @Prop({ type: Boolean, default: false }) light!: boolean
  @Prop({ type: String, default: '' }) extendSubTitle!: string
}
</script>

<style lang="sass" module>
.link
  display: flex
  flex-direction: column
  text-decoration: none
  padding: 12px 0

.logo
  width: 162px
  height: 26px
  fill: $color-black-100
  transition: fill 0.5s ease

  .light &
    fill: $color-white-100

  @media (max-width: 1248px + 32px)
    width: 134px
    height: 21px

.text
  color: $color-black-100
  transition: color 0.5s ease
  text-transform: uppercase
  padding-top: 6px
  text-align: center

  .light &
    color: $color-white-100

  @media (max-width: 1054px)
    text-align: left
    padding-top: 9px
</style>
