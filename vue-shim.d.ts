import Vue from 'vue'
import {
  DefaultComputed,
  DefaultData,
  DefaultMethods,
  DefaultProps,
  PropsDefinition,
} from 'vue/types/options'
import { NuxtCookies } from 'cookie-universal-nuxt'

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vue/types/vue' {
  interface Vue {
    $style: { [key: string]: string }
    $cookies: NuxtCookies
    [key: string]: any
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<
    V extends Vue,
    Data = DefaultData<V>,
    Methods = DefaultMethods<V>,
    Computed = DefaultComputed,
    PropsDef = PropsDefinition<DefaultProps>,
    Props = DefaultProps,
  > {
    functional?: boolean
  }

  interface RenderContext<Props = DefaultProps> {
    $style: { [key: string]: string }
    [key: string]: any
  }
}

interface Document {
  documentMode?: any
}
