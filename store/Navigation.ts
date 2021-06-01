import { RootState } from '~/store'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'

export interface NavigationListItem {
  name: string
  nameInChildren?: string
  title?: string
  titleInChildren?: string
  indicator?: number | string
  route: object
  children?: NavigationListItem[]
  hasChildren?: boolean
}

export interface IMenusItem {
  title: string
  url: string
  indicator: string
  title_in_children?: string
  items?: IMenusItem[]
}

export interface IMenus<T> {
  title: string
  items: T
}

interface IMenusObject {
  [key: string]: IMenus<IMenusItem[]>
}

/**
 * States
 */
export const state = () => ({
  menus: {} as IMenusObject,
})

export type NavigationState = ReturnType<typeof state>

/**
 * Action context specific to navigation module
 */
interface NavigationActionContext extends ActionContext<NavigationState, RootState> {}

/**
 * Getters
 */
export const getters: GetterTree<NavigationState, RootState> = {
  getMenuByKey: (state: NavigationState) => {
    const processing = (items: IMenusItem[] = []): NavigationListItem[] => {
      const result: NavigationListItem[] = []

      ;(items || []).forEach((item: IMenusItem) => {
        result.push({
          name: item.title,
          nameInChildren: item.title_in_children,
          indicator: item.indicator,
          route: {
            name: item.url,
          },
          children: processing(item.items?.length ? item.items : []),
          hasChildren: !!item.items?.length,
        })
      })

      return result
    }

    return (key: string) => {
      const menu = (Object.keys(state.menus).indexOf(key) !== -1 ? state.menus[key] : {}) as IMenus<
        IMenusItem[]
      >
      return {
        title: menu.title,
        items: processing(menu.items),
      } as IMenus<NavigationListItem[]>
    }
  },
}

/**
 * Mutations
 */
export const mutations: MutationTree<NavigationState> = {
  setMenus: (state: NavigationState, menus: IMenusObject = {}) => {
    state.menus = menus
  },
}

/**
 * Actions
 */
export const actions: ActionTree<NavigationState, RootState> = {
  parseMenus({ commit }: NavigationActionContext, menus: IMenusObject = {}) {
    if (typeof menus === 'object' && !Array.isArray(menus)) {
      commit('setMenus', menus)
    }
  },
}
