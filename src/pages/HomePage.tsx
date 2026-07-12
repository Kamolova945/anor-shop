import { useState } from 'react'
import { Box, Button, Flex, Select, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { Link } from 'react-router'
import { RiShieldCheckLine, RiTruckLine, RiPaletteLine,RiStore2Fill  } from '@remixicon/react'
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

const whyChooseUs = [
  {
    title: 'Официальный мерч Anor Bank',
    text: 'Только оригинальная продукция с фирменным логотипом банка',
  },
  {
    title: 'Стильный, сдержанный дизайн',
    text: 'Минимализм и качество, которые уместны в любой обстановке',
  },
  {
    title: 'Комфортные материалы',
    text: 'Плотный хлопок и качественная бумага — приятно носить и использовать',
  },
  {
    title: 'Выгодные цены для сотрудников',
    text: 'Специальные условия для команды и партнёров банка',
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
        <Flex p={'xl'} gap={'xl'} wrap={'wrap'} align={'center'} maw={1000} mx={'auto'}>
  <Flex
    w={{ base: '100%', sm: 400 }}
    h={320}
    bg={'#96033E'}
    align={'center'}
    justify={'center'}
    style={{ borderRadius: 16 }}
  >
    <RiStore2Fill size={80} color={'white'} />
  </Flex>

  <Stack flex={1} miw={280} gap={'md'}>
    <Title order={2}>Почему выбирают наш мерч</Title>

    {whyChooseUs.map((item, index) => (
      <Flex key={item.title} gap={'sm'} align={'flex-start'}>
        <Flex
          w={28}
          h={28}
          bg={'#96033E'}
          c={'white'}
          align={'center'}
          justify={'center'}
          style={{ borderRadius: '50%', flexShrink: 0 }}
          fw={700}
        >
          {index + 1}
        </Flex>
        <Box>
          <Text fw={700}>{item.title}</Text>
          <Text size={'sm'} c={'dimmed'}>
            {item.text}
          </Text>
        </Box>
      </Flex>
    ))}
  </Stack>
</Flex>
      
      <Box p={'xl'} maw={1000} mx={'auto'}>
  <Title order={2} mb={'lg'} ta={'center'}>
    Популярные товары
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