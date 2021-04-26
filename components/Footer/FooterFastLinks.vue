<template lang="pug">
  section(:class="$style['fastlinks']")
    div(:class="$style['fastlinks__container']")
      base-fast-links(
        v-for="(fastLinksColumn, i) in fastLinksColumns"
        :key="i"
        :title="fastLinksColumn.title"
        :list="fastLinksColumn.list"
        :active="i === 0"
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
  width: 100%
  magin: 0 auto
  background: $color-black-8
  
  &__container
    display: flex
    justify-content: space-between
    flex-wrap: wrap
    max-width: 1184px
    padding: 80px 32px
    margin: 0 auto

    @media (max-width: 800px) and (min-width: 410px)
      display: grid
      grid-template-columns: 1fr 1fr
      align-items: start
      justify-items: center 
      grid-row-gap: 30px
      grid-column-gap: 30px
      padding: 34px 24px

    @media (max-width: 410px)
      padding: 34px 24px   
</style>
