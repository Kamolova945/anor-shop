import { useState } from 'react'
import { Button, Flex, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { Layout } from '../components/Layout.tsx'
import { ProductCard } from '../components/ProductCard.tsx'
import { products } from '../constants/products.ts'
import type { ProductCategory } from '../types/products.ts'


type FilterValue = ProductCategory | 'all'

export function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('all')

  
  const filteredProducts =
    activeFilter === 'all' ? products : products.filter((p) => p.category === activeFilter)

  return (
    <Layout>
      <Stack p={'xl'}>
        <Title>Каталог товаров</Title>

        <Flex gap={'sm'} wrap={'wrap'}>
          <Button
            onClick={() => setActiveFilter('all')}
            variant={activeFilter === 'all' ? 'filled' : 'light'}
            color={'red'}
          >
            Все товары
          </Button>
          <Button
            onClick={() => setActiveFilter('tshirt')}
            variant={activeFilter === 'tshirt' ? 'filled' : 'light'}
            color={'red'}
          >
            Одежда
          </Button>
          <Button
            onClick={() => setActiveFilter('notebook')}
            variant={activeFilter === 'notebook' ? 'filled' : 'light'}
            color={'red'}
          >
            Блокноты
          </Button>
        </Flex>

        {filteredProducts.length === 0 ? (
          <Text c={'dimmed'}>Товары в этой категории не найдены.</Text>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={'lg'}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </Layout>
  )
}