import { RootState } from '~/store'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'

const SettingTopLineCookieName = 'top_line_hidden'

/**
 * States
 */
export const state = () => ({
  hidden: false,
})

export type SettingsTopLineState = ReturnType<typeof state>

/**
 * Action context specific to settings top line module
 */
interface SettingsTopLineActionContext extends ActionContext<SettingsTopLineState, RootState> {}

/**
 * Getters
 */
export const getters: GetterTree<SettingsTopLineState, RootState> = {
  isHidden: (state: SettingsTopLineState): boolean => state.hidden,
}

/**
 * Mutations
 */
export const mutations: MutationTree<SettingsTopLineState> = {
  setHiddenMode: (state: SettingsTopLineState, value: boolean) => {
    state.hidden = value
  },
}

/**
 * Actions
 */
export const actions: ActionTree<SettingsTopLineState, RootState> = {
  /**
   * Change hidden mode and save new mode in cookie
   *
   * @param commit
   * @param state
   * @param rootState
   */
  toggleHiddenMode({ commit, state, rootState }: SettingsTopLineActionContext) {
    const newHiddenMode = !state.hidden
    commit('setHiddenMode', newHiddenMode)
    // Save new mode in cookie
    this.$cookies.set(SettingTopLineCookieName, newHiddenMode)
  },
  /**
   * Init action for set default or already saved hidden mode in cookie
   *
   * @param commit
   */
  init({ commit }: SettingsTopLineActionContext) {
    const topLineCookie: boolean | undefined = this.$cookies.get(SettingTopLineCookieName)

    if (typeof topLineCookie === 'boolean') {
      /**
       * Set hidden mode if cookie is available
       */
      commit('setHiddenMode', topLineCookie)
    } else {
      /**
       * Initialize default mode if cookie is not set
       */
      commit('setHiddenMode', false)
      this.$cookies.set(SettingTopLineCookieName, false, { maxAge: 60 * 60 * 24 * 31 * 12 })
    }
  },
}
