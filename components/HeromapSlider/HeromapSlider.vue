<template lang="pug">
  div
    div(v-html="data.text")
    div(v-html="data.svg_html")
    div(v-if="data.background" v-html="data.background")
    div(
      v-if="data.slides"
      v-for="(slide, index) in data.slides"
      :key="index"
    )
      div(v-html="slide")
</template>

<script>
export default {
  name: 'HeromapSlider',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
