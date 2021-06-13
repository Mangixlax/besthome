export const formDescriptionTimerMixin = {
  data() {
    return {
      description: '',
      hideTimer: null,
      hideTimerSeconds: 0,
    }
  },
  methods: {
    updateDescription() {},
    /**
     * Set start timer and use callback when time is end
     * @param {Function} callback
     * @param {String | Number} seconds
     */
    hideTimerStart(callback, seconds) {
      this.hideTimerClear()
      this.hideTimerSeconds = seconds

      this.hideTimer = setInterval(() => {
        this.hideTimerSeconds -= 1

        if (this.hideTimerSeconds === 0) {
          typeof callback === 'function' && callback()
          this.hideTimerClear()
        }
      }, 1000)
    },
    /**
     * Remove timer
     */
    hideTimerClear() {
      if (this.hideTimer) {
        clearInterval(this.hideTimer)
        this.hideTimer = null
      }
    },
  },
  created() {
    this.updateDescription()
  },
}

export const formMixin = {
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: {},
      captchaToken: '',
      apiMethod: '',
      showFinishStep: false,
      isShowRecaptcha: false,
      recaptchaIsValid: false,
      isBusy: false,
    }
  },
  methods: {
    showRecaptcha() {
      this.$v.$touch()

      if (this.$v.$invalid) return

      this.isShowRecaptcha = true
    },
    /**
     * Check form if is valid, send request and
     */
    sendRequest() {
      // Trigger to check if the form is filled out correctly
      this.$v.$touch()

      if (!this.apiMethod) {
        console.error('apiMethod is empty')
        return false
      }

      // If form data is valid
      if (!this.$v.$invalid && this.recaptchaIsValid && !this.isBusy) {
        this.isBusy = true

        this.form.from_page = window.location.href
        this.form.recaptcha = this.captchaToken
        this.form.offer = this.$store.state.catalog.offer_item

        this.$axios
          .$post(this.apiMethod, this.form)
          .then(() => {
            this.isBusy = false
            this.recaptchaIsValid = false
            this.form.recaptcha = ''
            this.showFinishStep = true
            this.updateDescription()
            this.afterSuccess()
          })
          .catch((error) => {
            this.isBusy = false
            this.recaptchaIsValid = false
            this.form.recaptcha = ''
            this.$sentry.captureException(error)
          })
      }
    },
    onRecaptchaSuccess(token) {
      this.recaptchaIsValid = true
      this.captchaToken = token
      this.isShowRecaptcha = false
      this.sendRequest()
    },
    onRecaptchaError() {
      this.isBusy = false
      this.recaptchaIsValid = false
      this.form.recaptcha = ''
      this.$recaptcha && this.$recaptcha.reset()
      this.isShowRecaptcha = false
    },
    afterFinish() {},
    afterSuccess() {},
  },
  watch: {
    /**
     * When this params is:
     * true - hide form and show congrats message with timer for close modal
     * false - show form with inputs
     * @param {Boolean} value
     */
    showFinishStep(value) {
      if (value) {
        if ('hideTimerStart' in this) {
          this.hideTimerStart(() => {
            this.$modal.hide(this.name)
            this.showFinishStep = false
            this.afterFinish()
          }, 6)
        } else {
          this.showFinishStep = false
          this.afterFinish()
        }
      }

      this.updateDescription()
    },
  },
  mounted() {
    this.form = {
      ...this.form,
      ...this.formData,
    }
  },
}

export const formPhoneMixin = {
  data() {
    return {
      phoneMask: '+###########',
    }
  },
  watch: {
    /**
     * Watching the phone and set the required phone mask, depending on the condition
     */
    'form.phone'() {
      const phone = this.form.phone

      if (phone.substr(0, 2) === '+7') {
        this.phoneMask = '+# (###) ###-##-##'
      } else if (phone.substr(0, 3) === '+90') {
        this.phoneMask = '+## ### ### ####'
      } else if (phone.substr(0, 4) === '+375') {
        this.phoneMask = '+### ## ### ## ##'
      } else if (phone.substr(0, 4) === '+380') {
        this.phoneMask = '+### ## ### ## ##'
      } else {
        this.phoneMask = '+###########'
      }
    },
  },
}
