/**
 * Генерация случайного числа в заданном диапазоне
 *
 * @param {Number} min - минимальное число
 * @param {Number} max - максимальное число
 * @param {Boolean} floor - округлять или вывести с остатком
 * @returns {Number}
 */
export const randomNumber = (min, max, floor = true) => {
  const rand = min + Math.random() * (max + 1 - min)
  return floor ? Math.floor(rand) : rand
}

export const range = (start, end) => {
  const ans = []
  for (let i = start; i <= end; i++) {
    ans.push(i)
  }
  return ans
}

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
 * Функция принимает цвет в HEX формате и увеличивает яркость цвета на указанный процент
 * @param color - цвет, который нужно сделать светлее
 * @param percent - процент
 * @returns {string} - возвращает новый HEX цвет
 */
export const lightenColor = (color, percent) => {
  const num = parseInt(color.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const B = ((num >> 8) & 0x00ff) + amt
  const G = (num & 0x0000ff) + amt
  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
      (G < 255 ? (G < 1 ? 0 : G) : 255)
    )
      .toString(16)
      .slice(1)
  )
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

const plural = (a) => {
  if (a % 10 === 1 && a % 100 !== 11) {
    return 0
  } else if (a % 10 >= 2 && a % 10 <= 4 && (a % 100 < 10 || a % 100 >= 20)) {
    return 1
  } else {
    return 2
  }
}

export const arrayWithRangeBetween = (start, stop) => {
  return Array(stop - start + 1)
    .fill(0)
    .map((value, idx) => start + idx)
}

// eslint-disable-next-line func-style
export function _(el) {
  if (!(this instanceof _)) {
    return new _(el)
  }
  this.el = el
}

_.prototype.fade = function fade(type, ms) {
  const isIn = type === 'in'
  let opacity = isIn ? 0 : 1
  const interval = 10
  const duration = ms
  const gap = interval / duration
  const self = this

  if (isIn) {
    self.el.style.display = 'inline'
    self.el.style.opacity = opacity
  }

  const func = () => {
    opacity = isIn ? opacity + gap : opacity - gap
    self.el.style.opacity = opacity

    if (opacity <= 0) self.el.style.display = 'none'
    if (opacity <= 0 || opacity >= 1) window.clearInterval(fading)
  }

  const fading = window.setInterval(func, interval)
}

export const excludeDataKey = (array) => {
  return Object.keys(array).reduce((object, key) => {
    if (
      [
        'infrastructures',
        'advantages',
        'floors',
        'rooms',
        'manager',
        'district',
        'city',
        'objectTypes',
      ].includes(key)
    ) {
      object[key] = array[key].data
    } else {
      object[key] = array[key]
    }

    return object
  }, {})
}

export const RGBToHex = (rgb) => {
  // Choose correct separator
  const sep = rgb.includes(',') ? ',' : ' '
  // Turn "rgb(r,g,b)" into [r,g,b]
  rgb = rgb.substr(4).split(')')[0].split(sep)

  let r = (+rgb[0]).toString(16)
  let g = (+rgb[1]).toString(16)
  let b = (+rgb[2]).toString(16)

  if (r.length === 1) r = '0' + r
  if (g.length === 1) g = '0' + g
  if (b.length === 1) b = '0' + b

  return '#' + r + g + b
}

export const hexToRGB = (h, opacity = 1) => {
  let b = 0
  let g = 0
  let r = 0

  h = h[0] !== '#' ? '#' + h : h

  // 3 digits
  if (h.length === 4) {
    r = '0x' + h[1] + h[1]
    g = '0x' + h[2] + h[2]
    b = '0x' + h[3] + h[3]

    // 6 digits
  } else if (h.length === 7) {
    r = '0x' + h[1] + h[2]
    g = '0x' + h[3] + h[4]
    b = '0x' + h[5] + h[6]
  }

  return 'rgba(' + +r + ',' + +g + ',' + +b + ',' + opacity + ')'
}

export const hexToHSL = (hex, alpha = 1, fill = false) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  let r = parseInt(result[1], 16)
  let g = parseInt(result[2], 16)
  let b = parseInt(result[3], 16)
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h
  let s
  let l = (max + min) / 2
  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    // eslint-disable-next-line default-case
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }
  h = Math.ceil(h * 360)
  s = Math.ceil(s * 100)
  l = Math.ceil(l * 100)
  return fill ? `hsla(${h}, ${s}%, 32%, ${alpha})` : { h, s, l, alpha }
}

export const getSiteUrl = (href, withSlash = false) => {
  let url = `${process.env.PROTOCOL}://${process.env.DOMAIN}${href}`

  if (url.substr(-1) === '/') {
    url = url.substr(0, url.length - 1)
  }

  return withSlash ? (url.endsWith('/') ? url : url + '/') : url
}

/**
 * Скроллинг по горизонтали
 *
 * @param {Element|Vue} element - элемент, который будем скроллить
 * @param {Number} to - на сколько сдвинуть
 * @param {Number} duration - длительность
 * @returns {Promise<unknown>}
 */
export const scrollLeft = (element, to, duration) => {
  return new Promise((resolve) => {
    const start = element.scrollLeft
    const change = to - start
    let currentTime = 0
    const increment = 20

    const animateScroll = () => {
      currentTime += increment
      element.scrollLeft = Math.easeInOutQuad(currentTime, start, change, duration)
      if (currentTime < duration) {
        setTimeout(animateScroll, increment)
      } else {
        resolve()
      }
    }

    animateScroll()
  })
}

Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2
  if (t < 1) return (c / 2) * t * t + b
  t--
  return (-c / 2) * (t * (t - 2) - 1) + b
}

export const phoneValid = (value) =>
  /^[+]?(\d{11}|(375|380)\s\d{2}\s\d{3}\s\d{2}\s\d{2}|90\s\d{3}\s\d{3}\s\d{4}|7\s\(\d{3}\)\s\d{3}\-\d{2}\-\d{2})$/.test(
    value,
  )

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
