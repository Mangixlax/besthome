import { GetterTree, ActionTree, MutationTree, ActionContext } from 'vuex'

/**
 * States
 */
export const state = () => ({
  isTouchDevice: false as boolean,
  logoSubTitle: 'Construction' as string,
  ourCompanyCardInfo: [] as Array<object>
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
  getPersonById: (state) => (id: any) => {
    return state.ourCompanyCardInfo.find((person: any) => person.id == id)
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
  setOurCompanyCardInfo: (state, value: Array<Object>) => {
    state.ourCompanyCardInfo = value
  },
}

/**
 * Actions
 */
export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ dispatch, commit }: RootActionContext) {
    await dispatch('SettingsTopLine/init')
    await dispatch('Navigation/init')
    commit('setOurCompanyCardInfo', this.$i18n.t('pages.company_our_team'))
  },
}
