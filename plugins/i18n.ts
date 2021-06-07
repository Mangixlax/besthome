import { Context } from '@nuxt/types'

export default function ({ app, store, route }: Context) {
  // beforeLanguageSwitch вызывается перед сменой языка
  app.i18n.onLanguageSwitched = (oldLocale: string, newLocale: string): void => {
    // Обновляем переводы для меню, фильтров и прочего
    store.dispatch('nuxtServerInit', newLocale)

    if (route.path.indexOf('properties') !== -1) {
      store.dispatch('Catalog/fetchProject', route.params.slug.split('-').pop())
    }
  }
}
