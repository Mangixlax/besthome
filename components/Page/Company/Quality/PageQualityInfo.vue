<template lang="pug">
  section(:class="$style['info']")
    div(:class="$style['info__container']")
      div(
        v-for="(block, i) in data"
        :key="i"
        :class="[\
          $style['info__container-block'],\
          $style[`info__container-block_${i}`],\
        ]"
      )
        h3(:class="$style['info__container-block-title']") {{ block.title }}
        p(:class="$style['info__container-block-description']") {{ block.description }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

interface IQualityInfo {
  title: string
  description: string
}

@Component
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

    @media (max-width: 680px)
      flex-direction: column

    &-block
      display: flex
      flex-direction: column

      @media (max-width: 680px)
        & + &
          margin-top: 40px

      // &_0
      //   max-width: 414px

      // &_1
      //   max-width: 592px
      //   margin-left: 40px

      //   @media (max-width: 680px)
      //     margin-left: 0

      &-title
        +desktop-text-style-4
        margin: 0 0 40px
        color: $color-black-96

        @media (max-width: 680px)
          +desktop-text-style-5
          margin-bottom: 24px

      &-description
        +desktop-text-style-6
        margin: 0
        color: $color-black-48

        @media (max-width: 680px)
          +desktop-text-style-7
</style>
