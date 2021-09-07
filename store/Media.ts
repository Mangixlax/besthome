import { RootState } from '~/store'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'

// const isObject = (value) => value && !Array.isArray(value) && typeof value === 'object'


export interface IArticle {
  is_fill: boolean
  id: number
  slugs: Object
  title: string
  excerpt: string

}

export interface IBlock {
  type: string
  data: IBlockData
}

export interface IBlockData {
  text?: String
}

export const state = () => ({
  media_article: {} as Object,
  // sort: 'date,desc',
  // media_rubric_collection: [],
  // meta: {
  //   total: 0,
  //   count: 0,
  //   per_page: 0,
  //   current_page: 0,
  //   total_pages: 0,
  //   previous_page: null,
  //   next_page: null,
  // },
  // loading: false,
})

export type MediaState = ReturnType<typeof state>

interface MediaActionContext extends ActionContext<MediaState, RootState> {}

export const getters: GetterTree<MediaState, RootState> = {
  getMediaArticleItem: (state): Object => state.media_article
  // getMediaRubricCollection(state) {
  //   return state.media_rubric_collection
  // },
  // getMetaCollection(state) {
  //   return state.meta
  // },
  // isLoading(state) {
  //   return state.loading
  // },
}

export const mutations = {
  setMediaArticleData(state : MediaState, article: any) {
    state.media_article = article.data || []
  },
  // setMediaRubricCollectionData(state, response) {
  //   state.media_rubric_collection = response.data || []
  //   state.meta = response.meta || state.meta
  // },
  // SET_SORTING_PARAMS(state, { field = 'date', direction = 'desc' }) {
  //   state.sort = [field, direction].join(',')
  // },
  // ENABLE_LOADING(state) {
  //   state.loading = true
  // },
  // DISABLE_LOADING(state) {
  //   state.loading = false
  // },
}

export const actions: ActionTree<MediaState, RootState> = {
  /**
   * Загрузка списка офферов
   *
   * @param state
   * @param commit
   * @param payload_params - дополнительные параметры
   * @param rubric_id
   * @param only_count - запросить только количество офферов, без списка коллекции
   * @returns {Promise<void>}
   */
  // async loadMediaRubricCollection({ state, commit }, { payload_params = {}, rubric_id = '' }) {
  //   const params = Object.assign(
  //     {
  //       sort: state.sort,
  //     },
  //     payload_params,
  //   )
  //   let uri_params = ''

  //   if (!rubric_id) {
  //     throw Error('Parameter rubric_id not passed')
  //   }

  //   // Включить лоадер
  //   await commit('ENABLE_LOADING')

  //   uri_params = Object.keys(params)
  //     // Превращаем всё в строки
  //     .map((key) => {
  //       const param = params[key]

  //       if (param instanceof Array) {
  //         return (
  //           `${key}=` + encodeURIComponent(param.map((a) => (isObject(a) ? a.id : a)).join(','))
  //         )
  //       } else if (param instanceof Object) {
  //         return `${key}=` + encodeURIComponent(param.id)
  //       }

  //       return `${key}=${encodeURIComponent(param)}`
  //     })
  //     // Получившийся массив, превращаем в одну строку, разделяя каждый элемент символом "&"
  //     .join('&')

  //   // Отправляем запрос к API
  //   const response = await this.$axios.$get(`v1/rubrics/${rubric_id}?${uri_params}`)

  //   // Запоминаем результат в хранилище
  //   await commit('setMediaRubricCollectionData', response)

  //   // Отключить лоадер
  //   await commit('DISABLE_LOADING')

  //   // Возвращаем результат запроса
  //   return response
  // },
  // /**
  //  * Загрузить контент статьи
  //  *
  //  * @param commit
  //  * @param {Number} article_id
  //  * @returns {Promise<any>}
  //  */
  
  async fetchMediaArticleItem({ commit }: MediaActionContext, article_id: string) {
   
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`v1/media/${article_id}`)
        .then((article: any) => {
          commit('setMediaArticleData', article)
          resolve(article)
        })
        .catch(({ response: {data} }) => {
          reject(data)
        })
    })
  },
  /**
   * Увеличить счетчик просмотров у статьи
   *
   * @param {Number} article_id
   * @returns {Promise<any>}
   */
  // eslint-disable-next-line no-empty-pattern
  // async incrementArticleViews({}, article_id) {
  //   return await this.$axios.$post(`v1/posts/${article_id}/view`)
  // },
  /**
   * Изменить сортировку списка статей
   *
   * @param commit
   * @param dispatch
   * @param field
   * @param direction
   * @returns {Promise<void>}
   */
  // async changeSortingParams({ commit, dispatch }, { field, direction }) {
  //   await commit('SET_SORTING_PARAMS', { field, direction })
  // },
}


