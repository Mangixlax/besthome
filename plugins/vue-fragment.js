import Vue from 'vue'
import { Plugin } from 'vue-fragment'
import LazyHydrate from 'vue-lazy-hydration'

Vue.use(Plugin)
Vue.component('lazy-hydrate', LazyHydrate)
