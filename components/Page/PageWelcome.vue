<template lang="pug">
  section(:class="$style['hero']" @mousemove="onMouseMove" @mouseleave="onResetPosition")
    slot(name="prepend")
    div(:class="$style['hero__container']")
      slot
      slot(name="inner")
</template>

<script lang="ts">
import gsap from 'gsap'
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import TypoText from '~/components/Base/TypoText.vue'
import { VNode } from 'vue/types/umd'

@Component({
  components: { TypoText },
})
export default class PageWelcome extends Vue {
  get isTouchDevice() {
    return this.$store.state.isTouchDevice
  }

  @Watch('isTouchDevice')
  onChangeTouchDevice(isTouchDevice: boolean) {
    if (process.client && isTouchDevice) {
      this.onResetPosition()
    }
  }

  public onMouseMove(e: MouseEvent): void {
    // Only on desktop
    if (!this.isTouchDevice) {
      const mouseX = (e.pageX - (e.target as HTMLBaseElement).clientWidth / 2) / 40
      const mouseY = -(e.pageY - (e.target as HTMLBaseElement).clientHeight / 2) / 15
      gsap.to(
        (this.$slots.default || [])
          .filter((node: VNode) => ['p', 'h1', 'h2'].includes(node?.tag as string))
          .map((node: VNode) => node?.elm as Node),
        {
          rotationX: mouseY / 2 + 'deg',
          rotationY: 6 + mouseX / 3 + 'deg',
          rotationZ: (mouseX / 2 + mouseY / 2) / 300 + 'deg',
          transformOrigin: '30% 50%',
          ease: 'none',
        },
      )
    }
  }

  public onResetPosition(): void {
    gsap.to(
      (this.$slots.default || [])
        .filter((node: VNode) => ['p', 'h1', 'h2'].includes(node?.tag as string))
        .map((node: VNode) => node?.elm as Node),
      {
        rotationX: '0deg',
        rotationY: '0deg',
        rotationZ: '0deg',
        transformOrigin: '30% 50%',
        ease: 'none',
      },
    )
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

    h1, h2
      max-width: 780px
      margin-top: 0
      margin-bottom: 40px
      display: inline-block

      @media (max-width: 1060px)
        margin-top: 32px

      & + *
        margin-top: 0

    p
      & + &
        margin-top: 16px

    p a
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
</style>
