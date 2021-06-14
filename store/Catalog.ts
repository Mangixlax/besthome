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
  filters?: IProjectApartmentsFilter
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
  data?: IProjectApartment[]
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

export interface IProjectApartmentsFilter {
  blocks?: Array<{ id: number; name: string }>
  floors?: { min: number; max: number }
  area?: { min: string; max: string }
  price?: { min: number; max: number }
  rooms?: Array<{ id: number; number: number; ad_number: number }>
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
  filters: {} as IProjectApartmentsFilter,
  selectedFilters: {} as any,
  loading: false as boolean,
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
  getFilters: (state): IProjectApartmentsFilter => state.filters,
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
  setFilters: (state: CatalogState, value: IProjectApartmentsFilter) => {
    state.filters = {}
    state.selectedFilters = {}
    state.filters = value
  },
  setSelectedFilter: (
    state: CatalogState,
    { key, value }: { key: 'blocks' | 'floors' | 'area' | 'price' | 'rooms'; value: any },
  ) => {
    state.selectedFilters[key] = value
  },
  setLoading: (state: CatalogState, value: boolean) => {
    state.loading = value
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
        .then((project: IProject) => {
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
        .then((projects: IProject[]) => {
          commit('setProjects', projects)
          resolve(projects)
        })
        .catch(({ response: { data } }) => {
          reject(data)
        })
    })
  },
  async fetchApartments({ commit, state }: CatalogActionContext, apartment_id?: number) {
    commit('setLoading', true)
    return new Promise(async (resolve, reject) => {
      this.$axios
        .$get(`v1/apartments${apartment_id ? '/' + apartment_id : ''}`, {
          params: {
            project_id: state.project.id ? state.project.id : null,
            ...state.selectedFilters,
          },
        })
        .then(
          ({ filters, apartments }: { filters: any; apartments: { data?: IProjectApartment } }) => {
            commit('setApartments', apartments)
            commit('setFilters', filters)
            commit('setLoading', false)
            resolve({ filters, apartments })
          },
        )
        .catch(({ response: { data } }) => {
          reject(data)
        })
    })
  },
}
