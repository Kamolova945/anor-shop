import { useState } from 'react'
import { Box, Button, Flex, Select, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { Link } from 'react-router'
import { RiShieldCheckLine, RiTruckLine, RiPaletteLine } from '@remixicon/react'
import { Layout } from '../components/Layout.tsx'
import { ProductCard } from '../components/ProductCard.tsx'
import { products } from '../constants/products.ts'


const features = [
  {
    icon: RiTruckLine,
    title: 'Быстрая доставка',
    text: 'Доставим заказ по всему Узбекистану за 1-3 дня',
  },
  {
    icon: RiPaletteLine,
    title: 'Оригинальный дизайн',
    text: 'Эксклюзивные принты, которых нет больше нигде',
  },
  {
    icon: RiShieldCheckLine,
    title: 'Гарантия качества',
    text: 'Проверенные материалы и плотная печать логотипа',
  },
]

export function HomePage() {
  const [category, setCategory] = useState<string | null>(null)
  const [size, setSize] = useState<string | null>(null)
  const [color, setColor] = useState<string | null>(null)
  const [quantity, setQuantity] = useState<string | null>(null)

  return (
    <Layout>
    
      <Box
        bg={'#96033E'}
        m={'xl'}
        p={'xl'}
        style={{ borderRadius: 24, position: 'relative', overflow: 'hidden' }}
      >
        <Flex justify={'space-between'} align={'center'} gap={'xl'} wrap={'wrap'}>
          <Stack maw={500} gap={'md'}>
            <Title order={1} c={'white'} fz={42}>
              Стиль, который узнают в лицо
            </Title>
            <Text c={'gray.3'}>
              Футболки, худи и блокноты с фирменным логотипом Anor Bank.
              Качественные материалы, узнаваемый дизайн — для тех, кто ценит бренд.
            </Text>
            <Button component={Link} to={'/products'} color={'orange'} w={'fit-content'} size={'md'}>
              Смотреть каталог
            </Button>
          </Stack>

          <Box bg={'white'} p={'xl'} style={{ borderRadius: 16 }} w={280}>
            <Title order={3} mb={'md'}>
              Быстрый заказ
            </Title>

            <Stack gap={'sm'}>
              <Select
                placeholder={'Категория'}
                data={['Футболки', 'Худи', 'Блокноты']}
                value={category}
                onChange={setCategory}
              />
              <Select
                placeholder={'Размер'}
                data={['S', 'M', 'L', 'XL']}
                value={size}
                onChange={setSize}
              />
              <Select
                placeholder={'Цвет'}
                data={['Чёрный', 'Белый', 'Красный']}
                value={color}
                onChange={setColor}
              />
              <Select
                placeholder={'Количество'}
                data={['1', '2', '3', '4', '5']}
                value={quantity}
                onChange={setQuantity}
              />

              <Button component={Link} to={'/products'} color={'orange'} fullWidth mt={'sm'}>
                Заказать
              </Button>
            </Stack>
          </Box>
        </Flex>
      </Box>

      
      <Flex justify={'center'} gap={'xl'} p={'xl'} wrap={'wrap'}>
        {features.map((feature) => {
          const Icon = feature.icon

          return (
            <Stack key={feature.title} align={'center'} ta={'center'} maw={250}>
              <Icon size={36} color={'#96033E'} />
              <Text fw={700}>{feature.title}</Text>
              <Text size={'sm'} c={'black'}>
                {feature.text}
              </Text>
            </Stack>
          )
        })}
      </Flex>

      
      <Box p={'xl'} maw={1000} mx={'auto'}>
  <Title order={2} mb={'lg'} ta={'center'}>
    Почему выбирают наш мерч
  </Title>

  <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={'lg'}>
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </SimpleGrid>
</Box>
    </Layout>
  )
}