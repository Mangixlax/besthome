<template lang="pug">
  p(
    v-if="block.data.file.paths"
    v-bind="$attrs"
    :class="[$style['figure'], block.data.stretched ? $style['full-width'] : '']"
  ) 
    img(
      :src="$img('/pages/quality/title/image-1.jpg', $store.state.supportWebP ? { format: 'webp' } : {})"
      loading="lazy"
      decoding="async"
      :class="$style['personal-card__photo-image']"
    )
    //- image-object(
    //-   :name="block.data.caption"
    //-   :content-url="getOriginalImage(block.data.file.paths).path"
    //- )
    //- lazy-image(
    //-   :class="$style.img"
    //-   :alt="block.data.caption"
    //-   :image="block.data.file.paths"
    //-   fix-src-sizes="1000px"
    //-   big-loader
    //-   zoom
    //- )
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
  margin: 24px 0

  & > p
    margin: 0

  &.full-width
    margin-left: -64px
    margin-right: -64px

    +mobileWithTablet
      margin-left: -16px
      margin-right: -16px

  span:last-child
    display: block
    margin-top: 24px
    color: rgba(25, 31, 46, 0.8)
    padding-left: 70px

    @media (max-width: 1054px)
      padding-left: 35px

    @media (max-width: 760px)
      padding-left: 0

.img
  border-radius: 10px

.figure + h2, h3, h4, h5, h6
  margin-top: 64px

  @media (max-width: 1054px)
    margin-top: 32px

  @media (max-width: 760px)
    margin-top: 24px
</style>
