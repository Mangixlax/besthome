<template lang="pug">
  div(
    :class="$style['video']"
    data-cursor-text="Click<br>to close"
  )
    div(
      :class="$style['video-container']"
    )
      video(preload="auto" data-cursor-text="Click<br>to close" loop="" autoplay="" playsinline="")
        source(src="https://storage.yandexcloud.net/besthome/video/BH_HQ.mp4" type="video/mp4")
    div(
      @click="closeModal"
      :class="$style['close-modal']"
      :data-cursor-text="$t('modals.video')"
      data-cursor-off-exclusion
    )
</template>

<script>
export default {
  name: 'ModalVideo',
  methods: {
    closeModal() {
      this.$modal.hide('modal-video')
    },
  }
}
</script>

<style lang="sass" module>
.video
  position: relative
  background: black
  width: 100%
  height: auto

  &-container
    position: relative
    padding-bottom: 49%
    height: 0

    video
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%

.close-modal
  position: fixed
  z-index: 9999999
  top: 0
  left: 0
  right: 0
  bottom: 0
</style>
