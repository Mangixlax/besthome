<template lang="pug">
  modal-container(
    v-bind="$attrs"
    :name="name"
  )
    template(slot="body")
      catalog-filter-list()
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
}
</script>

<style lang="sass" module></style>
