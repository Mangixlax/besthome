import { RootState } from '~/store'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'

export interface NavigationListItem {
  name: string
  nameInChildren?: string
  title?: string
  titleInChildren?: string
  indicator?: number | string
  route: object
  children?: NavigationListItem[]
  hasChildren?: boolean
}

/**
 * States
 */
export const state = () => ({
  headerList: [] as NavigationListItem[],
})

export type NavigationState = ReturnType<typeof state>

/**
 * Action context specific to navigation module
 */
interface NavigationActionContext extends ActionContext<NavigationState, RootState> {}

/**
 * Getters
 */
export const getters: GetterTree<NavigationState, RootState> = {
  getHeaderNavigationList: (state: NavigationState): NavigationListItem[] => state.headerList,
}

/**
 * Mutations
 */
export const mutations: MutationTree<NavigationState> = {
  setHeaderNavigationList: (state: NavigationState, value: NavigationListItem[]) => {
    state.headerList = value
  },
}

/**
 * Actions
 */
export const actions: ActionTree<NavigationState, RootState> = {
  /**
   * Temporary function for fill testing data
   *
   * @param commit
   */
  init({ commit }: NavigationActionContext) {
    commit('setHeaderNavigationList',  this.$i18n.t('navigation'))
  },
}
