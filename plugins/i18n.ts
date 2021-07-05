import { Context } from '@nuxt/types'

export default function ({ app, store }: Context) {
  // beforeLanguageSwitch вызывается перед сменой языка
  app.i18n.onLanguageSwitched = async (oldLocale: string, newLocale: string) => {
    // Обновляем переводы для меню, фильтров и прочего
    await store.dispatch('nuxtServerInit', newLocale)

    if ((app.router?.currentRoute.path || '').indexOf('properties') !== -1) {
      const response = await store.dispatch(
        'Catalog/fetchProject',
        app.router?.currentRoute.params.slug.split('-').pop(),
      )
      store.commit('Catalog/setProject', response)
    }
  }
}
