<template lang="pug">
  div PROJECTS
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

@Component
export default class ProjectsPage extends Vue {
  created() {
    this.$store.commit('setLogoSubTitle', 'Projects')
  }
}
</script>

<style lang="sass" module></style>
