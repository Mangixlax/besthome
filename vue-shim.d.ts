import Vue from 'vue'
import {
  DefaultComputed,
  DefaultData,
  DefaultMethods,
  DefaultProps,
  PropsDefinition,
} from 'vue/types/options'
import { NuxtCookies } from 'cookie-universal-nuxt'
import { ValidationRule } from 'vuelidate/lib/validators'

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
  type ValidationDecl = ValidationRule | ((...args: any[]) => ValidationRule)
  type GroupDecl = string[]
  type AsyncDecl = (...args: any[]) => boolean | Promise<boolean>
  type NestedDecl = RuleDecl
  type DynamicDecl = () => RuleDecl
  interface RuleDecl {
    [rule: string]: ValidationDecl | GroupDecl | AsyncDecl | NestedDecl
  }

  interface ComponentOptions<
    V extends Vue,
    Data = DefaultData<V>,
    Methods = DefaultMethods<V>,
    Computed = DefaultComputed,
    PropsDef = PropsDefinition<DefaultProps>,
    Props = DefaultProps
  > {
    functional?: boolean
    validations?: RuleDecl | DynamicDecl
    [key: string]: any
  }

  interface RenderContext<Props = DefaultProps> {
    $style: { [key: string]: string }
    [key: string]: any
  }
}

interface Document {
  documentMode?: any
}
