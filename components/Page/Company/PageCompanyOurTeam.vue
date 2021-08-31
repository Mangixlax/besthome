<template lang="pug">
  section(:class="$style['our-team']")
    div(:class="$style['our-team__container']")
      typo-text(
        tag="h1"
        version="style-1"
        :class="$style['our-team__container-title']"
      ) 
        | {{ $t('pages.our_team.title') }}
      div(:class="$style['our-team__display']")
        page-company-personal-card(
          v-for="(card,i) in data"
          :key="i"
          :card="card"
        )
</template>

<script>
import TypoText from '~/components/Base/TypoText.vue'
import PageCompanyPersonalCard from '~/components/Page/Company/PageCompanyPersonalCard.vue'

export default {
  name: 'PageCompanyOurTeam',
  components: { TypoText, PageCompanyPersonalCard },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    getOurCompanyCardInfo() {
      return this.$store.state.ourCompanyCardInfo
    },
  },
}
</script>

<style lang="sass" module>
.our-team
  width: 100%

  &__container
    display: grid
    flex-direction: column
    max-width: 1296px
    padding: 80px 24px
    margin: 0 auto

    &-title
      margin: 0
      margin-bottom: 80px

      @media (max-width: 900px)
        margin-bottom: 32px

    @media (max-width: 900px)
      padding: 32px 24px

  &__display
    display: grid
    grid-gap: 48px
    grid-template-columns: repeat(auto-fill, minmax(276px, 1fr))
    justify-items: center

.content__link
  display: flex
  align-items: center

  &-text
    margin: 0

    &--underline
      text-decoration: underline
      text-decoration-color: $color-blue-16
      text-underline-offset: 7px
      color: $color-blue-100

  &-arrow
    height: 26px

    svg
      height: 26px
      width: 26px
</style>
