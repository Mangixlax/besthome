<template>
  <div :class="$style['wrapper']">
    <span v-for="(icon, index) in icons" :key="index" :class="$style['wrapper__icon']">
      <svg-icon :name="`socials/${icon.name}`" :class="$style['wrapper__icon-svg']"></svg-icon>
      <a
        :href="icon.href"
        target="_blank"
        :class="$style['wrapper__icon-link']"
        :title="icon.title"
      ></a>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

export interface IIcon {
  name: string
  href: string
  title: string
}

@Component({})
export default class BaseSocials extends Vue {
  public icons: Array<IIcon> = [
    {
      name: 'facebook',
      href: 'https://facebook.com/besthome.construction',
      title: 'Мы в Facebook',
    },
    {
      name: 'linkedin',
      href: 'https://linkedin.com/company/besthome-construction-alanya/mycompany/',
      title: 'Мы в Linkedin',
    },
    {
      name: 'instagram',
      href: 'https://instagram.com/besthome.tr/',
      title: 'Мы в Instagram',
    },
  ]
}
</script>

<style lang="sass" module>
.wrapper
  width: fit-content
  position: relative
  z-index: 1
  display: flex
  align-items: center

  &__icon
    height: 24px
    width: 24px
    position: relative

    &-svg
      height: 24px
      width: 24px
      fill: $color-black-32


    &-link
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
</style>
