<template lang="pug">
  section(:class="$style['container']")
    div(:class="$style['container__body']")
      h2 Teamwork
      div(:class="$style['content']")
        p Only here you can get acquainted with the employees of the sales department and take an interest in the work of the specialists of the after-sale service.
        p Or stop by for a cup of fragrant Turkish coffee in our legal department and ask your question in a friendly atmosphere.<br>It is possible that you can make the wrong door and get into the accounting department, an architectural bureau or designers. Don't worry. We assure you that everyone will be glad to see you and will be happy to answer your questions about their work.
        div(:class="$style['links']")
          nuxt-link(
            :to="localePath({ name: 'service-introductory-tour' })"
            title="Our services"
          )
            span Our services
            svg-icon(name="text-link-arrow")
          nuxt-link(
            :to="localePath({ name: 'investors' })"
            title="Investments"
          )
            span Investments
            svg-icon(name="text-link-arrow")
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {
    TypoText,
  },
})
export default class PageOurOfficeAbout extends Vue {}
</script>

<style lang="sass" module>
.container
  background-color: $color-black-96

  &__body
    max-width: 1248px
    width: 100%
    margin: 0 auto
    padding: 0 48px
    display: grid
    grid-template-columns: 1fr 1fr

    @media (max-width: 940px)
      padding: 0 24px
      grid-template-columns: 1fr

    & > h2
      +desktop-text-style-5
      margin: 0
      color: $color-white-48

.content
  & > p:nth-child(1)
    +desktop-text-style-3
    color: $color-white-100

  & > p:nth-child(2)
    +mobile-text-style-6
    color: $color-white-48
    margin-top: 48px
    padding-top: 15px
    border-top: 1px solid $color-white-16

.links
  margin-top: 15px
  display: grid
  grid-template-columns: 1fr 1fr
  align-items: center

  & > a
    color: $color-white-80
    text-decoration: none
    display: flex
    align-items: center
    outline: none

    &, svg
      transition: fill 0.25s ease, color 0.25s ease

    svg
      width: 22px
      height: 22px
      fill: $color-white-80
      margin-left: 10px

    &:hover
      color: $color-white-100

      svg
        fill: $color-white-100
</style>
