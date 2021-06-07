<template lang="pug">
  main
    base-project-navigation
    page-projects-title(:data="{ header: $t('pages.projects_review.header.title') }")
    base-post(
      :filename="require(`~/assets/images/test.jpg`)"
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) {{ $t('pages.projects_experiences.post_1.title') }}
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.projects_experiences.post_1.paragraph_1') }}
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.projects_experiences.post_1.paragraph_2') }}
      typo-text(
        tag="p"
        version="style-5"
      )
        | {{ $t('pages.projects_experiences.post_1.paragraph_with_link') }}
        typo-text(
          tag="a"
          href="#"
          version="style-5"
        ) {{ $t('pages.projects_experiences.post_1.link') }}
        | .
    base-post(
      :filename="require(`~/assets/images/test.jpg`)"
      flip
      text-flip
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) {{ $t('pages.projects_experiences.post_2.title') }}
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.projects_experiences.post_1.paragraph_1') }}
      typo-text(
        tag="p"
        version="style-5"
      )
        | {{ $t('pages.projects_experiences.post_2.paragraph_with_link') }}
        typo-text(
          tag="a"
          href="#"
          version="style-5"
        ) {{ $t('pages.projects_experiences.post_1.link') }}
        | .
    base-scroll-line(:data="$t('pages.projects_experiences.scroll_line_data')")
    page-projects-panorama
    base-subscribe(:subscribe-data="$t('footer.subscribe')" whiteTheme)
    base-accordions(:accordions-data="$t('footer.accordions')")
    footer-fast-links
</template>

<script lang="ts">
import BaseProjectNavigation from '~/components/Base/BaseProjectNavigation.vue'
import PageProjectsTitle from '~/components/Page/Projects/PageProjectsTitle.vue'
import BasePost from '~/components/Base/BasePost.vue'
import TypoText from '~/components/Base/TypoText.vue'
import BaseScrollLine from '~/components/Base/BaseScrollLine.vue'
import PageProjectsPanorama from '~/components/Page/Projects/PageProjectsPanorama.vue'
import BaseSubscribe from '~/components/Base/BaseSubscribe.vue'
import BaseAccordions from '~/components/Base/BaseAccordions.vue'
import FooterFastLinks from '~/components/Footer/FooterFastLinks.vue'
import { Context } from '@nuxt/types'

export default {
  name: 'experiences',
  components: {
    BaseProjectNavigation,
    PageProjectsTitle,
    BasePost,
    TypoText,
    BaseScrollLine,
    PageProjectsPanorama,
    BaseSubscribe,
    BaseAccordions,
    FooterFastLinks,
  },
  async asyncData(ctx: Context): Promise<object | void> {
    await ctx.store.dispatch('Catalog/fetchProject')
  },
  data() {
    return {
      experiencesPageScrollLineInfo: [
        {
          title: '239',
          text: 'Apartments',
        },
        {
          title: '470',
          text: 'Parking spots for bikes',
        },
        {
          title: '3800m²',
          text: 'Of common green areas',
        },
        {
          title: '1 to 4-room',
          text: 'Separate rooms',
        },
      ],
    }
  },
}
</script>

<style lang="sass" module></style>
