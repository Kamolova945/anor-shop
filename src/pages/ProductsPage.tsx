import {
  Alert,
  Box,
  Center,
  Loader,
  Pagination,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { Layout } from '../components/Layout.tsx'
import { ProductCard } from '../components/ProductCard.tsx'
import { ProductFilter } from '../components/ProductFilter.tsx'
import { useProducts } from '../hooks/useProducts.ts'
import { useSearchRequestParams } from '../hooks/useSearchRequestParms.ts'
import type { TProductParams } from '../types/products.ts'

const PAGE_SIZE = 6

export function ProductsPage() {
  const { getDefaultSearchParams, setSearchParams } = useSearchRequestParams<TProductParams>({
    defaultParams: { page: '1', size: String(PAGE_SIZE) },
  })

  const params = getDefaultSearchParams()

  const { data, isLoading, isError, error } = useProducts(params)

  const products = data?.data ?? []
  const totalPages = Math.ceil((data?.total ?? 0) / PAGE_SIZE)

  return (
    <Layout>
      <Box p={'xl'}>
        <Stack gap={40} align={'center'}>
          <Title order={2}>Каталог</Title>

          <ProductFilter />

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
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing={'xl'} w={'100%'}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </SimpleGrid>
          )}

          {totalPages > 1 && (
            <Pagination
              radius={'xl'}
              total={totalPages}
              value={Number(params.page ?? 1)}
              onChange={(page) => setSearchParams({ key: 'page', value: page })}
              color={'red'}
            />
          )}
        </Stack>
      </Box>
    </Layout>
  )
}