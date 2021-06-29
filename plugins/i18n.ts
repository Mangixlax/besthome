import { Context } from '@nuxt/types'

export default function ({ app, store, route }: Context) {
  // beforeLanguageSwitch вызывается перед сменой языка
  app.i18n.onLanguageSwitched = async (oldLocale: string, newLocale: string) => {
    // Обновляем переводы для меню, фильтров и прочего
    await store.dispatch('nuxtServerInit', newLocale)

    if (route.path.indexOf('properties') !== -1) {
      const response = await store.dispatch(
        'Catalog/fetchProject',
        route.params.slug.split('-').pop(),
      )
      store.commit('Catalog/setProject', response)
    }
  }
}
