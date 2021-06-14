<template lang="pug" functional>
  span(:class="[$style['loader'], ...(Array.isArray(data.class) ? data.class : [data.class])]")
    span(:class="$style['loader_snippet']", :style='$options.sizesStyles(props.size)')
      span(:style='$options.bgStyles(props.size, props.color)')
      span(:style='$options.bgStyles(props.size, props.color)')
      span(:style='$options.bgStyles(props.size, props.color)')
      span(:style='$options.bgStyles(props.size, props.color)')
</template>

<script>
export default {
  name: 'Loader',
  props: {
    color: {
      type: String,
      default: 'rgba(25, 31, 46, 0.3)',
    },
    size: {
      type: String,
      default: '60px',
    },
  },
  sizesStyles(size) {
    return {
      width: size,
      height: size,
    }
  },
  bgStyles(size, color) {
    return {
      ...this.sizesStyles(size),
      margin: `-${parseInt(size, 10) / 2}px 0 0 -${parseInt(size, 10) / 2}px`,
      'background-color': color,
    }
  },
}
</script>

<style lang="sass" module>
.loader
  position: absolute
  width: 100%
  height: 100%
  left: 0
  top: 0
  z-index: 3
  pointer-events: none
  min-height: 30px
  min-width: 30px

.loader_snippet
  display: block
  height: 60px
  width: 60px
  max-width: 100%
  max-height: 100%

.loader_snippet span
  position: absolute
  width: 60px
  height: 60px
  z-index: -1
  left: 50%
  top: 50%
  opacity: 0
  margin: -30px 0 0 -30px
  -webkit-border-radius: 100px
  border-radius: 100px
  -webkit-animation: ripple 1.8s infinite
  animation: ripple 1.9s infinite
  max-width: 100%
  max-height: 100%

.loader_snippet span:nth-child(2)
  animation-delay: 0.3s
  -webkit-animation-delay: 0.3s

.loader_snippet span:nth-child(3)
  animation-delay: 0.6s
  -webkit-animation-delay: 0.6s

.loader_snippet span:nth-child(4)
  animation-delay: 0.6s
  -webkit-animation-delay: 0.6s

@-webkit-keyframes ripple
  0%
    opacity: 1
    -webkit-transform: scale(0)
    transform: scale(0)

  to
    opacity: 0
    -webkit-transform: scale(1)
    transform: scale(1)
</style>
