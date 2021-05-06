<template lang="pug">
  main
    page-company-about-title
    base-post(
      :filename="require(`~/assets/images/test.jpg`)" 
      flip 
      text-flip
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) Experience 
      typo-text(
        tag="p"
        version="style-5"
      ) Our company has its own representative offices in the USA, Russia, Norway, Finland, Germany, Ukraine, Iran, Denmark and Sweden. We have helped more than 1000 foreign investors from America, Europe, the CIS and the Middle East to buy real estate in Alanya profitably.
    base-post(
      :filename="require(`~/assets/images/test.jpg`)"
      text-flip
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) Office 
      typo-text(
        tag="p"
        version="style-5"
      ) Our office is located in the very center of Alanya. Three floors, comprehensive service – sale, property management, post-sale services, architecture and design.
      typo-text(
        tag="p"
        version="style-5"
      )
        | Go to
        typo-text(
          tag="a"
          href="#"
          version="style-5"
        ) сontacts
        | .
    base-post(
      :filename="require(`~/assets/images/test.jpg`)" 
      flip 
      text-flip
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) Quality
      typo-text(
        tag="p"
        version="style-5"
      ) Our motto is "The best advertising – first-class quality". We know how to find an individual approach to our clients.
    base-post(
      :filename="require(`~/assets/images/test.jpg`)" 
      text-flip
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) Investment 
      typo-text(
        tag="p"
        version="style-5"
      ) Thanks to the well-thought-out geography of residential complexes and the high quality of construction, we guarantee a stable profit to investors who purchase houses and apartments for short-and long-term rental.
      typo-text(
        tag="p"
        version="style-5"
      )
        | Go to
        typo-text(
          tag="a"
          href="#"
          version="style-5"
        ) Investors
        | .
    base-post(
      :filename="require(`~/assets/images/test.jpg`)" 
      flip 
      text-flip
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) Reliability
      typo-text(
      ) We independently finance all our projects and provide our clients with bank guarantees. Legal purity of transactions guarantees the security of investments.
    base-post(
      :filename="require(`~/assets/images/test.jpg`)"
      text-flip
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) Deadlines
      typo-text(
        tag="p"
        version="style-5"
      ) We strictly observe the terms of commissioning of objects, control the construction at every stage.
      typo-text(
        tag="p"
        version="style-5"
      )
        | Go to
        typo-text(
          tag="a"
          href="#"
          version="style-5"
        ) Investors
        | .
    base-post(
      :filename="require(`~/assets/images/test.jpg`)" 
      flip 
      text-flip
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) Guarantees
      typo-text(
      ) All construction projects are provided with a 5-year warranty, including exterior, finishing and infrastructure.
    base-post(
      :filename="require(`~/assets/images/test.jpg`)"
      text-flip
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) Services
      typo-text(
        tag="p"
        version="style-5"
      ) For maximum transparency of cooperation, all customer support is provided in Russian, including the registration of the DCP.
      typo-text(
        tag="p"
        version="style-5"
      )
        | Go to
        typo-text(
          tag="a"
          href="#"
          version="style-5"
        ) Investors
        | .
    base-post(
      :filename="require(`~/assets/images/test.jpg`)" 
      flip 
      text-flip
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) Management
      typo-text(
      ) BestHome Construction residential complexes are managed by a subsidiary of Leader Management, providing customers with a full range of services and all necessary warranty obligations.
    base-post(
      :filename="require(`~/assets/images/test.jpg`)"
      text-flip
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) Designing
      typo-text(
        tag="p"
        version="style-5"
      ) Our clients can order the redevelopment of premises and the development of a unique interior design, taking into account all their requirements and wishes. BestHome Construction employs first-class designers and architects.
</template>

<script lang="ts">
import PageCompanyAboutTitle from '~/components/Page/Company/PageCompanyAboutTitle.vue'
import BasePost from '~/components/Base/BasePost.vue'
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'introductory-tour',
  components: { PageCompanyAboutTitle, BasePost, TypoText },
}
</script>

<style lang="sass" module></style>
