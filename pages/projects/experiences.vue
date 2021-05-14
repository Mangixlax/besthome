<template lang="pug">
  main
    base-project-navigation
    page-projects-experiences-title
    base-post(
      :filename="require(`~/assets/images/test.jpg`)"
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) Fitness Centre
      typo-text(
        tag="p"
        version="style-5"
      ) Cleopatra Select is conceived for people who want their home to extend beyond apartment walls. The quintessential urban life is complemented by closeness to nature. Apartments are energy-efficient and buildings are surrounded by greenery and covered with green roofs.
      typo-text(
        tag="p"
        version="style-5"
      ) The largest fitness in the country. For indoor sports activities enthusiasts (and for rainy days too).
      typo-text(
        tag="p"
        version="style-5"
      )
        | More
        typo-text(
          tag="a"
          href="#"
          version="style-5"
        ) about Cleopatra Select 
        | .
    base-post(
      :filename="require(`~/assets/images/test.jpg`)"
      flip
      text-flip
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) Library 
      typo-text(
        tag="p"
        version="style-5"
      ) A modern, spacious and bright public library for all bibliophiles.
      typo-text(
        tag="p"
        version="style-5"
      )
        | More
        typo-text(
          tag="a"
          href="#"
          version="style-5"
        ) about Cleopatra Select 
        | .
    base-scroll-line(:scrollLineInfo="experiencesPageScrollLineInfo")
    page-projects-panorama
    base-subscribe(whiteTheme)
    base-accordeons
    footer-fast-links
</template>

<script lang="ts">
import BaseProjectNavigation from '~/components/Base/BaseProjectNavigation.vue'
import PageProjectsExperiencesTitle from '~/components/Page/Projects/PageProjectsExperiencesTitle.vue'
import BasePost from '~/components/Base/BasePost.vue'
import TypoText from '~/components/Base/TypoText.vue'
import BaseScrollLine from '~/components/Base/BaseScrollLine.vue'
import PageProjectsPanorama from '~/components/Page/Projects/PageProjectsPanorama.vue'
import BaseSubscribe from '~/components/Base/BaseSubscribe.vue'
import BaseAccordeons from '~/components/Base/BaseAccordeons.vue'
import FooterFastLinks from '~/components/Footer/FooterFastLinks.vue'

export default {
  name: 'experiences',
  components: {
    BaseProjectNavigation,
    PageProjectsExperiencesTitle,
    BasePost,
    TypoText,
    BaseScrollLine,
    PageProjectsPanorama,
    BaseSubscribe,
    BaseAccordeons,
    FooterFastLinks,
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
      ]
    }
  },
}
</script>

<style lang="sass" module></style>
