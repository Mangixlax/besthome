<template lang="pug">
  div(
    :class="$style.container"
  )
    div(
      v-if="ready"
      :data-sitekey="$recaptcha.siteKey"
      :data-size="$recaptcha.size || dataSize"
      :data-theme="dataTheme"
      :data-badge="dataBadge"
      :data-tabindex="dataTabindex"
      data-callback="recaptchaSuccessCallback"
      data-expired-callback="recaptchaExpiredCallback"
      data-error-callback="recaptchaErrorCallback"
      class="g-recaptcha"
    )
    div(
      v-else
      :class="$style.container__loader"
    )
      loader
</template>

<script>
import Loader from '@/components/Common/Loader'

export default {
  components: { Loader },
  data() {
    return {
      ready: false,
    }
  },
  beforeDestroy() {
    this.$recaptcha.destroy()
  },
  methods: {
    onError(message) {
      return this.$emit('error', message)
    },
    onSuccess(token) {
      return this.$emit('success', token)
    },
    onExpired() {
      return this.$emit('expired')
    },
  },
  mounted() {
    setTimeout(() => {
      this.ready = true

      this.$nextTick(() => {
        this.$recaptcha.init(this.$i18n.locale)
        this.$recaptcha.on('recaptcha-error', this.onError)
        this.$recaptcha.on('recaptcha-success', this.onSuccess)
        this.$recaptcha.on('recaptcha-expired', this.onExpired)
      })
    }, 500)
  },
  props: {
    dataTheme: {
      default: 'light',
      type: String,
      validator: (value) => {
        return ['dark', 'light'].includes(value)
      },
    },
    dataSize: {
      default: 'normal',
      type: String,
      validator: (value) => {
        return ['compact', 'normal', 'invisible'].includes(value)
      },
    },

    dataBadge: {
      default: 'bottomright',
      type: String,

      validator: (value) => {
        return ['bottomright', 'bottomleft', 'inline'].includes(value)
      },
    },

    dataTabindex: {
      default: 0,
      type: Number,
    },
  },
}
</script>

<style lang="sass" module>
.container
  height: 78px

  &__loader
    display: flex
    align-items: center
    justify-content: center
    position: relative
    height: 100%
    width: 100%
</style>
