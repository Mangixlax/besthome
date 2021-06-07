<template lang="pug">
  main
    page-company-advantages-title(:advantages-page-title="$t('pages.company_advantages.header')")
    base-scroll-line(:data="$t('pages.company_advantages.scroll_line_data')")
    base-post(
      :filename="require(`~/assets/images/pages/advantages/image-1.jpg`)"
      flip
      text-flip
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) {{ $t('pages.company_advantages.post_1.title') }}
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.company_advantages.post_1.paragraph_1') }}
    base-post(
      :filename="require(`~/assets/images/pages/advantages/image-2.jpg`)"
      text-flip
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) {{ $t('pages.company_advantages.post_2.title') }}
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.company_advantages.post_2.paragraph_1') }}
      typo-text(
        tag="p"
        version="style-5"
      )
        | {{ $t('pages.company_advantages.post_2.paragraph_with_link') }}
        typo-text(
          tag="nuxt-link"
          :to="localePath({ name: 'contacts' })"
          version="style-5"
        ) {{ $t('pages.company_advantages.post_2.link') }}
        | .
    base-text-container
      typo-text(
        tag="h3"
        version="style-3"
      )  {{ $t('pages.company_advantages.article_1.title') }}
      typo-text(
        v-for="(paragraph, i) in $t('pages.company_advantages.article_1.text')"
        :key="i"
        tag="p"
        version="style-5"
      )  {{ paragraph }}
    base-post(
      :filename="require(`~/assets/images/pages/advantages/image-3.jpg`)"
      flip
      text-flip
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) {{ $t('pages.company_advantages.post_3.title') }}
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.company_advantages.post_3.paragraph_1') }}
    base-post(
      :filename="require(`~/assets/images/pages/advantages/image-4.jpg`)"
      text-flip
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) {{ $t('pages.company_advantages.post_4.title') }}
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.company_advantages.post_4.paragraph_1') }}
      typo-text(
        tag="p"
        version="style-5"
      )
        | {{ $t('pages.company_advantages.post_4.paragraph_with_link') }}
        typo-text(
          tag="nuxt-link"
          :to="localePath({ name: 'company-our-team' })"
          version="style-5"
        ) {{ $t('pages.company_advantages.post_4.link') }}
        | .
    base-post(
      :filename="require(`~/assets/images/pages/advantages/image-5.jpg`)"
      flip
      text-flip
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) {{ $t('pages.company_advantages.post_5.title') }}
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.company_advantages.post_5.paragraph_1') }}
    base-text-container
      typo-text(
        tag="h3"
        version="style-3"
      )  {{ $t('pages.company_advantages.article_2.title') }}
      typo-text(
        v-for="(paragraph, i) in $t('pages.company_advantages.article_2.text')"
        :key="i"
        tag="p"
        version="style-5"
      )  {{ paragraph }}
      typo-text(
        tag="p"
        version="style-5"
      )
        | {{ $t('pages.company_advantages.article_2.paragraph_with_link') }}
        typo-text(
          tag="a"
          href="#"
          version="style-5"
        ) {{ $t('pages.company_advantages.article_2.link') }}
        | .
</template>

<script lang="ts">
import PageCompanyAdvantagesTitle from '~/components/Page/Company/PageCompanyAdvantagesTitle.vue'
import PageCompanyAdvantagesSlider from '~/components/Page/Company/PageCompanyAdvantagesSlider.vue'
import BaseScrollLine from '~/components/Base/BaseScrollLine.vue'
import BasePost from '~/components/Base/BasePost.vue'
import TypoText from '~/components/Base/TypoText.vue'
import BaseTextContainer from '~/components/Base/BaseTextContainer.vue'
import { Context } from '@nuxt/types'

export default {
  name: 'introductory-tour',
  components: {
    PageCompanyAdvantagesTitle,
    PageCompanyAdvantagesSlider,
    BaseTextContainer,
    BaseScrollLine,
    BasePost,
    TypoText,
  },
  asyncData(ctx: Context): void {
    ctx.store.commit('setLogoSubTitle', 'Company')
  },
}
</script>

<style lang="sass" module></style>
