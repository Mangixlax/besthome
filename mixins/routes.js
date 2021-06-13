export const navigationExtends = {
  methods: {
    /**
     * Опциональный метод для выполнения любых действий перед переходом на другой route
     */
    async beforeGoToRoute() {},
    /**
     * Переход на другую страницу с анимацией для шапки
     *
     * @param route
     */
    async goToRoute(route) {
      if (this.disableRoutes || this.$route.fullPath === route.fullPath) return

      // Выполняем действия перед переходом
      await this.beforeGoToRoute()

      // Отключаем навигацию по ссылкам в шапке
      this.disableRoutes = true

      /**
       * Тригер для мобильного меню в шапке, для его закрытия при переходе по страницам
       */
      this.$root.$emit('HIDDEN_MOBILE_MENU')

      /**
       * Тригер для модального окна с поиском, для его закрытия при переходе на страницу поиска из модального окна
       */
      this.$root.$emit('HIDDEN_SEARCH_MODAL')

      await this.callRoute(route)
    },
    async callRoute(route) {
      // Меняем маршрут
      await this.$router.push(route)
      // Ждем обновления DOM
      await this.$nextTick()
      // Включаем навигацию по ссылкам в шапке через 200ms
      await setTimeout(
        () => {
          this.disableRoutes = false
        },
        this.$store.state.bot ? 0 : 200,
      )
    },
  },
}

export const routeTransitions = {
  data() {
    return {
      routeDelay: 0, // Задержка перехода на следующую страницу
    }
  },
  /**
   * Вызывается перед переходом от пути, соответствующего текущему компоненту;
   * Имеет доступ к контексту экземпляра компонента `this`.
   *
   * @param to - путь, куда переходим
   * @param from - путь, от куда переходим
   * @param next - подтверждение навигации
   */
  async beforeRouteLeave(to, from, next) {
    await this.whenRouteLeave(to, from, next)
    next()
  },
  /**
   * Вызывается до подтверждения пути, соответствующего этому компоненту.
   * НЕ ИМЕЕТ доступа к контексту экземпляра компонента `this`,
   * так как к моменту вызова экземпляр ещё не создан!
   *
   * @param to - путь, куда переходим
   * @param from - путь, от куда переходим
   * @param next - подтверждение навигации
   */
  beforeRouteEnter(to, from, next) {
    // Сразу подтверждаем переход
    next(async (vm) => {
      await vm.whenRouteEnter(to, from)

      // Reset offers filters
      if ((from.name || '').startsWith('realty') && !(to.name || '').startsWith('realty')) {
        await vm.$store.commit('catalog/filters/RESET_FILTERS')
        await vm.$nextTick()
        await vm.$store.dispatch('catalog/filters/PARSE_PAGE_FILTER_PARAMS', {
          params: {},
          query: {},
        })
        vm.$root.$emit('UPDATE_CATALOG_FILTERS')
      }
    })
  },
  methods: {
    /**
     * Если до изменения страницы, нужно что-то выполнить,
     * можно воспользоваться данной функцией
     *
     * Например, скрыть какой-то блок, до того как будет совершен переход на другую страницу
     */
    async whenRouteLeave(to, from, next) {},
    async whenRouteEnter(to, from) {},
  },
}

export const ExtendCatalogRoutes = {
  watch: {
    /**
     * Refresh filter params and parse new params from url
     * when clicked to back or forward button in browser
     *
     * @param to - next route
     * @param from - prev route
     */
    '$route'(to, from) {
      /**
       * When changing or updating current route, didnt change name of used page,
       * and didnt change one of params citySlug or districtSlug,
       * in this case:
       * 1) Reset filters
       * 2) Parse new params from url of new page
       * 3) Refresh filter components
       * 4) Dispatch load offers
       */
      if (to.name === from.name && !this.$store.state.catalog.loading) {
        if (
          to.params.citySlug === from.params.citySlug &&
          to.params.districtSlug === from.params.districtSlug
        ) {
          this.$store.commit('catalog/filters/RESET_FILTERS')

          this.$store.dispatch('catalog/filters/PARSE_PAGE_FILTER_PARAMS', {
            params: to.params,
            query: to.query,
          })
            .then(() => {
              this.$root.$emit('UPDATE_CATALOG_FILTERS')
              this.$store.dispatch('catalog/LOAD_OFFERS')
            })
        }
      }
    },
  },
}
