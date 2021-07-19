import { getSiteUrl, objectIsFilled } from '@/lib/utils'

/**
 * Helper for generate additional property array
 *
 * @param {Object} i18n - translation instance
 * @param {Array} items - array of properties
 * @param {String} name_key - object key from needed get value
 * @param {String} name_ru - russian name for property
 * @param {String} name_en - english name for property
 * @returns {Array}
 */
const parseAdditionalProperty = ({ i18n, items, name_key, name_ru, name_en }) => {
  return (items || []).length
    ? [
        {
          '@type': 'http://schema.org/PropertyValue',
          name: i18n.locale === 'ru' ? name_ru : name_en,
          value: (items || []).map((item) => item[name_key]),
        },
      ]
    : []
}
/**
 * Generate jsonld for offer
 * @param {Vue|Object} ctx
 * @param {Object} offer - Object with offer data
 * @returns {{offers: {priceValidUntil: *, priceCurrency: string, '@type': (string), availability: (string), url: *, itemCondition: string}, image: (*|string)[], additionalProperty: *[], '@type': string, name: *, description: *, '@context': string, brand: {'@type': string, name: string}, url: *}|{}}
 */
export const offerJsonLd = (ctx, offer) => {
  if (!objectIsFilled(offer)) return {}
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    url: getSiteUrl(
      ctx.localePath({
        name: 'properties-slug-apartments-id',
        params: {
          slug: ctx.$route.params.slug,
          id: offer.id,
        },
      }),
      true,
    ),
    name: offer.name,
    description: offer.additional_text,
    image: [...(offer.plans || []).map((img) => img.original)]
      .filter((img) => (img || {}).path)
      .map((img) => ctx.getStorageUrl(img.path)),
    brand: {
      '@type': 'Organization',
      name: 'BestHome',
    },
    offers: {
      '@type': 'Offer',
      url: getSiteUrl(
        ctx.localePath({
          name: 'properties-slug-apartments-id',
          params: {
            slug: ctx.$route.params.slug,
            id: offer.id,
          },
        }),
        true,
      ),
      priceCurrency: 'EUR',
      price: offer.price,
      priceValidUntil: offer.project.start_building,
      itemCondition: 'https://schema.org/UsedCondition',
      availability:
        offer.status === 2 ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
    },
    additionalProperty: [
      // ...parseAdditionalProperty({
      //   i18n: ctx.$i18n,
      //   items: [offer.city],
      //   name_key: 'name',
      //   name_ru: 'Город',
      //   name_en: 'City',
      // }),
      // ...parseAdditionalProperty({
      //   i18n: ctx.$i18n,
      //   items: [offer.project.location],
      //   name_key: 'name',
      //   name_ru: 'Район',
      //   name_en: 'District',
      // }),
      // ...parseAdditionalProperty({
      //   i18n: ctx.$i18n,
      //   items: offer.advantages,
      //   name_key: 'name',
      //   name_ru: 'Преимущества',
      //   name_en: 'Advantages',
      // }),
      // ...parseAdditionalProperty({
      //   i18n: ctx.$i18n,
      //   items: offer.infrastructures,
      //   name_key: 'name',
      //   name_ru: 'Инфраструктура',
      //   name_en: 'Infrastructure',
      // }),
      // ...parseAdditionalProperty({
      //   i18n: ctx.$i18n,
      //   items: offer.objectTypes,
      //   name_key: 'name',
      //   name_ru: 'Типы недвижимости',
      //   name_en: 'Object types',
      // }),
      // ...parseAdditionalProperty({
      //   i18n: ctx.$i18n,
      //   items: offer.room.number,
      //   name_key: 'number',
      //   name_ru: 'Комнат',
      //   name_en: 'Rooms',
      // }),
      // ...parseAdditionalProperty({
      //   i18n: ctx.$i18n,
      //   items: offer.floor.number,
      //   name_key: 'number',
      //   name_ru: 'Этажи',
      //   name_en: 'Floors',
      // }),
    ],
  }
}
