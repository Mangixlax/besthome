<template lang="pug">
  main
    base-image-title(
      :imageTitleData="$t('pages.service_turkish_citizenship.image_title')"
      :filename="$img(`/pages/service/turkish-citizenship/title.jpg`, $store.state.supportWebP ? { format: 'webp' } : {})"
    )
    base-text-container(
      :data="{\
        text: `<p>${$t('pages.service_turkish_citizenship.slot_text_1')}</p>`\
      }"
    )
    page-service-list-card(:listCardData="$t('pages.service_turkish_citizenship.list_card')")
    base-text-container(
      :data="{\
        text: `<h3>${$t('pages.service_turkish_citizenship.article_1.title')}</h3>`,\
        text_position: 'center'\
      }"
    )
    base-post(
      :data="{\
        image: $img(`/pages/service/turkish-citizenship/image-1.jpg`, $store.state.supportWebP ? { format: 'webp' } : {}),\
        text: [\
          `<p>${$t('pages.service_turkish_citizenship.post_1.paragraph_1')}</p>`,\
          `<p>${$t('pages.service_turkish_citizenship.post_1.paragraph_2')}</p>`,\
        ].join(''),\
        align: 'left',\
        block_flip: false,\
      }"
    )
    base-post(
      :data="{\
        image: $img(`/pages/service/turkish-citizenship/image-2.jpg`, $store.state.supportWebP ? { format: 'webp' } : {}),\
        text: [\
          `<p>${$t('pages.service_turkish_citizenship.post_2.paragraph_1')}</p>`,\
        ].join(''),\
        align: 'right',\
        block_flip: true,\
      }"
    )
    base-post(
      :data="{\
        image: $img(`/pages/service/turkish-citizenship/image-3.jpg`, $store.state.supportWebP ? { format: 'webp' } : {}),\
        text: [\
          `<p>${$t('pages.service_turkish_citizenship.post_3.paragraph_1')}</p>`,\
          `<p>${$t('pages.service_turkish_citizenship.post_3.paragraph_2')}</p>`,\
        ].join(''),\
        align: 'left',\
        block_flip: false,\
      }"
    )
    base-post-two-image(
      :data="{\
        block_flip: true,\
        text_align: 'right',\
        text: [\
          `<h3>${$t('pages.service_turkish_citizenship.post_4.title')}</h3>`,\
          `<p>${$t('pages.service_turkish_citizenship.post_4.paragraph_1')}</p>`,\
          `<p>${$t('pages.service_turkish_citizenship.post_4.paragraph_with_link')}`,\
          ` <a href=\"${localePath({ name: 'projects' })}\">${$t('pages.service_turkish_citizenship.post_4.link')}</a>.</p>`,\
        ].join(''),\
        images: [\
          $img(`/pages/service/turkish-citizenship/portrait-1.jpg`, $store.state.supportWebP ? { format: 'webp' } : {}),\
          $img(`/pages/service/turkish-citizenship/landscape-1.jpg`, $store.state.supportWebP ? { format: 'webp' } : {}),\
        ],\
      }"
    )
    base-seo-content
</template>

<script lang="ts">
import BasePost from '~/components/Base/BasePost.vue'
import TypoText from '~/components/Base/TypoText.vue'
import BaseImageTitle from '~/components/Base/BaseImageTitle.vue'
import PageServiceListCard from '~/components/Page/Service/PageServiceListCard.vue'
import BasePostTwoImage from '~/components/Base/BasePostTwoImage.vue'
import BaseTextContainer from '~/components/Base/BaseTextContainer.vue'
import BaseSeoContent from '~/components/Base/BaseSeoContent.vue'
import { Context } from '@nuxt/types'
import metaGenerator from '~/config/meta.js'
import { MetaInfo } from 'vue-meta'
import { Component, Vue } from 'nuxt-property-decorator'
import { delay } from '~/lib/utils'
import { getSiteUrl } from '@/lib/utils'

@Component({
  components: {
    BasePost,
    TypoText,
    BaseImageTitle,
    PageServiceListCard,
    BasePostTwoImage,
    BaseTextContainer,
    BaseSeoContent,
  },
  head(): any {
    const title = this.$i18n.t('pages.service_turkish_citizenship.seo_title')
    const description = this.$i18n.t('pages.service_turkish_citizenship.seo_description')

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
          href: getSiteUrl(this.localePath({ name: 'service-turkish-citizenship' }, 'en'), true),
        },
        {
          rel: 'alternate',
          hreflang: 'ru',
          href: getSiteUrl(this.localePath({ name: 'service-turkish-citizenship' }, 'ru'), true),
        },
      ],
    }
  },
})
export default class ServiceTurkishCitizenshipPage extends Vue {
  created() {
    this.$store.commit('setLightTheme')

    if (process.server) {
      this.$store.commit('PageTransition/animate', false)
    }

    this.$store.commit('Catalog/setPageSeoContent', '')
    this.$store.commit('setLogoSubTitle', this.$t('header.logo.service'))
    this.$store.commit('setBreadcrumbs', [
      {
        name: this.$t('breadcrumbs.turkish_citizenship'),
        route: {
          name: 'service-turkish-citizenship',
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

<style lang="sass" module></style>
