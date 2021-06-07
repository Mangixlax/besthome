<template lang="pug">
  main
    base-image-title(
      :imageTitleData="$t('pages.service_turkish_citizenship.image_title')"
      :filename="require(`~/assets/images/pages/service/turkish-citizenship/title.jpg`)"
      )
    base-text-container
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.service_turkish_citizenship.slot_text_1') }}
    page-service-list-card(:listCardData="$t('pages.service_turkish_citizenship.list_card')")
    base-text-container(textAlign="center")
      typo-text(
        tag="p"
        version="style-4"
      ) {{ $t('pages.service_turkish_citizenship.article_1.title') }}
    base-post(
      :filename="require(`~/assets/images/pages/service/turkish-citizenship/image-1.jpg`)"
    )
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.service_turkish_citizenship.post_1.paragraph_1') }}
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.service_turkish_citizenship.post_1.paragraph_2') }}
    base-post(
      :filename="require(`~/assets/images/pages/service/turkish-citizenship/image-2.jpg`)"
      tag="p"
      version="style-5"
      flip
      text-flip
    )
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.service_turkish_citizenship.post_2.paragraph_1') }}
    base-post(
      :filename="require(`~/assets/images/pages/service/turkish-citizenship/image-3.jpg`)"
    )
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.service_turkish_citizenship.post_3.paragraph_1') }}
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.service_turkish_citizenship.post_3.paragraph_1') }}
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

export default {
  name: 'turkish-citizenship',
  components: {
    BasePost,
    TypoText,
    BaseImageTitle,
    PageServiceListCard,
    BasePostTwoImage,
    BaseTextContainer,
  },
}
</script>

<style lang="sass" module></style>
