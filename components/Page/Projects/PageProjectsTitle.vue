<template lang="pug">
  section(
    :class="[$style['projects-title'], large && $style['large'], data.image && $style['isImage'], offsetToTop && $style['offset-to-top']]"
  )
    div(
      :class="$style['projects-title__container']"
      :style="data.image && { backgroundImage: `url(${data.image})` }"
    )
      div(:class="$style['projects-title__container-content']")
        h2(v-html="data.header")
        div(v-if="data.text" v-html="data.text")
        slot
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import { Component, Vue, Prop } from 'nuxt-property-decorator'

interface IProjectsTitle {
  header: string
  text: string
  image?: string
}

@Component({
  components: { TypoText },
})
export default class PageProjectsTitle extends Vue {
  @Prop({ type: Object, default: () => {} }) data!: IProjectsTitle
  @Prop({ type: Boolean, default: false }) large!: boolean
  @Prop({ type: Boolean, default: false }) offsetToTop!: boolean
}
</script>

<style lang="sass" module>
.projects-title
  width: 100%

  &.offset-to-top
    margin-top: -108px

  &__container
    display: flex
    align-items: center
    padding: 80px 24px
    margin: 0 24px
    background-size: cover
    background-repeat: no-repeat
    background-position-x: center
    position: relative

    @media (max-width: 900px)
      margin: 0 24px
      min-height: auto

    .isImage &
      min-height: 690px
      margin-bottom: 24px

      &:before
        content: ''
        position: absolute
        left: 0
        top: 0
        bottom: 0
        right: 0
        background: linear-gradient(110.48deg, rgba(104, 43, 45, 0.32) 0%, rgba(55, 143, 177, 0.32) 100%)
        z-index: 1

    .large &
      max-width: 1440px
      min-height: 880px

    @media (max-width: 900px)
      align-items: center
      margin-bottom: 40px

    &-content
      max-width: 863px
      margin: 0 auto
      display: flex
      flex-direction: column
      grid-gap: 40px
      position: relative
      z-index: 2

      .isImage &
        color: $color-white-100

      h1, h2
        margin: 0
        +style-1

      button
        background: $color-blue-100
        padding: 16px 32px
        +style-5
        color: black
        width: fit-content
        border: none
        cursor: pointer

        .isImage &
          background: $color-white-100
</style>
