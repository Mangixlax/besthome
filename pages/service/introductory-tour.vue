<template lang="pug">
  main
    base-post(
      :filename="require(`~/assets/images/test.jpg`)"
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) Meeting at the airport
      typo-text(
      ) After you purchase a plane ticket, you need to send it to the manager of the company so that he can arrange a meeting at the airport. The driver of the company, holding a sign with your name, will meet you at the exit from the airport of Antalya or Gazipasa. The road from Antalya airport to Alanya takes about 1 hour 45 minutes, from Gazipasa Airport to the center of Alanya-about 40 minutes.
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
    base-post(
      :filename="require(`~/assets/images/test.jpg`)" 
      flip 
      text-flip
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) Getting to know the city's districts
      typo-text(
        tag="p"
        version="style-5"
      ) The next morning we offer to start with the famous Turkish breakfast, which is famous not only for the variety of organic products, but also for the magnificent views of the mountains and the sea.
      typo-text(
        tag="p"
        version="style-5"
      ) The manager of the company will show you Alanya from the observation deck, located at an altitude of 300 meters, and explain how the city works. You will also see the promenade of Alanya with numerous cafes, restaurants, yachts and walk along the famous Cleopatra beach.
      typo-text(
        tag="p"
        version="style-5"
      )  You will have the opportunity to explore all the areas where BestHome Construction is building its complexes.
    base-post(
      :filename="require(`~/assets/images/test.jpg`)"
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) Presentation at the company's office
      typo-text(
        tag="p"
        version="style-5"
      ) We look forward to welcoming you to our office. The company's employee will present the objects, answer all your questions and tell you about the procedure for purchasing real estate in Turkey, as well as all legal aspects.
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
    base-post(
      :filename="require(`~/assets/images/test.jpg`)" 
      flip 
      text-flip
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) Conclusion of the purchase and sale agreement
      typo-text(
        tag="p"
        version="style-5"
      ) After you have decided on the choice of the property you want to purchase, a contract will be drawn up and signed in the office of our company in Russian and Turkish. In the same place, the company's employees will issue a taxpayer number for you, which is necessary for the transfer of property rights in Turkey. At your request, the company's employees will also help you open an account in a Turkish bank.
    base-post(
      :filename="require(`~/assets/images/test.jpg`)"
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) Execution of a power of attorney
      typo-text(
      ) If you can not come to Turkey to issue a Certificate of ownership, as well as to issue a water and electricity meter in your name, you can issue a power of attorney to an employee of our company, so that they can issue a full package of documents without your personal presence.
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
    base-post(
      :filename="require(`~/assets/images/test.jpg`)" 
      flip 
      text-flip
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) Visiting furniture stores
      typo-text(
        tag="p"
        version="style-5"
      ) If you have a desire to buy furniture for your new apartments or to study the pricing policy of furniture stores, the manager of the company will accompany you to the best furniture salons in the city.
</template>

<script lang="ts">
import BasePost from '~/components/Base/BasePost.vue'
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: 'introductory-tour',
  components: { BasePost, TypoText },
}
</script>

<style lang="sass" module></style>
