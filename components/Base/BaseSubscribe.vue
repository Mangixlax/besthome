<template lang="pug">
  section(:class="[$style['subscribe'], isWhiteTheme && $style['white']]")
    div(:class="$style['subscribe__container']")
      div(:class="$style['subscribe__background-1']")
      div(:class="$style['subscribe__background-2']")
      div(:class="$style['subscribe__content']")
        div(:class="$style['subscribe__textbox']")
          typo-text(
            tag="p"
            version="style-4"
            :class="$style['subscribe__textbox-text']"
          ) {{ subscribeData.title }}
        
        form(:class="$style['subscribe__formbox']" @submit.prevent="onSubmit")
          div(:class="$style['subscribe__mailing']")
            input(
              v-model="$v.form.phone_or_email.$model"
              type="text"
              name="email"
              :placeholder="getPlaceholderValue()"
              :class="$style['subscribe__mailing-email']"
              required
            )
            button(
              type="submit"
              :class="$style['subscribe__mailing-submit']"
            ) {{ subscribeData.submit }}
          typo-text(
            v-if="isError"
            tag="p"
            version="style-8"
            :class="$style['error']"
          ) {{ $t('modals.error.title') }}
          div(:class="$style['subscribe__agreement']")
            label(:class="$style['subscribe__agreement-label']")
              input(
                name="agreement"
                value="agree"
                type="checkbox"
                :class="$style['subscribe__agreement-checkbox']"
              )
              typo-text(
                tag="p"
                version="style-8"
                :class="$style['subscribe__agreement-text']"
              ) {{ subscribeData.agreement }}
              span
                nuxt-link(
                :to="localePath({ name: 'projects' })"
                :class="$style['subscribe__agreement-text--underline']"
              ) {{ subscribeData.link }}
                | .
              nuxt-link(
                :to="localePath({ name: 'projects' })"
                :class="$style['subscribe__agreement-link']"
              )  
                svg-icon(name="link-arrow-white" v-if="!isWhiteTheme")   
                svg-icon(name="link-arrow-blue" v-if="isWhiteTheme")   
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import TypoText from '~/components/Base/TypoText.vue'
import { email, required, minLength } from 'vuelidate/lib/validators'
import { formMixin, formPhoneMixin, formDescriptionTimerMixin } from '@/mixins/form.js'
import { modalsTriggerMixin } from '~/mixins/modals'

@Component({
  components: { TypoText },
  mixins: [formDescriptionTimerMixin, formMixin, formPhoneMixin, modalsTriggerMixin],
  validations: {
    form: {
      phone_or_email: {
        required,
        email,
        minLength: minLength(5),
      },
    },
  },
})
export default class BaseBreadCrumbs extends Vue {
  @Prop({ type: Boolean, default: false })
  private whiteTheme!: boolean

  @Prop({ type: Object, default: () => {} })
  private subscribeData!: Object

  public isWhiteTheme: boolean = this.whiteTheme

  public isError: boolean = false

  public form: { phone_or_email: string } = {
    phone_or_email: ''
  }

  public onSubmit() {
    this.$axios.$post('v1/forms', {
      ...this.form,
      form_code: 'subscribe_to_news',
    })
    .then((result) => {
      console.log('открываем модалку с сообщением об успешной отправке', result);
      if (result.status === 200) {
        this.showFinishModal()
      } else {
        this.isError = true
      }
    })
    .catch((result) => {
      this.isError = true
    })
  }
  
  public showError() {

  }

  public showFinishModal() {
    this.showModal({
      name: 'finish-modal',
      modal: () => import('~/components/Modal/base/ModalFinishStep.vue'),
      options: {
        width: 864,
        height: "auto"
      },
      props: {
        title: this.$t('modals.subscribe.title'),
        text: this.$t('modals.subscribe.text'),
      },
      events: {
        'opened': () => {
          document.documentElement.classList.add('modal-finish-is-open')
          
        },
        'closed': () => {
          if (document.body.getElementsByClassName('vm--container').length <= 1) {
            document.documentElement.classList.remove('modal-finish-is-open')
          }
        },
      }
    })
  }
  public getPlaceholderValue() {
    if (this.windowWidth < 900) {
      return (this as any).subscribeData.mobile_place_holder
    } else {
      return (this as any).subscribeData.place_holder
    }
  }
  public getWindowWidth() {
    this.windowWidth = window.innerWidth
  }
  public windowWidth: any = ''

  mounted() {
    this.getWindowWidth()
    window.addEventListener('resize', this.getWindowWidth)
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth)
  }
}
</script>

<style lang="sass" module>
.white.subscribe
   background: $color-white-100

.subscribe
  background: $color-black-100
  overflow: hidden
  transition: all 1s ease

  .white &
    background: $color-white-100

  &__container
    position: relative
    max-width: 1440px
    padding: 155px 0
    margin: 0 auto

    @media (max-width: 900px)
      padding: 32px 24px 64px 24px

  &__background-1
    position: absolute
    max-width: 1057px
    height: 240px
    width: 100%
    top: 35px
    left: 95px
    background-size: 100%

    @media (min-width: 900px)
      background-image: url('~/assets/images/subscribe-bg-1.svg')
      background-repeat: no-repeat

      .white &
        background-image: url('~/assets/images/subscribe-bg-1-white.svg')
        background-repeat: no-repeat

    @media (max-width: 1200px)
      top: 0px
      left: 0px

  &__background-2
    position: absolute
    max-width: 1050px
    height: 240px
    width: 100%
    top: 265px
    left: 288px
    background-size: 100%

    @media (min-width: 900px)
      background-image: url('~/assets/images/subscribe-bg-2.svg')
      background-repeat: no-repeat

      .white &
        background-image: url('~/assets/images/subscribe-bg-2-white.svg')
        background-repeat: no-repeat

    @media (max-width: 1200px)
      bottom: 0px
      left: 0px

  &__content
    max-width: 864px
    margin: 0 auto
    padding: 48px 0px 32px
    display: flex
    align-items: center

    @media (max-width: 800px)
      flex-direction: column
      align-items: center

    @media (max-width: 400px)
      align-items: start
      justify-content: start

  &__textbox
    width: 336pxx
    z-index: 2

    @media (max-width: 900px)
      padding-bottom: 48px

    &-text
      color: $color-white-100
      width: 270px
      margin: 0

      .white &
        color: $color-black-100

      @media (max-width: 1054px)
        width: 200px

  &__formbox
    width: 100%
    padding: 21px 0 21px 48px
    display: flex
    flex-direction: column
    justify-content: center
    z-index: 2

    @media (max-width: 400px)
      padding: 0

  &__mailing
    display: flex
    justify-content: space-between
    align-items: center
    width: 480px
    padding: 8px
    border-bottom: 1px solid $color-white-16

    .white &
      border-bottom: 1px solid $color-blue-16

    @media (max-width: 600px)
      width: 100%

    &-email
      width: 247px
      height: 28px
      background: transparent
      border: none
      color: $color-white-100

      .white &
        color: $color-black-100

      &::placeholder

        .white &
          color: $color-blue-88

      @media (max-width: 400px)
        width: 160px

    &-submit
      height: 38px
      padding: 5px 24px
      border-radius: 0
      border: none
      cursor: pointer

      .white &
        background: $color-blue-96
        color: $color-white-100

      @media (max-width: 400px)
        width: 76px
        height: 34px
        padding: 0

  &__agreement
    margin-top: 24px

    label
      display: flex
      align-items: center
      flex-wrap: wrap

      span
        color: $color-white-88

        .white &
          color: $color-black-88

    &-checkbox
      position: absolute
      z-index: -1
      opacity: 0

      &:checked+p::before
        border-color: #0b76ef
        background-color: #0b76ef
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e")

    &-text
      display: inline-flex
      align-items: center
      user-select: none
      margin: 0px
      color: $color-white-88

      .white &
        color: $color-black-88

      &::before
        content: ''
        display: inline-block
        width: 14px
        height: 14px
        flex-shrink: 0
        flex-grow: 0
        margin-right: 0.5em
        background-repeat: no-repeat
        background-position: center center
        background-size: 50% 50%
        background-color: $color-white-24

        .white &
          background-color: $color-blue-24

      &:not(:disabled):active+span::before
        background-color: #b3d7ff
        border-color: #b3d7ff

      &--underline
        +style-8
        display: inline-flex
        align-items: center
        margin: 0 4px
        text-decoration: underline
        text-underline-offset: 6px
        text-decoration-color: $color-white-8
        color: $color-white-88
        cursor: pointer

        .white &
          color: $color-blue-88

    &-link

      svg
        height: 26px
        width: 26px

.error
  color: red
</style>
