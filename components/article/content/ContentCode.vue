<template functional>
  <code>{{ props.block.data.code }}</code>
</template>

<script>
export default {
  name: 'ContentCode',
  props: {
    block: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
