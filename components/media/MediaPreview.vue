<template lang="pug">
  section-container(
    tag="div"
    :class="$style['section']"
    :title="rubric.title"
    :description="rubric.description"
    :btn-link="previewLink"
    :is-mobile="$store.state.isMobileWindow"
  )
    scroll-block(
      v-if="postsIsLoaded"
      has-nav-btn
      :gap-item="40"
      :is-mobile="!$store.state.isDesktopWindow"
    )
      media-item(
        v-for="(item, index) in rubricPosts"
        :key="index"
        :item-data="item"
        :horizontal="horizontal"
      )
    scroll-block(
      v-else
      has-nav-btn
      :gap-item="40"
      :is-mobile="!$store.state.isDesktopWindow"
    )
      media-item-skeleton(
        v-for="(item, index) in Array(fakeItems)"
        :key="index"
        :horizontal="horizontal"
      )
</template>

<script>
import Wrapper from '@/components/base/Wrapper'
import MediaItem from '@/components/media/MediaItem'
import ScrollBlock from '@/components/base/ScrollBlock'
import { navigationExtends } from '@/mixins/routes'
import MediaItemSkeleton from '@/components/media/MediaItemSkeleton'
import SectionContainer from '@/components/common/SectionContainer'

export default {
  name: 'MediaPreview',
  components: {
    SectionContainer,
    MediaItemSkeleton,
    ScrollBlock,
    MediaItem,
    Wrapper,
  },
  mixins: [navigationExtends],
  props: {
    delay: {
      type: Number,
      default: 0,
    },
    /**
     * Заголовок блока
     */
    titleBlock: {
      type: String,
      default: '',
    },
    /**
     * Описание блока
     */
    descriptionBlock: {
      type: String,
      default: '',
    },
    categoryId: {
      type: Number,
      required: true,
    },
    showRecords: {
      type: Number,
      default: 8,
    },
    fakeItems: {
      type: Number,
      default: 4,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: true,
      rubric: {},
      rubricPosts: Array(4).fill({}),
      postsIsLoaded: false,
    }
  },
  computed: {
    previewLink() {
      return this.rubric.slugs
        ? this.localePath({
            name: 'media-rubric-slug',
            params: {
              slug: this.rubric.slugs[this.$i18n.locale],
            },
          })
        : null
    },
  },
  async mounted() {
    await this.$nextTick()
    setTimeout(
      () => {
        this.$axios
          .$get(`v1/rubrics/${this.categoryId}?include=posts:limit(${this.showRecords})`)
          .then(({ data }) => {
            this.rubric = data ? data : {}
            this.rubricPosts = data ? (data.posts ? data.posts.data : []) : []
            this.postsIsLoaded = true
          })
          .catch((error) => {
            this.$sentry.captureException(error)
            this.show = false
          })
      },
      this.$store.state.bot ? 0 : this.delay,
    )
  },
}
</script>

<style lang="sass" module>
.section


.section + .section
  margin-top: 48px
</style>
