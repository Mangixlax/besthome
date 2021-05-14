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
    <div
      v-click-outside="closeOutside"
      class="select-menu__button"
      @click="openSelector"
    >
      <svg
        viewBox="0 0 60 60"
        width="13"
        height="13"
        class="select-menu__arrows"
      >
        <g
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <path
            d="M30,6 C29.4885,6 28.9769372,6.19493721 28.5859395,6.58593837 L12.5859384,22.5859395 C12.0139395,23.1579384 11.842343,24.0176267 12.1523442,24.7656244 C12.460343,25.5136256 13.1920012,26 13.9999988,26 L45.9999977,26 C46.8079988,26 47.5396535,25.5136256 47.8476523,24.7656244 C48.1576535,24.0176233 47.986057,23.1579384 47.4140581,22.5859395 L31.414057,6.58593837 C31.0230558,6.19493721 30.5114965,6 29.9999965,6 L30,6 Z M13.9999988,34.0000012 C13.1919977,34.0000012 12.460343,34.4863744 12.1523442,35.2343756 C11.842343,35.9823733 12.0139395,36.8420616 12.5859384,37.4140605 L28.5859395,53.4140616 C28.9759395,53.8040616 29.4880012,54.0000012 30,54.0000012 C30.5119988,54.0000012 31.0240605,53.8040616 31.4140605,53.4140616 L47.4140616,37.4140605 C47.9860605,36.8420616 48.157657,35.9823733 47.8476558,35.2343756 C47.539657,34.4863744 46.8079988,34.0000012 46.0000012,34.0000012 L13.9999988,34.0000012 Z"
            fill-rule="nonzero"
          />
        </g>
      </svg>
      <ul
        :style="{
          transform: `translateY(-${selectorPosition}px)`,
        }"
      >
        <li
          v-for="item in selectorList"
          :key="item"
          v-html="item"
        ></li>
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
  width: 66px;
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

  &__arrows {
    position: absolute;
    top: 12px;
    right: 10px;
    opacity: 0.5;

    & path {
      fill: rgba(17, 17, 17, 0.88);;
    }

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
    width: 66px;
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
    border-radius: 6px;
    color: rgba(17, 17, 17, 0.88);
    width: 66px;
    height: 38px;

    // @media (max-width: 768px) {
    //   & {
    //     width: 51px;
    //     height: 23px;
    //   }
    // }
  }

  &.open ul {
    color: rgba(17, 17, 17, 0.88);
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
    // box-shadow: 0 10px 60px -10px #ff3366;

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
