<template lang="pug">
  div(
    :class="[ $style['range'], borderRadiusFull ? $style['border-radius-full'] : '', borderRadiusLeft ? $style['border-radius-left'] : '', borderRadiusRight ? $style['border-radius-right'] : '', darkMode && $style['dark-mode']]"
    class="filter-range"
    @click="console"
 
  )
    div(:class="[$style['range-wrap'],isStartDrag || isFocusMaxInput || isFocusMinInput ? $style['focus-block'] : '',]"
    )
      div(
        v-if="title"
        :class="$style['range__title']"
      )
        span {{ title }}
      div(
        v-if="rangeMode"
        :class="$style['range__slider']"
      )
        client-only
          vue-slider(
            ref="slider"
            v-model="currencyValues"
            :enable-cross="false"
            :min="Number(minRangeValue)"
            :max="Number(maxRangeValue)"
            :height="1"
            tooltip="none"
            :interval="intervalValue"
            @drag-start="dragStart"
            @drag-end="dragEnd"
            @dragging="dragging"
            dotSize="15"
          )
            template(v-slot:dot="{ focus }")
              div(:class="[$style['custom-dot'], focus && $style.focus]")
            template(v-slot:process="{ start, end, style, index }")  
              div(:class="$style['custom-process']")
      div(:class="$style['range__block-list']")
        div(
          v-if="rangeFrom"
          :class="$style['range__block']"
        )
          div(:class="$style['range__block-input']")
            input(
              v-show="isFocusMinInput"
              v-model="localCurrencyInputValues[0]"
              ref="minValue"
              type="number"
              @blur="blurMinInput"
              :style="{ width: 100 + '%' }"
            )
            div(
              v-show="!isFocusMinInput"
              :class="$style['range__block-input-fake']"
              @click.prevent="focusMinInput"
              :style="{ width: 100 + '%' }"
            )
              fragment(v-if="formatNumberMode")
                span(v-if="currencyValues[0] >= 0")
                |  {{ formatNumber(currencyValues[0]) }}
              fragment(v-else)
                span {{ currencyValues[0] }}
          div(:class="$style['range__block-caption']")
            span {{ rangeFrom }}
        div(
          v-if="rangeTo"
          :class="$style['range__block']"
        )
          div(:class="$style['range__block-input']")
            input(
              v-show="isFocusMaxInput"
              v-model="localCurrencyInputValues[1]"
              ref="maxValue"
              type="number"
              @blur="blurMaxInput"
              :style="{ width: 100 + '%' }"
            )
            div(
              v-show="!isFocusMaxInput"
              :class="$style['range__block-input-fake']"
              @click.prevent="focusMaxInput"
              :style="{ width: 100 + '%' }"
            )
              fragment(v-if="formatNumberMode")
                span(v-if="currencyValues[1] >= 0")
                |  {{ formatNumber(currencyValues[1]) }}
              fragment(v-else)
                span {{ currencyValues[1] }}
          div(:class="$style['range__block-caption']")
            span {{ rangeTo }}
        div(
          v-if="dimension"
          :class="$style['range__block-dimension']"
        )
          span(ref="dimension")
</template>

<script>
export default {
  name: 'CatalogFilterRange',
  props: {
    // темная тема
    darkMode: {
      type: Boolean,
      default: false,
    },
    rangeFrom: {
      // Подпись к минимальному значению слайдера
      type: String,
      default: '',
    },
    rangeTo: {
      // Подпись к максимальному значению слайдера
      type: String,
      default: '',
    },
    minRangeValue: {
      // Минимальное значение слайдера
      type: [String, Number],
      default: '',
    },
    maxRangeValue: {
      // Максимальное значение слайдера
      type: [String, Number],
      default: '',
    },
    startMinValue: {
      // Минимальное значение слайдера
      type: [String, Number],
      default: null,
    },
    startMaxValue: {
      // Максимальное значение слайдера
      type: [String, Number],
      default: null,
    },
    interval: {
      // Интервал, с которым будет изменяться значение слайдера
      type: [String, Number],
      default: 100,
    },
    dimension: {
      // Единицы измерения значения
      type: String,
      default: '',
    },
    rangeMode: {
      // Определяет будет ли появляться слайдер при ховере на блок
      type: Boolean,
      default: false,
    },
    formatNumberMode: {
      // Определяет, будет ли значение разбиваться на разряды (ХХХ ХХХ ХХХ)
      type: Boolean,
      default: false,
    },
    inputWidth: {
      // Ширина полей, в основном от неё зависит размер всего блока. По умолчанию, ширина полей 64px
      type: [String, Number],
      default: 64,
    },
    title: {
      // Заголовок над блоком
      type: String,
      default: '',
    },
    updateKey: {
      type: String,
      default: '',
    },
    borderRadiusRight: {
      // Закругление правых углов блока
      type: Boolean,
      default: false,
    },
    borderRadiusLeft: {
      // Закругление левых углов блока
      type: Boolean,
      default: false,
    },
    borderRadiusFull: {
      // Закругление всех углов блока
      type: Boolean,
      default: false,
    },
    moveAdjacentPoint: {
      type: [Number, String],
      default: 6,
    },
  },
  data() {
    return {
      isStartDrag: false,
      isFocusMinInput: false,
      isFocusMaxInput: false,
      currentMinValue: this.minRangeValue,
      currentMaxValue: this.maxRangeValue,
      intervalValue: this.interval,
      // Общие изменения для значений в полях и слайдере
      currencyValues: [0, 0],
      // Локальные изменения для значений в полях
      localCurrencyInputValues: [0, 0],
    }
  },
  methods: {
    console() {
      console.log(this.moveAdjacentPoint)
    },
    insertDimensionAsHTML() {
      /**
       * Функция принимает props с типом String, преобразует его в HTML разметку
       * и вставляет в $refs.dimension после открывющегося тега
       */
      if (this.dimension) {
        this.$refs.dimension.insertAdjacentHTML('afterbegin', this.dimension)
      }
    },
    formatNumber(num) {
      // Добавленине разрядности
      if (typeof num === 'string') {
        return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
      } else {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
      }
    },
    setRangeValues() {
      /**
       * Изменение массива с текущими выводимыми значениями
       */
      this.currencyValues.splice(
        0,
        2,
        this.startMinValue || this.currentMinValue,
        this.startMaxValue || this.currentMaxValue,
      )
      this.localCurrencyInputValues = [...this.currencyValues]
    },
    dragStart() {
      this.isStartDrag = true
    },
    dragEnd() {
      this.isStartDrag = false
      this.onUpdateValue()
    },
    /**
     * Перемещаем соседнюю точку и меняем ее значение
     *
     * @param value - значение из слайдера
     * @param handleIndex - индекс выбранной точки
     * @returns {boolean}
     */
    dragging(value, handleIndex) {
      const min = this.minRangeValue
      const min_range = this.moveAdjacentPoint
      const max = this.maxRangeValue
      const values = value

      if (handleIndex === 0) {
        if (values[0] + min_range >= values[1]) {
          values[1] = values[0] + min_range
        }
        if (values[0] > max - min_range) {
          return false
        }
      } else if (handleIndex === 1) {
        if (values[1] - min_range <= values[0]) {
          values[0] = values[1] - min_range
        }
        if (values[1] < min + min_range) {
          return false
        }
      }

      this.currencyValues = values
      this.localCurrencyInputValues = values
      this.$refs.slider.setValue(values)
    },
    async focusMinInput() {
      /**
       * Фокус на поле с минимальным значением. При фокусе, поле для вводимых значений становится активным
       * и на него устанавливается фокус
       */
      if (this.isFocusMinInput) return
      this.isFocusMinInput = true
      await this.$nextTick()
      this.$refs.minValue.focus()
    },
    blurMinInput() {
      setTimeout(() => {
        this.isFocusMinInput = false
      }, 100)

      if (
        this.localCurrencyInputValues[0] === '' ||
        Number(this.localCurrencyInputValues[0]) < this.minRangeValue ||
        Number(this.localCurrencyInputValues[0]) > Number(this.localCurrencyInputValues[1])
      ) {
        this.currencyValues[0] = this.minRangeValue
        this.localCurrencyInputValues[0] = this.minRangeValue
      } else {
        this.currencyValues = [...this.localCurrencyInputValues]
      }

      this.onUpdateValue()
    },
    async focusMaxInput() {
      /**
       * Фокус на поле с максимальным значением. При фокусе, поле для вводимых значений становится активным
       * и на него устанавливается фокус
       */
      if (this.isFocusMaxInput) return
      this.isFocusMaxInput = true
      await this.$nextTick()
      this.$refs.maxValue.focus()
    },
    blurMaxInput() {
      setTimeout(() => {
        this.isFocusMaxInput = false
      }, 100)

      if (!this.rangeMode && this.rangeTo) {
        this.currencyValues[1] = this.localCurrencyInputValues[1]
      } else {
        if (
          this.localCurrencyInputValues[1] === '' ||
          Number(this.localCurrencyInputValues[1]) < Number(this.localCurrencyInputValues[0]) ||
          Number(this.localCurrencyInputValues[1]) > this.maxRangeValue
        ) {
          this.currencyValues[1] = this.maxRangeValue
          this.localCurrencyInputValues[1] = this.maxRangeValue
        } else {
          this.currencyValues = [...this.localCurrencyInputValues]
        }
      }

      this.onUpdateValue()
    },
    onUpdateValue() {
      if (!this.rangeMode && this.updateKey) {
        this.$emit('change', { key: this.updateKey, values: this.currencyValues })
      } else {
        this.$emit('change', this.currencyValues)
      }
    },
    updateCurrencyValues() {
      this.currencyValues = this.localCurrencyInputValues
    },
    onClickComponent() {
      if (!this.rangeMode && this.rangeTo && !this.rangeFrom) {
        this.focusMaxInput()
      }
    },
  },
  mounted() {
    /**
     * При монтировании компонента запускаем функцию setRangeValues(), что бы установить
     * минимальное и максимальное начальное значение, в зависимости от props
     */
    this.setRangeValues()
    this.insertDimensionAsHTML()
  },
  watch: {
    currentMinValue() {
      /**
       * При изменении значения в поле "Минимальное значение", пересчитываем массив с текущими значениями
       */
      this.setRangeValues()
    },
    currentMaxValue() {
      /**
       * При изменении значения в поле "Максимальное значение", пересчитываем массив с текущими значениями
       */
      this.setRangeValues()
    },
  },
}
</script>

<style lang="sass" module>
.range
  position: relative
  height: 98px

  &-wrap
    display: flex
    flex-direction: column
    align-items: flex-start
    position: relative
    white-space: nowrap
    transition: background-color 0.3s ease
    cursor: default

    &:hover .range,
    &.focus-block .range
      &__slider
        opacity: 1

    &.focus-block
      .range
        &:hover
          border: 1px solid transparent

        &__block
          &-list
            &:hover
              &:before
                border: 1px solid transparent

          &-input-fake span
            color: rgba(25, 31, 46, 0.88)

  span
    +style-9
    color: $color-white-56
    transition: color 0.3s ease
    position: relative

  &__title
    margin-bottom: 9px

    span
      +style-7
      color: $color-white-100


  &__block
    display: flex
    flex-flow: row nowrap
    align-items: flex-start
    justify-content: center
    padding: 4px
    position: relative
    z-index: 1
    max-width: 88px
    width: 100%
    grid-gap: 2px
    border-bottom: solid 1px $color-white-16

    &-list
      display: flex
      flex-flow: row nowrap
      justify-content: space-between
      height: 100%
      grid-gap: 10%
      overflow: hidden
      position: relative
      width: 100%

      &:before
        content: ''
        position: absolute
        pointer-events: none
        border: 1px solid transparent
        top: 0
        left: 0
        right: 0
        bottom: 0
        background-color: transparent
        transition: background-color 0.3s ease

    &-input
      color: $color-white-100

      &-fake
        width: 100% !important

      &-fake
        width: 100% !important

      &-fake
        +style-7
        background: inherit
        text-align: center
        cursor: text

        span
          color: $color-white-100

    input
      +style-7
      background: inherit
      border: none
      text-align: center
      color: $color-white-100
      outline: none

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button
        -webkit-appearance: none
        margin: 0

    &-caption
      padding-top: 3px

    &-dimension
      display: flex
      align-items: center

  &__slider
    width: 100%

  &.border-radius
    &-full
      border-radius: 12px

      .range__block-list:before
        border-radius: 12px

    &-left
      border-radius: 12px 0 0 12px

      .range__block-list:before
        border-radius: 12px 0 0 12px

    &-right
      border-radius: 0 12px 12px 0

      .range__block-list:before
        border-radius: 0 12px 12px 0

.custom-dot
  width: 15px
  height: 15px
  background: $color-blue-100
  border: solid 1px $color-white-100
  border-radius: 50%
  cursor: pointer
  display: flex
  align-items: center
  justify-content: center

  .dark-mode &
    background: $color-black-96

  &:active:hover
    cursor: -webkit-grabbing
    cursor: grabbing

  &:hover,
  &.focus
    cursor: grab
    background: $color-white-100

.custom-process
  background: $color-white-100
</style>
