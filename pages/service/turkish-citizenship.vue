<template lang="pug">
  main
    base-image-title(:imageTitleData="$t('pages.service_turkish_citizenship.image_title')")
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.service_after_sale_services.slot_text_1') }}
    page-service-list-card(:listCardData="$t('pages.service_turkish_citizenship.list_card')")
    base-post(
      :filename="require(`~/assets/images/test.jpg`)"
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
      :filename="require(`~/assets/images/test.jpg`)" 
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
      :filename="require(`~/assets/images/test.jpg`)" 
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
       :portraitImage="require(`~/assets/images/investors/portrait-1.jpg`)"
       :landscapeImage="require(`~/assets/images/investors/landscape-1.jpg`)"
       flip
       text-flip
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) {{ $t('pages.service_turkish_citizenship.post_4.title') }}
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.service_turkish_citizenship.post_4.paragraph_1') }}
      typo-text(
        tag="p"
        version="style-5"
      )
        | {{ $t('pages.service_turkish_citizenship.post_4.paragraph_with_link') }}
        typo-text(
          tag="a"
          href="#"
          version="style-5"
        ) {{ $t('pages.service_turkish_citizenship.post_4.link') }}
        | .
</template>

<script lang="ts">
import BasePost from '~/components/Base/BasePost.vue'
import TypoText from '~/components/Base/TypoText.vue'
import BaseImageTitle from '~/components/Base/BaseImageTitle.vue'
import PageServiceListCard from '~/components/Page/Service/PageServiceListCard.vue'
import BasePostTwoImage from '~/components/Base/BasePostTwoImage.vue'

export default {
  name: 'turkish-citizenship',
  components: {
    BasePost,
    TypoText,
    BaseImageTitle,
    PageServiceListCard,
    BasePostTwoImage,
  },
}
</script>

<style lang="sass" module></style>
