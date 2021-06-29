<template lang="pug">
  section(:class="$style['container']" id="vertical")
    ul(ref="items" :class="[$style['items'], 'items']")
      li(
        v-for="(item, key) in itemsList"
        :key="key"
        :class="$style['items__item']"
      )
        h3(v-html="item.title")
        p(v-html="item.subtitle")
</template>

<script lang="ts">
import { Power1, TweenMax } from 'gsap'
import { Component, Prop, Vue } from 'nuxt-property-decorator'

interface IData {
  items: IDataItem[]
}

interface IDataItem {
  title: string
  subtitle: string
}

@Component
export default class BaseScrollLine extends Vue {
  @Prop({ type: [Object, Array], default: () => [] }) data!: IData | IDataItem[]

  public animation: any = null
  public scene: any = null
  public scene_2: any = null
  public controller: any = null
  public isSceneReady: boolean = false

  get itemsList(): IDataItem[] {
    return Array.isArray(this.data) ? this.data : this.data.items
  }

  public onWindowResize() {
    if (window.innerWidth < 1024) {
      if (this.isSceneReady) {
        this.destroy()
      }
    } else {
      if (!this.isSceneReady) {
        this.createScene()
      }
    }
  }

  public destroy() {
    this.controller.destroy(true)
    this.controller = null
    this.scene.destroy(true)
    this.scene = null
    this.scene_2.destroy(true)
    this.scene_2 = null
    this.animation.pause(0)
    this.isSceneReady = false
  }

  public createScene() {
    this.controller = this.$scrollmagic.controller_

    this.animation = TweenMax.to('.items', 1, {
      left: '50%',
      opacity: 0,
      autoRound: !1,
      ease: Power1.easeOut,
      duration: 200,
    })

    this.scene = this.$scrollmagic
      .scene({
        triggerElement: '.items',
        triggerHook: 0.8,
        duration: '20%',
      })
      .setTween('.items', {
        opacity: 1,
        ease: Power1.easeOut,
        duration: 200,
      })
      .addTo(this.controller)

    this.scene_2 = this.$scrollmagic
      .scene({
        triggerElement: '.items',
        triggerHook: 0.8,
        duration: '100%',
      })
      .setTween('.items', {
        left: -((this.$refs.items as Element).clientWidth / 25) + '%',
        autoRound: false,
        ease: Power1.easeOut,
        duration: 200,
        offset: 1000,
      })
      .addTo(this.controller)

    this.isSceneReady = true
  }

  mounted() {
    this.onWindowResize()
    window.addEventListener('resize', this.onWindowResize)
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.onWindowResize)
  }
}
</script>

<style lang="sass" module>
.container
  margin-top: 88px
  margin-bottom: 88px
  overflow: hidden
  position: relative

  @media (max-width: 1023px)
    padding: 0 24px
    margin: 32px 0

.items
  display: flex
  width: max-content
  position: relative
  left: 0

  @media (max-width: 1023px)
    padding: 0
    display: grid
    grid-template-columns: 1fr

  @media (max-width: 450px)
    grid-template-columns: 1fr
    margin: 0

  &__item
    display: flex
    flex-direction: column
    margin: 0 122px

    @media (max-width: 1023px)
      margin: 0

    @media (max-width: 500px)
      margin: 0

    sup
      +style-3
      top: -1em

    h3
      margin: 0
      +style-1

    p
      display: flex
      align-items: center
      margin: 0
      color: $color-black-80
      +style-7
</style>
