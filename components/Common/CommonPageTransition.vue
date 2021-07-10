<template lang="pug">
  div
    transition(
      name="page-transition"
      mode="out-in"
      :enter-class="$style['page-transition-enter']"
      :enter-active-class="$style['page-transition-enter-active']"
      :leave-class="$style['page-transition-leave']"
      :leave-active-class="$style['page-transition-leave-active']"
    )
      div(v-if="changing" :class="$style['container']")
    transition(
      name="component-fade"
      mode="out-in"
    )
      div(v-if="changing" :class="$style['logo__wrapper']")
        logo(:class="$style['logo']" light extend-sub-title="Loading")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Logo from '~/components/Logo.vue'

@Component({
  components: { Logo },
})
export default class CommonPageTransition extends Vue {
  get changing(): boolean {
    return this.$store.getters['PageTransition/changing']
  }
}
</script>

<style>
.component-fade-enter-active {
  transition: opacity .3s ease 0.2s;
}
.component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
  /* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

<style lang="sass" module>
.page-transition-enter-active, .page-transition-leave-active
  transition: all .5s ease

.page-transition-enter
  transform: translateY(-100%)

.page-transition-leave-active
  transform: translateY(100%)

.logo-transition-enter-active, .logo-transition-leave-active
  -webkit-transition: all .5s ease
  transition: all .5s ease

.logo-transition-enter, .logo-transition-leave-to
  opacity: 0

.container
  display: block
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: $color-black-100
  z-index: 2000

.logo__wrapper
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  display: flex
  align-items: center
  justify-content: center
  z-index: 2001
</style>
