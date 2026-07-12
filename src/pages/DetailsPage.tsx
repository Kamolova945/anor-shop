import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { Box, Button, Flex, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import {
  RiArrowLeftLine,
  RiSubtractLine,
  RiAddLine,
  RiTShirtLine,
  RiDropLine,
  RiRulerLine,
  RiScales3Line,
  RiPaletteLine,
  RiHandHeartLine,
  RiCheckboxCircleFill,
} from '@remixicon/react'
import { Layout } from '../components/Layout.tsx'
import { ProductCard } from '../components/ProductCard.tsx'
import { products } from '../constants/products.ts'


const features = [
  'Оригинальная упаковка Anor Bank',
  'Бирка с логотипом',
  'Сертификат подлинности',
  'Инструкция по уходу',
  'Возможность обмена в течение 14 дней',
  'Бесплатная доставка от 200 000 сум',
]

export function DetailsPage() {
  const { id } = useParams()
  const product = products.find((p) => p.id === Number(id))

  const [quantity, setQuantity] = useState(1)

  if (!product) {
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

  
  const specs = [
    { icon: RiTShirtLine, label: 'Категория', value: product.category === 'tshirt' ? 'Одежда' : 'Блокноты' },
    { icon: RiDropLine, label: 'Материал', value: product.material },
    { icon: RiRulerLine, label: 'Размеры', value: product.sizes },
    { icon: RiScales3Line, label: 'Вес', value: product.weight },
    { icon: RiPaletteLine, label: 'Цвет', value: product.color },
    { icon: RiHandHeartLine, label: 'Уход', value: 'Ручная стирка' },
  ]

  
  const otherProducts = products.filter((p) => p.id !== product.id).slice(0, 4)

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

        <Flex gap={'xl'} wrap={'wrap'} align={'flex-start'}>
          
          <Box w={{ base: '100%', sm: 400 }}>
            <Title order={2}>{product.title}</Title>
            <Text size={'xl'} fw={700} c={'red'} mb={'md'}>
              {product.price.toLocaleString('ru-RU')} сум
            </Text>

            <Box h={320} bg={product.imageColor} style={{ borderRadius: 16 }} />

            
            <Flex gap={'sm'} mt={'sm'}>
              <Box w={70} h={70} bg={product.imageColor} style={{ borderRadius: 8, opacity: 0.6 }} />
              <Box w={70} h={70} bg={product.imageColor} style={{ borderRadius: 8, opacity: 0.8 }} />
              <Box w={70} h={70} bg={product.imageColor} style={{ borderRadius: 8 }} />
            </Flex>
          </Box>

          
          <Stack flex={1} miw={280} gap={'lg'}>
            <Box>
              <Title order={4} mb={'sm'}>
                Информация о товаре
              </Title>

              <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={'sm'}>
                {specs.map((spec) => {
                  const Icon = spec.icon

                  return (
                    <Box key={spec.label} p={'sm'} style={{ border: '1px solid #e9e9e9', borderRadius: 8 }}>
                      <Icon size={20} color={'#96033E'} />
                      <Text size={'xs'} c={'dimmed'} mt={4}>
                        {spec.label}
                      </Text>
                      <Text size={'sm'} fw={600}>
                        {spec.value}
                      </Text>
                    </Box>
                  )
                })}
              </SimpleGrid>
            </Box>

            <Flex align={'center'} gap={'md'}>
              <Button
                variant={'light'}
                color={'gray'}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <RiSubtractLine size={16} />
              </Button>
              <Text fw={600}>{quantity}</Text>
              <Button variant={'light'} color={'gray'} onClick={() => setQuantity((q) => q + 1)}>
                <RiAddLine size={16} />
              </Button>
            </Flex>

            <Button color={'red'} size={'md'} w={'fit-content'}>
              Добавить в корзину
            </Button>

            
            <Box>
              <Title order={4} mb={'sm'}>
                Что входит
              </Title>

              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={'xs'}>
                {features.map((feature) => (
                  <Flex key={feature} align={'center'} gap={'xs'}>
                    <RiCheckboxCircleFill size={16} color={'#96033E'} />
                    <Text size={'sm'}>{feature}</Text>
                  </Flex>
                ))}
              </SimpleGrid>
            </Box>
          </Stack>
        </Flex>

        
        <Box>
          <Flex justify={'space-between'} align={'center'} mb={'md'}>
            <Title order={3}>Похожие товары</Title>
            <Text component={Link} to={'/products'} size={'sm'} c={'red'} style={{ textDecoration: 'none' }}>
              Смотреть все →
            </Text>
          </Flex>

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