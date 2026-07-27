import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Alert, Box, Button, Center, Flex, Loader, Pagination, Select, Text, TextInput, Title } from '@mantine/core'
import { RiAddLine, RiSearchLine } from '@remixicon/react'
import { DashboardLayout } from '../../components/dashboard/DashboardLayout.tsx'
import { ProductsTable } from '../../components/dashboard/ProductsTable.tsx'
import { ProductFormModal } from '../../components/dashboard/ProductFormModal.tsx'
import { ConfirmDeleteModal } from '../../components/dashboard/ConfirmDeleteModal.tsx'
import { productsApi } from '../../api/products.ts'
import { PRODUCTS_KEY, useCategories, useDeleteProduct, useProducts } from '../../hooks/useProducts.ts'
import { useSearchRequestParams } from '../../hooks/useSearchRequestParms.ts'
import type { IProduct, TProductParams } from '../../types/products.ts'

const PAGE_SIZE = 8

type TDashboardProductParams = TProductParams & { sort?: string }

export function DashboardProductsPage() {
  const { getDefaultSearchParams, setSearchParams } = useSearchRequestParams<TDashboardProductParams>({
    defaultParams: { page: '1', size: String(PAGE_SIZE) },
  })

  const params = getDefaultSearchParams()

  const { data, isLoading, isError, error } = useProducts(params)
  const { data: categories } = useCategories()
  const queryClient = useQueryClient()

  const [formOpened, setFormOpened] = useState(false)
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null)

  const [deleteOpened, setDeleteOpened] = useState(false)
  const [productToDelete, setProductToDelete] = useState<IProduct | null>(null)

  const deleteProduct = useDeleteProduct()

  const products = data?.data ?? []
  const totalPages = Math.ceil((data?.total ?? 0) / PAGE_SIZE)

  const openCreateForm = () => {
    setEditingProduct(null)
    setFormOpened(true)
  }

  const openEditForm = (product: IProduct) => {
    setEditingProduct(product)
    setFormOpened(true)
  }

  const openDeleteModal = (product: IProduct) => {
    setProductToDelete(product)
    setDeleteOpened(true)
  }

  const confirmDelete = () => {
    if (!productToDelete) return
    deleteProduct.mutate(productToDelete.id, {
      onSuccess: () => setDeleteOpened(false),
    })
  }

  const prefetchProduct = (product: IProduct) => {
    queryClient.prefetchQuery({
      queryKey: [PRODUCTS_KEY, String(product.id)],
      queryFn: () => productsApi.getById(product.id).then((resp) => resp.data),
    })
  }

  return (
    <DashboardLayout>
      <Flex justify={'space-between'} align={'center'} mb={'lg'}>
        <Title order={2}>Товары</Title>
        <Button leftSection={<RiAddLine size={16} />} color={'red'} onClick={openCreateForm}>
          Добавить товар
        </Button>
      </Flex>

      <Flex gap={'md'} mb={'lg'} wrap={'wrap'}>
        <TextInput
          placeholder={'Поиск по названию'}
          leftSection={<RiSearchLine size={16} />}
          defaultValue={params.search ?? ''}
          onChange={(e) => setSearchParams({ key: 'search', value: e.currentTarget.value })}
          w={220}
        />

        <Select
          placeholder={'Все категории'}
          data={categories?.map((c) => ({ value: String(c.id), label: c.name })) ?? []}
          value={params.categoryId ?? null}
          onChange={(value) => setSearchParams({ key: 'categoryId', value: value ?? '' })}
          clearable
          w={200}
        />

        <Select
          placeholder={'Сортировка'}
          data={[
            { value: 'price_asc', label: 'Цена: по возрастанию' },
            { value: 'price_desc', label: 'Цена: по убыванию' },
          ]}
          value={params.sort ?? null}
          onChange={(value) => setSearchParams({ key: 'sort', value: value ?? '' })}
          clearable
          w={220}
        />
      </Flex>

      {isLoading ? (
        <Center h={200}>
          <Loader color={'red'} />
        </Center>
      ) : isError ? (
        <Alert color={'red'} title={'Не удалось загрузить товары'}>
          {error.message}
        </Alert>
      ) : products.length === 0 ? (
        <Text c={'dimmed'}>Ничего не найдено</Text>
      ) : (
        <ProductsTable
          products={products}
          onEdit={openEditForm}
          onDelete={openDeleteModal}
          onRowHover={prefetchProduct}
        />
      )}

      {totalPages > 1 && (
        <Box mt={'lg'}>
          <Pagination
            total={totalPages}
            value={Number(params.page ?? 1)}
            onChange={(page) => setSearchParams({ key: 'page', value: page })}
            color={'red'}
          />
        </Box>
      )}

      <ProductFormModal
        opened={formOpened}
        onClose={() => setFormOpened(false)}
        product={editingProduct}
      />

      <ConfirmDeleteModal
        opened={deleteOpened}
        onClose={() => setDeleteOpened(false)}
        onConfirm={confirmDelete}
        title={productToDelete?.title ?? ''}
        isPending={deleteProduct.isPending}
      />
    </DashboardLayout>
  )
}