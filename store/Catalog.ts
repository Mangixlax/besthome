import { RootState } from '~/store'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { IResponseData, IResponseMeta, IResponseMetaPagination } from '~/types/Response'

export interface IProject {
  id: string
  name: string
  short_name: string
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
  about_data?: Array<object>
  location_data?: Array<object>
  gallery_data?: Array<object>
  choose_ap_data?: Array<object>
  seo_about?: IProjectSeo | null
  seo_location?: IProjectSeo | null
  seo_gallery?: IProjectSeo | null
  seo_choose_ap?: IProjectSeo | null
  allow_transition?: boolean
  miniature_html?: string
  filters?: IProjectApartmentsFilter
  total_area?: string
  to_sea?: number
  to_rest?: number
  location?: string
  start_building?: string
  end_building?: string
}

export interface IProjectSeo {
  title?: string
  description?: string
  content?: string
}

export interface IProjectFloor {
  id: number
  number: number
  layout_html?: string
  miniature_html?: string
  available_apartments_count: number
  apartments?: IProjectApartment[]
  floor_plan: IProjectFloorPlan
  block?: {
    id: number
    name: string
    project_id: number
  }
}

export interface IProjectFloorPlan {
  id: number
  code: string
  files: IProjectFloorPlanFile[]
}

export interface IProjectFloorPlanFile {
  id: number
  code: string
  sort_order: number
  plan: string
  svg_mask: string
}

export interface IProjectBlock {
  id: number
  name: string
  project_id: number
}

export interface IProjectRoom {
  id: number
  name: string
  number: number
  ad_number?: number | null
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
  number: string
  total_floors?: number
  room: IProjectRoom
  project: IProject
  block: IProjectBlock
  floor: IProjectFloor
  planning?: string
  compass?: string
  additional_text?: string
  complete_sets?: IProjectApartmentCompleteSet[]
  advantages?: IProjectApartmentAdvantage[]
}

export interface IProjectApartmentCompleteSet {
  id: number
  title: string
  icon?: string
  text: string
}

export interface IProjectApartmentAdvantage {
  id: number
  title: string
  type?: string
  value?: string
}

export interface IProjectApartmentsFilter {
  blocks?: Array<{ id: number; name: string }>
  floors?: { min: number; max: number }
  area?: { min: string; max: string }
  price?: { min: number; max: number }
  rooms?: Array<{ id: number; number: number; ad_number: number }>
  sort?: string
  page?: number
}

const defaultFilters = {
  sort: 'relevance',
  page: 1,
} as IProjectApartmentsFilter

const defaultPagination = {
  total: 0,
  count: 0,
  per_page: 26,
  current_page: 1,
  total_pages: 0,
  previous_page: null,
  next_page: null,
} as IResponseMetaPagination

/**
 * States
 */
export const state = () => ({
  project: {} as IProject,
  projects: [] as IProject[],
  apartment: {} as IProjectApartment,
  apartments: [] as IProjectApartment[],
  meta: {
    pagination: defaultPagination as IResponseMetaPagination,
  } as IResponseMeta['meta'],
  projectsCount: 0 as number,
  filters: defaultFilters as IProjectApartmentsFilter,
  selectedFilters: defaultFilters as any,
  loading: false as boolean,
  pageSeoContent: '' as string,
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
  getProject: (state: CatalogState): IProject => state.project,
  getProjects: (state: CatalogState): IProject[] => state.projects,
  getProjectsCount: (state: CatalogState): number => state.projectsCount,
  getApartment: (state: CatalogState): IProjectApartment => state.apartment,
  getApartments: (state: CatalogState): IProjectApartment[] => state.apartments,
  getFilters: (state: CatalogState): IProjectApartmentsFilter => state.filters,
  getPageSeoContent: (state: CatalogState): string => state.pageSeoContent,
  getMeta: (state: CatalogState): IResponseMeta['meta'] => state.meta,
  getLoading: (state: CatalogState): boolean => state.loading,
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
  setApartmentsList(state: CatalogState, response: IResponseData<IProjectApartment[]>) {
    state.apartments = response.data

    if (response.meta) {
      state.meta = response.meta as IResponseMeta['meta']
    }
  },
  setFilters: (state: CatalogState, value: IProjectApartmentsFilter) => {
    state.filters = {}
    state.selectedFilters = {
      ...defaultFilters,
    }
    state.filters = {
      ...defaultFilters,
      ...value,
    }
  },
  setSelectedFilter: (
    state: CatalogState,
    {
      key,
      value,
    }: { key: 'blocks' | 'floors' | 'area' | 'price' | 'rooms' | 'page' | 'sort'; value: any },
  ) => {
    state.selectedFilters[key] = value
  },
  setLoading: (state: CatalogState, value: boolean) => {
    state.loading = value
  },
  setPageSeoContent: (state: CatalogState, value: string) => {
    state.pageSeoContent = !value ? '' : value
  },
}

/**
 * Actions
 */
export const actions: ActionTree<CatalogState, RootState> = {
  async fetchProject({ commit }: CatalogActionContext, id: string) {
    return new Promise((resolve, reject) => {
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
    return new Promise((resolve, reject) => {
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
  async fetchApartment({ commit, state }: CatalogActionContext, apartment_id?: number) {
    commit('setLoading', true)
    return new Promise(async (resolve, reject) => {
      this.$axios
        .$get(`v1/apartments${apartment_id ? '/' + apartment_id : ''}`)
        .then(
          (
            response: IProjectApartment & {
              similar_apartments?: IProjectApartment[]
            },
          ) => {
            commit('setApartment', response)
            commit('setLoading', false)
            resolve(response)
          },
        )
        .catch(({ response: { data } }) => {
          reject(data)
        })
    })
  },
  async fetchFilters({ commit, state }: CatalogActionContext) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`v1/apartments/filters`, {
          params: {
            project_id: state.project.id ? state.project.id : null,
          },
        })
        .then((filters: IProjectApartmentsFilter) => {
          commit('setFilters', filters)
          resolve(filters)
        })
        .catch(({ response: { data } }) => {
          reject(data)
        })
    })
  },
  async fetchApartments({ commit, state }: CatalogActionContext) {
    commit('setLoading', true)
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`v1/apartments`, {
          params: {
            project_id: state.project.id ? state.project.id : null,
            ...state.selectedFilters,
          },
        })
        .then((response: IResponseData<IProjectApartment>) => {
          commit('setApartmentsList', response)
          commit('setLoading', false)
          resolve(response)
        })
        .catch(({ response: { data } }) => {
          reject(data)
        })
    })
  },
}
