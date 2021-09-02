<template lang="pug">
  main
    section(:class="$style['personal-page']")
      div(
        :class="$style['personal-page__photo']"
        :style="{ backgroundImage: `url(${$img(`/s1${getPerson.avatar}`, $store.state.supportWebP ? { format: 'webp' } : {})})` }"
      )
        div(:class="$style['personal-page__info']")
          typo-text(
            tag="h1"
            version="style-4"
            :class="$style['personal-page__photo-name']"
          ) {{ getPerson.name }}
          typo-text(
            tag="p"
            version="style-5"
            :class="$style['personal-page__photo-position']"
          ) {{ getPerson.position }}
    section(:class="$style['personal-page']")
      div(
        :class="$style['personal-page__biography']"
        v-html="getPerson.content"
      )
    section(:class="$style['personal-page']")
      page-company-our-team-slider
    base-seo-content
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import PageCompanyOurTeamSlider from '~/components/Page/Company/PageCompanyOurTeamSlider.vue'
import BaseSeoContent from '~/components/Base/BaseSeoContent.vue'
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'
import metaGenerator from '~/config/meta.js'
import { delay } from '~/lib/utils'
import { getSiteUrl } from '@/lib/utils'
import VueRouter, { Route } from 'vue-router'
import { IPerson } from '~/store/Employees'

@Component({
  components: {
    TypoText,
    PageCompanyOurTeamSlider,
    BaseSeoContent,
  },
  async asyncData(ctx: Context): Promise<object> {
    if (!process.server) {
      await delay(200)
      ctx.store.commit('PageTransition/animate', true)
    } else {
      ctx.store.commit('PageTransition/animate', false)
    }

    let person: IPerson = ctx.store.getters['Employees/getPerson']

    const personId = (ctx.route.params.id || '').split('-').pop()

    try {
      person = await ctx.store.dispatch('Employees/fetchPerson', personId)

      if (person.slug !== ctx.route.params.id) {
        ctx.redirect(
          301,
          (ctx.app.router as VueRouter).resolve({
            name: ctx.route.name as string,
            params: { id: person.slug },
          }).href,
        )
      }

      if (ctx.store.getters['Employees/getPersons'].length === 0) {
        // Fetch person list
        await ctx.store.dispatch('Employees/fetchPersons')
      }

      ctx.store.commit('Employees/setPerson', person)

      ctx.store.commit('setBreadcrumbs', [
        {
          name: ctx.i18n.t('breadcrumbs.our_team'),
          route: {
            name: 'company-our-team',
          },
        },
      ])
    } catch ({ error }) {
      ctx.error({ statusCode: error.http_code })
    }

    ctx.store.commit('setLightTheme')
    ctx.store.commit('setLogoSubTitle', ctx.i18n.t('header.logo.company'))
    ctx.store.commit('Catalog/setPageSeoContent', '')

    setTimeout(() => {
      ctx.store.commit('PageTransition/animate', false)
    }, 500)

    return {
      person,
    }
  },
  head(): any {
    const title = this.person.name + ' ' + this.$i18n.t('seo_title')

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
        {
          rel: 'alternate',
          hreflang: 'x-default',
          href: getSiteUrl(
            this.localePath({ name: 'company-our-team-id', params: this.$route.params }, 'en'),
            true,
          ),
        },
        {
          rel: 'alternate',
          hreflang: 'ru',
          href: getSiteUrl(
            this.localePath({ name: 'company-our-team-id', params: this.$route.params }, 'ru'),
            true,
          ),
        },
      ],
    }
  },
})
export default class PersonalPage extends Vue {
  get getPerson(): IPerson {
    return this.$store.getters['Employees/getPerson']
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

    & > p
      +style-5
      margin: 0

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
