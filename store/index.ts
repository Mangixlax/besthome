import { GetterTree, ActionTree, MutationTree, ActionContext } from 'vuex'

/**
 * States
 */
export const state = () => ({})

export type RootState = ReturnType<typeof state>

/**
 * Action context specific to settings top line module
 */
interface RootActionContext extends ActionContext<RootState, RootState> {}

/**
 * Getters
 */
export const getters: GetterTree<RootState, RootState> = {}

/**
 * Mutations
 */
export const mutations: MutationTree<RootState> = {}

/**
 * Actions
 */
export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ dispatch }: RootActionContext) {
    await dispatch('SettingsTopLine/init')
  },
}
