<template lang="pug">
  modal-container(
    v-bind="$attrs"
    :name="name"
    :class="$style['choose-apartments']"
  )
    template(slot="header")
      ul( :class="$style['choose-apartments__navlist']")
        li(
          v-for="(item,i) in modalNavigation"
          :class="$style['choose-apartments__navlist-item']"
        )
          typo-text(
            tag="p"
            version="style-7"
            :class="[$style['choose-apartments__navlist-number'], i + 1 === step && $style['selected']]"
          ) {{ item.number }}
          typo-text(
            tag="p"
            version="style-7"
            :class="[$style['choose-apartments__navlist-label'], i + 1 === step && $style['selected']]"
          )  {{ item.label }}
    template(slot="body")
      modal-choose-apartments-project( v-show="step === 1" @nextStepInfo="setStep")
      modal-choose-apartments-filter( v-show="step === 2" @prevStepInfo="setStep" @nextStepInfo="setStep")
      modal-choose-apartments-contact( v-show="step === 3" @prevStepInfo="setStep" @sendData="sendFormInfo")
</template>

<script>
import TypoText from '~/components/Base/TypoText.vue'
import ModalContainer from '~/components/Modal/base/ModalContainer'
import ModalChooseApartmentsProject from '~/components/Modal/ChooseAparments/ModalChooseApartmentsProject'
import ModalChooseApartmentsFilter from '~/components/Modal/ChooseAparments/ModalChooseApartmentsFilter.vue'
import ModalChooseApartmentsContact from '~/components/Modal/ChooseAparments/ModalChooseApartmentsContact.vue'

export default {
  name: 'ModalChooseApartments',
  components: {
    TypoText,
    ModalContainer,
    ModalChooseApartmentsProject,
    ModalChooseApartmentsFilter,
    ModalChooseApartmentsContact,
  },

  props: {
    name: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      step: 1,
      component: 'ModalChooseApartmentsProject',
      modalNavigation: [
        {
          number: 1,
          label: 'Choose a project',
        },
        {
          number: 2,
          label: 'What apartment are you looking for?',
        },
        {
          number: 3,
          label: 'Where can we reach you?',
        },
      ],
      form: {
        porojects: [],
        rooms: [],
        advantages: [],
      },
      apiMethod: 'v1/forms/newSubscriber',
    }
  },
  methods: {
    setStep(stepInfo) {
      this.step = stepInfo
    },
    sendFormInfo(form) {},
  },
}
</script>

<style lang="sass" module>
.choose-apartments
  width: 100%

  &__navlist
    display: flex
    width: 100%
    justify-content: space-around
    align-items: center
    list-style: none
    margin: 0
    padding: 0

    @media (max-width: 800px)
      flex-direction: column
      align-items: start

    &-item
      display: flex
      align-items: center
      grid-gap: 16px
      color: $color-black-56

      p
        margin: 0

    &-number
      width: 19px
      text-align: center

      &.selected
        background: $color-black-100
        color: $color-white-100

    &-label
      &.selected
        color: $color-black-100
</style>
