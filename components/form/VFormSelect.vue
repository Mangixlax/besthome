<template lang="pug">
  div(:class="$style[`select__wrapper`]")
    span(:class="[$style[`select__label`], showInput && $style['show']]")
      | {{ placeholder }}
      span(
        v-if="required"
        :class="$style['required']"
      ) *
    select(
      v-model="localValue"
      :class="[$style['select'], !valid && $style['error'], !showInput && $style['hide']]"
      @change="onChange"
      v-bind="$attrs"
      v-on="$listeners"
    )
      option(value="") {{ $t('other.not_selected') }}
      option(
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      ) {{ option.label }}
    div(:class="$style['select__arrow']")
      svg-icon(name="input-dropdown-arrow")
</template>

<script>
export default {
  name: 'VFormSelect',
  model: {
    prop: 'value',
    event: 'update',
  },
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    valid: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
    },
    options: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      localValue: this.value,
      showInput: false,
    }
  },
  watch: {
    value(value) {
      this.localValue = value
      this.showInput = this.localValue !== ''
    }
  },
  methods: {
    onChange(evt) {
      const value = evt.target.value
      this.localValue = value
      this.$emit('update', value)
    },
  },
  beforeDestroy() {
    this.$emit('update', null)
  },
}
</script>

<style lang="sass" module>
.select
  border: 1px solid transparent
  box-shadow: 0 0 0 0 #D8E1E4
  transition: border-color 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease
  border-radius: 6px
  background-color: rgba(#1A1B29, 0.08)
  padding: 22px 14px 6px
  -webkit-appearance: none
  -moz-appearance: none
  text-indent: 1px
  text-overflow: ''
  overflow: hidden
  width: 100%
  color: rgba(#1A1B29, 0.8)
  cursor: pointer

  &.hide
    color: transparent !important

  &.error
    box-shadow: 0 0 0 1px rgba(255, 0, 0, 0.32)
    background-color: rgba(255, 0, 0, 0.06)
    border-color: rgba(255, 0, 0, 0.32)

  &__wrapper
    position: relative

  &__wrapper:hover &
    border-color: #D8E1E4
    background-color: rgba(#1A1B29, 0.08)
    box-shadow: 0 0 0 1px #D8E1E4

  &__label
    position: absolute
    left: 16px
    top: 16px
    pointer-events: none
    color: rgba(#1A1B29, 0.8)
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
    transition: font-size 0.25s ease, transform 0.25s ease, color 0.25s ease

    &.show
      transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -11, 0, 1)
      color: rgba(#1A1B29, 0.64)
      font-size: 12px

  &__arrow
    position: absolute
    top: 20px
    right: 16px
    width: 14px
    height: 14px

    & svg
      width: 100%
      height: 100%
      fill: $coal-4

.required
  color: rgba(245, 25, 25, 0.8)
  margin-left: 4px
</style>
