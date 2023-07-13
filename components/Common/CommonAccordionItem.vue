<template lang="pug">
  section(:class="$style['accordion']" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question")
    header(
      :class="$style['accordion__header']"
      @click="onClick"
    )
      typo-text(tag="h2" version="style-4" :class="$style['accordion__header-title']" itemprop="name")
        | {{ title }}
      svg-icon(
        :name="show ? 'accordion-minus' : 'accordion-plus'"
        :class="$style['accordion__header-button']"
      )
    div(:style="{ height: myHeight }" :class="$style['accordion__body']" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer")
      div(ref="textContainer" itemprop="text")
        slot
</template>

<script>
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'CommonAccordionItem',
  components: { TypoText },
  props: {
    title: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: this.active,
      myHeight: '0px',
    }
  },
  methods: {
    onClick() {
      if (this.show) {
        this.hideAccordion()
      } else {
        this.showAccordion()
      }

      if (this.$parent?.$children.length) {
        for (const $child of this.$parent.$children) {
          if ($child._name.includes('AccordionItem') && this._uid !== $child._uid) {
            $child.hideAccordion()
          }
        }
      }
    },
    hideAccordion() {
      this.myHeight = '0px'
      this.show = false
    },
    showAccordion() {
      this.myHeight = this.$refs.textContainer.clientHeight + 'px'
      this.show = true
    },
  },
  mounted() {
    if (this.active) {
      this.showAccordion()
    }
  },
}
</script>

<style lang="sass" module>
.accordion
  box-sizing: border-box
  border-bottom: solid 1px $color-white-4

  &__header
    position: relative
    display: flex
    align-items: center
    cursor: pointer
    padding: 24px 0
    justify-content: space-between

    &-title
      color: $color-white-96
      max-width: 85%

    &-button
      width: 30px
      height: 30px

  &__body
    display: flex
    transition: all 1s ease
    overflow: hidden
    flex-direction: column-reverse

    > div
      padding-bottom: 24px

      a
        text-decoration: underline
        text-decoration-color: $color-white-16
        text-underline-offset: 7px
        color: $color-white-100

      h2, h3, h4, p
        margin: 0

      p
        +style-6
        color: $color-white-100

  &__header h3
    margin: 0

  &__body p:first-child
    margin-top: 0

.reverse-transition
  display: flex
  flex-direction: column-reverse
</style>
