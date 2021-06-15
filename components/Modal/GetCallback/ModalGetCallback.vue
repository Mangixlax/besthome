<template lang="pug">
  modal-container(
    v-bind="$attrs"
    :name="name"
    :class="$style['get-callback']"
  ) 
    template(slot="body")
      div(:class="$style['get-callback__container']")
        div(:class="$style['get-callback__feedback']")
          typo-text(
            tag="div"
            version="style-4"
            :class="$style['get-callback__feedback-title']"
          ) {{ $t('modals.get_callback.feedback.title') }}
          typo-text(
            tag="div"
            version="style-5"
            :class="$style['get-callback__feedback-text']"
          ) {{ $t('modals.get_callback.feedback.text') }}
          v-form(
            :description="description"
            :finished="showFinishStep"
            :submit-name="$t('modals.subscribe.submit')"
          )
            v-form-input(
              :class="$style.line"
              v-model="$v.form.full_name.$model"
              :valid="!$v.form.full_name.$error"
            ) 
              span {{ $t('modals.get_callback.feedback.label_name') }}
            v-form-input(
              :class="$style.line"
              required
              v-model="$v.form.phone_or_email.$model"
              :valid="!$v.form.phone_or_email.$error"
            ) 
              span
                | {{ $t('modals.get_callback.feedback.label_email_number.number') }}
                span {{ $t('modals.get_callback.feedback.label_email_number.or') }}
                | {{ $t('modals.get_callback.feedback.label_email_number.email') }}
            v-form-input(
              :class="$style.line"
              v-model="$v.form.project.$model"
              :valid="!$v.form.project.$error"
            ) 
              span {{ $t('modals.get_callback.feedback.label_project.main') }}
                span {{ $t('modals.get_callback.feedback.label_project.support') }}

            v-form-input(
              :class="$style.line"
              v-model="$v.form.building.$model"
              :valid="!$v.form.building.$error"
            ) 
              span {{ $t('modals.get_callback.feedback.label_building.main') }}
                span {{ $t('modals.get_callback.feedback.label_building.support') }}
            v-form-input(
              :class="$style.line"
              v-model="$v.form.rooms.$model"
              :valid="!$v.form.rooms.$error"
            )
              span {{ $t('modals.get_callback.feedback.label_rooms.main') }}
                span {{ $t('modals.get_callback.feedback.label_rooms.support') }}
            typo-text(
              tag="p"
              version="style-6"
            ) {{ $t('modals.get_callback.feedback.label_message.title') }}
            v-form-input(
              :class="$style.line"
              tag="textarea"
              v-model="$v.form.message.$model"
              :valid="!$v.form.message.$error"
            )
              span {{ $t('modals.get_callback.feedback.label_message.label') }}
            label(:class="$style['get-callback__feedback-label']")
              input(
                name="personal-data"
                :value="1"
                type="checkbox"
                :class="$style['get-callback__feedback-label-checkbox']"
                v-model="selectedCheckboxes"
              )
              typo-text(
                tag="p"
                version="style-8"
                :class="$style['get-callback__feedback-label-text']"
              ) {{ $t('modals.get_callback.feedback.label_checkbox_1.text') }}
              typo-text(
                tag="a"
                version="style-8"
                :href="localePath('privacy-policy')"
                title="privacy-policy"
                :class="$style['get-callback__feedback-label-link']"
                @click.prevent="onClickToPrivacy"
              ) {{ $t('modals.get_callback.feedback.label_checkbox_1.link') }}
              | .
            label(:class="$style['get-callback__feedback-label']")
              input(
                name="news"
                :value="2"
                type="checkbox"
                :class="$style['get-callback__feedback-label-checkbox']"
                v-model="selectedCheckboxes"
              )
              typo-text(
                tag="p"
                version="style-8"
                :class="$style['get-callback__feedback-label-text']"
              ) {{ $t('modals.get_callback.feedback.label_checkbox_2') }}
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
        modal-get-callback-info(:show-finish-step="showFinishStep")
</template>

<script>
import TypoText from '~/components/Base/TypoText.vue'
import VButton from '~/components/buttons/VButton.vue'
import { validationMixin } from 'vuelidate'
import { email, required, minLength } from 'vuelidate/lib/validators'
import { formMixin, formPhoneMixin, formDescriptionTimerMixin } from '@/mixins/form.js'
import ModalGetCallbackInfo from '@/components/Modal/GetCallback/ModalGetCallbackInfo.vue'
import ModalContainer from '@/components/Modal/base/ModalContainer.vue'
import VForm from '@/components/form/VForm.vue'
import VFormInput from '@/components/form/VFormInput.vue'

export default {
  name: 'ModalGetCallback',
  components: { VFormInput, VForm, ModalContainer, VButton, TypoText, ModalGetCallbackInfo },
  mixins: [validationMixin, formDescriptionTimerMixin, formMixin, formPhoneMixin],
  props: {
    name: {
      // Modal id
      type: String,
      default: '',
    },
  },
  validations: {
    form: {
      full_name: {
        minLength: minLength(5),
      },
      phone_or_email: {
        required,
        email,
        minLength: minLength(5),
      },
      project: {
        minLength: minLength(5),
      },
      building: {
        minLength: minLength(5),
      },
      rooms: {
        minLength: minLength(5),
      },
      message: {
        minLength: minLength(5),
      },
    },
  },
  data() {
    return {
      form: {
        full_name: '',
        phone_or_email: '',
        project: '',
        building: '',
        rooms: '',
        message: '',
      },
      apiMethod: 'v1/forms/newSubscriber',
      selectedCheckboxes: [],
      description: ''
    }
  },
  methods: {
    closeModal() {
      console.log(this.$modal)
      this.$modal.hide('modal-get-callback')
    },
    updateDescription() {
      if (!this.showFinishStep) {
        this.description = this.$t('modals.subscribe.description_1')
      } else if (this.form.full_name) {
        this.description =
          this.form.full_name + ', ' + this.$t('modals.subscribe.description_2').toLowerCase()
      } else {
        this.description = this.$t('modals.subscribe.description_2')
      }
    },
    afterFinish() {
      this.form.full_name = ''
      this.form.email = ''
    },
    afterSuccess() {
     this.$ym.reachGoal('order-subscribe-to-offers')
     this.$ga.event({
       eventCategory: 'Заявка',
       eventAction: 'Рассылка',
     })
    },
    onClickToPrivacy() {
      this.$modal.hide(this.name);
      this.$router.push(this.localePath('privacy-policy'));
    }
  },
}
</script>

<style lang="sass" module>
.get-callback
  width: 100%

  &__container
    max-width: 912px
    display: flex
    grid-gap: 40px
    margin: 0 auto
    padding: 64px 24px

    @media (max-width: 800px)
      flex-direction: column
      
  &__feedback
    max-width: 492px
    display: flex
    flex-direction: column
    grid-gap: 40px

    &-label
      display: flex
      align-items: center
      cursor: pointer
      margin-bottom: 8px

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
        white-space: nowrap
        text-decoration: underline
        text-decoration-color: $color-blue-16
        text-underline-offset: 7px
        color: $color-blue-100
        margin-left: 0.5em

    button
      margin-top: 32px

.recaptcha
  margin-top: 34px
  margin-bottom: 34px
  display: flex
  justify-content: center

.line
  margin-bottom: 24px

  +mobile
    margin-bottom: 16px
</style>
