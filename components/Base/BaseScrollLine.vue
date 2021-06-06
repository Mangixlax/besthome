<template lang="pug">
  section(:class="$style['container']" id="vertical" @click="console")
    div(ref="items" :class="[$style['items'], 'items']")
      div(
        v-for="(scrollLineItem, i) in scrollLineInfo"
        :key="i"
        :class="$style['items__item']"
      )
        typo-text(
          tag="h3"
          version="style-1"
        ) {{ scrollLineItem.title }}
        typo-text(
          tag="p"
          version="style-7"
        ) {{ scrollLineItem.text }}
</template>

<script>
import { gsap, Power1, TweenMax } from 'gsap'
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'BaseScrollLine',
  components: {
    TypoText,
  },
  props: {
    scrollLineInfo: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      animation: null,
      scene: null,
      scene_2: null,
      controller: null,
      isSceneReady: false,
    }
  },
  methods: {
    onResize() {
      if (window.innerWidth < 1024) {
        if (this.isSceneReady) {
          this.destroy()
        }
      } else {
        if (!this.isSceneReady) {
          this.createScene()
        }
      }
    },
    console() {
      console.log(this.scene)
      console.log(this.scene_2)
      console.log(this.controller.info())
      this.controller.update(true)
      // this.$scrollmagic.controller_.update()
    },
    createScene() {
      
      this.animation = TweenMax.to('.items', 1, {
        left: '50%',
        opacity: 0,
        autoRound: !1,
        ease: Power1.easeOut,
        duration: 200,
      })

      this.controller = this.$scrollmagic.controller_
  
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
          left: -(this.$refs.items.clientWidth / 25) + '%',
          autoRound: false,
          ease: Power1.easeOut,
          duration: 200,
          offset: 1000,
        })
        .addTo(this.controller)

      this.isSceneReady = true
    },
    destroy() {
      this.controller.destroy(true)
      this.controller = null
      this.scene.destroy(true)
      this.scene = null
      this.scene_2.destroy(true)
      this.scene_2 = null
      this.animation.pause(0)
      this.isSceneReady = false
    }
  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
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

    h3
      margin: 0
    p
      display: flex
      align-items: center
      margin: 0
      color: $color-black-80
</style>
