import { GetterTree, MutationTree, ActionContext } from 'vuex'
import { RootState } from '~/store/index'

/**
 * States
 */
export const state = () => ({
  changing: true as boolean,
})

export type PageTransitionState = ReturnType<typeof state>

/**
 * Action context specific to settings top line module
 */
interface RootActionContext extends ActionContext<PageTransitionState, RootState> {}

/**
 * Getters
 */
export const getters: GetterTree<PageTransitionState, RootState> = {
  changing(state: PageTransitionState) {
    return state.changing
  },
}

/**
 * Mutations
 */
export const mutations: MutationTree<PageTransitionState> = {
  animate(state: PageTransitionState, value = null) {
    state.changing = value === null ? !state.changing : value
  },
}
