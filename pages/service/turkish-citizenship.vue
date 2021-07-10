<template lang="pug">
  main
    base-image-title(
      :imageTitleData="$t('pages.service_turkish_citizenship.image_title')"
      :filename="require(`~/assets/images/pages/service/turkish-citizenship/title.jpg`)"
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
        image: require(`~/assets/images/pages/service/turkish-citizenship/image-1.jpg`),\
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
        image: require(`~/assets/images/pages/service/turkish-citizenship/image-2.jpg`),\
        text: [\
          `<p>${$t('pages.service_turkish_citizenship.post_2.paragraph_1')}</p>`,\
        ].join(''),\
        align: 'right',\
        block_flip: true,\
      }"
    )
    base-post(
      :data="{\
        image: require(`~/assets/images/pages/service/turkish-citizenship/image-3.jpg`),\
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
          require(`~/assets/images/pages/service/turkish-citizenship/portrait-1.jpg`),\
          require(`~/assets/images/pages/service/turkish-citizenship/landscape-1.jpg`),\
        ],\
      }"
    )
</template>

<script lang="ts">
import BasePost from '~/components/Base/BasePost.vue'
import TypoText from '~/components/Base/TypoText.vue'
import BaseImageTitle from '~/components/Base/BaseImageTitle.vue'
import PageServiceListCard from '~/components/Page/Service/PageServiceListCard.vue'
import BasePostTwoImage from '~/components/Base/BasePostTwoImage.vue'
import BaseTextContainer from '~/components/Base/BaseTextContainer.vue'
import { Context } from '@nuxt/types'
import metaGenerator from '~/config/meta.js'
import { MetaInfo } from 'vue-meta'
import { Component, Vue } from 'nuxt-property-decorator'
import { delay } from '~/lib/utils'

@Component({
  components: {
    BasePost,
    TypoText,
    BaseImageTitle,
    PageServiceListCard,
    BasePostTwoImage,
    BaseTextContainer,
  },
  head(): any {
    const title =
      this.$i18n.locale === 'ru'
        ? 'Гражданство Турции. Все выгоды от турецкого гражданства'
        : 'Turkish citizenship. All the benefits of Turkish citizenship'

    const description =
      this.$i18n.locale === 'ru'
        ? 'Как получить турецкое гражданство при покупке недвижимости. Двойное гражданство с Турцией. Турецкие граждане не только обладают правом проживать в стране без каких-либо препятствий и ограничений, но также имеют другие преимущества'
        : 'How to get Turkish citizenship when buying real estate. Dual citizenship with Turkey. Turkish citizens not only have the right to reside in the country without any obstacles and restrictions, but also have other advantages'

    return {
      title,
      htmlAttrs: {
        lang: this.$i18n.locale,
        prefix: 'og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#',
      },
      meta: metaGenerator({
        title,
        description,
        robots: 'noindex, nofollow',
      }),
      link: [
        {
          rel: 'canonical',
          href: `${process.env.PROTOCOL}://${process.env.DOMAIN}${this.$route.path}`,
        },
      ],
    }
  },
})
export default class ServiceTurkishCitizenshipPage extends Vue {
  created() {
    if (process.server) {
      this.$store.commit('PageTransition/animate', false)
    }

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
