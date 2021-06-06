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
            :class="$style['choose-apartments__navlist-number']"
          ) {{ item.number }}
          typo-text(
            tag="p"
            version="style-7"
            :class="$style['choose-apartments__navlist-label']"
          )  {{ item.label }}
    template(slot="body")
      component(:is='component')
</template>

<script>
import TypoText from '~/components/Base/TypoText.vue'
import ModalContainer from '~/components/Modal/base/ModalContainer'
import ModalChooseApartmentsProject from '~/components/Modal/ChooseAparments/ModalChooseApartmentsProject'

export default {
  name: 'ModalChooseApartments',
  components: {
    TypoText,
    ModalContainer,
    ModalChooseApartmentsProject,
  },

  props: {
    name: {
      // Modal id
      type: String,
      default: '',
    },
  },
  data() {
    return {
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
  methods: {},
}
</script>

<style lang="sass" module>
.choose-apartments
  width: 100%

  &__navlist
    display: flex
    justify-content: space-between
    align-items: center
    list-style: none
    margin: 0
    padding: 0
    grid-gap: 169px

    &-item
      display: flex
      align-items: center
      grid-gap: 16px
      color: $color-black-56

      p
        margin: 0

    &-number
      width: 19px
</style>
