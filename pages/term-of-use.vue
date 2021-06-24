<template lang="pug">
  base-text-container(
    :data="{\
       text: [\
          `<h3>${$t('pages.privacy-policy.title')}</h3>`,\
          ...$t('pages.privacy-policy.text').map((p) => `<p>${p}<p>`)\
        ].join('')\
    }"
  )
</template>

<script>
import BaseTextContainer from '~/components/Base/BaseTextContainer.vue'

export default {
  name: 'term-of-use',
  components: {
    BaseTextContainer,
  },
}
</script>
