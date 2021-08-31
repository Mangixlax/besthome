import { RootState } from '~/store'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'

export interface IPerson {
  slug: string,
  name: string,
  position: string,
  content: string,
  avatar: string
}

export const state = () => ({
  person: {} as IPerson,
  persons: [] as IPerson[]
})

export type EmployeeState = ReturnType<typeof state>

interface EmployeeActionContext extends ActionContext<EmployeeState, RootState> {}

export const getters: GetterTree<EmployeeState, RootState> = {
  getPerson: (state): IPerson => state.person,
  getPersons: (state): IPerson[] => state.persons
}

export const mutations: MutationTree<EmployeeState> = {
  setPerson: (state: EmployeeState, value: IPerson) => {
    state.person = value
  },
  setPersons: (state: EmployeeState, value: IPerson[]) => {
    state.persons = value
  }
}

export const actions: ActionTree<EmployeeState, RootState> = {
  async fetchPerson({ commit }: EmployeeActionContext, id: string) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`v1/teams/${id}`)
        .then((persons: any) => {
          console.log('resolve')
          resolve(persons.data)
        })
        .catch(({ response: { data } }) => {
          console.log('reject')
          reject(data)
        })
    })
  },
  async fetchPersons({ commit }: EmployeeActionContext) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`v1/teams`)
        
        .then((persons: any) => {
          commit('setPersons', persons.data)
          resolve(persons.data)
        })
        .catch(({ response: { data } }) => {
          reject(data)
        })
    })
  },
}