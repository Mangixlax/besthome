<template lang="pug">
  form(:class="$style['form']" @submit.prevent)
    slot()

    div(v-if="!finished" :class="$style['form__footer']")
      slot(name="footer")
        //- i18n(
        //-   path="modals.policy"
        //-   tag="typo-text"
        //-   version="primary-small"
        //- )
        //-   template(v-slot:btn)
        //-     typo-text(version="label-medium" tag="span" :class="$style['fake__btn']")
        //-       | {{ submitName }}
        //-   template(v-slot:privacy)
        //-     nuxt-link(
        //-       :to="localePath('/policy')"
        //-       v-slot="{ href, route }"
        //-     )
        //-       a(
        //-         :href="href"
        //-         @click.prevent="goToRoute(route)"
        //-         rel="nofollow"
        //-       ) {{ $t('modals.privacy') }}

        //-   template(v-slot:personal_data)
        //-     nuxt-link(
        //-       :to="localePath('/personal-data')"
        //-       v-slot="{ href, route }"
        //-     )
        //-       a(
        //-         :href="href"
        //-         @click.prevent="goToRoute(route)"
        //-         rel="nofollow"
        //-       ) {{ $t('modals.personal_data') }}
</template>

<script>
import TypoText from '~/components/Base/TypoText.vue'
import { navigationExtends } from '@/mixins/routes'

export default {
  name: 'VForm',
  mixins: [navigationExtends],
  components: {
    TypoText,
  },
  props: {
    description: {
      type: String,
      default: '',
    },
    submitName: {
      type: String,
      default: '',
    },
    finished: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    async beforeGoToRoute() {
      await this.$modal.hideAll()
      document.documentElement.classList.remove('modal-is-open')
    },
  },
  watch: {
    finished() {
      this.$root.$emit('aside.updateSticky')
    },
  },
}
</script>

<style lang="sass" module>
.fake__btn
  color: #1A1B29
  padding: 4px 12px
  background: rgba(#1A1B29, 0.08)
  border-radius: 6px
  display: inline-block

.form__description
  color: #1A1B29

.form__footer
    margin-top: 24px

    p
      color: #1A1B29
      margin: 0
      line-height: 30px

    a
      color: #1A1B29
      text-decoration: underline
      text-decoration-color: rgba(#1A1B29, 0.08)
      text-underline-offset: 6px
      transition: color 0.25s ease, text-decoration-color 0.25s ease

      &:hover
        color: #FF7714
        text-decoration-color: #FF7714
</style>
