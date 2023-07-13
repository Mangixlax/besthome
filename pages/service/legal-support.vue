<template lang="pug">
  main
    base-image-title(
      :image-title-data="$t('pages.service_legal_support.image_title')"
      :filename="$img(`/pages/service/legal-support/title.jpg`, $store.state.supportWebP ? { format: 'webp' } : {})"
    )
    base-text-container(
      :data="{\
        text: `<p>${$t('pages.service_legal_support.slot_text_1')}</p>`\
      }"
    )
    base-post(
      :data="{\
        image: $img(`/pages/service/legal-support/image-1.jpg`, $store.state.supportWebP ? { format: 'webp' } : {}),\
        text: [\
          `<p>${$t('pages.service_legal_support.post_1.paragraph_1')}</p>`,\
          `<p>${$t('pages.service_legal_support.post_1.paragraph_with_link')}`,\
          `<a href='${this.localePath({ name: 'projects' })}'>${$t('pages.service_legal_support.post_1.link')}</a>.</p>`,\
        ].join(''),\
        align: 'left',\
        block_flip: false,\
      }"
    )
    base-post(
      :data="{\
        image: $img(`/pages/service/legal-support/image-2.jpg`, $store.state.supportWebP ? { format: 'webp' } : {}),\
        text: [\
          `<p>${$t('pages.service_legal_support.post_2.paragraph_1')}</p>`,\
        ].join(''),\
        align: 'right',\
        block_flip: true,\
      }"
    )
    base-post(
      :data="{\
        image: $img(`/pages/service/legal-support/image-3.jpg`, $store.state.supportWebP ? { format: 'webp' } : {}),\
        text: [\
          `<p>${$t('pages.service_legal_support.post_3.paragraph_1')}</p>`,\
          `<p>${$t('pages.service_legal_support.post_3.paragraph_with_link')}`,\
          `<a href='${this.localePath({ name: 'projects' })}'>${$t('pages.service_legal_support.post_3.link')}</a>.</p>`,\
        ].join(''),\
        align: 'left',\
        block_flip: false,\
      }"
    )
    base-seo-content
</template>

<script lang="ts">
import BasePost from '~/components/Base/BasePost.vue'
import TypoText from '~/components/Base/TypoText.vue'
import BaseImageTitle from '~/components/Base/BaseImageTitle.vue'
import BaseTextContainer from '~/components/Base/BaseTextContainer.vue'
import BaseSeoContent from '~/components/Base/BaseSeoContent.vue'
import { Context } from '@nuxt/types'
import metaGenerator from '~/config/meta.js'
import { Component, Vue } from 'nuxt-property-decorator'
import { delay } from '~/lib/utils'
import { getSiteUrl } from '@/lib/utils'

@Component({
  components: {
    BasePost,
    TypoText,
    BaseImageTitle,
    BaseTextContainer,
    BaseSeoContent,
  },
  head(): any {
    const title = this.$i18n.t('pages.service_legal_support.seo_title')
    const description = this.$i18n.t('pages.service_legal_support.seo_description')

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
          href: getSiteUrl(this.localePath({ name: 'service-legal-support' }, 'en'), true),
        },
        {
          rel: 'alternate',
          hreflang: 'ru',
          href: getSiteUrl(this.localePath({ name: 'service-legal-support' }, 'ru'), true),
        },
      ],
    }
  },
})
export default class ServiceLegalSupportPage extends Vue {
  created() {
    this.$store.commit('setLightTheme')

    if (process.server) {
      this.$store.commit('PageTransition/animate', false)
    }

    this.$store.commit('Catalog/setPageSeoContent', '')
    this.$store.commit('setLogoSubTitle', this.$t('header.logo.service'))
    this.$store.commit('setBreadcrumbs', [
      {
        name: this.$t('breadcrumbs.legal_suppurt'),
        route: {
          name: 'service-legal-support',
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
