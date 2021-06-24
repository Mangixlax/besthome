<template lang="pug">
  base-text-container(
    :data="{\
       text: [\
          `<h3>${$t('pages.term-of-use.title')}</h3>`,\
          ...$t('pages.term-of-use.text').map((p) => `<p>${p}<p>`)\
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
