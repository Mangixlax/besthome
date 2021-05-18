<template lang="pug">
  section(:class="$style['hero']" @mousemove="onMouseMove")
    div(:class="$style['hero__fake-container']")
      div(:class="$style['hero__video-link']" data-cursor-text)
        svg-icon(:class="$style['hero__video-icon-text']" name="hero-link-circle-text")
        svg-icon(:class="$style['hero__video-icon-circle']" name="hero-link-circle")
    div(:class="$style['hero__container']")
      typo-text(
        ref="header1"
        tag="h1"
        version="style-2"
        :class="$style['hero__container-title']"
      ) {{ homeTitleData.title }}
      typo-text(
        ref="header2"
        tag="p"
        version="style-5"
        :class="$style['hero__container-text']"
      ) {{ homeTitleData.text }}
      typo-text(
        ref="header3"
        tag="p"
        version="style-5"
        :class="$style['hero__container-text']"
      )
        | {{ homeTitleData.linkToProjects.text }}
        span
          nuxt-link(
            :to="localePath(homeTitleData.linkToProjects.route)"
            :class="$style['hero__container-link']"
          ) {{ homeTitleData.linkToProjects.link }}
          | .
      div(:class="$style['hero__fake-container']")
        div(:class="$style['hero__double-circle']")
</template>

<script lang="ts">
import gsap from 'gsap'
import { Component, Vue, Watch, Prop } from 'nuxt-property-decorator'
import TypoText from '~/components/Base/TypoText.vue'

@Component({
  components: { TypoText },
})
export default class PageWelcome extends Vue {
  @Prop({ type: Object, default: () => {}, required: true }) homeTitleData!: Object

  get isTouchDevice() {
    return this.$store.state.isTouchDevice
  }

  @Watch('isTouchDevice')
  onChangeTouchDevice(isTouchDevice: boolean) {
    if (process.client && isTouchDevice) {
      gsap.to([this.$refs.header1, this.$refs.header2, this.$refs.header3], {
        rotationX: '0deg',
        rotationY: '0deg',
        rotationZ: '0deg',
        transformOrigin: '30% 50%',
        ease: 'none',
      })
    }
  }

  public onMouseMove(e: MouseEvent): void {
    // Only on desktop
    if (!this.isTouchDevice) {
      const mouseX = (e.pageX - (e.target as HTMLBaseElement).clientWidth / 2) / 40
      const mouseY = -(e.pageY - (e.target as HTMLBaseElement).clientHeight / 2) / 15
      gsap.to([this.$refs.header1, this.$refs.header2, this.$refs.header3], {
        rotationX: mouseY / 2 + 'deg',
        rotationY: 6 + mouseX / 3 + 'deg',
        rotationZ: (mouseX / 2 + mouseY / 2) / 300 + 'deg',
        transformOrigin: '30% 50%',
        ease: 'none',
      })
    }
  }
}
</script>

<style lang="sass" module>
.hero
  padding: 80px 0
  perspective: 100vw
  display: flex
  flex-direction: column

  @media (max-width: 1060px)
    padding-top: 24px
    padding-bottom: 264px

  &__container
    max-width: 912px
    width: 100%
    margin: 0 auto
    padding: 0 24px

    @media (max-width: 1300px)
      margin: 0
      padding: 0 64px

    @media (max-width: 1060px)
      padding: 0 24px

    &-title
      max-width: 780px
      margin-top: 0
      margin-bottom: 40px

      @media (max-width: 1060px)
        margin-top: 32px

    &-text
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

    @media (max-width: 1060px)
      & span
        display: block

  &__fake-container
    max-width: 912px
    width: 100%
    margin: 0 auto
    height: 0
    position: relative

    @media (max-width: 1300px)
      margin: 0
      padding: 0 64px

    @media (max-width: 1060px)
      &:first-child
        order: 4

  &__video
    &-link
      position: absolute
      top: 40px
      right: -144px
      width: 144px
      height: 144px
      display: flex
      align-items: center
      justify-content: center
      cursor: pointer

      &:hover
        animation-play-state: paused

      @media (max-width: 1060px)
        margin: 0
        top: 20px
        right: 20px
        width: 112px
        height: 112px

    &-icon-text
      position: absolute
      width: 144px
      height: 144px
      left: 0
      top: 0
      animation: circle 12s linear infinite
      animation-play-state: inherit
      
      @media (max-width: 1060px)
        width: 112px
        height: 112px

    &-icon-circle
      position: absolute
      width: 64px
      height: 64px
      left: 40px
      top: 40px

      @media (max-width: 1060px)
        left: 24px
        top: 24px

  &__double-circle
    position: absolute
    right: -176px
    bottom: -283px
    display: block
    width: 429px
    height: 303px
    background: url("~/assets/images/hero/hero-double-circle.png") no-repeat center
    background-size: 429px 303px

    @media (max-width: 1060px)
      right: auto
      left: -80px
      top: 140px
      bottom: auto

@keyframes circle
  100%
    transform: rotate(360deg)
</style>
