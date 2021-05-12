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
            name: 'Our projects',
            route: { name: 'projects-our-projects' },
            title: 'Our projects',
          },
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
          {
            name: 'Experiences',
            route: { name: 'projects-experiences' },
            title: 'Experiences',
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
        route: { name: 'investors' },
        title: 'Investors',
      },
      {
        name: 'How we work',
        nameInChildren: 'Introductory tour',
        indicator: '6',
        route: { name: 'service-introductory-tour' },
        title: 'How we work',
        titleInChildren: 'Introductory tour',
        children: [
          {
            name: 'Online purchase',
            indicator: 'new',
            route: { name: 'service-online-purchase' },
            title: 'Online purchase',
          },
          {
            name: 'Legal support',
            route: { name: 'service-legal-support' },
            title: 'Legal support',
          },
          {
            name: 'Turkish citizenship ',
            route: { name: 'service-turkish-citizenship' },
            title: 'Turkish citizenship ',
          },
          {
            name: 'After-sale services',
            route: { name: 'service-after-sale-services' },
            title: 'After-sale services',
          },
          {
            name: 'All about rent',
            route: { name: 'service-all-about-rent' },
            title: 'All about rent',
          },
        ],
      },
      {
        name: 'Company',
        route: { name: 'company' }, 
        title: 'Company',
        titleInChildren: 'About company',
        children: [
          {
            name: 'About company',
            route: { name: 'company-about' },
            title: 'About company',
          },
          {
            name: 'Our team',
            route: { name: 'company-our-team' },
            title: 'Our team',
          },
          {
            name: 'History',
            indicator: 'new',
            route: { name: 'company-history' },
            title: 'History',
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
        route: { name: 'contacts' },
        title: 'Contact us',
      },
    ])
  },
}
