<template lang="pug">
  nuxt-link(
    :to="localePath({ name: 'index' })"
    :class="$style['link']"
    title="BestHome Construction"
  )
    svg-icon(name="logo" :class="$style['logo']")
    typo-text(
      tag="span"
      version="style-10"
      :class="$style['text']"
    ) {{ logoSubTitle }}
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Getter } from 'nuxt-property-decorator'
import TypoText from '~/components/Base/TypoText.vue'
import type { RootState } from '~/store'

@Component({
  components: { TypoText },
})
export default class Logo extends Vue {
  @Getter('getLogoSubTitle') logoSubTitle!: RootState['logoSubTitle']
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
  fill: $color-black
  transition: fill 0.5s ease

  @media (max-width: 1248px + 32px)
    width: 134px
    height: 21px

.text
  color: $color-black
  transition: color 0.5s ease
  text-transform: uppercase
  padding-top: 6px
  text-align: center

  @media (max-width: 1054px)
    text-align: left
    padding-top: 9px
</style>
