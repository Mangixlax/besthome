/**
 * Проверка на заполненность объекта (если в объекте есть хоть один ключ)
 *
 * @param {Object} itemObject - проверяемый объект
 * @returns {Boolean}
 */
export const objectIsFilled = (itemObject = {}) => {
  return Object.keys(itemObject).length > 0
}

/**
 * Склонение слов
 *
 * @param i - число
 * @param str0 - 0 яблок
 * @param str1 - 1 яблоко
 * @param str2 - 2 яблока
 * @param str3 - 5 яблок
 */
export const pluralize = (i, str0, str1, str2, str3) => {
  if (!i) {
    return parse(str0, i)
  }
  switch (plural(i)) {
    case 0:
      return parse(str1, i)
    case 1:
      return parse(str2, i)
    default:
      return parse(str3, i)
  }
}

const parse = (str) => {
  // eslint-disable-next-line no-undef,prefer-reflect
  const args = [].slice.call(arguments, 1)
  let i = 0

  return str.replace(/%d/g, function () {
    return args[i++]
  })
}

export const plural = (a) => {
  if (a % 10 === 1 && a % 100 !== 11) {
    return 0
  } else if (a % 10 >= 2 && a % 10 <= 4 && (a % 100 < 10 || a % 100 >= 20)) {
    return 1
  } else {
    return 2
  }
}

export const getSiteUrl = (href, withSlash = false) => {
  let url = `${process.env.PROTOCOL}://${process.env.DOMAIN}${href}`

  if (url.substr(-1) === '/') {
    url = url.substr(0, url.length - 1)
  }

  return withSlash ? (url.endsWith('/') ? url : url + '/') : url
}

export const getScrollbarWidth = () => {
  const outer = document.createElement('div')
  outer.style.visibility = 'hidden'
  outer.style.width = '100px'
  outer.style.msOverflowStyle = 'scrollbar' // needed for WinJS apps

  document.body.appendChild(outer)

  const widthNoScroll = outer.offsetWidth
  // force scrollbars
  outer.style.overflow = 'scroll'

  // add innerdiv
  const inner = document.createElement('div')
  inner.style.width = '100%'
  outer.appendChild(inner)

  const widthWithScroll = inner.offsetWidth

  // remove divs
  outer.parentNode.removeChild(outer)

  return widthNoScroll - widthWithScroll
}

export const delay = async (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, milliseconds)
  })
}
