<template lang="pug">
  div
    top-line(v-if="!topLineIsHidden" @close="onToggleHiddenMode")
    base-header
    nuxt
    div(style="height: 2000px")
    base-header-mobile
    cursor-mover(v-if="!isTouchDevice")
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Mutation, namespace } from 'nuxt-property-decorator'
import { SettingsTopLineState } from '~/store/SettingsTopLine'
import { ActionTree, MutationTree } from 'vuex'
import { RootState } from '~/store'
import TopLine from '~/components/TopLine/TopLine.vue'
import BaseHeader from '~/components/BaseHeader/BaseHeader.vue'
import BaseHeaderMobile from '~/components/BaseHeaderMobile/BaseHeaderMobile.vue'
import CursorMover from '~/components/CursorMover.vue'

const SettingsTopLineStore = namespace('SettingsTopLine')

@Component({
  components: {
    TopLine,
    BaseHeader,
    BaseHeaderMobile,
    CursorMover,
  },
})
export default class DefaultLayout extends Vue {
  @SettingsTopLineStore.Getter('isHidden') topLineIsHidden!: SettingsTopLineState['hidden']
  @SettingsTopLineStore.Action('toggleHiddenMode') onToggleHiddenMode!: ActionTree<
    SettingsTopLineState,
    RootState
  >

  @Mutation('detectTouchDevice') detectTouchDevice!: MutationTree<RootState> | any

  get isTouchDevice() {
    return this.$store.state.isTouchDevice
  }

  registerHandlers(): void {
    this.detectTouchDevice()
    window.addEventListener('resize', this.detectTouchDevice)
  }

  unregisterHandlers(): void {
    window.removeEventListener('resize', this.detectTouchDevice)
  }

  mounted(): void {
    this.registerHandlers()
  }

  beforeDestroy(): void {
    this.unregisterHandlers()
  }
}
</script>
