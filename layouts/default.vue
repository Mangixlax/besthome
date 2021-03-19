<template lang="pug">
  div
    top-line(v-if="!topLineIsHidden" @close="onToggleHiddenMode")
    base-header
    nuxt
    div(style="height: 2000px")
    base-header-mobile
    cursor-mover
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace } from 'nuxt-property-decorator'
import TopLine from '~/components/TopLine/TopLine.vue'
import TypoText from '~/components/Base/TypoText.vue'
import { SettingsTopLineState } from '~/store/SettingsTopLine'
import BaseHeader from '~/components/BaseHeader/BaseHeader.vue'
import BaseHeaderMobile from '~/components/BaseHeaderMobile/BaseHeaderMobile.vue'
import CursorMover from '~/components/CursorMover.vue'

const SettingsTopLineStore = namespace('SettingsTopLine')

@Component({
  components: { CursorMover, BaseHeaderMobile, BaseHeader, TypoText, TopLine },
})
export default class DefaultLayout extends Vue {
  @SettingsTopLineStore.Getter('isHidden') topLineIsHidden!: SettingsTopLineState['hidden']
  @SettingsTopLineStore.Action('toggleHiddenMode') onToggleHiddenMode!: () => void
}
</script>
