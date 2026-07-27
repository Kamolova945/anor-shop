import type { ICategory, IProduct, TProductParams } from '../types/products.ts'
import { $api } from './api.ts'

const baseURL = '/products'
const categoriesBaseURL = '/categories'

export const productsApi = {
  get: (params?: TProductParams) => $api.get<IProduct[]>(baseURL, { params }),
  getById: (id: IProduct['id']) => $api.get<IProduct>(`${baseURL}/${id}`),
  create: (data: Partial<IProduct>) => $api.post<IProduct>(baseURL, data),
  update: (id: IProduct['id'], data: Partial<IProduct>) =>
    $api.put<IProduct>(`${baseURL}/${id}`, data),
  delete: (id: IProduct['id']) => $api.delete<boolean>(`${baseURL}/${id}`),
}

export const categoriesApi = {
  get: () => $api.get<ICategory[]>(categoriesBaseURL),
  getById: (id: ICategory['id']) => $api.get<ICategory>(`${categoriesBaseURL}/${id}`),
  create: (data: Partial<ICategory>) => $api.post<ICategory>(categoriesBaseURL, data),
  update: (id: ICategory['id'], data: Partial<ICategory>) =>
    $api.put<ICategory>(`${categoriesBaseURL}/${id}`, data),
  delete: (id: ICategory['id']) => $api.delete<boolean>(`${categoriesBaseURL}/${id}`),
}