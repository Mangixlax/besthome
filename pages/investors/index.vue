<template lang="pug">
  main
    page-investors-title(:investorsPage="$t('pages.investors.header')")
    base-post(
      :filename="require(`~/assets/images/pages/investors/image-1.jpg`)"
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) {{ $t('pages.investors.post_1.title') }}
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.investors.post_1.paragraph_1') }}
      typo-text(
        tag="p"
        version="style-5"
      )
        | {{ $t('pages.investors.post_1.paragraph_with_link') }}
        typo-text(
          tag="a"
          href="#"
          version="style-5"
        ) {{ $t('pages.investors.post_1.link') }}
        | .
    page-investors-advice(:investorsPageAdvice="$t('pages.investors.advice_data')")
    base-post(
      :filename="require(`~/assets/images/pages/investors/image-2.jpg`)"
      flip
      text-flip
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) {{ $t('pages.investors.post_2.title') }}
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.investors.post_2.paragraph_1') }}
      typo-text(
        tag="p"
        version="style-5"
      )
        | {{ $t('pages.investors.post_2.paragraph_with_link') }}
        typo-text(
          tag="a"
          href="#"
          version="style-5"
        ) {{ $t('pages.investors.post_2.link') }}
        | .
    base-post(
      :filename="require(`~/assets/images/pages/investors/image-3.jpg`)"
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) {{ $t('pages.investors.post_3.title') }}
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.investors.post_3.paragraph_1') }}
      typo-text(
        tag="p"
        version="style-5"
      )
        | {{ $t('pages.investors.post_3.paragraph_with_link') }}
        typo-text(
          tag="a"
          href="#"
          version="style-5"
        ) {{ $t('pages.investors.post_3.link') }}
        | .
    base-scroll-line(:data="$t('pages.investors.scroll_line_data')")
    base-post-two-image(
      :data="{\
        text: [\
          `<p>${$t('pages.investors.post_4.paragraph_1')}</p>`,\
          `<p>${$t('pages.investors.post_4.paragraph_with_link')}`,\
          ` <a href='#'>${$t('pages.investors.post_4.link')}</a>.</p>`,\
        ].join(''),\
        images: [\
          { path: require(`~/assets/images/investors/portrait-1.jpg`), },\
          { path: require(`~/assets/images/investors/landscape-1.jpg`), },\
        ],\
      }"
    )
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import PageInvestorsTitle from '~/components/Page/Investors/PageInvestorsTitle.vue'
import PageInvestorsAdvice from '~/components/Page/Investors/PageInvestorsAdvice.vue'
import BasePost from '~/components/Base/BasePost.vue'
import BaseScrollLine from '~/components/Base/BaseScrollLine.vue'
import BasePostTwoImage from '~/components/Base/BasePostTwoImage.vue'
import TypoText from '~/components/Base/TypoText.vue'

@Component({
  components: {
    PageInvestorsTitle,
    PageInvestorsAdvice,
    BasePost,
    BasePostTwoImage,
    BaseScrollLine,
    TypoText,
  },
})
export default class InvestorsPage extends Vue {}
</script>
