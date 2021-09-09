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
export const offerJsonLd = (ctx, offer) => {
  if (!objectIsFilled(offer)) return {}
  return [
    {
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
      
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Residence',
      '@additionalType': 'http://schema.org/Product',
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
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SingleFamilyResidence',
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
    },
  ]
}
