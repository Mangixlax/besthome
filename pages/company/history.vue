<template lang="pug">
  main
    page-company-history-title(:historyPageTitle="$t('pages.company_history.header')")
    base-post(
      :filename="require(`~/assets/images/pages/company/history/image-1.jpg`)"
    )
      typo-text(
        tag="h3"
        version="style-3"
      ) {{ $t('pages.company_history.post_1.title') }}
      typo-text(
        tag="p"
        version="style-5"
      )
        | {{ $t('pages.company_history.post_1.paragraph_with_link') }}
        typo-text(
          tag="a"
          href="#"
          version="style-5"
        ) {{ $t('pages.company_history.post_1.link') }}
        | .
</template>

<script lang="ts">
import PageCompanyHistoryTitle from '~/components/Page/Company/PageCompanyHistoryTitle.vue'
import BasePost from '~/components/Base/BasePost.vue'
import TypoText from '~/components/Base/TypoText.vue'
import { Context } from '@nuxt/types'

export default {
  name: 'legal-support',
  components: { PageCompanyHistoryTitle, BasePost, TypoText },
  asyncData(ctx: Context): void {
    ctx.store.commit('setLogoSubTitle', 'Company')
  },
}
</script>

<style lang="sass" module></style>
