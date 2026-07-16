import { Link, useParams } from 'react-router'
import { Box, Button, Center, Loader, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { RiArrowLeftLine } from '@remixicon/react'
import { Layout } from '../components/Layout.tsx'
import { useProductById, useProducts } from '../hooks/useProducts.ts'
import { ProductCard } from '../components/ProductCard.tsx'

export function DetailsPage() {
  const { id } = useParams()
  const { data: product, isLoading, isError } = useProductById(id)
  const { data: otherData } = useProducts()

  if (isLoading) {
    return (
      <Layout>
        <Center h={300}>
          <Loader color={'red'} />
        </Center>
      </Layout>
    )
  }

  if (isError || !product) {
    return (
      <Layout>
        <Stack p={'xl'} align={'center'}>
          <Title order={3}>Товар не найден</Title>
          <Button component={Link} to={'/products'} color={'red'}>
            Вернуться в каталог
          </Button>
        </Stack>
      </Layout>
    )
  }

  const otherProducts = (otherData?.data ?? []).filter((p) => p.id !== product.id).slice(0, 4)

  return (
    <Layout>
      <Stack p={'xl'} maw={1100} mx={'auto'} gap={'xl'}>
        <Button
          component={Link}
          to={'/products'}
          variant={'subtle'}
          color={'gray'}
          leftSection={<RiArrowLeftLine size={16} />}
          w={'fit-content'}
        >
          Назад в каталог
        </Button>

        <Stack gap={'md'} maw={500}>
          <img
            src={product.images?.[0]}
            alt={product.title}
            style={{ width: '100%', height: 320, objectFit: 'cover', borderRadius: 16 }}
          />
          <Title order={2}>{product.title}</Title>
          <Text size={'xl'} fw={700} c={'red'}>
            ${product.price}
          </Text>
          <Text c={'dimmed'}>{product.description}</Text>
          <Button color={'red'} size={'md'} w={'fit-content'}>
            Добавить в корзину
          </Button>
        </Stack>

        <Box>
          <Title order={3} mb={'md'}>
            Похожие товары
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={'lg'}>
            {otherProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </SimpleGrid>
        </Box>
      </Stack>
    </Layout>
  )
}