<template lang="pug">
  li(
    :class="$style['list-item']"
    @click="onClick"
    v-on="$listeners"
  )
    span(
      v-if="isParent"
      :class="[$style['list-item__dropdown'], $style['list-item__dropdown--left']]"
    )
      svg-icon(name="dropdown-left")
    component(
      :is="route ? 'nuxt-link' : 'span'"
      :to="route"
      :title="route ? title : null"
      :class="$style['list-item__link']"
    )
      typo-text(
        tag="span"
        version="style-5"
      ) {{ name }}
    typo-text(
      v-if="indicator"
      version="style-9"
      tag="span"
      :class="$style['list-item__indicator']"
    ) {{ indicator }}
    span(
      v-if="hasChildren"
      :class="$style['list-item__dropdown']"
    )
      svg-icon(name="dropdown")
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import TypoText from '~/components/Base/TypoText.vue'

@Component({
  components: { TypoText },
})
export default class BaseHeaderMobileMenuListItem extends Vue {
  @Prop({ type: Object, default: null }) route!: Object
  @Prop({ type: String, default: '' }) title!: String
  @Prop({ type: String, default: '' }) name!: String
  @Prop({ type: [String, Number], default: '' }) indicator!: String | Number
  @Prop({ type: Boolean, default: false }) hasChildren!: Boolean
  @Prop({ type: Boolean, default: false }) isParent!: Boolean

  onClick() {
    if (this.hasChildren) {
      this.$emit('click-children')
    }
  }
}
</script>

<style lang="sass" module>
.list-item
  display: flex
  align-items: center
  padding: 16px 24px
  position: relative

  &__link
    text-decoration: none
    color: rgba($color-black, 0.88)

    &:after
      content: ''
      position: absolute
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 1

  &__indicator
    position: relative
    color: $color-blue
    top: -5px
    margin-left: 3px

  &__dropdown
    margin-left: 3px

    &--left
      margin-left: 0
      margin-right: 3px

    svg
      width: 18px
      height: 18px
      fill: $color-black
</style>
