import { GetterTree, ActionTree, MutationTree, ActionContext } from 'vuex'

/**
 * States
 */
export const state = () => ({
  isTouchDevice: false as boolean,
  logoSubTitle: 'Construction' as string,
  ourCompanyCardInfo: [
    {
      id: 1,
      image: 'person-1.png',
      name: 'Tim Cook',
      position: 'Chief Executive Officer',
      info: [
        'Greg “Joz” Joswiak is Apple’s senior vice president of Worldwide Marketing, reporting to CEO Tim Cook.',
        'Since joining Apple in June 1986, Joz has played a pivotal role in developing and launching some of the world’s most beloved consumer products, including the original iPod and iPhone. Joz began his career at Apple working on the early Macintosh computers and supporting the Mac’s community of third-party developers.',
        'Joz has over 30 years of marketing and management experience at Apple, most recently as the vice president of Apple Product Marketing where he managed the product marketing and product management teams responsible for Apple’s entire product lineup. Joz graduated with a Bachelor of Science in Computer Engineering from the University of Michigan in 1986.'
      ],
    },
    {
      id: 2,
      image: 'person-2.png',
      name: 'Greg “Joz” Joswiak',
      position: 'Senior Vice President, Worldwide Marketing',
      info: [
        'Greg “Joz” Joswiak is Apple’s senior vice president of Worldwide Marketing, reporting to CEO Tim Cook.',
        'Since joining Apple in June 1986, Joz has played a pivotal role in developing and launching some of the world’s most beloved consumer products, including the original iPod and iPhone. Joz began his career at Apple working on the early Macintosh computers and supporting the Mac’s community of third-party developers.',
        'Joz has over 30 years of marketing and management experience at Apple, most recently as the vice president of Apple Product Marketing where he managed the product marketing and product management teams responsible for Apple’s entire product lineup. Joz graduated with a Bachelor of Science in Computer Engineering from the University of Michigan in 1986.'
      ],
    },
    {
      id: 3,
      image: 'person-3.png',
      name: 'Tim Cook',
      position: 'Chief Executive Officer',
      info: [
        'Greg “Joz” Joswiak is Apple’s senior vice president of Worldwide Marketing, reporting to CEO Tim Cook.',
        'Since joining Apple in June 1986, Joz has played a pivotal role in developing and launching some of the world’s most beloved consumer products, including the original iPod and iPhone. Joz began his career at Apple working on the early Macintosh computers and supporting the Mac’s community of third-party developers.',
        'Joz has over 30 years of marketing and management experience at Apple, most recently as the vice president of Apple Product Marketing where he managed the product marketing and product management teams responsible for Apple’s entire product lineup. Joz graduated with a Bachelor of Science in Computer Engineering from the University of Michigan in 1986.'
      ],
    },
    {
      id: 4,
      image: 'person-4.png',
      name: 'Tim Cook',
      position: 'Chief Executive Officer',
      info: [
        'Greg “Joz” Joswiak is Apple’s senior vice president of Worldwide Marketing, reporting to CEO Tim Cook.',
        'Since joining Apple in June 1986, Joz has played a pivotal role in developing and launching some of the world’s most beloved consumer products, including the original iPod and iPhone. Joz began his career at Apple working on the early Macintosh computers and supporting the Mac’s community of third-party developers.',
        'Joz has over 30 years of marketing and management experience at Apple, most recently as the vice president of Apple Product Marketing where he managed the product marketing and product management teams responsible for Apple’s entire product lineup. Joz graduated with a Bachelor of Science in Computer Engineering from the University of Michigan in 1986.'
      ],
    },
    {
      id: 5,
      image: 'person-5.png',
      name: 'Tim Cook',
      position: 'Chief Executive Officer',
      info: [
        'Greg “Joz” Joswiak is Apple’s senior vice president of Worldwide Marketing, reporting to CEO Tim Cook.',
        'Since joining Apple in June 1986, Joz has played a pivotal role in developing and launching some of the world’s most beloved consumer products, including the original iPod and iPhone. Joz began his career at Apple working on the early Macintosh computers and supporting the Mac’s community of third-party developers.',
        'Joz has over 30 years of marketing and management experience at Apple, most recently as the vice president of Apple Product Marketing where he managed the product marketing and product management teams responsible for Apple’s entire product lineup. Joz graduated with a Bachelor of Science in Computer Engineering from the University of Michigan in 1986.'
      ],
    },
    {
      id: 6,
      image: 'person-6.png',
      name: 'Tim Cook',
      position: 'Chief Executive Officer',
      info: [
        'Greg “Joz” Joswiak is Apple’s senior vice president of Worldwide Marketing, reporting to CEO Tim Cook.',
        'Since joining Apple in June 1986, Joz has played a pivotal role in developing and launching some of the world’s most beloved consumer products, including the original iPod and iPhone. Joz began his career at Apple working on the early Macintosh computers and supporting the Mac’s community of third-party developers.',
        'Joz has over 30 years of marketing and management experience at Apple, most recently as the vice president of Apple Product Marketing where he managed the product marketing and product management teams responsible for Apple’s entire product lineup. Joz graduated with a Bachelor of Science in Computer Engineering from the University of Michigan in 1986.'
      ],
    },
    {
      id: 7,
      image: 'person-7.png',
      name: 'Tim Cook',
      position: 'Chief Executive Officer',
      info: [
        'Greg “Joz” Joswiak is Apple’s senior vice president of Worldwide Marketing, reporting to CEO Tim Cook.',
        'Since joining Apple in June 1986, Joz has played a pivotal role in developing and launching some of the world’s most beloved consumer products, including the original iPod and iPhone. Joz began his career at Apple working on the early Macintosh computers and supporting the Mac’s community of third-party developers.',
        'Joz has over 30 years of marketing and management experience at Apple, most recently as the vice president of Apple Product Marketing where he managed the product marketing and product management teams responsible for Apple’s entire product lineup. Joz graduated with a Bachelor of Science in Computer Engineering from the University of Michigan in 1986.'
      ],
    },
    {
      id: 8,
      image: 'person-8.png',
      name: 'Tim Cook',
      position: 'Chief Executive Officer',
      info: [
        'Greg “Joz” Joswiak is Apple’s senior vice president of Worldwide Marketing, reporting to CEO Tim Cook.',
        'Since joining Apple in June 1986, Joz has played a pivotal role in developing and launching some of the world’s most beloved consumer products, including the original iPod and iPhone. Joz began his career at Apple working on the early Macintosh computers and supporting the Mac’s community of third-party developers.',
        'Joz has over 30 years of marketing and management experience at Apple, most recently as the vice president of Apple Product Marketing where he managed the product marketing and product management teams responsible for Apple’s entire product lineup. Joz graduated with a Bachelor of Science in Computer Engineering from the University of Michigan in 1986.'
      ],
    },
  ],
})

export type RootState = ReturnType<typeof state>

/**
 * Action context specific to settings top line module
 */
interface RootActionContext extends ActionContext<RootState, RootState> {}

/**
 * Getters
 */
export const getters: GetterTree<RootState, RootState> = {
  getLogoSubTitle(state: RootState) {
    return state.logoSubTitle
  },
  getPersonById: (state) => (id: any) => {
    return state.ourCompanyCardInfo.find(person => person.id == id)
  },
}

/**
 * Mutations
 */
export const mutations: MutationTree<RootState> = {
  setLogoSubTitle(state: RootState, value: string) {
    state.logoSubTitle = value
  },
  detectTouchDevice(state: RootState) {
    state.isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
  },
}

/**
 * Actions
 */
export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ dispatch }: RootActionContext) {
    await dispatch('SettingsTopLine/init')
    await dispatch('Navigation/init')
  },
}
