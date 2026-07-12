import { useState } from 'react'
import { Box, Button, Flex, Select, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { Link } from 'react-router'
import {RiShieldCheckLine, RiTruckLine, RiPaletteLine,RiStore2Fill,RiShoppingBagFill,RiTeamFill,RiAwardFill,RiMapPinFill,RiAppleFill,RiGooglePlayFill} from '@remixicon/react'
import { Layout } from '../components/Layout.tsx'
import { ProductCard } from '../components/ProductCard.tsx'
import { products } from '../constants/products.ts'
import phoneImage from '../assets/Component 1.png'

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

const stats = [
  { icon: RiShoppingBagFill, value: '1500+', label: 'Товаров продано' },
  { icon: RiTeamFill, value: '800+', label: 'Довольных клиентов' },
  { icon: RiAwardFill, value: '3+', label: 'Года на рынке' },
  { icon: RiMapPinFill, value: '14', label: 'Регионов доставки' },
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

     
      <Box bg={'#96033E'} m={'xl'} p={'xl'} style={{ borderRadius: 24, minHeight: 320 }}>
         <Title order={2} c={'white'} ta={'center'} mb={'xs'}>
  Anor Shop в цифрах
</Title>
<Text c={'gray.3'} ta={'center'} maw={500} mx={'auto'} mb={'xl'}>
  Мы гордимся тем, что делаем для наших клиентов — вот немного статистики о нашем магазине мерча
</Text>

        <Flex justify={'center'} gap={'lg'} wrap={'wrap'}>
          {stats.map((stat) => {
            const Icon = stat.icon

            return (
              <Flex
                key={stat.label}
                bg={'white'}
                p={'md'}
                gap={'sm'}
                align={'center'}
                style={{ borderRadius: 12 }}
                miw={200}
              >
                <Flex
                  w={44}
                  h={44}
                  bg={'orange'}
                  align={'center'}
                  justify={'center'}
                  style={{ borderRadius: '50%', flexShrink: 0 }}
                >
                  <Icon size={22} color={'white'} />
                </Flex>
                <Box>
                  <Text fw={700} size={'lg'}>
                    {stat.value}
                  </Text>
                  <Text size={'sm'} c={'dimmed'}>
                    {stat.label}
                  </Text>
                </Box>
              </Flex>
            )
          })}
        </Flex>
      </Box>

      <Flex
        justify={'space-between'}
        align={'center'}
        gap={'xl'}
        p={'xl'}
        wrap={'wrap'}
        maw={1000}
        mx={'auto'}
      >
        <Stack maw={450} gap={'md'}>
          <Title order={2}>Скачайте приложение Anor Bank</Title>
          <Text c={'dimmed'}>
            Следите за статусом заказа, получайте персональные скидки на мерч
            и управляйте картой — всё в одном приложении.
          </Text>

          <Flex gap={'sm'}>
            <Flex
              align={'center'}
              gap={'xs'}
              bg={'black'}
              c={'white'}
              px={'md'}
              py={'xs'}
              style={{ borderRadius: 8 }}
            >
              <RiAppleFill size={20} />
              <Text size={'sm'}>App Store</Text>
            </Flex>
            <Flex
              align={'center'}
              gap={'xs'}
              bg={'black'}
              c={'white'}
              px={'md'}
              py={'xs'}
              style={{ borderRadius: 8 }}
            >
              <RiGooglePlayFill size={20} />
              <Text size={'sm'}>Google Play</Text>
            </Flex>
          </Flex>
        </Stack>

        <img src={phoneImage} alt={'Приложение Anor Bank'} width={220} style={{ borderRadius: 24 }} />
      </Flex>
    </Layout>
  )
}