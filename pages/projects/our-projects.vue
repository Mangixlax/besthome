<template lang="pug">
  main
    smart-block-wrapper(:smart-block-data="$t('pages.projects_our_pojects.smart_block')")
    common-consultant-slider(:slider-data="$t('footer.consultant_slider')")
    base-subscribe(:subscribe-data="$t('footer.subscribe')")
    base-accordions(:accordions-data="$t('footer.accordions')")
    footer-fast-links
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import SmartBlockWrapper from '~/components/SmartBlock/SmartBlockWrapper.vue'
import CommonConsultantSlider from '~/components/Common/CommonConsultantSlider.vue'
import SmartBlockCard from '~/components/SmartBlock/SmartBlockCard.vue'
import BaseSubscribe from '~/components/Base/BaseSubscribe.vue'
import BaseAccordions from '~/components/Base/BaseAccordions.vue'
import FooterFastLinks from '~/components/Footer/FooterFastLinks.vue'

export default {
  name: 'our-projects',
  components: {
    SmartBlockWrapper,
    CommonConsultantSlider,
    SmartBlockCard,
    TypoText,
    BaseSubscribe,
    BaseAccordions,
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
