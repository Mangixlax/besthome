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
</template>

<script lang="ts">
import PageInvestorsTitle from '~/components/Page/Investors/PageInvestorsTitle.vue'
import PageInvestorsAdvice from '~/components/Page/Investors/PageInvestorsAdvice.vue'
import BasePost from '~/components/Base/BasePost.vue'
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'investors',
  components: { PageInvestorsTitle, PageInvestorsAdvice, BasePost, TypoText },
  data() {
    return {
      myData: [
        {
          type: 'header',
          data: {
            text: 'asdfasdfasf',
            level: 2,
          },
        },
        {
          type: 'list',
          data: {
            style: 'ordered',
            items: ['adsfasdf', 'asdf', 'asdf', 'asdf'],
          },
        },
      ],
    }
  },
}
</script>

<style lang="sass" module></style>
