<template lang="pug">
  main
    base-image-title(
      :image-title-data="$t('pages.service_introductory_tour.image_title')"
      :filename="$img(`/pages/service/introductory-tour/title.jpg`, $store.state.supportWebP ? { format: 'webp' } : {})"
    )
    base-text-container(
      :data="{\
        text: `<h2>${$t('pages.service_introductory_tour.slot_text_1')}</h2>`\
      }"
    )
    base-post(
      :data="{\
        image: $img(`/pages/service/introductory-tour/image-1.jpg`, $store.state.supportWebP ? { format: 'webp' } : {}),\
        text: [\
          `<h3>${$t('pages.service_introductory_tour.post_1.title')}</h3>`,\
          `<p>${$t('pages.service_introductory_tour.post_1.paragraph_1')}</p>`,\
          `<p>${$t('pages.service_introductory_tour.post_1.paragraph_with_link')}`,\
          `<a href='${this.localePath({ name: 'projects' })}'>${$t('pages.service_introductory_tour.post_1.link')}</a>.</p>`,\
        ].join(''),\
        align: 'left',\
        block_flip: false,\
      }"
    )
    base-text-container(
      :data="{\
        text: [\
          `<h2>${$t('pages.service_introductory_tour.slot_text_1')}</h2>`,\
          ...$t('pages.service_introductory_tour.article_1.text').map((p) => `<p>${p}<p>`),\
        ].join(''),\
      }"
    )
    base-post(
      :data="{\
        image: $img(`/pages/service/introductory-tour/image-2.jpg`, $store.state.supportWebP ? { format: 'webp' } : {}),\
        text: [\
          `<h3>${$t('pages.service_introductory_tour.post_2.title')}</h3>`,\
          `<p>${$t('pages.service_introductory_tour.post_2.paragraph_1')}</p>`,\
          `<p>${$t('pages.service_introductory_tour.post_2.paragraph_2')}</p>`,\
        ].join(''),\
        align: 'right',\
        block_flip: true,\
      }"
    )
    base-post(
      :data="{\
        image: $img(`/pages/service/introductory-tour/image-3.jpg`, $store.state.supportWebP ? { format: 'webp' } : {}),\
        text: [\
          `<h3>${$t('pages.service_introductory_tour.post_3.title')}</h3>`,\
          `<p>${$t('pages.service_introductory_tour.post_3.paragraph_1')}</p>`,\
          `<p>${$t('pages.service_introductory_tour.post_3.paragraph_with_link')}`,\
          `<a href='${this.localePath({ name: 'projects' })}'>${$t('pages.service_introductory_tour.post_3.link')}</a>.</p>`,\
        ].join(''),\
        align: 'left',\
        block_flip: false,\
      }"
    )
    base-post(
      :data="{\
        image: $img(`/pages/service/introductory-tour/image-4.jpg`, $store.state.supportWebP ? { format: 'webp' } : {}),\
        text: [\
          `<h3>${$t('pages.service_introductory_tour.post_4.title')}</h3>`,\
          `<p>${$t('pages.service_introductory_tour.post_4.paragraph_1')}</p>`,\
        ].join(''),\
        align: 'right',\
        block_flip: true,\
      }"
    )
    base-post(
      :data="{\
        image: $img(`/pages/service/introductory-tour/image-5.jpg`, $store.state.supportWebP ? { format: 'webp' } : {}),\
        text: [\
          `<h3>${$t('pages.service_introductory_tour.post_5.title')}</h3>`,\
          `<p>${$t('pages.service_introductory_tour.post_5.paragraph_1')}</p>`,\
          `<p>${$t('pages.service_introductory_tour.post_5.paragraph_with_link')}`,\
          `<a href='${this.localePath({ name: 'projects' })}'>${$t('pages.service_introductory_tour.post_5.link')}</a>.</p>`,\
        ].join(''),\
        align: 'left',\
        block_flip: false,\
      }"
    )
    base-post(
      :data="{\
        image: $img(`/pages/service/introductory-tour/image-6.jpg`, $store.state.supportWebP ? { format: 'webp' } : {}),\
        text: [\
          `<h3>${$t('pages.service_introductory_tour.post_6.title')}</h3>`,\
          `<p>${$t('pages.service_introductory_tour.post_6.paragraph_1')}</p>`,\
        ].join(''),\
        align: 'right',\
        block_flip: true,\
      }"
    )
    base-post-two-image(
      :data="{\
        block_flip: false,\
        text_align: 'left',\
        text: [\
          `<h3>${$t('pages.service_introductory_tour.post_7.title')}</h3>`,\
          `<p>${$t('pages.service_introductory_tour.post_7.paragraph_1')}</p>`,\
          `<p>${$t('pages.service_introductory_tour.post_7.paragraph_2')}</p>`,\
        ].join(''),\
        images: [\
          $img(`/pages/service/introductory-tour/portrait-1.jpg`, $store.state.supportWebP ? { format: 'webp' } : {}),\
          $img(`/pages/service/introductory-tour/landscape-1.jpg`, $store.state.supportWebP ? { format: 'webp' } : {}),\
        ],\
      }"
    )
    base-seo-content
</template>

<script lang="ts">
import BasePost from '~/components/Base/BasePost.vue'
import TypoText from '~/components/Base/TypoText.vue'
import BaseImageTitle from '~/components/Base/BaseImageTitle.vue'
import BasePostTwoImage from '~/components/Base/BasePostTwoImage.vue'
import BaseTextContainer from '~/components/Base/BaseTextContainer.vue'
import BaseSeoContent from '~/components/Base/BaseSeoContent.vue'
import metaGenerator from '~/config/meta.js'
import { Component, Vue } from 'nuxt-property-decorator'
import { delay } from '~/lib/utils'
import { getSiteUrl } from '@/lib/utils'

@Component({
  components: {
    BasePost,
    TypoText,
    BaseImageTitle,
    BasePostTwoImage,
    BaseTextContainer,
    BaseSeoContent,
  },
  head(): any {
    const title = this.$i18n.t('pages.service_introductory_tour.seo_title')
    const description = this.$i18n.t('pages.service_introductory_tour.seo_description')

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
          href: getSiteUrl(this.localePath({ name: 'service-introductory-tour' }, 'en'), true),
        },
        {
          rel: 'alternate',
          hreflang: 'ru',
          href: getSiteUrl(this.localePath({ name: 'service-introductory-tour' }, 'ru'), true),
        },
      ],
    }
  },
})
export default class ServiceIntroductoryTourPage extends Vue {
  created() {
    this.$store.commit('setLightTheme')

    if (process.server) {
      this.$store.commit('PageTransition/animate', false)
    }

    this.$store.commit('Catalog/setPageSeoContent', '')
    this.$store.commit('setLogoSubTitle', this.$t('header.logo.service'))
    this.$store.commit('setBreadcrumbs', [
      {
        name: this.$t('breadcrumbs.inspection_trip'),
        route: {
          name: 'service-introductory-tour',
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
