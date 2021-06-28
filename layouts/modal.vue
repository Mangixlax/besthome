<template lang="pug">
  div
    modal-close(:class="$style['close-button']" @click="onClickClose")
    nuxt
    cursor-mover(v-if="!isTouchDevice")
    base-cookies-card
</template>

<script lang="ts">
import Vue from 'vue'
import BaseCookiesCard from '~/components/Base/BaseCookiesCard.vue'
import { Component, Mutation } from 'nuxt-property-decorator'
import { MutationTree } from 'vuex'
import { RootState } from '~/store'
import CursorMover from '~/components/CursorMover.vue'
import ModalClose from '~/components/Modal/base/ModalClose.vue'

@Component({
  components: {
    ModalClose,
    BaseCookiesCard,
    CursorMover,
  },
})
export default class DefaultLayout extends Vue {
  @Mutation('detectTouchDevice') detectTouchDevice!: MutationTree<RootState> | any

  get isTouchDevice() {
    return this.$store.state.isTouchDevice
  }

  public onClickClose() {
    if (window.history.length > 2) {
      this.$router.go(-1)
    } else {
      this.$router.push(this.localePath({ name: 'index' }))
    }
  }
}
</script>

<style lang="sass" module>
.close-button
  display: flex
  position: fixed
  top: 64px
  right: 64px
  z-index: 10
  background-color: $color-white-100

  @media (max-width: 900px)
    top: 32px
    right: 32px
</style>
