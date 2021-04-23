<template lang="pug">
  section(:class="$style['fastlinks']")
    base-fast-links(
      v-for="(fastLinksColumn, i) in fastLinksColumns"
      :key="i"
      :title="fastLinksColumn.title"
      :list="fastLinksColumn.list"
    )
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import BaseFastLinks from '~/components/Base/BaseFastLinks.vue'

interface IFastLinksColumns {
  title: string
  list: Array<IFastLink>
}

interface IFastLink {
  name: string
  to: string
}

@Component({
  components: { BaseFastLinks }
})
export default class FooterFastLinks extends Vue {
  public fastLinksColumns: Array<IFastLinksColumns> = [
    {
      title: '%LinksTitle1%',
      list: [
        {
          name: "%FastLink%",
          to: "/"
        },
        {
          name: "%FastLink%",
          to: "/"
        },
        {
          name: "%FastLink%",
          to: "/"
        },
        {
          name: "%FastLink%",
          to: "/"
        },
        {
          name: "%FastLink%",
          to: "/"
        },
        {
          name: "%FastLink%",
          to: "/"
        },
        {
          name: "%FastLink%",
          to: "/"
        },
        {
          name: "%FastLink%",
          to: "/"
        }
      ]
    },{
      title: '%LinksTitle2%',
      list: [
        {
          name: "%FastLink%",
          to: "/"
        },
        {
          name: "%FastLink%",
          to: "/"
        },
        {
          name: "%FastLink%",
          to: "/"
        },
        {
          name: "%FastLink%",
          to: "/"
        },
        {
          name: "%FastLink%",
          to: "/"
        },
        {
          name: "%FastLink%",
          to: "/"
        },
        {
          name: "%FastLink%",
          to: "/"
        },
        {
          name: "%FastLink%",
          to: "/"
        }
      ]
    },{
      title: '%LinksTitle3%',
      list: [
        {
          name: "%FastLink%",
          to: "/"
        },
        {
          name: "%FastLink%",
          to: "/"
        },
        {
          name: "%FastLink%",
          to: "/"
        },
        {
          name: "%FastLink%",
          to: "/"
        },
        {
          name: "%FastLink%",
          to: "/"
        },
        {
          name: "%FastLink%",
          to: "/"
        },
        {
          name: "%FastLink%",
          to: "/"
        },
        {
          name: "%FastLink%",
          to: "/"
        }
      ]
    },{
      title: '%LinksTitle4%',
      list: [
        {
          name: "%FastLink%",
          to: "/"
        },
        {
          name: "%FastLink%",
          to: "/"
        },
        {
          name: "%FastLink%",
          to: "/"
        },
        {
          name: "%FastLink%",
          to: "/"
        },
        {
          name: "%FastLink%",
          to: "/"
        },
        {
          name: "%FastLink%",
          to: "/"
        },
        {
          name: "%FastLink%",
          to: "/"
        },
        {
          name: "%FastLink%",
          to: "/"
        }
      ]
    },
  ]
}
</script>

<style lang="sass" module>
.fastlinks
  display: flex
  justify-content: space-between
  max-width: 1184px
  padding: 80px 32px
  margin: 0 auto
</style>
