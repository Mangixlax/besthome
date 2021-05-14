<template lang="pug">
  main
    base-image-title(:imageTitleData="$t('pages.service_introductory_tour.image_title')")
      typo-text(
        tag="h2"
        version="style-4"
      ) {{ $t('pages.service_introductory_tour.slot_text_1')}}
    base-post(
      :filename="require(`~/assets/images/test.jpg`)"
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) {{ $t('pages.service_introductory_tour.post_1.title') }}
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.service_introductory_tour.post_1.paragraph_1') }}
      typo-text(
        tag="p"
        version="style-5"
      )
        | {{ $t('pages.service_introductory_tour.post_1.paragraph_with_link') }}
        typo-text(
          tag="a"
          href="#"
          version="style-5"
        ) {{ $t('pages.service_introductory_tour.post_1.link') }}
        | .
    base-text-container
      typo-text(
        tag="h2"
        version="style-2"
      ) {{ $t('pages.service_introductory_tour.post_2.title') }}
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.service_introductory_tour.post_2.paragraph_1') }}
    base-post(
      :filename="require(`~/assets/images/test.jpg`)" 
      flip 
      text-flip
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) {{ $t('pages.service_introductory_tour.post_2.title') }}
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.service_introductory_tour.post_2.paragraph_1') }}
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.service_introductory_tour.post_2.paragraph_2') }}
      typo-text(
        tag="p"
        version="style-5"
      )  {{ $t('pages.service_introductory_tour.post_2.paragraph_3') }}
    base-post(
      :filename="require(`~/assets/images/test.jpg`)"
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) {{ $t('pages.service_introductory_tour.post_3.title') }}
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.service_introductory_tour.post_3.paragraph_1') }}
      typo-text(
        tag="p"
        version="style-5"
      )
        | {{ $t('pages.service_introductory_tour.post_3.paragraph_with_link') }}
        typo-text(
          tag="a"
          href="#"
          version="style-5"
        ) {{ $t('pages.service_introductory_tour.post_3.link') }}
        | .
    base-post(
      :filename="require(`~/assets/images/test.jpg`)" 
      flip 
      text-flip
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) {{ $t('pages.service_introductory_tour.post_4.title') }}
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.service_introductory_tour.post_4.paragraph_1') }}
    base-post(
      :filename="require(`~/assets/images/test.jpg`)"
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) {{ $t('pages.service_introductory_tour.post_5.title') }}
      typo-text(
      ) {{ $t('pages.service_introductory_tour.post_5.paragraph_1') }}
      typo-text(
        tag="p"
        version="style-5"
      )
        | {{ $t('pages.service_introductory_tour.post_5.paragraph_with_link') }}
        typo-text(
          tag="a"
          href="#"
          version="style-5"
        ) {{ $t('pages.service_introductory_tour.post_5.link') }}
        | .
    base-post(
      :filename="require(`~/assets/images/test.jpg`)" 
      flip 
      text-flip
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) {{ $t('pages.service_introductory_tour.post_6.title') }}
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.service_introductory_tour.post_6.paragraph_1') }}
    base-post-two-image(
       :portraitImage="require(`~/assets/images/investors/portrait-1.jpg`)"
       :landscapeImage="require(`~/assets/images/investors/landscape-1.jpg`)"
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) {{ $t('pages.service_introductory_tour.post_7.title') }}
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.service_introductory_tour.post_7.paragraph_1') }}
      typo-text(
        tag="p"
        version="style-5"
      ) {{ $t('pages.service_introductory_tour.post_7.paragraph_2') }}
</template>

<script lang="ts">
import BasePost from '~/components/Base/BasePost.vue'
import TypoText from '~/components/Base/TypoText.vue'
import BaseImageTitle from '~/components/Base/BaseImageTitle.vue'
import BasePostTwoImage from '~/components/Base/BasePostTwoImage.vue'
import BaseTextContainer from '~/components/Base/BaseTextContainer.vue'

export default {
  name: 'introductory-tour',
  components: {
    BasePost,
    TypoText,
    BaseImageTitle,
    BasePostTwoImage,
    BaseTextContainer
  },
}
</script>

<style lang="sass" module></style>
