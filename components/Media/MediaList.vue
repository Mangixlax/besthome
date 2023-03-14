<template lang="pug">
  section(:class="$style['media-list']" v-bind="$attrs")
    div(:class="$style['media-list__header']")
      p(:class="$style['media-list__header-title']")
        | {{ $t('pages.media.list.title')}}
      div(:class="$style['media-list__category']")
        p(:class="$style['media-list__header-description']")
          | {{ $t('pages.media.list.description')}}
        div(:class="$style['media-list__category-list']")
          slot(name="categories")
    div(ref="articleContainerContent" :class="$style['media-list__container']")
      media-card(
        v-for="card in data"
        :key="card.slugs[$i18n.locale]"
        :data="card"
      )
    div(:class="$style['media-list__footer']")
      div(:class="$style['media-list__footer-buttons']")
        div(
          :class="{\
            [$style['media-list__footer-prev']]: true,\
            [$style['media-list__footer-prev--disabled']]: !hasPrev,\
          }"
          @click.prevent="onChangePage(prevPage)"
        ) {{ $t('pages.media.prev') }}
        div(
          :class="{\
            [$style['media-list__footer-next']]: true,\
            [$style['media-list__footer-next--disabled']]: !hasNext,\
          }"
          @click.prevent="onChangePage(nextPage)"
        ) {{ $t('pages.media.next') }}
      nav(:class="$style['media-list__footer-pagination']")
        ul(:class="$style['media-list__footer-pagination-list']")
          li(
            :class="{\
              [$style['media-list__footer-pagination-item']]: true,\
              [$style['media-list__footer-pagination-item--disabled']]: getMeta.current_page === 1,\
            }"
            data-cursor-pointer
            @click.prevent="onChangePage(prevPage)"
          )
            svg-icon(name="dropdown-left")
          li(
            v-if="hasFirst"
            :class="$style['media-list__footer-pagination-item']"
            @click.prevent="onChangePage(1)"
            v-html="1"
            data-cursor-pointer
          )
          li(
            v-if="hasFirst && getMeta.current_page > 3"
            :class="$style['media-list__footer-pagination-item']"
            v-html="'...'"
          )
          li(
            v-for="page in pages"
            :key="`page-${page}`"
            :class="{\
              [$style['media-list__footer-pagination-item']]: true,\
              [$style['media-list__footer-pagination-item--current']]: getMeta.current_page === page,\
            }"
            v-html="page"
            data-cursor-pointer
            @click.prevent="onChangePage(page)"
          )
          li(
            v-if="hasLast && getMeta.total_pages - getMeta.current_page > 2"
            :class="$style['media-list__footer-pagination-item']"
            v-html="'...'"
          )
          li(
            v-if="hasLast"
            :class="$style['media-list__footer-pagination-item']"
            v-html="getMeta.total_pages"
            data-cursor-pointer
            @click.prevent="onChangePage(getMeta.total_pages)"
          )
          li(
            :class="{\
              [$style['media-list__footer-pagination-item']]: true,\
              [$style['media-list__footer-pagination-item--disabled']]: getMeta.current_page === getMeta.total_pages,\
            }"
            data-cursor-pointer
            @click.prevent="onChangePage(nextPage)"
          )
            svg-icon(name="dropdown-right")
    div(:class="{\
      [$style['media-list__overlay']]: true,\
      [$style['media-list__overlay--show']]: isLoading\
    }")
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import MediaCard from '~/components/Media/MediaCard.vue'
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import CommonSubscribe from '~/components/Common/CommonSubscribe.vue'
import { IResponseMeta } from '~/types/Response'
import { MediaState } from '~/store/Media'

@Component({
  components: {
    TypoText,
    CommonSubscribe,
    MediaCard,
  },
})
export default class MediaList extends Vue {
  @Prop({ type: Array, default: () => [] }) data!: any

  public pageRange: number = 1

  public async onChangePage(page: number) {
    if (this.isLoading) return
    if (page <= this.getMeta.total_pages && page >= 1) {
      this.$store.commit('Media/setLoading', true)
      this.$store.commit('Media/setSelectedFilter', { key: 'page', value: page })
      this.scrollToStartContainer()
      await this.$store.dispatch('Media/fetchArticlesList')
      this.$store.commit('Media/setLoading', false)
    }
  }

  public scrollToStartContainer() {
    const $articleContainerContent = this.$refs.articleContainerContent as Element

    if ($articleContainerContent) {
      this.$scrollTo($articleContainerContent, 500, { offset: -200 })
    }
  }

  get isLoading(): MediaState['loading'] {
    return this.$store.getters['Media/getLoading']
  }

  get getMeta(): IResponseMeta['meta']['pagination'] {
    return (this.$store.getters['Media/getMeta'] as IResponseMeta['meta']).pagination
  }

  get pages(): Array<number> {
    const pages = []

    for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
      pages.push(i)
    }

    return pages
  }

  get rangeStart(): number {
    const start = this.getMeta.current_page - this.pageRange
    return start > 0 ? start : 1
  }

  get rangeEnd(): number {
    const end = this.getMeta.current_page + this.pageRange
    return end < this.getMeta.total_pages ? end : this.getMeta.total_pages
  }

  get nextPage(): number {
    return this.getMeta.current_page + 1
  }

  get prevPage(): number {
    return this.getMeta.current_page - 1
  }

  get hasFirst(): boolean {
    return this.rangeStart !== 1
  }

  get hasLast(): boolean {
    return this.rangeEnd < this.getMeta.total_pages
  }

  get hasPrev(): boolean {
    return this.getMeta.current_page > 1
  }

  get hasNext(): boolean {
    return this.getMeta.current_page < this.getMeta.total_pages
  }
}
</script>

<style lang="sass" module>
.media-list
  width: 100%
  display: flex
  flex-direction: column
  margin: 0 auto
  max-width: 1200px
  padding: 0 24px
  position: relative

  &__container
    display: grid
    grid-template-columns: minmax(264px, 560px) minmax(264px, 264px) minmax(264px, 264px)
    grid-gap: 48px 32px
    grid-auto-rows: 500px

    @media (max-width: 1023px)
      grid-template-columns: 1fr 1fr

    @media (max-width: 760px)
      grid-template-columns: 1fr

    img
      width: 100%
      height: 1%

  &__overlay
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    background-color: $color-white-40
    z-index: 1
    opacity: 0
    pointer-events: none
    transition: opacity 0.25s ease

    &--show
      opacity: 1
      pointer-events: auto

  &__header
    display: flex
    justify-content: space-between
    margin-top: 128px
    margin-bottom: 64px

    @media (max-width: 760px)
      margin: 64px 0
      flex-direction: column

    &-title
      margin: 0 0 32px 0
      +desktop-text-style-5
      color: $color-black-56

    &-description
      +desktop-text-style-5
      margin: 0
      max-width: 560px

  &__category
    display: flex
    flex-direction: column
    grid-gap: 32px
    border-bottom: solid 1px $color-black-8
    padding-bottom: 17px

    &-list
      +desktop-text-style-6
      display: flex
      max-width: 270px
      justify-content: space-between

      div
        cursor: pointer

  &__footer
    display: flex
    margin-top: 64px
    justify-content: flex-end

    @media (max-width: 760px)
      flex-direction: column
      align-items: center

    &-buttons
      display: flex
      grid-gap: 32px
      margin-right: 177px

      @media (max-width: 760px)
        margin-right: 0
        grid-gap: 16px

    &-prev,
    &-next
      display: flex
      justify-content: center
      align-items: center
      height: 125px
      width: 125px
      border-radius: 50%
      +desktop-text-style-5
      padding: 6px
      line-height: 24px
      color: $color-white-100
      background-color: $color-blue-100
      text-align: center
      cursor: pointer
      transition: background-color 0.25s ease

      &--disabled
        background-color: $color-black-16

    &-pagination
      display: flex
      align-items: center
      max-width: 294px
      width: 100%

      &-list
        display: flex
        list-style: none
        padding: 0
        height: fit-content
        justify-content: space-between
        width: 100%

      &-item
        +desktop-text-style-5
        color: $color-black-88
        display: flex
        align-items: center
        padding: 5px 10px
        cursor: default

        &[data-cursor-pointer]
          cursor: pointer

        &--current,
        &[data-cursor-pointer]:hover
          color: $color-blue-88

          svg
            fill: $color-blue-88

        &--disabled
          color: $color-black-56
          pointer-events: none

          svg
            fill: $color-black-56

        svg
          height: 18px
          width: 18px
</style>
