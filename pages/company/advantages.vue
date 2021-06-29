<template lang="pug">
  main
    page-company-advantages-title(:advantages-page-title="$t('pages.company_advantages.header')")
    base-scroll-line(:data="$t('pages.company_advantages.scroll_line_data')")
    base-post(
      :data="{\
        image: require(`~/assets/images/pages/advantages/image-1.jpg`),\
        text: [\
          `<h3>${$t('pages.company_advantages.post_1.title')}</h3>`,\
          ...$t('pages.company_advantages.post_1.paragraph_1').map((p) => `<p>${p}<p>`),\
        ].join(''),\
        align: 'right',\
        block_flip: true,\
      }"
    )
    base-post(
      :data="{\
        image: require(`~/assets/images/pages/advantages/image-2.jpg`),\
        text: [\
          `<h3>${$t('pages.company_advantages.post_2.title')}</h3>`,\
          `<p>${$t('pages.company_advantages.post_2.paragraph_1')}</p>`,\
          `<p>${$t('pages.company_advantages.post_2.paragraph_with_link')}`,\
          `<a href='${this.localePath({ name: 'contacts' })}'>${$t('pages.company_advantages.post_2.link')}</a>.</p>`\
        ].join(''),\
        align: 'right',\
        block_flip: false,\
      }"
    )
    base-text-container(
      :data="{\
        text: [\
          `<h3>${$t('pages.company_advantages.article_1.title')}</h3>`,\
          ...$t('pages.company_advantages.article_1.text').map((p) => `<p>${p}<p>`)\
        ].join('')\
      }"
    )
    base-post(
      :data="{\
        image: require(`~/assets/images/pages/advantages/image-3.jpg`),\
        text: [\
          `<h3>${$t('pages.company_advantages.post_3.title')}</h3>`,\
          `<p>${$t('pages.company_advantages.post_3.paragraph_1')}</p>`,\
        ].join(''),\
        align: 'right',\
        block_flip: true,\
      }"
    )
    base-post(
      :data="{\
        image: require(`~/assets/images/pages/advantages/image-4.jpg`),\
        text: [\
          `<h3>${$t('pages.company_advantages.post_4.title')}</h3>`,\
          `<p>${$t('pages.company_advantages.post_4.paragraph_1')}</p>`,\
          `<p>${$t('pages.company_advantages.post_4.paragraph_with_link')}`,\
          `<a href='${this.localePath({ name: 'our-team' })}'>${$t('pages.company_advantages.post_4.link')}</a>.</p>`\
        ].join(''),\
        align: 'right',\
        block_flip: false,\
      }"
    )
    base-post(
      :data="{\
        image: require(`~/assets/images/pages/advantages/image-5.jpg`),\
        text: [\
          `<h3>${$t('pages.company_advantages.post_5.title')}</h3>`,\
          `<p>${$t('pages.company_advantages.post_5.paragraph_1')}</p>`,\
        ].join(''),\
        align: 'right',\
        block_flip: true,\
      }"
    )
    base-text-container(
      :data="{\
        text: [\
          `<h3>${$t('pages.company_advantages.article_2.title')}</h3>`,\
          ...$t('pages.company_advantages.article_2.text').map((p) => `<p>${p}<p>`),\
          `<p>${$t('pages.company_advantages.article_2.paragraph_with_link')}`,\
          `<a href='${this.localePath({ name: 'projects' })}'>${$t('pages.company_advantages.article_2.link')}</a>.</p>`,\
        ].join('')\
      }"
    )
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
    ctx.store.commit('setLogoSubTitle', ctx.app.i18n.t('header.logo.company'))
    ctx.store.commit('setBreadcrumbs', [
      {
        name: ctx.app.i18n.t('breadcrumbs.our_difference'),
        route: {
          name: 'company-advantages',
        },
      },
    ])
  },
}
</script>

<style lang="sass" module></style>
