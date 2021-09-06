import ruLangConfig from '../lang/ru'
import enLangConfig from '../lang/en'
import { plural } from '~/lib/utils'

export default (context) => {
  return {
    fallbackLocale: 'en',
    messages: {
      ru: ruLangConfig,
      en: enLangConfig,
    },
    pluralizationRules: {
      /**
       * @param choice {number} a choice index given by the input to $tc: `$tc('path.to.rule', choiceIndex)`
       * @param choicesLength {number} an overall amount of available choices
       * @returns number a final choice index to select plural word by
       */
      ru: function (choice, choicesLength) {
        if (!choice) {
          return 0
        }

        switch (plural(choice)) {
          case 0:
            return 1
          case 1:
            return 2
          default:
            return 3
        }
      },
    },
  }
}
