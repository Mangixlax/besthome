<template lang="pug">
  modal-container(
    v-bind="$attrs"
    :name="name"
    full
  )
    template(slot="header")
      div(:class="$style['header']")
        typo-text(
          version="style-5"
          tag="div"
          :class="$style['header__tower']"
        )
          | {{ $t('pages.apartments.block') }}
          typo-text(
            version="style-4"
            tag="div"
          ) {{ localSelectedFloor.block.name }}
        typo-text(
          version="style-5"
          tag="div"
          :class="$style['header__floor']"
        )
          | {{ $t('pages.apartments.floor') }}
          typo-text(
            version="style-4"
            tag="div"
          ) {{ localSelectedFloor.number }}
        div(:class="$style['header__floor-changer']")
          svg-icon(
            name="modals/arrow-up"
            :class="{\
              [$style['header__floor-changer-up']]: true,\
              [$style['disabled']]: selectedFloorIndex === getMaxFloorIndex()\
            }"
            @click="onChangeFloorUp"
          )
          svg-icon(
            name="modals/arrow-up"
            :class="{\
              [$style['header__floor-changer-down']]: true,\
              [$style['disabled']]: selectedFloorIndex === 0\
            }"
            @click="onChangeFloorDown"
          )
    template(slot="body")
      div(
        v-if="localSelectedFloor.floor_plan && localSelectedFloor.floor_plan.data && localSelectedFloor.floor_plan.data.files.length"
        ref="content"
        :class="$style['floor__content']"
        @mousemove="onMouseMove"
      ) 
        div(v-if="slides.length > 1")
          button(:class="[$style['slider-button-prev']]" @click.prevent="changeSlideIndexToPrev")
            svg-icon(name="slider-prev-arrow-blue")
          button(:class="[$style['slider-button-next']]" @click.prevent="changeSlideIndexToNext")
            svg-icon(name="slider-next-arrow-blue")
        img(:src="localSelectedFloor.floor_plan.data.files[currentSlideIndex].plan" loading="lazy")
        div(:class="$style['floor__content-svg']" v-html="localSelectedFloor.floor_plan.data.files[currentSlideIndex].svg_mask")
      div(:class="$style['floor__footer']")
        div(
          ref="miniature"
          :class="$style['floor__footer-miniature']"
          v-html="selectedProject.miniature_html"
        )
        div(:class="[$style['floor__footer-miniature'], $style['floor__footer-miniature--orientation']]")
          svg-icon(name="modals/orientation")
      div(
        :class="[$style['floor__tooltip'], tooltip.show && $style['floor__tooltip--show']]"
        :style="tooltip.styles"
      )
        div(:class="$style['floor__tooltip-name']") {{ tooltip.name }}
        div(:class="$style['floor__tooltip-line']")
          div(:class="$style['floor__tooltip-line-block']") {{ $t('pages.apartments.status') }}
          div(:class="$style['floor__tooltip-line-block']")
            div(:class="[$style['status'], tooltip.status === 1 && $style['status--available']]") {{ $t('pages.apartments.status_' + tooltip.status) }}
        div(v-if="tooltip.price" :class="$style['floor__tooltip-line']")
          div(:class="$style['floor__tooltip-line-block']") {{ $t('pages.apartments.price') }}
          div(:class="$style['floor__tooltip-line-block']") {{ tooltip.price }} €
        div(v-if="tooltip.area" :class="$style['floor__tooltip-line']")
          div(:class="$style['floor__tooltip-line-block']") {{ $t('pages.apartments.area') }}
          div(:class="$style['floor__tooltip-line-block']") {{ tooltip.area }}m²
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import ModalContainer from '~/components/Modal/base/ModalContainer.vue'
import TypoText from '~/components/Base/TypoText.vue'
import { IProject, IProjectApartment, IProjectFloor } from '~/store/Catalog'
import { delay } from '~/lib/utils'

interface ITooltip {
  name: string
  status: number
  price: string
  area: string
  styles: {
    top: string
    left: string
  }
  show: boolean
}

interface IApartmentMatch {
  apartmentId: string | number
}

@Component({
  components: { TypoText, ModalContainer },
})
export default class HeroBuildingModalFloors extends Vue {
  @Prop({ type: String, default: '' }) name!: string
  @Prop({ type: Array, default: '' }) floors!: IProjectFloor[]
  @Prop({ type: Object, default: '' }) selectedFloor!: IProjectFloor

  public swiperOption: Object = {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 128,
    pagination: {
      el: '.swiper-pagination-progressbar',
      type: 'progressbar',
    },
    watchOverflow: true,
  }

  public localSelectedFloor: IProjectFloor = { ...this.selectedFloor }

  public selectedFloorIndex: number = 0

  public tooltip: ITooltip = {
    name: '',
    status: 1,
    price: '',
    area: '',
    styles: {
      top: '0px',
      left: '0px',
    },
    show: false,
  }

  public $apartments: any = []

  public slides: Array<any> = []
  public currentSlideIndex: number = 0
  public nextSlideIndex: number = 1

  mounted() {
    this.onChangeLocalSelectedFloor()
  }

  beforeDestroy() {
    this._beforeDestroy()
  }

  _beforeDestroy() {
    ;(this.$apartments || []).forEach((el: Element) => {
      el.removeEventListener('click', this.onClickToApartment)
      el.removeEventListener('mouseenter', this.onMouseEnterToApartment)
      el.removeEventListener('mouseleave', this.onMouseLeaveFromApartment)
    })

    this.cleanTooltip()
  }

  public apartmentMatching(apartmentId: string): IApartmentMatch {
    const apartmentMatch = /^apartment-(\d+)$/m.exec(apartmentId)

    if (apartmentMatch !== null && (apartmentMatch || []).length === 2) {
      return { apartmentId: apartmentMatch[1] }
    }

    return {
      apartmentId: '',
    }
  }

  public getApartmentDataById(elementId: string = ''): Promise<IProjectApartment> {
    return new Promise((resolve, reject) => {
      const apartmentMatch: IApartmentMatch = this.apartmentMatching(elementId || '')

      if (apartmentMatch.apartmentId) {
        const apartments = this.localSelectedFloor.apartments || []
        const apartmentIndex = apartments.findIndex((apartment: IProjectApartment) => {
          return apartment.id.toString() === apartmentMatch.apartmentId.toString()
        })

        if (apartmentIndex !== -1) {
          resolve(apartments[apartmentIndex])
        } else {
          reject()
        }
      }
    })
  }

  public onClickToApartment(event: Event) {
    if (event.target) {
      const target: Element = event.target as Element
      this.getApartmentDataById(target.id)
        .then(async (apartment: IProjectApartment) => {
          // Can go to apartment page if apartment have a status 4 (SOLD)
          if (apartment.status !== 4) {
            this.$store.commit('PageTransition/animate', true)
            await this.$router.push(
              this.localePath({
                name: 'properties-slug-apartments-id',
                params: {
                  slug: this.selectedProject.slug,
                  id: apartment.id.toString(),
                },
              }),
            )
            await delay(500)
            this.$modal.hide(this.name)
          }
        })
        .catch(() => {})
    }
  }

  public onMouseEnterToApartment(event: Event) {
    if (event.target && window.innerWidth > 700) {
      const target: Element = event.target as Element
      this.getApartmentDataById(target.id)
        .then((apartment: IProjectApartment) => {
          this.tooltip.show = true
          this.tooltip.name = apartment.name.toString()
          this.tooltip.status = apartment.status
          this.tooltip.area = apartment.area.toString()
          this.tooltip.price = apartment.price.toString()
        })
        .catch(() => {})
    }
  }

  public onMouseLeaveFromApartment(event: Event) {
    if (event.target && window.innerWidth > 700) {
      this.tooltip.show = false
    }
  }

  public checkAvailableApartments(el: Element) {
    this.getApartmentDataById(el.id)
      .then((apartment: IProjectApartment) => {
        if (apartment.status === 1) {
          el.classList.remove(this.$style['disabled'])
        }

        if (apartment.status === 4) {
          el.classList.add(this.$style['disabled'])
        }
      })
      .catch(() => {
        el.classList.add(this.$style['disabled'])
      })
  }

  public cleanTooltip() {
    this.tooltip.name = ''
    this.tooltip.status = 1
    this.tooltip.area = ''
    this.tooltip.price = ''
    this.tooltip.show = false
  }

  public onMouseMove(event: MouseEvent) {
    if (this.$refs.content) {
      this.tooltip.styles.left = `${event.clientX}px`
      this.tooltip.styles.top = `${
        event.clientY - (this.$refs.content as Element).getBoundingClientRect().top + 10
      }px`
    }
  }

  @Watch('localSelectedFloor')
  async onChangeLocalSelectedFloor() {
    await this.$nextTick()
    this._beforeDestroy()

    this.slides = this.localSelectedFloor.floor_plan.data.files

    this.$apartments = (this.$refs.content as Element).querySelectorAll('[id*=apartment-]')
    ;(this.$apartments || []).forEach((el: Element) => {
      el.addEventListener('click', this.onClickToApartment)
      el.addEventListener('mouseenter', this.onMouseEnterToApartment)
      el.addEventListener('mouseleave', this.onMouseLeaveFromApartment)
      this.checkAvailableApartments(el)
    })

    this.selectedFloorIndex = this.getSelectedFloorIndex()

    if (this.$refs.miniature) {
      ;(
        (this.$refs.miniature as Element).querySelectorAll('.' + this.$style['selected']) || []
      ).forEach((el: Element) => {
        el.classList.remove(this.$style['selected'])
      })

      const polygon: Element = (this.$refs.miniature as Element).querySelector(
        `#bfloor-${this.localSelectedFloor.block?.name.toLowerCase()}-${
          this.localSelectedFloor.number
        }`,
      ) as Element

      if (polygon) {
        polygon.classList.add(this.$style['selected'])
      }
    }
  }

  get selectedProject(): IProject {
    return this.$store.getters['Catalog/getProject']
  }

  public getSelectedFloorIndex(): number {
    return (this.floors || []).findIndex((floor: IProjectFloor) => {
      return floor.id === this.localSelectedFloor.id
    })
  }

  public getMaxFloorIndex(): number {
    return (this.floors || []).length - 1
  }

  public setSelectedFloor(floorIndex: number) {
    this.$set(this, 'localSelectedFloor', this.floors[floorIndex])
  }

  public onChangeFloorUp() {
    this.currentSlideIndex = 0
    const selectedFloorIndex = this.getSelectedFloorIndex()

    if (selectedFloorIndex + 1 <= this.getMaxFloorIndex()) {
      this.setSelectedFloor(selectedFloorIndex + 1)
    }
  }

  public onChangeFloorDown() {
    this.currentSlideIndex = 0
    const selectedFloorIndex = this.getSelectedFloorIndex()

    if (selectedFloorIndex - 1 >= 0) {
      this.setSelectedFloor(selectedFloorIndex - 1)
    }
  }

  public changeSlideIndexToNext() {
    const currentSlideIndex = this.currentSlideIndex + 1
    const nextSlideIndex = currentSlideIndex + 1

    if (currentSlideIndex >= this.slides.length) {
      this.currentSlideIndex = 0
      this.nextSlideIndex = 1
    } else {
      this.currentSlideIndex = currentSlideIndex

      if (nextSlideIndex >= this.slides.length) {
        this.nextSlideIndex = 0
      } else {
        this.nextSlideIndex = nextSlideIndex
      }
    }
    this.onChangeLocalSelectedFloor()
  }

  public changeSlideIndexToPrev() {
    const currentSlideIndex = this.currentSlideIndex - 1
    const nextSlideIndex = currentSlideIndex - 1

    if (currentSlideIndex < 0) {
      this.currentSlideIndex = this.slides.length - 1
      this.nextSlideIndex = 0
    } else {
      this.currentSlideIndex = currentSlideIndex

      if (nextSlideIndex < 0) {
        this.nextSlideIndex = this.slides.length - 1
      } else {
        this.nextSlideIndex = nextSlideIndex
      }
    }
    this.onChangeLocalSelectedFloor()
  }
}
</script>

<style lang="sass" module>
@keyframes opacity
  0%
    opacity: 0
  100%
    opacity: 1

.status
  +style-10
  color: $color-white-100
  background-color: $color-black-100
  padding: 6px 12px
  text-transform: uppercase

  &--available
    background-color: $color-blue-72

.floor__tooltip
  padding: 56px
  position: absolute
  box-shadow: 0 40px 60px rgba(25, 26, 26, 0.1)
  background-color: #fff
  min-width: 350px
  opacity: 0
  will-change: opacity
  pointer-events: none
  transition: opacity 0.25s ease

  @media (max-width: 700px)
    min-width: 280px
    max-width: 280px

  &--show
    opacity: 1

  &-name
    +style-4
    padding: 0 8px 16px

  &-line
    display: flex
    justify-content: space-between
    padding: 8px

    & + &
      border-top: 1px solid $color-black-4

    &-block
      +style-6

.floor__content
  position: absolute
  top: 0
  width: 100%
  height: 100%

  img
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    height: 100vh
    max-height: 100%
    max-width: 100%
    pointer-events: none

  &-svg
    svg
      height: 100vh
      max-height: 100%
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      width: 100%

      polygon
        fill: $color-blue-56
        transition: fill 0.25s ease

        &:hover
          fill: $color-blue-80
          cursor: pointer

        &.disabled
          fill: $color-black-32
          cursor: default

      path
        fill: $color-blue-56
        transition: fill 0.25s ease

        &:hover
          fill: $color-blue-80
          cursor: pointer

        &.disabled
          fill: $color-black-32
          cursor: default

.floor__footer
  transition: all .3s ease 0s
  display: flex
  position: absolute
  left: 0
  right: 0
  bottom: 0
  z-index: 100
  justify-content: space-between
  width: 100%
  padding: 0 45px 45px

  @media (max-width: 700px)
    padding: 0 24px 24px

  &-miniature
    display: flex

    svg
      max-height: 60px
      height: 100%

      polygon.selected
        fill: $color-blue-80

    &--orientation svg
      height: 57px
      width: 106px

.header
  display: flex
  justify-content: center
  height: 96px

  &__tower, &__floor
    color: $color-black-100
    border-right: 1px solid $color-black-16
    display: flex
    flex-direction: column
    justify-content: center
    padding-right: 32px

  &__floor
    padding-left: 32px
    border: none

    &-changer
      display: flex
      align-items: center

      &-up, &-down
        display: flex

      &-down
        transform: rotate(180deg)
        margin-left: 32px

        @media (max-width: 700px)
          margin-left: 16px

      &-up,
      &-down
        transition: opacity .25s ease 0s
        opacity: 1
        width: 48px
        height: 48px
        cursor: pointer
        user-select: none

      &-up.disabled,
      &-down.disabled
        opacity: .5
        cursor: default

.slider-button-prev
  position: absolute
  top: 50%
  left: 10%
  transform: translate(-50%, -50%)
  display: block
  margin-right: auto
  outline: none
  padding: 0
  background-color: transparent
  border: none
  cursor: pointer
  z-index: 100

  @media (max-width: 1023px)
    top: 80%
    left: 20%

  svg
    width: 96px
    height: 96px

    @media (max-width: 1023px)
      height: 76px
      width: 76px

.slider-button-next
  position: absolute
  top: 50%
  left: 90%
  transform: translate(-50%, -50%)
  display: block
  margin-right: auto
  outline: none
  padding: 0
  background-color: transparent
  border: none
  cursor: pointer
  z-index: 100

  @media (max-width: 1023px)
    top: 80%
    left: 80%

  svg
    width: 96px
    height: 96px

    @media (max-width: 1023px)
      height: 76px
      width: 76px
</style>
