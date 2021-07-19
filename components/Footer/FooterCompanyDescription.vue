<template lang="pug">
  section(:class="$style['company']")
    div(:class="$style['company__container']")
      div(
        v-if="isSeoContentView"
        v-html="seoContent"
        :class="$style['company__container-text']"
      )
      div(v-else)
        typo-text(
          v-for="(paragraph, i) in paragraphs"
          :key="i"
          tag="p"
          :class="$style['company__container-text']"
        ) {{ paragraph }}
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import TypoText from '~/components/Base/TypoText.vue'

@Component({ components: { TypoText } })
export default class FooterCompanyDescription extends Vue {
  @Prop({ type: Array, default: () => [] }) paragraphs!: Array<string>

  public isSeoContentView: boolean = false

  get seoContent(): any {
    return this.$store.getters['Catalog/getPageSeoContent']
  }

  @Watch('$route')
  async onChangeRoute() {
    const regex = /properties/
    if ((regex as any).test(this.$route.path)) {
      this.isSeoContentView = true
    } else {
      this.isSeoContentView = false
    }
  }
}
</script>

<style lang="sass" module>
.company
  width: 100%

  &__container
    padding: 32px
    margin: 0 auto
    max-width: 1184px
    border-bottom: solid 1px
    border-color: $color-black-4

    @media (max-width: 800px)
      padding: 24px 24px

    &-text
      margin: 0px
      +style-8($with-media: false)
</style>
