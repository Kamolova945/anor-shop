import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { productsApi, categoriesApi } from '../api/products.ts'
import type { ICategory, IProduct, TProductParams } from '../types/products.ts'

export const PRODUCTS_KEY = 'products-key'
export const CATEGORIES_KEY = 'categories-key'

type TProductsQueryParams = TProductParams & { sort?: string }

export const useProducts = (params?: TProductsQueryParams) => {
  const { page, size, sort, ...filters } = params ?? {}

  const current = Number(page ?? 1)
  const limit = Number(size ?? 6)
  const start = (current - 1) * limit

  return useQuery({
    queryKey: [PRODUCTS_KEY, filters, sort],
    queryFn: () => productsApi.get(filters).then((resp) => resp.data),
    select: (all) => {
      const sorted =
        sort === 'price_asc'
          ? [...all].sort((a, b) => a.price - b.price)
          : sort === 'price_desc'
            ? [...all].sort((a, b) => b.price - a.price)
            : all

      return {
        data: sorted.slice(start, start + limit),
        total: sorted.length,
      }
    },
  })
}

export const useProductById = (id?: string) =>
  useQuery({
    queryKey: [PRODUCTS_KEY, id],
    queryFn: () => productsApi.getById(Number(id)).then((resp) => resp.data),
    enabled: Boolean(id),
  })

export const useProductsStats = () =>
  useQuery({
    queryKey: [PRODUCTS_KEY, 'stats'],
    queryFn: () => productsApi.get().then((resp) => resp.data),
    select: (all) => ({
      total: all.length,
      averagePrice: all.length ? all.reduce((sum, p) => sum + p.price, 0) / all.length : 0,
    }),
  })

export const useCategories = () =>
  useQuery({
    queryKey: [CATEGORIES_KEY],
    queryFn: () => categoriesApi.get().then((resp) => resp.data),
    staleTime: Infinity,
  })

export const useCategoryById = (id?: number) =>
  useQuery({
    queryKey: [CATEGORIES_KEY, id],
    queryFn: () => categoriesApi.getById(Number(id)).then((resp) => resp.data),
    enabled: Boolean(id),
  })



export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<IProduct>) => productsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_KEY] })
    },
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<IProduct> }) =>
      productsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_KEY] })
    },
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => productsApi.delete(id),
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: [PRODUCTS_KEY] })

      const previousQueries = queryClient.getQueriesData<{ data: IProduct[]; total: number }>({
        queryKey: [PRODUCTS_KEY],
      })

      queryClient.setQueriesData<{ data: IProduct[]; total: number }>(
        { queryKey: [PRODUCTS_KEY] },
        (old) => {
          if (!old?.data) return old
          return { data: old.data.filter((p) => p.id !== id), total: old.total - 1 }
        },
      )

      return { previousQueries }
    },
    onError: (_err, _id, context) => {
      context?.previousQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_KEY] })
    },
  })
}



export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<ICategory>) => categoriesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_KEY] })
    },
  })
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ICategory> }) =>
      categoriesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_KEY] })
    },
  })
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => categoriesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_KEY] })
    },
  })
}