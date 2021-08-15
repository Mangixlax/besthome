<template lang="pug">
  div(:class="$style['info']")
    div(:class="$style['info__container']")
      div(
        v-for="(block, i) in data"
        :key="i"
        :class="[\
          $style['info__container-block'],\
          $style[`info__container-block_${i}`],\
        ]"
      ) 
        typo-text(
          tag="h4"
          version="style-4"
          :class="$style['info__container-block-title']"
        ) {{ block.title }}
        typo-text(
          tag="h4"
          version="style-6"
          :class="$style['info__container-block-description']"
        ) {{ block.description }}
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import CommonSubscribe from '~/components/Common/CommonSubscribe.vue'

interface IQualityInfo {
  title: string
  description: string
}

@Component({
  components: {
    TypoText,
    CommonSubscribe,
  },
})
export default class PageQualityInfo extends Vue {
  @Prop({ type: Array, default: () => {} }) data!: IQualityInfo[]
}
</script>

<style lang="sass" module>
.info
  max-width: 100%

  &__container
    max-width: 1200px
    margin: 0 auto
    padding: 0 24px
    display: flex
    justify-content: space-between

    &-block
      display: flex
      flex-direction: column
      grid-gap: 40px

      &_0
        max-width: 414px

      &_1
        max-width: 592px

      &-title
        margin: 0

      &-description
        margin: 0
</style>
