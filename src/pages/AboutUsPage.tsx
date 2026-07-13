import { Link } from 'react-router'
import { Accordion, Box, Button, Flex, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { RiPlayCircleFill, RiCheckboxCircleFill, RiDoubleQuotesL, RiPhoneFill } from '@remixicon/react'
import { Layout } from '../components/Layout.tsx'

const highlights = [
  {
    title: 'Разнообразие моделей',
    text: 'От базовых футболок до премиальных худи и ежедневников',
  },
  {
    title: 'Быстрая поддержка',
    text: 'Отвечаем на вопросы по заказу в течение часа',
  },
  {
    title: 'Максимум удобства',
    text: 'Оформление заказа занимает меньше двух минут',
  },
  {
    title: 'Гибкие условия',
    text: 'Обмен и возврат в течение 14 дней без лишних вопросов',
  },
]

const stats = [
  { value: '20k+', label: 'Довольных клиентов' },
  { value: '1500+', label: 'Товаров продано' },
  { value: '3+', label: 'Года на рынке' },
]

const missionPoints = [
  'Только оригинальный, лицензированный мерч Anor Bank',
  'Проверенные поставщики тканей и материалов',
  'Прозрачные цены без скрытых наценок',
  'Поддержка сотрудников и партнёров банка',
]

const reviews = [
  {
    name: 'Азиз Каримов',
    company: 'Клиент Anor Bank',
    text: 'Заказал худи — качество приятно удивило. Доставили на следующий день.',
  },
  {
    name: 'Дилноза Юсупова',
    company: 'Сотрудник банка',
    text: 'Блокнот стал моим любимым — плотная бумага, удобный формат, стильная обложка.',
  },
  {
    name: 'Шерзод Ниязов',
    company: 'Постоянный покупатель',
    text: 'Заказываю мерч не первый раз — всегда быстро и без проблем с размером.',
  },
]

const faqItems = [
  {
    question: 'Как оформить заказ?',
    answer: 'Выберите товар в каталоге, укажите размер и количество, нажмите "Добавить в корзину" и оформите заказ.',
  },
  {
    question: 'Сколько занимает доставка?',
    answer: 'Доставка по Ташкенту занимает 1-2 дня, по остальным регионам Узбекистана — 2-3 дня.',
  },
  {
    question: 'Можно ли вернуть товар?',
    answer: 'Да, в течение 14 дней с момента получения, если товар не был в использовании и сохранена упаковка.',
  },
  {
    question: 'Есть ли скидки для сотрудников банка?',
    answer: 'Да, сотрудники Anor Bank получают специальные условия — уточняйте у HR-отдела.',
  },
]

export function AboutUsPage() {
  return (
    <Layout>
      <Stack p={'xl'} maw={1100} mx={'auto'} gap={'xl'}>
        <Flex gap={4}>
          <Text component={Link} to={'/'} size={'sm'} c={'dimmed'} style={{ textDecoration: 'none' }}>
            Home
          </Text>
          <Text size={'sm'} c={'dimmed'}>
            /
          </Text>
          <Text size={'sm'} c={'dark'}>
            About Us
          </Text>
        </Flex>

        <Flex gap={'xl'} wrap={'wrap'} justify={'space-between'}>
          <Title order={1} maw={350}>
            Стиль, который говорит за вас
          </Title>

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={'xl'} flex={1} miw={280}>
            {highlights.map((item) => (
              <Box key={item.title}>
                <Text fw={700} mb={4}>
                  {item.title}
                </Text>
                <Text size={'sm'} c={'dimmed'}>
                  {item.text}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Flex>

        <Flex align={'center'} justify={'center'} h={320} bg={'#96033E'} style={{ borderRadius: 16 }}>
          <RiPlayCircleFill size={70} color={'white'} style={{ cursor: 'pointer' }} />
        </Flex>

        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={'xl'}>
          {stats.map((stat) => (
            <Box key={stat.label}>
              <Title order={2} c={'#96033E'}>
                {stat.value}
              </Title>
              <Text c={'dimmed'}>{stat.label}</Text>
            </Box>
          ))}
        </SimpleGrid>

        <Flex gap={'xl'} wrap={'wrap'} align={'center'}>
          <Stack flex={1} miw={280} gap={'md'}>
            <Title order={2}>Наша миссия</Title>
            <Text c={'dimmed'}>
              Мы делаем фирменный мерч Anor Bank доступным и качественным —
              чтобы каждый мог с гордостью носить бренд, которому доверяет.
            </Text>

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={'sm'}>
              {missionPoints.map((point) => (
                <Flex key={point} align={'flex-start'} gap={'xs'}>
                  <RiCheckboxCircleFill size={18} color={'#96033E'} style={{ flexShrink: 0, marginTop: 2 }} />
                  <Text size={'sm'}>{point}</Text>
                </Flex>
              ))}
            </SimpleGrid>
          </Stack>

          <Box w={{ base: '100%', sm: 320 }} h={280} bg={'#3d3d3d'} style={{ borderRadius: 16 }} />
        </Flex>

        <Box>
          <Title order={2} mb={'lg'} ta={'center'}>
            Отзывы наших клиентов
          </Title>

          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={'lg'}>
            {reviews.map((review) => (
              <Box key={review.name} p={'lg'} style={{ border: '1px solid #e9e9e9', borderRadius: 12 }}>
                <RiDoubleQuotesL size={24} color={'#96033E'} />
                <Text size={'sm'} mt={'sm'} mb={'md'}>
                  {review.text}
                </Text>
                <Text fw={700} size={'sm'}>
                  {review.name}
                </Text>
                <Text size={'xs'} c={'dimmed'}>
                  {review.company}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        <Box>
          <Title order={2} mb={'lg'}>
            Частые вопросы
          </Title>

          <Accordion variant={'separated'}>
            {faqItems.map((item, index) => (
              <Accordion.Item key={item.question} value={`item-${index}`}>
                <Accordion.Control>{item.question}</Accordion.Control>
                <Accordion.Panel>{item.answer}</Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Box>

        <Box bg={'#96033E'} p={'xl'} style={{ borderRadius: 24 }}>
          <Stack gap={'sm'} maw={500}>
            <Title order={2} c={'white'}>
              Остались вопросы?
            </Title>
            <Flex align={'center'} gap={'xs'}>
              <RiPhoneFill size={20} color={'white'} />
              <Text c={'white'} fw={700} size={'lg'}>
                +998 78 150 00 00
              </Text>
            </Flex>
            <Text c={'gray.3'} size={'sm'}>
              Свяжитесь с нами по телефону или через форму на странице контактов.
            </Text>
            <Button component={Link} to={'/contacts'} color={'orange'} w={'fit-content'}>
              Написать нам
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Layout>
  )
}