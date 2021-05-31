<template lang="pug">
  section(:class="$style['container']" id="vertical")
    ul(ref="items" :class="[$style['items'], 'items']")
      li(
        v-for="(item, key) in data.items"
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
  @Prop({ type: Object, default: () => [] }) data!: IData

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
        left: -((this.$refs.items as Element).clientWidth / 25) + '%',
        autoRound: false,
        ease: Power1.easeOut,
        duration: 200,
        offset: 1000,
      })
      .addTo(containerContainer)
  }
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
