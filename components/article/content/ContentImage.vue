<template lang="pug">
  p(
    v-if="block.data.file"
    v-bind="$attrs"
    :class="[$style['figure'], block.data.stretched && $style['full-width']]"
  ) 
    img(
      :src="$img(`/s1/storage/app/uploads/public/${block.data.file.url}`, $store.state.supportWebP ? { format: 'webp' } : {})"
      :alt="block.data.alt"
      loading="lazy"
      decoding="async"
      :class="[$style['img'], block.data.caption && $style['with-caption']]"
    )
    span(
      v-if="block.data.caption"
    ) {{ block.data.caption }}
</template>

<script>
export default {
  name: 'ContentImage',
  components: {},
  props: {
    block: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="sass" module>
.figure
  margin: 64px 0
  padding-left: 70px
  padding-right: 144px

  @media (max-width: 1440px)
    padding-right: 0

  @media (max-width: 1054px)
    margin: 32px 0
    padding-left: 35px

  @media (max-width: 760px)
    margin: 24px 0
    padding-left: 0

  & > p
    margin: 0

  &.full-width
    padding-left: 0
    padding-right: 0

  span
    +desktop-text-style-9
    color: $color-black-32
    padding-left: 70px
    padding-right: 144px

    @media (max-width: 1440px)
      padding-right: 0

    @media (max-width: 1054px)
      margin: 32px 0
      padding-left: 35px

    @media (max-width: 760px)
      margin: 24px 0
      padding-left: 0

.img
  width: 100%

  &.with-caption
    margin-bottom: 32px

    @media (max-width: 760px)
      margin-bottom: 16px

.figure + h2, h3, h4, h5, h6
  margin-top: 64px

  @media (max-width: 1054px)
    margin-top: 32px

  @media (max-width: 760px)
    margin-top: 24px
</style>
