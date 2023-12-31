import { RootState } from '~/store'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'

/**
 * @TODO Refactoring store
 */

const SettingTopLineCookieName = 'top_line_hidden'
const SettingTopLineLocaleCookieName = 'top_line_locale_hidden'
const cookieAlreadyShowedName = 'cookies_already_showed'
const cookieAcceptedName = 'cookies_accepted'

/**
 * States
 */
export const state = () => ({
  hidden: true,
  localeHidden: false,
  coociesCardHidden: false,
  coociesAccepted: false,
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
  isLocaleHidden: (state: SettingsTopLineState): boolean => state.localeHidden,
  isCoociesCardHidden: (state: SettingsTopLineState): boolean => state.coociesCardHidden,
}

/**
 * Mutations
 */
export const mutations: MutationTree<SettingsTopLineState> = {
  setHiddenMode: (state: SettingsTopLineState, value: boolean) => {
    state.hidden = value
  },
  setLocaleHiddenMode: (state: SettingsTopLineState, value: boolean) => {
    state.localeHidden = value
  },
  setCookiesCardHidddenMode: (state: SettingsTopLineState, value: boolean) => {
    state.coociesCardHidden = value
    state.coociesAccepted = value
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
    this.$cookies.set(SettingTopLineCookieName, newHiddenMode, {
      maxAge: 60 * 60 * 24 * 31 * 12,
      path: '/',
    })
  },
  /**
   * Change hidden mode and save new mode in cookie
   *
   * @param commit
   * @param state
   * @param rootState
   */
  toggleLocaleHiddenMode({ commit, state, rootState }: SettingsTopLineActionContext) {
    const newHiddenMode = !state.localeHidden
    commit('setLocaleHiddenMode', newHiddenMode)
    // Save new mode in cookie
    this.$cookies.set(SettingTopLineLocaleCookieName, newHiddenMode, {
      maxAge: 60 * 60 * 24 * 31 * 12,
      path: '/',
    })
  },

  toggleCoociesCardHiddenMode({ commit, state, rootState }: SettingsTopLineActionContext) {
    const newHiddenMode = !state.coociesAccepted
    commit('setCookiesCardHidddenMode', newHiddenMode)
    this.$cookies.set(cookieAlreadyShowedName, newHiddenMode, {
      maxAge: 60 * 60 * 24 * 31 * 12,
      path: '/',
    })
    this.$cookies.set(cookieAcceptedName, newHiddenMode, {
      maxAge: 60 * 60 * 24 * 31 * 12,
      path: '/',
    })
  },
  /**
   * Init action for set default or already saved hidden mode in cookie
   *
   * @param commit
   */
  init({ commit }: SettingsTopLineActionContext) {
    const topLineCookie: boolean | undefined = this.$cookies.get(SettingTopLineCookieName)
    const topLineLocaleCookie: boolean | undefined = this.$cookies.get(
      SettingTopLineLocaleCookieName,
    )
    const cockiesCardCookie: boolean | undefined = this.$cookies.get(cookieAcceptedName)

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
      this.$cookies.set(SettingTopLineCookieName, false, {
        maxAge: 60 * 60 * 24 * 31 * 12,
        path: '/',
      })
    }

    if (typeof topLineLocaleCookie === 'boolean') {
      /**
       * Set hidden mode if cookie is available
       */
      commit('setLocaleHiddenMode', topLineLocaleCookie)
    } else {
      /**
       * Initialize default mode if cookie is not set
       */
      commit('setLocaleHiddenMode', false)
      this.$cookies.set(SettingTopLineLocaleCookieName, false, {
        maxAge: 60 * 60 * 24 * 31 * 12,
        path: '/',
      })
    }

    if (typeof cockiesCardCookie === 'boolean') {
      /**
       * Set hidden mode if cookie is available
       */
      commit('setCookiesCardHidddenMode', topLineLocaleCookie)
    } else {
      /**
       * Initialize default mode if cookie is not set
       */
      commit('setCookiesCardHidddenMode', false)
      this.$cookies.set(cookieAlreadyShowedName, false, {
        maxAge: 60 * 60 * 24 * 31 * 12,
        path: '/',
      })
      this.$cookies.set(cookieAcceptedName, false, {
        maxAge: 60 * 60 * 24 * 31 * 12,
        path: '/',
      })
    }
  },
}
