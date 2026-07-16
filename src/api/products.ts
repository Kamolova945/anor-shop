import type { ICategory, IProduct, TProductParams } from '../types/products.ts'
import { $api } from './api.ts'

const baseURL = '/products'

export const productsApi = {
  get: (params?: TProductParams) => $api.get<IProduct[]>(baseURL, { params }),
  getById: (id: IProduct['id']) => $api.get<IProduct>(`${baseURL}/${id}`),
  create: (data: Partial<IProduct>) => $api.post<IProduct>(baseURL, data),
}

export const categoriesApi = {
  get: () => $api.get<ICategory[]>('/categories'),
}