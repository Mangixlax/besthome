const metaDefault = {
  title: {
    name: 'title',
    content: '',
  },
  description: {
    name: 'description',
    content: '',
  },
  keywords: {
    name: 'keywords',
    content: '',
  },

  'og:title': {
    property: 'og:title',
    content: '',
    preset: 'title',
  },
  'og:description': {
    property: 'og:description',
    content: '',
    preset: 'description',
  },
  'og:type': {
    property: 'og:type',
    content: 'website',
  },
  'og:site_name': {
    property: 'og:site_name',
    content: 'BestHome',
  },
  'og:url': {
    property: 'og:url',
    content: '',
  },
  'og:locale': {
    property: 'og:locale',
    content: '',
  },
  'og:image': {
    property: 'og:image',
    content: '',
  },
  'og:image:height': {
    property: 'og:image:height',
    content: '',
  },
  'og:image:width': {
    property: 'og:image:width',
    content: '',
  },

  'twitter:title': {
    name: 'twitter:title',
    content: '',
    preset: 'og:title',
  },
  'twitter:description': {
    name: 'twitter:description',
    content: '',
    preset: 'og:description',
  },
  'twitter:card': {
    name: 'twitter:card',
    content: 'summary_large_image',
  },
  'twitter:image:src': {
    name: 'twitter:image:src',
    content: '',
    preset: 'og:image',
  },
  'twitter:url': {
    name: 'twitter:url',
    content: '',
  },
  'twitter:domain': {
    name: 'twitter:domain',
    content: 'besthome',
  },
  'twitter:site': {
    name: 'twitter:site',
    content: '@besthome',
  },
  'twitter:creator': {
    name: 'twitter:creator',
    content: '@besthome',
  },

  robots: {
    name: 'robots',
    content: 'all',
  },
}

export const metaGenerator = (newMetaObjects = {}) => {
  const resultMeta = []

  Object.keys(metaDefault).forEach((key) => {
    const { name, property, content, preset } = metaDefault[key]

    const newMetaObject = {
      hid: key,
    }

    name && (newMetaObject.name = name)
    property && (newMetaObject.property = property)

    if (newMetaObjects[key]) {
      newMetaObject.content = newMetaObjects[key]
    } else if (preset) {
      newMetaObject.content = newMetaObjects[preset]
    } else {
      newMetaObject.content = content
    }

    // if (typeof newMetaObject.content === 'string') {
    //   newMetaObject.content = newMetaObject.content
    // }

    newMetaObject.content && resultMeta.push(newMetaObject)
  })

  return resultMeta
}

export default metaGenerator
