<template lang="pug">
  main
    base-image-title(
      :imageTitleData="$t('pages.service_introductory_tour.image_title')"
      :filename="require(`~/assets/images/pages/service/introductory-tour/title.jpg`)"
    )
    base-text-container(
      :data="{\
        text: `<h2>${$t('pages.service_introductory_tour.slot_text_1')}</h2>`\
      }"
    )
    base-post(
      :data="{\
        image: require(`~/assets/images/test.jpg`),\
        text: [\
          `<h3>${$t('pages.service_introductory_tour.post_1.title')}</h3>`,\
          `<p>${$t('pages.service_introductory_tour.post_1.paragraph_1')}</p>`,\
          `<p>${$t('pages.service_introductory_tour.post_1.paragraph_with_link')}`,\
          `<a href='#'>${$t('pages.service_introductory_tour.post_1.link')}</a>.</p>`,\
        ].join(''),\
        align: 'left',\
        block_flip: false,\
      }"
    )
    base-text-container
      typo-text(
        tag="h2"
        version="style-2"
      ) {{ $t('pages.service_introductory_tour.article_1.title') }}
      typo-text(
        v-for="(paragraph, i) in $t('pages.service_introductory_tour.article_1.text')"
        :key="i"
        tag="p"
        version="style-6"
      ) {{ paragraph }}
    base-post(
      :data="{\
        image: require(`~/assets/images/pages/service/introductory-tour/image-2.jpg`),\
        text: [\
          `<h3>${$t('pages.service_introductory_tour.post_2.title')}</h3>`,\
          `<p>${$t('pages.service_introductory_tour.post_2.paragraph_1')}</p>`,\
          `<p>${$t('pages.service_introductory_tour.post_2.paragraph_2')}</p>`,\
          `<p>${$t('pages.service_introductory_tour.post_2.paragraph_3')}</p>`,\
        ].join(''),\
        align: 'right',\
        block_flip: true,\
      }"
    )
    base-post(
      :data="{\
        image: require(`~/assets/images/pages/service/introductory-tour/image-3.jpg`),\
        text: [\
          `<h3>${$t('pages.service_introductory_tour.post_3.title')}</h3>`,\
          `<p>${$t('pages.service_introductory_tour.post_3.paragraph_1')}</p>`,\
          `<p>${$t('pages.service_introductory_tour.post_3.paragraph_with_link')}`,\
          `<a href='#'>${$t('pages.service_introductory_tour.post_3.link')}</a>.</p>`,\
        ].join(''),\
        align: 'left',\
        block_flip: false,\
      }"
    )
    base-post(
      :data="{\
        image: require(`~/assets/images/pages/service/introductory-tour/image-4.jpg`),\
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
        image: require(`~/assets/images/pages/service/introductory-tour/image-5.jpg`),\
        text: [\
          `<h3>${$t('pages.service_introductory_tour.post_5.title')}</h3>`,\
          `<p>${$t('pages.service_introductory_tour.post_5.paragraph_1')}</p>`,\
          `<p>${$t('pages.service_introductory_tour.post_5.paragraph_with_link')}`,\
          `<a href='#'>${$t('pages.service_introductory_tour.post_5.link')}</a>.</p>`,\
        ].join(''),\
        align: 'left',\
        block_flip: false,\
      }"
    )
    base-post(
      :data="{\
        image: require(`~/assets/images/pages/service/introductory-tour/image-6.jpg`),\
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
          require(`~/assets/images/investors/portrait-1.jpg`),\
          require(`~/assets/images/pages/service/introductory-tour/landscape-1.jpg`),\
        ],\
      }"
    )
</template>

<script lang="ts">
import BasePost from '~/components/Base/BasePost.vue'
import TypoText from '~/components/Base/TypoText.vue'
import BaseImageTitle from '~/components/Base/BaseImageTitle.vue'
import BasePostTwoImage from '~/components/Base/BasePostTwoImage.vue'
import BaseTextContainer from '~/components/Base/BaseTextContainer.vue'
import { Context } from '@nuxt/types'

export default {
  name: 'introductory-tour',
  components: {
    BasePost,
    TypoText,
    BaseImageTitle,
    BasePostTwoImage,
    BaseTextContainer,
  },
  async asyncData(ctx: Context): Promise<object | void> {
    ctx.store.commit('setLogoSubTitle', ctx.app.i18n.t('header.logo.service'))
  },
}
</script>

<style lang="sass" module></style>
