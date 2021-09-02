export interface IResponseMetaPagination {
  total: number
  count: number
  per_page: number
  current_page: number
  total_pages: number
  previous_page: number | null
  next_page: number | null
}

export interface IResponseMeta {
  meta: {
    pagination: IResponseMetaPagination
  }
}

export interface IResponseData<T> {
  data: T
  meta?: IResponseMeta['meta']
}
