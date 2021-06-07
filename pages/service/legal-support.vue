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
      :filename="require(`~/assets/images/pages/service/legal-support/image-1.jpg`)"
    )
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.service_legal_support.post_1.paragraph_1') }}
      typo-text(
        tag="p"
        version="style-5"
      )
        | {{ $t('pages.service_legal_support.post_1.paragraph_with_link') }}
        typo-text(
          tag="a"
          href="#"
          version="style-5"
        ) {{ $t('pages.service_legal_support.post_1.link') }}
        | .
    base-post(
      :filename="require(`~/assets/images/pages/service/legal-support/image-2.jpg`)"
      flip
      text-flip
    )
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.service_legal_support.post_2.paragraph_1') }}
    base-post(
      :filename="require(`~/assets/images/pages/service/legal-support/image-3.jpg`)"
    )
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.service_legal_support.post_3.paragraph_1') }}
      typo-text(
        tag="p"
        version="style-5"
      )
        | {{ $t('pages.service_legal_support.post_1.paragraph_with_link') }}
        typo-text(
          tag="a"
          href="#"
          version="style-5"
        ) {{ $t('pages.service_legal_support.post_1.link') }}
        |
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
