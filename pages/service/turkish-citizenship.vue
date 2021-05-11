<template lang="pug">
  main
    base-image-title(:imageTitleData="turkishCitizenshipImageTitle")
      typo-text(
        tag="p"
        version="style-5"
      ) Turkey is a great place for seasonal recreation and for living. Many foreigners dream of moving to the Republic of Turkey for permanent residence. Go into business. Buy your own home. And move to the land of the hot sun with your family.
    page-service-list-card(:listCardData="TurkishCitizenshipListCard")
    base-post(
      :filename="require(`~/assets/images/test.jpg`)"
    )
      typo-text(
        tag="p"
        version="style-5"
      ) It is important to remember that a foreigner who has acquired property in order to obtain Turkish citizenship does not have the right to sell it for 3 years. But a house or apartment can be rented out for a long-term or short-term lease, which will allow you not only to invest money profitably,but also to increase your capital.
      typo-text(
        tag="p"
        version="style-5"
      ) BestHome Construction company specializes in the sale of Turkish real estate in Alanya and other regions of the country. Our residential complexes are perfect for investment, seasonal recreation and year-round living, thanks to their convenient geographical location, well-developed infrastructure, high quality construction and finishing.
    base-post(
      flip 
      text-flip
    )
      typo-text To buy a house or apartment in Alanya, you do not have to leave the country in which you are located. It is enough to issue a power of attorney for a lawyer at the Turkish embassy, send all the necessary documents by mail. Our consultants will tell you more about the procedure.
    base-post(
      :filename="require(`~/assets/images/test.jpg`)" 
    )
      typo-text(
        tag="p"
        version="style-5"
      ) BestHome Construction specialists will take care of all the paperwork involved in drawing up the purchase and sale agreement, collecting the necessary documents, as well as advising on Turkish citizenship issues.
      typo-text(
        tag="p"
        version="style-5"
      ) We cooperate with trusted law firms that specialize in obtaining Turkish citizenship for foreign investors. With our help, more than XXXX clients have successfully purchased high-quality housing in developed areas and become legal citizens of the Republic of Turkey. 
    base-post-two-image(
       :portraitImage="require(`~/assets/images/investors/portrait-1.jpg`)"
       :landscapeImage="require(`~/assets/images/investors/landscape-1.jpg`)"
       flip
       text-flip
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) Another good news!
      typo-text(
        tag="p"
        version="style-5"
      ) Many developers in Alanya offer favorable terms of installments for foreigners who want to invest their capital and become the owner of an apartment or villa at the stage of construction of a residential complex. Thus, you can get citizenship even before putting the residential complex into operation.
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
  data() {
    return {
      turkishCitizenshipImageTitle: {
        header: 'Turkish citizenship',
        text: [
          'Since 2019, foreign investors have had a real opportunity to make their dreams come true. Now, when buying a property worth $ 250,000 or more, you can get Turkish citizenship under a simplified scheme. Moreover, the owners of a house or apartment, their spouses and children under 18 can become full citizens directly.',
        ],
        filename: 'turkish-citizenship-bg.jpg',
      },
      TurkishCitizenshipListCard: {
        header: {
          title: 'Real benefits for foreigners',
          text: [
            'Turkish citizens not only have the right to reside in the country without any obstacles and restrictions, but also have other advantages, such as:',
          ],
          subtext: [
            'In addition, taxes for Turks are lower than for foreign investors, as are bank interest on mortgages and loans.',
          ],
        },
        list: [
          'Social benefits and assistance from the state;',
          'Health insurance;',
          'Free education, including in the Russian language;',
          'Pension payments;',
          'Obtaining loans with a low interest rate;',
          'Purchase of land for personal and business purposes;',
          'Employment without a VISA;',
          'Possibility of registration of legal entities;',
          'VISA-free travel to over 110 countries.',
        ],
      },
    }
  },
}
</script>

<style lang="sass" module></style>
