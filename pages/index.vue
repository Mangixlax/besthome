<template lang="pug">
  main
    section(:class="$style['hero']" @mousemove="onMouseMove")
      typo-text(
        ref="header1"
        tag="h1"
        version="style-2"
        :class="$style['hero__title']"
      ) We are leaders in quality construction & infrastructure
      typo-text(
        ref="header2"
        tag="p"
        version="style-5"
        :class="$style['hero__text']"
      ) BestHome Construction is the leading construction company in Alanya, operating in the real estate market since 2004. Having started its activity as a real estate agency, since 2008. Our company specializes in the construction and implementation of turnkey residential residences in the best areas of the city of Alanya.
      typo-text(
        ref="header3"
        tag="p"
        version="style-5"
        :class="$style['hero__text']"
      )
        | To date, the company has
        nuxt-link(
          :to="{ name: 'projects' }"
          :class="$style['hero__text-link']"
        ) 30 completed projects
        | .
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import TypoText from '~/components/Base/TypoText.vue'
import gsap from 'gsap'

@Component({
  components: { TypoText },
})
export default class IndexPage extends Vue {
  created() {
    this.$store.commit('setLogoSubTitle', 'Construction')
  }

  public onMouseMove(e: MouseEvent) {
    const mouseX = (e.pageX - (<HTMLBaseElement>e.target).clientWidth / 2) / 40
    const mouseY = -(e.pageY - (<HTMLBaseElement>e.target).clientHeight / 2) / 15
    gsap.to([this.$refs.header1, this.$refs.header2, this.$refs.header3], {
      rotationX: mouseY / 2 + 'deg',
      rotationY: 6 + mouseX / 3 + 'deg',
      rotationZ: (mouseX / 2 + mouseY / 2) / 300 + 'deg',
      transformOrigin: '30% 50%',
      ease: 'none',
    })
  }
}
</script>

<style lang="sass" module>
.hero
  padding: 80px 0
  perspective: 100vw

  &__title,
  &__text
    max-width: 864px
    width: 100%
    margin: 0 auto

  &__title
    margin-bottom: 40px

  &__text
    & + &
      margin-top: 16px

    &-link
      display: inline-flex
      align-items: center
      margin: 0 4px
      text-decoration: none
      color: $color-blue
      border-bottom: 1px solid rgba($color-blue, 0.16)
      cursor: pointer
</style>
