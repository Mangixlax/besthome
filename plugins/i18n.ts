import { Context } from '@nuxt/types'

export default function ({ app, store }: Context) {
  // beforeLanguageSwitch вызывается перед сменой языка
  app.i18n.onLanguageSwitched = (oldLocale: string, newLocale: string): void => {
    // Обновляем переводы для меню, фильтров и прочего
    store.dispatch('nuxtServerInit', newLocale)
  }
}
