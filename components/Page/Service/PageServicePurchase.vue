<template lang="pug">
  section(:class="$style['purchase']")
    div(:class="$style['purchase__container']")
      typo-text(
        tag="h1"
        version="style-2"
        :class="$style['purchase__container-title']"
      ) {{ onlinePurchase.title }}
      typo-text(
        tag="p"
        version="style-6"
        :class="$style['purchase__container-text']"
      ) {{ onlinePurchase.text }}
      section(
        v-for="(card, i) in onlinePurchase.cards"
        :key="i"
        :class="[$style['card'], $style[`card-${i}`]]"
      )
        typo-text(
          tag="h2"
          version="style-4"
          :class="$style['card-title']"
        ) {{ card.title }}
        typo-text(
          tag="p"
          version="style-6"
          :class="$style['card-text']"
        ) {{ card.text }}
      typo-text(
        tag="p"
        version="style-5"
        :class="$style['purchase__container-conclusion']"
      ) {{ onlinePurchase.conclusion }}
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'

export default {
  name: "PageServicePurchase",
  components: { TypoText, },
  data() {
    return {
      onlinePurchase: {
        title: "Online Purchase",
        text: "It is easy to buy and register a property in Alanya without coming to Turkey. The service of remote purchase and registration of real estate, provided by BestHome Construction, is becoming increasingly popular.",
        cards: [
          {
            title: "1. Choosing a residential complex",
            text: "You can contact our managers in a convenient way - via WhatsApp, Telegram, Skype or e-mail, and you can also order a callback. After you indicate your preferences, the company's managers will create an individual portfolio that meets your wishes, provide full information on the apartments and answer all your questions."
          },
          {
            title: "2. Inspection of real estate on a video call",
            text: "The manager of the company will conduct an online broadcast on the spot, showing the area in which the complex is located, the places in the vicinity, the road to the sea. If the complex is ready, the infrastructure and apartments that you are interested in, as well as the view from the balcony and windows."
          },
          {
            title: "3. Drafting a purchase and sale agreement",
            text: "After agreeing on the payment plan for the purchased apartment, you will need to inform the manager of your contact details, as well as send a copy of your passport. Based on this information, a purchase and sale agreement will be drawn up in two languages (Russian and Turkish), which will be sent to you by email or WhatsApp or Telegram for approval. After the confirmation received from DAC, the contract will be signed by our construction company, scanned and sent to you. After signing, you will also send the contract to the company manager."
          },
          {
            title: "4. Execution of a power of attorney",
            text: "If you are not able to come to Turkey to enter into the rights of your own, you will issue a power of attorney at the Turkish Embassy (following the example sent by the manager of the company) in order for the Certificate of Ownership to be issued in your name without your personal presence. Thanks to the new system, there is no need to send the power of attorney issued to you by mail. By sending a copy of it, an employee of the company can get the original at any notary office in the city."
          },
          {
            title: "5. Ordering furniture",
            text: "If you do not want to spend your vacation time choosing furniture, the company manager will send you options for furniture packages that match your preferences and budget. The company's employees will make sure that the furniture is delivered on time, installed and placed in the apartment exactly as you planned. It is also worth noting that there is an opportunity to use the services of our interior designer, he will select accessories that will decorate your new home."
          },
        ],
        conclusion: "Thus, you can be sure that upon arrival in Turkey, you will be waiting for a ready-to-live, cozy apartment that will exceed all your expectations."
      }
    }
  }
}
</script>

<style lang="sass" module>
.purchase
  width: 100%

  &__container
    display: flex
    flex-direction: column
    max-width: 1040px
    padding: 80px 24px
    margin: 0 auto

    &-title
      margin: 0
      margin-bottom: 32px
    
    &-text
      margin:0
      margin-bottom: 80px
    
    &-conclusion
      max-width: 864px
      margin: 0 auto
      margin-top: 198px

.card
  padding: 32px

  &-title
    color: $color-blue-100
    margin: 0
    margin-bottom: 33px
    position: relative

    &::after
      content: ""
      position: absolute
      bottom: -16px
      left: 0
      right: 0
      height: 1px
      background-color: $color-blue-16

  &-text
    margin: 0

  &.card-0
    border: 1px solid  $color-blue-16

  &.card-1
    background: $color-blue-4

  &.card-2
    background: $color-blue-8

  &.card-3
    background: $color-blue-16
  
  &.card-4
    background: $color-blue-24
</style>
