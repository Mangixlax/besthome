<template lang="pug">
  div(:class="$style['embed']")
    div(:class="wrapperClasses")
      common-loader(
        v-if="!show"
      )
      div(
        v-if="seen && isTwitter"
        v-html="block.data.oembed.html"
      )
      iframe(
        v-else-if="seen && isInstagram"
        ref="iframe"
        :src="block.data.embed"
        allowfullscreen
        frameborder="0"
        scrolling="no"
        allowtransparency="true"
        @load="iframeLoaded"
      )
      iframe(
        v-else-if="seen && isYoutube"
        ref="iframe"
        :src="getYoutubeUrl"
        frameborder="0"
        allowfullscreen
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        @load="iframeLoaded"
      )
      iframe(
        v-else-if="seen"
        ref="iframe"
        :src="block.data.embed"
        frameborder="0"
        allowfullscreen
        @load="iframeLoaded"
      )
    typo-text(
      v-if="block.data.caption"
      :class="$style['embed__caption']"
      v-html="block.data.caption"
    )
</template>

<script>
import CommonLoader from '@/components/Common/CommonLoader'

export default {
  name: 'ContentEmbed',
  components: { CommonLoader },
  props: {
    block: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      observer: null,
      seen: false,
      show: false,
    }
  },
  async mounted() {
    await this.$nextTick()

    this.observer = new IntersectionObserver(async (entries) => {
      const image = entries[0]
      if (image.isIntersecting) {
        this.observer.disconnect()

        // We seen that embed block on screen
        this.seen = true

        // If it twitter embed
        if (this.isTwitter) {
          try {
            typeof window.twttr !== 'undefined' && window.twttr.widgets.load()
            // eslint-disable-next-line no-empty
          } catch (e) {}

          this.show = true // Hide loader
        }
      }
    })

    this.observer.observe(this.$el)
  },
  destroyed() {
    this.observer && this.observer.disconnect()
  },
  methods: {
    iframeLoaded() {
      this.show = true
    },
  },
  computed: {
    isInstagram() {
      return String(this.block.data.service) === 'instagram'
    },
    isYoutube() {
      return String(this.block.data.service) === 'youtube'
    },
    isTwitter() {
      return String(this.block.data.service) === 'twitter'
    },
    wrapperClasses() {
      return [
        this.$style.video__wrapper,
        this.isInstagram && this.$style['embed__wrapper--instagram'],
        this.isYoutube && this.$style['embed__wrapper--youtube'],
        this.isTwitter && this.$style['embed__wrapper--twitter'],
      ]
    },
    getYoutubeUrl() {
      return this.isYoutube
        ? this.block.data.embed.replace('www.youtube.com', 'www.youtube-nocookie.com')
        : ''
    },
  },
}
</script>

<style lang="sass" module>
.embed
  margin: 64px 0
  position: relative
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

  &__wrapper
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column

  &__wrapper, iframe
    width: 100%
    position: relative
    border-radius: 10px
    overflow: hidden
    height: 320px

  &__wrapper--instagram
    border: 1px solid #ccd6dd
    border-radius: 10px
    overflow: hidden

    &, iframe
      max-width: 400px
      height: 505px
      margin: 0 auto

  &__wrapper--youtube
    &, iframe
      height: 400px

  &__wrapper--twitter
    & > div
      display: flex
      align-items: center
      justify-content: center
      flex-direction: column

    &, iframe
      height: auto

  &__caption
    margin-top: 24px
    color: rgba(25, 31, 46, 0.8)
    text-align: center
</style>
