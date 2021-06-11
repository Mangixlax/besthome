import { RootState } from '~/store'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'

export interface IProject {
  id: string
  name: string
  slug: string
  sold_out?: boolean
  updated_at?: string | null
  published_at?: string | null
  apartments?: IProjectApartment[]
  similar_apartments?: IProjectApartment[]
  floors?: IProjectFloor[]
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
  miniature_html?: string
}

export interface IProjectFloor {
  id: number
  number: number
  layout_html?: string
  miniature_html?: string
  available_apartments_count: number
  apartments?: IProjectApartment[]
  block?: {
    id: number
    name: string
    project_id: number
  }
}

export interface IProjectBlock {
  id: number
  name: string
  project_id: number
}

export interface IProjectApartment {
  id: number
  project_id: number
  block_id: number
  floor_id: number
  status: number
  rooms: string
  area: string
  price: number
  name: string
  block: IProjectBlock
  floor: IProjectFloor
  planning?: string
  compass?: string
}

/**
 * States
 */
export const state = () => ({
  project: {} as IProject,
  projects: [] as IProject[],
  apartment: {} as IProjectApartment,
  apartments: [] as IProjectApartment[],
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
  getProject: (state): IProject => state.project,
  getProjects: (state): IProject[] => state.projects,
  getProjectsCount: (state): number => state.projectsCount,
  getApartment: (state): IProjectApartment => state.apartment,
  getApartments: (state): IProjectApartment[] => state.apartments,
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
  setApartment: (state: CatalogState, value: IProjectApartment) => {
    state.apartment = value
  },
  setApartments: (state: CatalogState, value: IProjectApartment[]) => {
    state.apartments = value
  },
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
  async fetchApartments(
    { commit }: CatalogActionContext,
    { project_id = null }: { project_id?: number | null },
  ) {
    return new Promise(async (resolve, reject) => {
      this.$axios
        .$get(`v1/apartments/${project_id ? project_id : ''}`)
        .then((apartment: IProjectApartment) => {
          commit('setApartments', apartment)
          resolve(apartment)
        })
        .catch(({ response: { data } }) => {
          reject(data)
        })
    })
  },
}
