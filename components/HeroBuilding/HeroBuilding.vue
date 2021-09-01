<template lang="pug">
  section(
    :class="$style['hero']"
    ref="hero"
    @mousemove="onMouseMove"
  )
    div(:class="$style['hero__container']")
      div(:class="$style['hero__image']")
        img(
          v-if="data.desktop_image"
          ref="image"
          :src="data.desktop_image"
          :class="$style['hero__image-desktop']"
          loading="lazy"
        )
        img(
          v-if="data.mobile_image"
          :src="data.mobile_image"
          :class="$style['hero__image-mobile']"
          loading="lazy"
        )
        div(
          v-if="data.svg_html"
          ref="container"
          :class="[$style['hero__image-svg'], 'hero__image-svg']"
          v-html="data.svg_html"
        )
    div(
      :class="{\
        [$style['tooltip']]: true,\
        [$style['tooltip--show']]: tooltip.title.length && tooltip.styles.left !== '0px',\
        [$style['tooltip--disabled']]: tooltip.available <= 0,\
      }"
      :style="tooltip.styles"
    )
      div(:class="$style['tooltip__title']" v-html="tooltip.title")
      div(:class="$style['tooltip__text']" v-html="tooltip.text")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { IProjectFloor } from '~/store/Catalog'
import { modalsTriggerMixin } from '~/mixins/modals'

interface IHeroBuilding {
  type: number
  svg_html?: string
  desktop_image?: string
  mobile_image?: string
}

interface ITooltip {
  title: string
  text: string
  available: number
  styles: {
    top: string
    left: string
  }
}

interface IFloorMatch {
  blockName: string
  floorNumber: string | number
}

@Component({
  mixins: [modalsTriggerMixin],
})
export default class HeroBuilding extends Vue {
  @Prop({ type: Object, default: () => {} }) data!: IHeroBuilding

  public $floors: any = []
  public $blocks: any = []

  public tooltip: ITooltip = {
    title: '',
    text: '',
    available: 0,
    styles: {
      top: '0px',
      left: '0px',
    },
  }

  async mounted() {
    await this.$nextTick()
    this.$floors = (this.$refs.container as Element).querySelectorAll('[data-id*=bfloor-]')
    this.$blocks = (this.$refs.container as Element).querySelectorAll('[data-id*=block]')
    ;(this.$floors || []).forEach((el: Element) => {
      el.addEventListener('click', this.onClickToFloor)
      el.addEventListener('mouseenter', this.onMouseEnterToFloor)
      el.addEventListener('mouseleave', this.onMouseLeaveFromFloor)
      this.checkAvailableApartments(el)
    })
    ;(this.$blocks || []).forEach((el: Element) => {
      el.addEventListener('click', this.onClickToBlock)
    })
  }

  beforeDestroy() {
    ;(this.$floors || []).forEach((el: Element) => {
      el.removeEventListener('click', this.onClickToFloor)
      el.removeEventListener('mouseenter', this.onMouseEnterToFloor)
      el.removeEventListener('mouseleave', this.onMouseLeaveFromFloor)
    })
    ;(this.$blocks || []).forEach((el: Element) => {
      el.removeEventListener('click', this.onClickToBlock)
    })

    this.cleanTooltip()
  }

  public onClickToBlock(event: Event) {
    if (event.target) {
      // @ts-ignore
      const floors = [...this.$store.getters['Catalog/getProject'].floors]
      this.showModal({
        name: 'modal-hero-building-choose-floors',
        modal: () => import('@/components/HeroBuilding/HeroBuildingModalFloors.vue'),
        props: {
          floors: floors.sort((a: any, b: any) => {
            return a.number - b.number
          }),
          selectedFloor: floors.length ? floors[0] : {},
        },
        options: {
          width: '100%',
          height: '100%',
          pivotY: 0,
          pivotX: 0,
        },
      })
    }
  }

  public onClickToFloor(event: Event) {
    if (event.target) {
      const target: Element = event.target as Element
      this.getFloorDataById(target.id || '').then((floor: IProjectFloor) => {
        // @ts-ignore
        const floors = [...this.$store.getters['Catalog/getProject'].floors]
        this.showModal({
          name: 'modal-hero-building-choose-floors',
          modal: () => import('@/components/HeroBuilding/HeroBuildingModalFloors.vue'),
          props: {
            floors: floors.sort((a: any, b: any) => {
              return a.number - b.number
            }),
            selectedFloor: floor,
          },
          options: {
            width: '100%',
            height: '100%',
            pivotY: 0,
            pivotX: 0,
          },
        })
      })
    }
  }

  public onMouseMove(event: MouseEvent) {
    if (this.$refs.hero) {
      this.tooltip.styles.left = `${event.clientX}px`
      this.tooltip.styles.top = `${
        event.clientY - (this.$refs.hero as Element).getBoundingClientRect().top + 10
      }px`
    }
  }

  public floorMatching(floorId: string): IFloorMatch {
    const floorMatch = /^bfloor-(.*)-(\d+)$/m.exec(floorId)

    if (floorMatch !== null && (floorMatch || []).length === 3) {
      return { blockName: floorMatch[1], floorNumber: floorMatch[2] }
    }

    return {
      blockName: '',
      floorNumber: '',
    }
  }

  public isFloorNotEmpty(floor: IFloorMatch): boolean {
    return (
      Object.keys(floor).length > 0 &&
      floor.blockName !== '' &&
      (floor.floorNumber || '').toString() !== ''
    )
  }

  public getFloorDataById(elementId: string = ''): Promise<IProjectFloor> {
    return new Promise((resolve) => {
      const floorMatch = this.floorMatching(elementId || '')

      if (this.isFloorNotEmpty(floorMatch)) {
        const floors = this.$store.getters['Catalog/getProject'].floors || []
        const floorIndex = floors.findIndex((floor: IProjectFloor) => {
          return (
            floor.number.toString() === floorMatch.floorNumber.toString() &&
            (floor.block?.name || '').toLowerCase() === floorMatch.blockName.toLowerCase()
          )
        })

        if (floorIndex !== -1) resolve(floors[floorIndex])
      }
    })
  }

  public checkAvailableApartments(el: Element) {
    this.getFloorDataById(el.id).then((floor: IProjectFloor) => {
      if (floor.available_apartments_count > 0) {
        el.classList.remove('disabled')
      } else {
        el.classList.add('disabled')
      }
    })
  }

  public onMouseEnterToFloor(event: Event) {
    if (event.target) {
      const target: Element = event.target as Element
      this.getFloorDataById(target.id).then((floor: IProjectFloor) => {
        if (floor.number === 0) {
          this.tooltip.title = this.$t('hero_building.ground').toString()
        } else {
          this.tooltip.title = `${floor.number} ${this.$t('hero_building.tooltip')}`
        }
        this.tooltip.text = this.$t('pages.apartments.nth', [
          floor.available_apartments_count,
        ]) as string
        this.tooltip.available = floor.available_apartments_count
      })
    }
  }

  public onMouseLeaveFromFloor(event: Event) {
    if (event.target) {
      this.cleanTooltip()
    }
  }

  public cleanTooltip() {
    this.tooltip.title = ''
    this.tooltip.text = ''
  }
}
</script>

<style lang="sass" module>
.tooltip
  z-index: 9
  display: none
  position: absolute
  max-width: 150px
  padding: 10px
  background-color: $color-blue-100
  pointer-events: none

  &--show
    display: block

  &--disabled
    background-color: #d74e3a

  &__title
    color: $color-white-100
    +style-5

  &__text
    color: $color-white-100
    +style-8

.hero
  position: relative
  overflow: hidden
  background-position: 50%
  background-size: cover
  padding: 24px

  &__container
    position: relative
    padding-bottom: 53%
    height: auto
    min-height: 0

  &__image
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%

    &-desktop,
    &-mobile
      width: 100%

    &-desktop
      @media (max-width: 832px)
        display: none

    &-mobile
      @media (min-width: 832px)
        display: none

    &-svg
      position: absolute
      bottom: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 9
</style>

<style lang="sass">
.hero__image-svg
  polygon, path
    transition: all .3s ease 0s
    opacity: 0
    cursor: pointer
    fill: rgba(0, 102, 204, 0.24)
    fill-opacity: 1
    stroke: #0066CC

    &:hover
      opacity: 1

    &[class*=disabled]
      cursor: default
      fill: rgba(215,78,58,.5)
      stroke: #d74e3a

  [data-id*=block]
    fill: transparent
    stroke: #1c6344

    @media (min-width: 832px)
      display: none
</style>
