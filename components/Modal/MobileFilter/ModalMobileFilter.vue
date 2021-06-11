<template lang="pug">
  modal-container(
    v-bind="$attrs"
    :name="name"
  )
    template(slot="body")
      catalog-filter-list(:class="$style['filter']")
</template>

<script>
import ModalContainer from '~/components/Modal/base/ModalContainer'
import CatalogFilterList from '~/components/Catalog/Filter/CatalogFilterList.vue'

export default {
  name: 'ModalMobileFilter',
  components: {
    ModalContainer,
    CatalogFilterList,
  },
  props: {
    name: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="sass" module>
.filter
  background-color: $color-blue-100
</style>
