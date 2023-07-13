<template lang="pug">
  section(:is="tag" :class="$style['form-container']")
    typo-text(
      v-if="title"
      tag="h2"
      version="style-5"
    ) {{ title }}
    typo-text(
      tag="p"
    ) {{ description }}
    slot
</template>

<script>
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'VFormContainer',
  components: {
    TypoText,
  },
  props: {
    tag: {
      type: String,
      default: 'section',
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="sass" module>
.form-container
  +mobile
    //+horizontal-padding
</style>
