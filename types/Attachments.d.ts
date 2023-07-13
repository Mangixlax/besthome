export interface IImage {
  path: string
  alt: string
  width: string | number
  height: string | number
}

export interface ISlugs {
  en: string
  ru: string
  [key: string]: string
}
