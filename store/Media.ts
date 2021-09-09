import { RootState } from '~/store'
import { ActionContext, ActionTree, GetterTree } from 'vuex'
import { IResponseData, IResponseMeta, IResponseMetaPagination } from '~/types/Response'
import { CatalogState, IProjectApartmentsFilter } from '~/store/Catalog'
import { IImage, ISlugs } from '~/types/Attachments'

export interface IBlock {
  id: string
  type: string
  data: {
    [key: string]: string
  }
}

export interface IArticle {
  id?: number
  slugs?: ISlugs
  title?: string
  header?: string
  content?: Array<IBlock[]>
  published_at?: string
  published_at_full?: string | null
  poster?: IImage
  seo_title?: string
  seo_description?: string
  seo_keywords?: string
  og_title?: string
  og_description?: string
  author?: {
    slugs?: ISlugs
    name?: string
    avatar?: IImage
  }
  og_image?: IImage
}

export interface IMediaFilter {
  category_id?: number | string | null
  page?: number
}

const defaultFilters = {
  category_id: null,
  page: 1,
} as IMediaFilter

const defaultPagination = {
  total: 0,
  count: 0,
  per_page: 26,
  current_page: 1,
  total_pages: 0,
  previous_page: null,
  next_page: null,
} as IResponseMetaPagination

export const state = () => ({
  article: {} as IArticle,
  articlesList: [] as IArticle[],
  favoriteArticlesList: [] as IArticle[],
  meta: {
    pagination: defaultPagination as IResponseMetaPagination,
  } as IResponseMeta['meta'],
  filters: defaultFilters as IMediaFilter,
  selectedFilters: defaultFilters as any,
  loading: false as boolean,
})

export type MediaState = ReturnType<typeof state>

interface MediaActionContext extends ActionContext<MediaState, RootState> {}

export const getters: GetterTree<MediaState, RootState> = {
  getArticle: (state: MediaState): IArticle => state.article,
  getArticlesList: (state: MediaState): IArticle[] => state.articlesList,
  getFavoriteArticlesList: (state: MediaState): IArticle[] => state.favoriteArticlesList,
  getFilters: (state: MediaState): IProjectApartmentsFilter => state.filters,
  getSelectedFilters: (state: MediaState): IProjectApartmentsFilter => state.selectedFilters,
  getMeta: (state: MediaState): IResponseMeta['meta'] => state.meta,
  getLoading: (state: MediaState): boolean => state.loading,
}

export const mutations = {
  setArticle(state: MediaState, article: IArticle) {
    state.article = article || {}
  },
  setArticlesList(state: MediaState, response: IResponseData<IArticle[]>) {
    state.articlesList = response.data || []

    if (response.meta) {
      state.meta = response.meta as IResponseMeta['meta']
    }
  },
  setFavoriteArticlesList(state: MediaState, response: IArticle[]) {
    state.favoriteArticlesList = response || []
  },
  setFilters: (state: MediaState, value: IMediaFilter) => {
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
    state: MediaState,
    { key, value }: { key: 'page' | 'category_id'; value: any },
  ) => {
    state.selectedFilters[key] = value
  },
  setLoading: (state: CatalogState, value: boolean) => {
    state.loading = value
  },
}

export const actions: ActionTree<MediaState, RootState> = {
  /**
   * Fetch media article data
   *
   * @param commit
   * @param article_id
   */
  async fetchArticle({ commit }: MediaActionContext, article_id: string) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`v1/media/${article_id}`)
        .then((response: IArticle) => {
          commit('setArticle', response)
          resolve(response)
        })
        .catch(({ response: { data } }) => {
          reject(data)
        })
    })
  },
  /**
   * Fetch media articles list data
   *
   * @param commit
   * @param category_id
   */
  async fetchArticlesList({ state, commit }: MediaActionContext) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`v1/media`, {
          params: {
            per_page: 12, // Set by default
            ...state.selectedFilters,
          },
        })
        .then((response: IResponseData<IArticle[]>) => {
          commit('setArticlesList', response)
          resolve(response)
        })
        .catch(({ response: { data } }) => {
          reject(data)
        })
    })
  },
  /**
   * Fetch media favorite articles list data
   *
   * @param {commit}: MediaActionContext
   */
  async fetchFavoriteArticlesList({ commit }: MediaActionContext) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`v1/media/favorites`)
        .then((response: IArticle[]) => {
          commit('setFavoriteArticlesList', response)
          resolve(response)
        })
        .catch(({ response: { data } }) => {
          reject(data)
        })
    })
  },
}
