<template lang="pug" functional>
  component(
    :is="`h${props.block.data.level}`"
    v-if="props.block.data.text"
    v-bind="{ ...data.attrs, ...(props.id.toString().length && { id: props.id }) }"
    v-html="props.block.data.text"
    :class="$style[`h${props.block.data.level}`]"
  )
</template>

<script>
export default {
  name: 'ContentHeader',
  props: {
    block: {
      type: Object,
      default: () => {},
    },
    id: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="sass" module>
.h1, .h2, .h3, .h4, .h5, .h6
  color: rgba(25, 31, 46, 0.96)
  padding-left: 70px
  padding-right: 144px

  @media (max-width: 1440px)
    padding-right: 0

  @media (max-width: 1054px)
    padding-left: 35px

  @media (max-width: 760px)
    padding-left: 0
  
.h1
  display: none

.h2
  +style-2
  margin: 0 0 64px 0

  @media (max-width: 1054px)
    margin: 0 0 32px 0

  @media (max-width: 760px)
    margin: 0 0 24px 0

.h3
  +style-3
  margin: 0 0 64px 0

  @media (max-width: 1054px)
    margin: 0 0 32px 0

  @media (max-width: 760px)
    margin: 0 0 24px 0

.h4
  +style-4
  margin: 0 0 64px 0

  @media (max-width: 1054px)
    margin: 0 0 32px 0

  @media (max-width: 760px)
    margin: 0 0 24px 0

.h5
  +style-4
  margin: 0 0 64px 0

  @media (max-width: 1054px)
    margin: 0 0 32px 0

  @media (max-width: 760px)
    margin: 0 0 24px 0

.h6
  +style-4
  margin: 0 0 64px 0

  @media (max-width: 1054px)
    margin: 0 0 32px 0

  @media (max-width: 760px)
    margin: 0 0 24px 0
</style>
