<template lang="pug">
  main
    section(:class="$style['personal-page']")
      div(
        :class="$style['personal-page__photo']"
        :style="{ backgroundImage: `url(${require('~/assets/images/our-team/' + person.image)})` }"
      )
        div(:class="$style['personal-page__info']")
          typo-text(
            tag="h2"
            version="style-4"
            :class="$style['personal-page__photo-name']"
          ) {{ person.name }}
          typo-text(
            tag="p"
            version="style-5"
            :class="$style['personal-page__photo-position']"
          ) {{ person.position }}
    section(:class="$style['personal-page']")
      div(:class="$style['personal-page__biography']")
        typo-text(
          v-for="(paragraph, i) in person.info"
          :key="i"
          tag="p"
          version="style-5"
          :class="$style['personal-page__photo-name']"
        ) {{ paragraph }}
    section(:class="$style['personal-page']")
      page-company-our-team-slider
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import PageCompanyOurTeamSlider from '~/components/Page/Company/PageCompanyOurTeamSlider.vue'
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'
import metaGenerator from '~/config/meta.js'
import { delay } from '~/lib/utils'
import { getSiteUrl } from '@/lib/utils'

@Component({
  components: { TypoText, PageCompanyOurTeamSlider },
  head(): any {
    const title = this.person.name

    const description = ''

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
      ],
    }
  },
})
export default class PersonalPage extends Vue {
  get person(): any {
    return this.$store.getters.getPersonById(this.$route.params.id)
  }

  created() {
    if (process.server) {
      this.$store.commit('PageTransition/animate', false)
    }

    this.$store.commit('setLogoSubTitle', this.$t('header.logo.company'))
    this.$store.commit('setBreadcrumbs', [
      {
        name: this.$t('breadcrumbs.our_team'),
        route: {
          name: 'company-our-team',
        },
      },
    ])
  }

  async mounted() {
    await delay(200)
    this.$store.commit('PageTransition/animate', false)
  }
}
</script>

<style lang="sass" module>
.personal-page
  width: 100%

  &__photo
    display: flex
    align-items: center
    max-width: 1360px
    min-height: 400px
    margin: 0 auto
    padding: 0 24px 0 24px
    margin-bottom: 80px
    background-size: contain
    background-color: $color-blue-4
    background-repeat: no-repeat
    background-position-x: 80%

    @media (max-width: 500px)
      align-items: flex-end
      padding: 24px
      margin-bottom: initial

    &-name
      margin: 0

    &-position
      margin: 0

  &__info
    width: 862px
    margin: 0 auto
    display: flex
    flex-direction: column

  &__biography
    max-width: 910px
    padding: 80px 24px
    margin: 0 auto
    display: flex
    flex-direction: column

    @media (max-width: 900px)
      padding: 24px

.content__link
  display: flex
  align-items: center
  flex-wrap: wrap

  &-text
    margin: 0
    white-space: nowrap

    &--underline
      text-decoration: underline
      text-decoration-color: $color-blue-16
      text-underline-offset: 7px
      color: $color-blue-100
      margin-left: 0.5em
      white-space: nowrap

  &-arrow
    height: 26px

    svg
      height: 26px
      width: 26px
</style>
