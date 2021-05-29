declare module 'v-click-outside' {
  import { DirectiveBinding } from 'vue/types/options'
  import { VNode } from 'vue'

  export type DirectiveFunction = (
    el: HTMLElement,
    binding: DirectiveBinding,
    vnode: VNode,
    oldVnode: VNode,
  ) => void

  interface IDirectiveOptions {
    bind?: DirectiveFunction
    inserted?: DirectiveFunction
    update?: DirectiveFunction
    componentUpdated?: DirectiveFunction
    unbind?: DirectiveFunction
  }

  export default IDirectiveOptions
}
