import Vue from 'vue'
import {
  DefaultComputed,
  DefaultData,
  DefaultMethods,
  DefaultProps,
  PropsDefinition,
} from 'vue/types/options'

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vue/types/vue' {
  interface Vue {
    $style: { [key: string]: string }
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
  }
}

interface Document {
  documentMode?: any
}
