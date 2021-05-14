<template lang="pug">
  section(:class="$style['article']")
    div(:class="$style['article__container']")
      typo-text(
        tag="h1"
        version="style-1"
        :class="$style['article__container-title']"
      ) 
        | {{ title }}
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'PageCompanyTitle',
  components: { TypoText },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="sass" module>
.article
  width: 100%

  &__container
    display: flex
    flex-direction: column
    max-width: 912px
    padding: 80px 24px
    margin: 0 auto

    @media (max-width: 900px)
      padding: 32px 24px

    &-title
      margin: 0
      margin-bottom: 40px
      max-width: 590px
</style>
