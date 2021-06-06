import { getScrollbarWidth } from '@/lib/utils'

export const modalsTriggerMixin = {
  methods: {
    /**
     * @param {String} name
     * @param {Vue | ComponentOptions<Vue> | AsyncComponent} modal
     * @param {Object} props
     * @param {Object} options
     * @param {Object} events
     */
    showModal({ name, modal, props = {}, options = {}, events = {} }) {
      this.$modal.show(
        modal,
        {
          name,
          ...props,
        },
        {
          name,
          height: 'auto',
          scrollable: true,
          shiftY: 0.5,
          shiftX: 0.5,
          width: 1248,
          adaptive: true,
          ...options,
        },
        {
          'before-open': () => {
            document.documentElement.classList.add('modal-is-open')
            document.body.style.setProperty('--modal-padding', getScrollbarWidth() + 'px')
          },
          'before-close': () => {
            /**
             * If more than one modal window is currently open,
             * then there is no need to clear the classes
             */
            if (document.body.getElementsByClassName('vm--container').length <= 1) {
              document.documentElement.classList.remove('modal-is-open')
              document.body.style.setProperty('--modal-padding', '0')
            }
          },
          ...events,
        },
      )
    },
  },
}
