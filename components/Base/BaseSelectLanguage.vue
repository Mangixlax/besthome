<template>
  <div
    ref="selectorWrapper"
    class="select-menu"
    :class="{
      open: selectorIsOpened,
      'tilt-up': tiltUp,
      'tilt-down': tiltDown,
      'select-menu--disable-animation': disableAnimation,
    }"
  >
    <div v-click-outside="closeOutside" class="select-menu__button" @click="openSelector">
      <svg-icon name="select-language-arrows"></svg-icon>
      <ul
        :style="{
          transform: `translateY(-${selectorPosition}px)`,
        }"
      >
        <li v-for="item in selectorList" :key="item" v-html="item"></li>
      </ul>
    </div>
    <ul
      :style="{
        transform: `translateY(-${selectorPosition}px)`,
      }"
    >
      <li
        v-for="selectorItem in selectorList"
        :key="selectorItem"
        @click="chooseSelector(selectorItem)"
        v-html="selectorItem"
      ></li>
    </ul>
  </div>
</template>

<script>
import $ from 'jquery'
import vClickOutside from 'v-click-outside'

export default {
  components: { vClickOutside },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    defaultValue: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      selectorList: [],
      selectModel: 'Ru',
      selectorIsOpened: false,
      tiltUp: false,
      tiltDown: false,
      selectorPosition: 0,
      disableAnimation: false,
      inProcess: false,
    }
  },
  watch: {
    selectorIsOpened(newValue) {
      this.$emit('opened', newValue)
    },
  },
  beforeMount() {
    this.selectorList = Object.assign([], this.list)
    this.chooseSelector(this.defaultValue)
  },
  methods: {
    openSelector() {
      if (!this.selectorIsOpened && !this.inProcess) {
        this.selectorIsOpened = true
        this.toggleTiltDown()
      }
    },
    closeOutside() {
      if (this.selectorIsOpened && !this.inProcess) {
        this.selectorIsOpened = false
        this.toggleTiltUp()
      }
    },
    chooseSelector(selectorItem) {
      this.$nextTick(() => {
        this.$emit('change', selectorItem)

        if (!this.inProcess) {
          this.inProcess = true

          const newIndex = this.selectorList.indexOf(selectorItem)

          this.selectorIsOpened = false

          this.toggleTiltUp()
          this.selectorPosition = newIndex * $(this.$refs.selectorWrapper).height()

          setTimeout(() => {
            this.disableAnimation = true
            this.selectModel = selectorItem
            setTimeout(() => {
              this.disableAnimation = false
              this.inProcess = false
            }, 100)
          }, 1000)
        }
      })
    },
    toggleTiltUp() {
      this.tiltUp = true

      setTimeout(() => {
        this.tiltUp = false
      }, 1000)
    },
    toggleTiltDown() {
      this.tiltDown = true

      setTimeout(() => {
        this.tiltDown = false
      }, 1000)
    },
  },
}
</script>

<style lang="scss">
.select-menu {
  position: relative;
  z-index: 1;
  width: 60px;
  height: 100%;
  transition: box-shadow 0.3s ease;
  // box-shadow: 0 0 0 0 rgba(#ff3366, 0);

  // @media (max-width: 768px) {
  //   & {
  //     width: 51px;
  //     font-size: 12px;
  //   }
  // }

  &--disable-animation ul {
    transition: none !important;
  }

  svg {
    position: absolute;
    top: 9px;
    right: 9px;
    height: 18px;
    width: 18px;
    z-index: 10;
    // @media (max-width: 768px) {
    //   & {
    //     top: 5px;
    //     right: 8px;
    //   }
    // }
  }

  select,
  &__button {
    font-family: inherit;
    margin: 0;
    border: 0;
    text-align: left;
    text-transform: none;
    -webkit-appearance: none;
  }

  select {
    pointer-events: none;
    user-select: none;
    opacity: 0;
    padding: 10px 13px;
    visibility: hidden;
    font-weight: 500;
    font-size: 14px;
    line-height: 25px;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    transform: translateY(0);
    transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
    width: 60px;
    color: rgba(17, 17, 17, 0.88);

    // @media (max-width: 768px) {
    //   & {
    //     width: 51px;
    //     padding: 3px 0;
    //     top: -4px;
    //   }
    // }

    li {
      padding: 10px 13px;
      cursor: pointer;

      // @media (max-width: 768px) {
      //   & {
      //     padding: 5px 8px;
      //   }
      // }
    }
  }

  & > ul {
    background: var(--bg-color-red);
    color: rgba(17, 17, 17, 0.88);
    border-radius: 6px;

    li {
      transition: color 0.3s ease;

      &:hover {
        color: rgba(17, 17, 17, 0.88);
      }
    }
  }

  &__button {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    padding: 0;
    z-index: 1;
    display: block;
    overflow: hidden;
    border-radius: 26px;
    color: rgba(17, 17, 17, 0.88);
    width: 60px;
    height: 38px;

    // @media (max-width: 768px) {
    //   & {
    //     width: 51px;
    //     height: 23px;
    //   }
    // }
  }

  &.open ul {
    background: white;
  }

  &.open &__arrows {
    & path {
      fill: #fff;
    }
  }

  &:not(.open) {
    & > ul {
      opacity: 0;
      pointer-events: none;
    }
  }

  &.open {
    &.tilt-up {
      animation: tilt-up 0.4s linear forwards;
    }

    &.tilt-down {
      animation: tilt-down 0.4s linear forwards;
    }
  }
}

@keyframes tilt-up {
  40%,
  60% {
    transform: perspective(500px) rotateX(8deg);
  }
}

@keyframes tilt-down {
  40%,
  60% {
    transform: perspective(500px) rotateX(-8deg);
  }
}
</style>
