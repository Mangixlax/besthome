<template lang="pug">
  main
    base-image-title(
      :image-title-data="$t('pages.service_legal_support.image_title')"
      :filename="require(`~/assets/images/pages/service/legal-support/title.jpg`)"
    )
    base-text-container
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.service_legal_support.slot_text_1') }}
    base-post(
      :data="{\
        image: require(`~/assets/images/pages/service/legal-support/image-1.jpg`),\
        text: [\
          `<p>${$t('pages.service_legal_support.post_1.paragraph_1')}</p>`,\
          `<p>${$t('pages.service_legal_support.post_1.paragraph_with_link')}`,\
          `<a href='#'>${$t('pages.service_legal_support.post_1.link')}</a>.</p>`,\
        ].join(''),\
        align: 'left',\
        block_flip: false,\
      }"
    )
    base-post(
      :data="{\
        image: require(`~/assets/images/pages/service/legal-support/image-2.jpg`),\
        text: [\
          `<p>${$t('pages.service_legal_support.post_2.paragraph_1')}</p>`,\
        ].join(''),\
        align: 'right',\
        block_flip: true,\
      }"
    )
    base-post(
      :data="{\
        image: require(`~/assets/images/pages/service/legal-support/image-3.jpg`),\
        text: [\
          `<p>${$t('pages.service_legal_support.post_3.paragraph_1')}</p>`,\
          `<p>${$t('pages.service_legal_support.post_3.paragraph_with_link')}`,\
          `<a href='#'>${$t('pages.service_legal_support.post_3.link')}</a>.</p>`,\
        ].join(''),\
        align: 'left',\
        block_flip: false,\
      }"
    )
</template>

<script lang="ts">
import BasePost from '~/components/Base/BasePost.vue'
import TypoText from '~/components/Base/TypoText.vue'
import BaseImageTitle from '~/components/Base/BaseImageTitle.vue'
import BaseTextContainer from '~/components/Base/BaseTextContainer.vue'
import { Context } from '@nuxt/types'

export default {
  name: 'legal-support',
  components: { BasePost, TypoText, BaseImageTitle, BaseTextContainer },
  async asyncData(ctx: Context): Promise<object | void> {
    ctx.store.commit('setLogoSubTitle', 'Service')
  },
}
</script>

<style lang="sass" module></style>
