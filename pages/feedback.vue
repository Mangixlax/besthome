<template lang="pug">
  div(:class="$style['feedback__container']")
    div(:class="$style['feedback__feedback']")
      typo-text(
        tag="div"
        version="style-4"
        :class="$style['feedback__feedback-title']"
      ) {{ $t('modals.get_feedback.feedback.title') }}
      typo-text(
        tag="div"
        version="style-5"
        :class="$style['feedback__feedback-text']"
      ) {{ $t('modals.get_feedback.feedback.text') }}
      form(@submit.prevent="onSubmit")
        v-form-input(
          :class="$style.line"
          required
          v-model="$v.form.name.$model"
          :valid="!$v.form.name.$error"
          :placeholder="$t('forms.inputs.name')"
          :disabled="isShowRecaptcha || isBusy"
        )
        v-form-input(
          :class="$style.line"
          required
          v-model="$v.form.phone.$model"
          :valid="!$v.form.phone.$error"
          :placeholder="$t('forms.inputs.phone')"
          :disabled="isShowRecaptcha || isBusy"
        )
        v-form-input(
          :class="$style.line"
          required
          v-model="$v.form.email.$model"
          :valid="!$v.form.email.$error"
          :placeholder="$t('forms.inputs.email')"
          :disabled="isShowRecaptcha || isBusy"
        )
        v-form-input(
          :class="$style.line"
          v-model="$v.form.project.$model"
          :valid="!$v.form.project.$error"
          :placeholder="$t('forms.inputs.project_of_interest')"
          optional
          :disabled="isShowRecaptcha || isBusy"
        )
        v-form-input(
          :class="$style.line"
          v-model="$v.form.block.$model"
          :valid="!$v.form.block.$error"
          :placeholder="$t('forms.inputs.block')"
          optional
          :disabled="isShowRecaptcha || isBusy"
        )
        v-form-input(
          :class="$style.line"
          v-model="$v.form.number_of_rooms.$model"
          :valid="!$v.form.number_of_rooms.$error"
          :placeholder="$t('forms.inputs.number_of_rooms')"
          optional
          :disabled="isShowRecaptcha || isBusy"
        )
        typo-text(
          tag="p"
          version="style-6"
          :class="$style['feedback__feedback-msglabel']"
        ) {{ $t('forms.inputs.message') }}
        v-form-textarea(
          :class="$style.line"
          v-model="form.message"
          :valid="!$v.form.message.$error"
          :placeholder="$t('forms.inputs.message_placeholder')"
          :disabled="isShowRecaptcha || isBusy"
        )
        label(
          :class="{\
            [$style['feedback__feedback-label']]: true,\
            [$style['feedback__feedback-label--error']]: !$v.form.agree_collect_data.isChecked && $v.form.agree_collect_data.$error,\
          }"
        )
          input(
            type="checkbox"
            :class="$style['feedback__feedback-label-checkbox']"
            v-model="$v.form.agree_collect_data.$model"
            :disabled="isShowRecaptcha || isBusy"
          )
          typo-text(
            tag="p"
            version="style-8"
            :class="$style['feedback__feedback-label-text']"
          )
            i18n(path="forms.inputs.agree_collect_data" tag="span")
              template(v-slot:link)
                nuxt-link(
                  :to="localePath({ name: 'privacy-policy' })"
                  :class="$style['feedback__feedback-label-link']"
                )
                  | {{ $t('forms.inputs.agree_collect_data_link') }}
        label(
          :class="{\
            [$style['feedback__feedback-label']]: true,\
            [$style['feedback__feedback-label--error']]: !$v.form.agree_to_newsletter.isChecked && $v.form.agree_to_newsletter.$error,\
          }"
        )
          input(
            type="checkbox"
            checked
            :class="$style['feedback__feedback-label-checkbox']"
            v-model="$v.form.agree_to_newsletter.$model"
            :disabled="isShowRecaptcha || isBusy"
          )
          typo-text(
            tag="p"
            version="style-8"
            :class="$style['feedback__feedback-label-text']"
          ) {{ $t('forms.inputs.agree_to_newsletter') }}
        recaptcha(
          v-if="isShowRecaptcha"
          :class="$style['recaptcha']"
          @success="onRecaptchaSuccess"
          @error="onRecaptchaError"
          @expired="onRecaptchaError"
        )
        v-button(
          v-if="isBusy || !isShowRecaptcha"
          @click="showRecaptcha"
          full
          :disabled="isBusy"
          type="submit"
        ) {{ isBusy ? $t('modals.sending') : $t('modals.subscribe.submit') }}
    div(:class="$style['feedback__info']")
      div(:class="$style['feedback__info-avatar']")
        img(:src="require(`~/assets/images/our-team/person-2.png`)" alt="alt" loading="lazy")
      typo-text(
        tag="div"
        version="style-6"
        :class="$style['feedback__info-name']"
      ) {{ $t('modals.get_feedback.info.name') }}
      typo-text(
        tag="div"
        version="style-6"
        :class="$style['feedback__info-position']"
      ) {{ $t('modals.get_feedback.info.position') }}
      typo-text(
        tag="div"
        version="style-7"
        :class="$style['feedback__info-languages']"
      ) {{ $t('modals.get_feedback.info.languages') }}
      div(:class="$style['feedback__info-contact']")
        a(
          href="tel:+90 530 547-44-15"
          :class="$style['feedback__info-contact-phone']"
          @click="$emit('click-to-contact')"
        ) +90 530 547-44-15
        a(
          @click="$emit('click-to-contact')"
          target="_blank"
          href="https://wa.me/905305474415"
        )
          svg-icon(name="icon-whatsup")
        a(
          target="_blank"
          @click="$emit('click-to-contact')"
          href="viber://chat?number=+905305474415"
        )
          svg-icon(name="icon-viber")
        a(
          target="_blank"
          @click="$emit('click-to-contact')"
          href="tg://resolve?domain=905305474415"
        )
          svg-icon(name="icon-telegram")
      a(
        @click="$emit('click-to-contact')"
        href="mailto:info@besthome.com.tr"
        :class="$style['feedback__info-email']"
      ) info@besthome.com.tr
        svg-icon(name="link-arrow")
      typo-text(
        tag="div"
        version="style-7"
        :class="$style['feedback__info-office']"
      ) {{ $t('modals.get_feedback.info.office') }}
      typo-text(
        tag="div"
        version="style-8"
        :class="$style['feedback__info-text']"
      ) {{ $t('modals.get_feedback.info.work_time') }}
      div(:class="$style['feedback__info-link']")
        typo-text(
          tag="p"
          version="style-6"
          :class="$style['feedback__info-link-text']"
        ) {{ $t('modals.get_feedback.info.link.text') }}
        typo-text(
          tag="nuxt-link"
          version="style-6"
          :to="localePath({ name: 'contacts' })"
          :class="$style['feedback__info-link-text--underline']"
        ) {{ $t('modals.get_feedback.info.link.link') }}
        | .
        nuxt-link(
          :to="localePath({ name: 'contacts' })"
          :class="$style['feedback__info-link-arrow']"
        )
          svg-icon(name="link-arrow")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { validationMixin } from 'vuelidate'
import { formDescriptionTimerMixin, formMixin, formPhoneMixin } from '~/mixins/form'
import { modalsTriggerMixin } from '~/mixins/modals'
import VFormInput from '~/components/form/VFormInput.vue'
import VForm from '~/components/form/VForm.vue'
import ModalContainer from '~/components/Modal/base/ModalContainer.vue'
import VButton from '~/components/buttons/VButton.vue'
import TypoText from '~/components/Base/TypoText.vue'
import { email, minLength, required } from 'vuelidate/lib/validators'
import VFormTextarea from '~/components/form/VFormTextarea.vue'
import metaGenerator from '~/config/meta.js'
import { delay } from '~/lib/utils'
import { getSiteUrl } from '@/lib/utils'

@Component({
  layout: 'modal',
  mixins: [
    validationMixin,
    formDescriptionTimerMixin,
    formMixin,
    formPhoneMixin,
    modalsTriggerMixin,
  ],
  components: {
    VFormTextarea,
    VFormInput,
    VForm,
    ModalContainer,
    VButton,
    TypoText,
  },
  validations: {
    form: {
      name: {
        required,
      },
      phone: {
        required,
        minLength: minLength(5),
      },
      email: {
        required,
        email,
      },
      project: {},
      block: {},
      number_of_rooms: {},
      message: {
        required,
      },
      agree_collect_data: {
        isChecked: (value: boolean) => value,
      },
      agree_to_newsletter: {
        isChecked: (value: boolean) => value,
      },
    },
  },
  head(): any {
    const title = this.$i18n.locale === 'ru' ? '' : ''

    const description = this.$i18n.locale === 'ru' ? '' : ''

    return {
      title,
      htmlAttrs: {
        lang: this.$i18n.locale,
        prefix: 'og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#',
      },
      meta: metaGenerator({
        title,
        description,
      }),
      link: [
        {
          rel: 'canonical',
          href: getSiteUrl(this.localePath(this.$route.path), true),
        },
        {
          rel: 'alternate',
          hreflang: 'x-default',
          href: getSiteUrl(this.localePath({ name: 'feedback' }, 'en'), true),
        },
        {
          rel: 'alternate',
          hreflang: 'ru',
          href: getSiteUrl(this.localePath({ name: 'feedback' }, 'ru'), true),
        },
      ],
    }
  },
})
export default class FeedbackPage extends Vue {
  public form: any = {
    name: '',
    phone: '',
    email: '',
    project: '',
    block: '',
    number_of_rooms: '',
    message: '',
    agree_collect_data: true,
    agree_to_newsletter: true,
    recaptcha: '',
  }

  public isShowRecaptcha: boolean = false

  public isBusy: boolean = false

  /**
   * Checking of valid form data and show recaptcha if form is valid
   */
  public onSubmit() {
    // Initiate checking form data
    this.$v.form.$touch()

    // If form data is valid
    if (!this.$v.$invalid) {
      // Show recaptcha
      this.isShowRecaptcha = true
    }
  }

  /**
   * Send request to server and hide recaptcha with reset a form data
   */
  public onRecaptchaSuccess(token: string) {
    this.form.recaptcha = token
    this.isBusy = true

    this.$axios
      .$post('v1/forms', {
        ...this.form,
        form_code: 'feedback',
      })
      .then(() => {
        this.showActionModal({ success: true })
        this.resetForm()
        this.resetRecaptcha()
      })
      .catch(() => {
        this.isBusy = false
        this.showActionModal({ success: false })
        this.resetRecaptcha()
      })
  }

  /**
   * Hide recaptcha
   */
  public onRecaptchaError() {
    this.resetRecaptcha()
  }

  public resetRecaptcha() {
    this.form.recaptcha = ''
    this.$recaptcha && this.$recaptcha.reset()
    this.isShowRecaptcha = false
  }

  public resetForm() {
    this.isBusy = false
    this.form.name = ''
    this.form.phone = ''
    this.form.email = ''
    this.form.project = ''
    this.form.block = ''
    this.form.number_of_rooms = ''
    this.form.message = ''
    this.form.agree_collect_data = false
    this.form.agree_to_newsletter = false
    this.$v.$reset()
  }

  public showActionModal({ success = true }) {
    const name: string = this.form.name

    this.showModal({
      name: 'finish-modal',
      modal: () => import('~/components/Modal/base/ModalFinishStep.vue'),
      options: {
        width: 864,
        height: 'auto',
      },
      props: {
        title: success
          ? this.$t('modals.get_feedback.finish_modal.title')
          : this.$t('modals.error.title'),
        text: success ? this.$t('modals.get_feedback.finish_modal.text', [name]) : '',
        success,
      },
      events: {
        opened: () => {
          document.documentElement.classList.add(
            success ? 'modal-finish-is-open' : 'modal-error-is-open',
          )
        },
        closed: () => {
          if (document.body.getElementsByClassName('vm--container').length <= 1) {
            document.documentElement.classList.remove(
              success ? 'modal-finish-is-open' : 'modal-error-is-open',
            )
          }
        },
      },
    })
  }
}
</script>

<style lang="sass" module>
.feedback
  width: 100%
  padding: 64px

  &__container
    max-width: 912px
    display: flex
    grid-gap: 40px
    margin: 0 auto
    padding: 64px 24px
    align-items: flex-start

    @media (max-width: 800px)
      flex-direction: column
      padding-left: 0
      padding-right: 0
      padding-bottom: 0

  &__feedback
    max-width: 492px
    display: flex
    flex-direction: column
    grid-gap: 40px

    @media (max-width: 800px)
      padding-left: 24px
      padding-right: 24px

    &-label
      display: flex
      align-items: center
      cursor: pointer
      margin-bottom: 8px

      &-checkbox
        position: absolute
        z-index: -1
        opacity: 0

        &:checked + p::before
          border-color: #0b76ef
          background-color: #0b76ef
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e")

      &-text
        display: inline-flex
        align-items: center
        user-select: none
        grid-gap: 16px
        margin: 0

        &::before
          content: ''
          display: inline-block
          width: 14px
          height: 14px
          flex-shrink: 0
          flex-grow: 0
          background-repeat: no-repeat
          background-position: center center
          background-size: 50% 50%
          background-color: $color-black-24

      &-link
        text-decoration: underline
        text-decoration-color: $color-blue-16
        text-underline-offset: 7px
        color: $color-blue-100

      &--error &-checkbox:not(:checked) + p:before
        background-color: $color-red-16

      &--error &-text
        color: $color-red-96

    &-msglabel
      padding-left: 10px

    button
      margin-top: 32px

  &__info
    display: flex
    flex-direction: column
    padding: 48px 55px 64px 40px
    background-color: $color-black-4

    @media (max-width: 800px)
      padding: 48px 24px

    &-avatar
      height: 88px
      width: 88px
      border-radius: 50%
      margin-bottom: 16px
      display: flex
      align-items: center
      justify-content: center

      img
        height: 100%
        border-radius: 50%

    &-position
      color: $color-black-56
      margin-bottom: 16px

    &-languages
      margin-bottom: 2px

    &-contact
      margin-bottom: 2px
      display: flex
      align-items: center

      &-phone
        +style-7
        text-decoration: none
        margin: 0
        color: $color-black-100
        white-space: nowrap

      svg
        height: 20px
        width: 20px
        margin-left: 4px

    &-email
      +style-7
      display: flex
      align-items: center
      margin: 0
      color: $color-black-100
      text-decoration: underline
      text-underline-offset: 7px
      text-decoration-color: $color-black-16
      margin-bottom: 33px

      svg
        height: 32px
        width: 32px
        stroke: $color-black-100

    &-office
      margin-bottom: 0.5em
      color: $color-black-72

    &-text
      color: $color-black-72
      margin-bottom: 12px

    &-link
      display: flex
      align-items: center
      color: $color-black-100

      &-text
        margin: 0

        &--underline
          text-decoration: underline
          text-decoration-color: $color-black-16
          text-underline-offset: 7px
          color: $color-black-100
          margin-left: 0.5em

      &-arrow
        height: 26px

        svg
          stroke: $color-black-100
          height: 32px
          width: 32px

    &-finish
      height: 500px
      width: auto
      background: red

.recaptcha
  margin-top: 34px
  margin-bottom: 34px
  display: flex
  justify-content: center

.line
  margin-bottom: 24px

  +mobile
    margin-bottom: 16px

.error
  color: red
</style>
