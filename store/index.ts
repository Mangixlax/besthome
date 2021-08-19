import { GetterTree, ActionTree, MutationTree, ActionContext } from 'vuex'

/**
 * States
 */
export const state = () => ({
  stickyHeader: false as boolean,
  stickyNavigation: false as boolean,
  pageIsLoading: false as boolean,
  isTouchDevice: false as boolean,
  logoSubTitle: 'Construction' as string,
  ourCompanyCardInfo: [] as Array<object>,
  breadcrumbs: [] as Array<object>,
  isDarkTheme: false as boolean,
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
  getBreadcrumbs(state: RootState) {
    return state.breadcrumbs || []
  },
  getPersonById: (state: RootState) => (id: any) => {
    return state.ourCompanyCardInfo.find((person: any) => person.id == id)
  },
  isDarkTheme(state: RootState) {
    return state.isDarkTheme
  },
}

/**
 * Mutations
 */
export const mutations: MutationTree<RootState> = {
  setBreadcrumbs(state, list = []) {
    state.breadcrumbs = list
  },
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
  setStickyHeader(state: RootState, path: string) {
    state.stickyHeader = path.indexOf('/properties/') === -1
  },
  setStickyNavigation(state: RootState, value: boolean) {
    state.stickyNavigation = value
  },
  setDarkTheme(state: RootState) {
    state.isDarkTheme = true
  },
  setLightTheme(state: RootState) {
    state.isDarkTheme = false
  },
}

/**
 * Actions
 */
export const actions: ActionTree<RootState, RootState> = {
  async fetchMainData({ commit, dispatch }: RootActionContext) {
    const { projects_count, menus } = await this.$axios.$get('v1/main')
    commit('Catalog/setProjectsCount', projects_count)
    await dispatch('Navigation/parseMenus', menus)
  },
  async nuxtServerInit({ dispatch, commit }: RootActionContext) {
    await dispatch('fetchMainData')
    await dispatch('SettingsTopLine/init')
    commit('setOurCompanyCardInfo', this.$i18n.t('pages.company_our_team'))
  },
}
