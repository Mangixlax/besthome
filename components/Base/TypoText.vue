<template lang="pug" functional>
  component(
    :is="props.tag"
    v-bind="{\
      ...(data.ref ? { ref: data.ref } : {}),\
      ...(data.style ? { style: data.style } : {}),\
      ...(data.attrs || {})\
    }"
    v-on="listeners"
    :class="[\
      $style[props.version],\
      ...(Array.isArray(data.class) ? data.class : [data.class]),\
    ]"
  )
    slot
</template>

<script>
export default {
  name: 'TypoText',
  props: {
    tag: {
      type: String,
      default: 'p',
    },
    version: {
      type: [String, Number],
      default: 'style-6',
    },
  },
}
</script>

<style lang="sass" module>
.style-0
  +style-0

.style-1
  +style-1

.style-2
  +style-2

.style-3
  +style-3

.style-4
  +style-4

.style-5
  +style-5

.style-6
  +style-6

.style-7
  +style-7

.style-8
  +style-8

.style-9
  +style-9

.style-10
  +style-10
</style>
