import { Box, Flex, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { Link } from 'react-router'
import {
  RiFacebookFill,
  RiInstagramFill,
  RiTelegramFill,
  RiYoutubeFill,
  RiMailLine,
  RiPhoneLine,
  RiMapPinLine,
  RiStore2Fill,
} from '@remixicon/react'

const usefulLinks = [
  { title: 'О нас', path: '/about' },
  { title: 'Контакты', path: '/contacts' },
  { title: 'Каталог', path: '/products' },
]

const categories = [
  { title: 'Футболки', path: '/products?category=tshirt' },
  { title: 'Худи', path: '/products?category=tshirt' },
  { title: 'Блокноты', path: '/products?category=notebook' },
  { title: 'Ежедневники', path: '/products?category=notebook' },
]

const socials = [RiFacebookFill, RiInstagramFill, RiTelegramFill, RiYoutubeFill]

export const FooterComponent = () => {
  return (
    <Box bg={'white'} mt={'xl'} style={{ borderTop: '1px solid #e9e9e9' }}>
    
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={'lg'} px={'xl'} py={'xl'} maw={1100} mx={'auto'}>
        <Flex align={'center'} gap={'xs'}>
          <RiStore2Fill size={24} color={'#96033E'} />
          <Text fw={700} size={'lg'}>
            Anor Shop
          </Text>
        </Flex>

        <Flex align={'center'} gap={'xs'}>
          <RiMapPinLine size={18} color={'#96033E'} />
          <Box>
            <Text size={'xs'} c={'dimmed'}>
              Адрес
            </Text>
            <Text size={'sm'} fw={600}>
              Ташкент, ул. Сайрам 5-проезд, 4
            </Text>
          </Box>
        </Flex>

        <Flex align={'center'} gap={'xs'}>
          <RiMailLine size={18} color={'#96033E'} />
          <Box>
            <Text size={'xs'} c={'dimmed'}>
              Email
            </Text>
            <Text size={'sm'} fw={600}>
              shop@anorbank.uz
            </Text>
          </Box>
        </Flex>

        <Flex align={'center'} gap={'xs'}>
          <RiPhoneLine size={18} color={'#96033E'} />
          <Box>
            <Text size={'xs'} c={'dimmed'}>
              Телефон
            </Text>
            <Text size={'sm'} fw={600}>
              +998 78 150 00 00
            </Text>
          </Box>
        </Flex>
      </SimpleGrid>

      
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={'xl'} px={'xl'} py={'lg'} maw={1100} mx={'auto'}>
        <Stack gap={'xs'}>
          <Text fw={700}>Anor Shop</Text>
          <Text size={'sm'} c={'dimmed'}>
            Официальный магазин фирменного мерча Anor Bank — футболки, худи и блокноты.
          </Text>
        </Stack>

        <Stack gap={'xs'}>
          <Title order={5}>Полезные ссылки</Title>
          {usefulLinks.map((link) => (
            <Text
              key={link.path}
              component={Link}
              to={link.path}
              size={'sm'}
              c={'dimmed'}
              style={{ textDecoration: 'none' }}
            >
              {link.title}
            </Text>
          ))}
        </Stack>

        <Stack gap={'xs'}>
          <Title order={5}>Категории</Title>
          {categories.map((cat) => (
            <Text
              key={cat.title}
              component={Link}
              to={cat.path}
              size={'sm'}
              c={'dimmed'}
              style={{ textDecoration: 'none' }}
            >
              {cat.title}
            </Text>
          ))}
        </Stack>

        <Stack gap={'xs'}>
          <Title order={5}>Мы в соцсетях</Title>
          <Flex gap={'sm'}>
            {socials.map((Icon, index) => (
              <Icon key={index} size={20} color={'#96033E'} />
            ))}
          </Flex>
        </Stack>
      </SimpleGrid>

      <Text
        size={'xs'}
        c={'dimmed'}
        ta={'center'}
        py={'md'}
        style={{ borderTop: '1px solid #e9e9e9' }}
      >
        © {new Date().getFullYear()} Anor Bank. Все права защищены.
      </Text>
    </Box>
  )
}