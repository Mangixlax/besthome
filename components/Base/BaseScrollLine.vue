<template lang="pug">
  section(:class="$style['container']" id="vertical")
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
  props: {
    scrollLineInfo: {
      type: Array,
      default: () => []
    }
  },
  components: {
    TypoText,
  },
  mounted() {
    const containerContainer = this.$scrollmagic.controller_

    TweenMax.to('.items', 1, {
      left: '50%',
      opacity: 0,
      autoRound: !1,
      ease: Power1.easeOut,
      duration: 200,
    })

    this.$scrollmagic
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
      .addTo(containerContainer)

    this.$scrollmagic
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
      .addTo(containerContainer)
  },
}
</script>

<style lang="sass" module>
.container
  margin-top: 88px
  margin-bottom: 88px
  overflow: hidden
  position: relative

  @media (max-width: 900px)
    margin: 32px 0
  

.items
  display: flex
  width: max-content
  position: relative
  left: 0

  &__item
    display: flex
    flex-direction: column
    margin: 0 122px

    @media (max-width: 900px)
      margin: 0 61px

    @media (max-width: 500px)
      margin: 0 32px

    h3
      margin: 0
    p
      display: flex
      align-items: center
      margin: 0
      color: $color-black-80
</style>
