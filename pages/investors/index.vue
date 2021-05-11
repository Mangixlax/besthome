<template lang="pug">
  main
    page-investors-title
    base-post(
      :filename="require(`~/assets/images/test.jpg`)"
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) Bet on long-term cooperation
      typo-text(
      ) We know that the success of cooperation with us primarily depends on the stability of our clients ' income. We rely on a long-term mutually beneficial partnership. The more our investors earn, the more promising our business is.
      typo-text(
        tag="p"
        version="style-5"
      )
        | To date, the company has
        typo-text(
          tag="a"
          href="#"
          version="style-5"
        ) 30 completed projects
        | .
    page-investors-advice
    base-post(
      :filename="require(`~/assets/images/test.jpg`)" 
      flip 
      text-flip
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) Responsible approach to work
      typo-text(
        tag="p"
        version="style-5"
      ) We have strict requirements for each of our employees. We constantly monitor new trends in the real estate market. Our employees regularly replenish their knowledge reserves in order to successfully implement them in their clients ' business projects.
      typo-text(
        tag="p"
        version="style-5"
      )
        | More
        typo-text(
          tag="a"
          href="#"
          version="style-5"
        ) about Cleopatra Select 
        | .
    base-post(
      :filename="require(`~/assets/images/test.jpg`)"
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) Bet on long-term cooperation
      typo-text(
        tag="p"
        version="style-5"
      ) We know that the success of cooperation with us primarily depends on the stability of our clients ' income. We rely on a long-term mutually beneficial partnership. The more our investors earn, the more promising our business is.
      typo-text(
        tag="p"
        version="style-5"
      )
        | To date, the company has
        typo-text(
          tag="a"
          href="#"
          version="style-5"
        ) 30 completed projects
        | .
    base-scroll-line(:scrollLineInfo="investorsPageScrollLineInfo")
    base-post-two-image(
       :portraitImage="require(`~/assets/images/investors/portrait-1.jpg`)"
       :landscapeImage="require(`~/assets/images/investors/landscape-1.jpg`)"
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) Bet on long-term cooperation
      typo-text(
        tag="p"
        version="style-5"
      ) We know that the success of cooperation with us primarily depends on the stability of our clients ' income. We rely on a long-term mutually beneficial partnership. The more our investors earn, the more promising our business is.
      typo-text(
        tag="p"
        version="style-5"
      )
        | To date, the company has
        typo-text(
          tag="a"
          href="#"
          version="style-5"
        ) 30 completed projects
        | .
      
</template>

<script lang="ts">
import PageInvestorsTitle from '~/components/Page/Investors/PageInvestorsTitle.vue'
import PageInvestorsAdvice from '~/components/Page/Investors/PageInvestorsAdvice.vue'
import BasePost from '~/components/Base/BasePost.vue'
import BaseScrollLine from '~/components/Base/BaseScrollLine.vue'
import BasePostTwoImage from '~/components/Base/BasePostTwoImage.vue'
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'investors',
  components: {
    PageInvestorsTitle,
    PageInvestorsAdvice,
    BasePost,
    BasePostTwoImage,
    BaseScrollLine,
    TypoText
  },
  data() {
    return {
      investorsPageScrollLineInfo: [
        {
          title: 'Up to 31 years',
          text: 'Loan repayment period',
        },
        {
          title: 'loan up to 300 000 €',
          text: 'Most advantageous rates',
        },
      ],
    }
  },
}
</script>

<style lang="sass" module></style>
