<template lang="pug">
  div(
    :class="$style['video']"
    data-cursor-text="Click<br>to close"
  )
   video(preload="auto" data-cursor-text="Click<br>to close" loop="" autoplay="" playsinline="")
    source(src="https://storage.yandexcloud.net/besthome/video/BH_HQ.mp4" type="video/mp4")
</template>

<script>
export default {
  name: 'ModalVideo',
}
</script>

<style lang="sass" module>
.video
  width: 100vw
  height: 100%
  background: black
  display: flex
  align-items: center

  video
    min-width: 100vw
</style>
