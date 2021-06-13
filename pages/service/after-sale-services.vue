<template lang="pug">
  main
    base-image-title(
      :imageTitleData="$t('pages.service_after_sale_services.image_title')"
      :filename="require(`~/assets/images/pages/service/after-sale-services/title.jpg`)"
    )
    base-text-container(
      :data="{\
        text: [\
          `<p>${$t('pages.service_after_sale_services.slot_text_1')}</p>`,\
          `<p>${$t('pages.service_after_sale_services.slot_text_2')}</p>`\
        ].join('')\
      }"
    )
    page-service-list-card(:listCardData="$t('pages.service_after_sale_services.list_card')")
</template>

<script lang="ts">
import TypoText from '~/components/Base/TypoText.vue'
import BaseImageTitle from '~/components/Base/BaseImageTitle.vue'
import PageServiceListCard from '~/components/Page/Service/PageServiceListCard.vue'
import BaseTextContainer from '~/components/Base/BaseTextContainer.vue'
import { Context } from '@nuxt/types'

export default {
  name: 'after-sale-services',
  components: { TypoText, BaseImageTitle, PageServiceListCard, BaseTextContainer },
  async asyncData(ctx: Context): Promise<object | void> {
    ctx.store.commit('setLogoSubTitle', ctx.app.i18n.t('header.logo.service'))
  },
}
</script>

<style lang="sass" module></style>
