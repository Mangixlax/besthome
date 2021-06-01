import { RootState } from '~/store'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'

export interface IProject {
  id: string
  name: string
  slug: string
  sold_out?: boolean
  updated_at?: string | null
  published_at?: string | null
  apartments_count?: number
  card_image?: string
  card_data?: {
    columns: string | number
    vertical_align: string
    horizontal_align: string
  }
  review_data?: Array<object>
  about_data?: Array<object>
  experience_data?: Array<object>
  choose_ap_data?: Array<object>
}

/**
 * States
 */
export const state = () => ({
  project: {} as IProject,
  projects: [] as IProject[],
  projectsCount: 0 as number,
})

export type CatalogState = ReturnType<typeof state>

/**
 * Action context specific to navigation module
 */
interface CatalogActionContext extends ActionContext<CatalogState, RootState> {}

/**
 * Getters
 */
export const getters: GetterTree<CatalogState, RootState> = {
  getProjects: (state): IProject[] => state.projects,
  getProjectsCount: (state): number => state.projectsCount,
}

/**
 * Mutations
 */
export const mutations: MutationTree<CatalogState> = {
  setProject: (state: CatalogState, value: IProject) => {
    state.project = value
  },
  setProjects: (state: CatalogState, value: IProject[]) => {
    state.projects = value
  },
  setProjectsCount: (state, value: number) => (state.projectsCount = value),
}

/**
 * Actions
 */
export const actions: ActionTree<CatalogState, RootState> = {
  async fetchProject({ commit }: CatalogActionContext, id: string) {
    return new Promise(async (resolve, reject) => {
      this.$axios
        .$get(`v1/projects/${id}`)
        .then((project: any) => {
          commit('setProject', project)
          resolve(project)
        })
        .catch(({ response: { data } }) => {
          reject(data)
        })
    })
  },
  async fetchProjects({ commit }: CatalogActionContext) {
    return new Promise(async (resolve, reject) => {
      this.$axios
        .$get(`v1/projects`)
        .then((project: any) => {
          commit('setProjects', project)
          resolve(project)
        })
        .catch(({ response: { data } }) => {
          reject(data)
        })
    })
  },
  /**
   * Temporary function for fill testing data
   *
   * @param commit
   */
  // init({ commit }: NavigationActionContext) {
  //   commit('setHeaderNavigationList', this.$i18n.t('header.navigation'))
  // },
}
