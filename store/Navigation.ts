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
    commit('setHeaderNavigationList', [
      {
        name: 'Our projects',
        nameInChildren: 'All projects',
        indicator: '30',
        route: { name: 'projects' },
        title: 'Our projects',
        titleInChildren: 'All projects',
        children: [
          {
            name: '%Latest project%',
            indicator: 'new',
            route: { name: 'index' },
            title: '%Latest project%',
          },
          {
            name: '%Penultimate project%',
            route: { name: 'index' },
            title: '%Penultimate project%',
          },
          {
            name: '%Pre-penultimate project%',
            route: { name: 'index' },
            title: '%Pre-penultimate project%',
          },
        ],
      },
      {
        name: 'Secondary housing',
        route: { name: 'index' },
        title: 'Secondary housing',
      },
      {
        name: 'Investors',
        route: { name: 'index' },
        title: 'Investors',
      },
      {
        name: 'How we work',
        indicator: '6',
        route: { name: 'index' },
        title: 'How we work',
      },
      {
        name: 'Company',
        route: { name: 'index' },
        title: 'Company',
        titleInChildren: 'About company',
        children: [
          {
            name: '%New_category%',
            route: { name: 'index' },
            title: '%New_category%',
          },
          {
            name: '%New_category%',
            indicator: 'new',
            route: { name: 'index' },
            title: '%New_category%',
          },
        ],
      },
      {
        name: 'Media',
        route: { name: 'index' },
        title: 'Media',
      },
      {
        name: 'Contact us',
        route: { name: 'index' },
        title: 'Contact us',
      },
    ])
  },
}
