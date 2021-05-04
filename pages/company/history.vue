<template lang="pug">
  main
    base-post(
      :filename="require(`~/assets/images/test.jpg`)"
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) “We strive to elevate and transform neglected areas into living and breathing parts of cities with a valuable contribution to society”
      typo-text(
        tag="p"
        version="style-5"
      )
        | Country manager
        typo-text(
          tag="a"
          href="#"
          version="style-5"
        ) Maconi Michal
        | .
</template>

<script lang="ts">
import BasePost from '~/components/Base/BasePost.vue'
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'legal-support',
  components: { BasePost, TypoText },
}
</script>

<style lang="sass" module></style>
