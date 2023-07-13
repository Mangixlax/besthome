<template lang="pug">
  div(:class="$style.link")
    a(
      :class="$style.link__content"
      target="_blank"
      rel="nofollow noindex noreferrer"
      :href="block.data.link"
      :title="block.data.meta.title"
    )
      div(
        :class="$style.link__image"
        :style="{ 'background-image': `url(${block.data.meta.image.url})` }"
      )
      div(:class="$style.link__title") {{ block.data.meta.title }}
      typo-text(:class="$style.link__description") {{ block.data.meta.description }}
      typo-text(:class="$style.link__anchor" tag="span") {{ block.data.meta.site_name }}
</template>

<script>
export default {
  name: 'ContentLinkTool',
  props: {
    block: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="sass" module>
.link
  position: relative
  margin: 24px 0

  &__content
    display: block
    padding: 25px
    color: initial !important
    text-decoration: none !important
    background: #fff
    border: 1px solid #ccd6dd
    border-radius: 10px
    overflow: hidden
    will-change: filter
    animation: link-in 450ms 1 cubic-bezier(0.215, 0.61, 0.355, 1)
    transition: box-shadow 0.25s ease

    &:before
      display: none

    &:hover
      box-shadow: 0 0 3px rgba(0,0,0, .16)

  &__image
    background-position: center center
    background-repeat: no-repeat
    background-size: cover
    margin: 0 0 0 30px
    width: 65px
    height: 65px
    border-radius: 3px
    float: right

  &__title
    font-size: 17px
    font-weight: 600
    line-height: 1.5em
    margin: 0 0 10px 0

  &__description
    margin: 0 0 20px 0
    font-size: 15px
    line-height: 1.55em
    display: -webkit-box
    -webkit-line-clamp: 3
    -webkit-box-orient: vertical
    overflow: hidden

  &__anchor
    display: block
    font-size: 15px
    line-height: 1em
    color: #888 !important
    border: 0 !important
    padding: 0 !important

@keyframes link-in
  from
    filter: blur(5px)
  to
    filter: none
</style>
