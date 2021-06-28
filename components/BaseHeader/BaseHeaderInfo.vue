<template lang="pug">
  div(
    :class="{\
      [$style['header__info']]: true,\
      [$style['header__info--align-right']]: alignRight,\
      [$style['header__info--hide-on-mobile']]: hideOnMobile,\
    }"
  )
    a(href="tel:+905305474415" title="Call +90 530 547-44-15")
      span(v-html="'+90 530 547<span>-</span>44<span>-</span>15'")
    typo-text(
      tag="div"
      version="style-9"
      :class="$style['header__info-callback']"
      @click="goToFeedback"
    ) {{ $t('header.call_back')}}
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import TypoText from '~/components/Base/TypoText.vue'
import { modalsTriggerMixin } from '~/mixins/modals'

@Component({
  components: { TypoText },
  mixins: [modalsTriggerMixin],
})
export default class BaseHeaderInfo extends Vue {
  @Prop({ type: Boolean, default: false }) hideOnMobile!: boolean
  @Prop({ type: Boolean, default: false }) alignRight!: boolean

  public goToFeedback() {
    this.$router.push(this.localePath({ name: 'feedback' }))
  }
}

</script>

<style lang="sass" module>
.header__info
  display: flex
  flex-direction: column
  align-items: flex-start

  &--align-right
    align-items: flex-end

  &--hide-on-mobile
    @media (max-width: 1023px)
      display: none

  a
    +style-6($with-media: false)
    text-decoration: none
    color: rgba($color-black, 0.88)

    span span
      color: rgba($color-black, 0.2)

    @media (max-width: 1054px)
      +style-5($with-media: false)

  &-callback
    display: flex
    align-items: center
    margin-top: 4px
    padding: 0 2px 5px
    color: $color-blue
    border-bottom: 1px solid rgba($color-blue, 0.16)
    cursor: pointer
</style>
