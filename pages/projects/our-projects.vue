<template lang="pug">
  main
    smart-block-wrapper
    base-accordeons
    base-subscribe
    footer-fast-links
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import SmartBlockWrapper from '~/components/SmartBlock/SmartBlockWrapper.vue'
import SmartBlockCard from '~/components/SmartBlock/SmartBlockCard.vue'
import BaseSubscribe from '~/components/Base/BaseSubscribe.vue'
import BaseAccordeons from '~/components/Base/BaseAccordeons.vue'
import FooterFastLinks from '~/components/Footer/FooterFastLinks.vue'

export default {
  name: 'our-projects',
  components: {
    SmartBlockWrapper,
    SmartBlockCard,
    TypoText,
    BaseSubscribe,
    BaseAccordeons,
    FooterFastLinks,
  },
  data() {
    return {
      experiencesPageScrollLineInfo: [
        {
          title: '239',
          text: 'Apartments',
        },
        {
          title: '470',
          text: 'Parking spots for bikes',
        },
        {
          title: '3800m²',
          text: 'Of common green areas',
        },
        {
          title: '1 to 4-room',
          text: 'Separate rooms',
        },
      ],
    }
  },
}
</script>

<style lang="sass" module></style>
