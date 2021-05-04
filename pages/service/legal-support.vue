<template lang="pug">
  main
    base-post(
      :filename="require(`~/assets/images/test.jpg`)"
    )
      typo-text(
        tag="p"
        version="style-5"
      ) Our specialists will submit an application to the cadastral office, assign a time to an interpreter, and accompany you to the cadastral office. After you obtain a Certificate of right of ownership of the employees of the company will execute on your behalf counters of water and electricity.
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
      ) If you are unable to come to Turkey to issue a Certificate of ownership, as well as to issue water and electricity meters in your name, you can issue a power of attorney to our employees, so that they can issue a full package of documents without your personal presence.
    base-post(
      :filename="require(`~/assets/images/test.jpg`)"
    )
      typo-text(
        tag="p"
        version="style-5"
      ) Our specialists will help you in obtaining a residence permit in Turkey for you and your family, and if you buy a property for the sum of $ 250,000 (cadastral value), will help to get Turkish citizenship.
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

export default {
  name: 'legal-support',
  components: { BasePost, TypoText },
}
</script>

<style lang="sass" module></style>
