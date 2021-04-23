import { GetterTree, ActionTree, MutationTree, ActionContext } from 'vuex'

/**
 * States
 */
export const state = () => ({
  isTouchDevice: false as boolean,
  logoSubTitle: 'Construction' as string,
})

export type RootState = ReturnType<typeof state>

/**
 * Action context specific to settings top line module
 */
interface RootActionContext extends ActionContext<RootState, RootState> {}

/**
 * Getters
 */
export const getters: GetterTree<RootState, RootState> = {
  getLogoSubTitle(state: RootState) {
    return state.logoSubTitle
  },
}

/**
 * Mutations
 */
export const mutations: MutationTree<RootState> = {
  setLogoSubTitle(state: RootState, value: string) {
    state.logoSubTitle = value
  },
  detectTouchDevice(state: RootState) {
    state.isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
  },
}

/**
 * Actions
 */
export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ dispatch }: RootActionContext) {
    await dispatch('SettingsTopLine/init')
    await dispatch('Navigation/init')
  },
}
