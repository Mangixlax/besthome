<template lang="pug">
  div(:class="$style[`${tag}__wrapper`]")
    div(:class="[$style[`${tag}__label`], showInput ? $style['show'] : '', isFocused && $style['focused'], !valid && $style['error']]")
      slot
      span(
        v-if="required"
        :class="$style['required']"
      ) *
    component(
      ref="input"
      :is="tag"
      :value="value"
      :class="[$style[tag], ]"
      @focus="onFocus"
      @blur="onBlur"
      @input="onChange"
      v-bind="$attrs"
      v-on="$listeners"
    )
</template>

<script>
export default {
  name: 'VFormInput',
  model: {
    prop: 'value',
    event: 'update',
  },
  props: {
    tag: {
      type: String,
      default: 'input',
    },
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
  },
  data() {
    return {
      localValue: this.value,
      isFocused: false,
      showInput: false,
    }
  },
  watch: {
    value(newValue) {
      this.localValue = newValue
    },
  },
  methods: {
    canShowInput() {
      this.showInput = this.localValue.length > 0
    },
    onClick(evt) {
      this.isFocused = true
      this.showInput = true
      this.$refs.input.focus()
      this.$emit('focus', evt)
    },
    onChange(evt) {
      const value = evt.target.value
      this.localValue = value
      !this.isFocused && this.canShowInput()
      this.tag === 'textarea' && this.onTextareaInput()
      this.$emit('update', value)
    },
    onFocus(evt) {
      this.isFocused = true
      this.showInput = true
      this.$emit('focus', evt)
    },
    onBlur(evt) {
      this.isFocused = false
      this.$refs.input && this.$refs.input.blur()
      this.canShowInput()
      this.$emit('blur', evt)
    },
    onTextareaInput() {
      const textarea = this.$refs.input

      this.$nextTick(() => {
        textarea.style.height = 'auto' // Fix for correct get scrollHeight value
        textarea.style.height = textarea.scrollHeight + 'px'
      })
    },
  },
  mounted() {
    this.canShowInput()
  },
  beforeDestroy() {
    this.$emit('update', '')
    this.isFocused = false
  },
}
</script>

<style lang="sass" module>
.input,
.textarea
  box-shadow: 0 0 0 0 #D8E1E4
  transition: border-color 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease
  border: none
  border-bottom: 1px solid $color-black-16
  padding: 22px 14px 6px
  -webkit-appearance: none
  -moz-appearance: none
  text-indent: 1px
  text-overflow: ''
  overflow: hidden
  width: 100%
  color:$color-black-100
  cursor: pointer

  &:focus
    outline: none
    cursor: text
    border-color: rgba($color-blue-16, 0.32)
    
  &.error
    // box-shadow: 0 0 0 1px rgba(255, 0, 0, 0.32)
    border-color: rgba(red, 0.32)
    
  &__wrapper
    position: relative

    &:hover span:first-child
      color: $color-blue-96

      span
        color: $color-blue-48

  &__wrapper:hover &:not(:focus)
    border-color: rgba($color-blue-16, 0.32)
    

  &__label
    position: absolute
    top: 16px
    left: 8px
    pointer-events: none
    display: flex
    color: $color-black-100
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
    transition: font-size 0.25s ease, transform 0.25s ease, color 0.25s ease
    
    span
      margin: 0 0.25em

    & > span:first-child
      color: $color-black-96

      span
        color: $color-black-48

    &.show
      transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -11, 0, 1)
      color: rgba(#1A1B29, 0.64)
      font-size: 12px

    &.focused span:not(.required)
      color: $color-blue-96

      > span
        color: $color-blue-48
    
    &.error span:not(.required)
      color: rgba(204, 0, 0, 0.96)
    
      > span
        color: rgba(204, 0, 0, 0.48)
      
.textarea
  resize: none
  min-height: 112px
  border: 1px solid $color-black-16

.required
  color: rgba(245, 25, 25, 0.8)
  margin-left: 4px
</style>
