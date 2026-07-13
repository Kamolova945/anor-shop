import { useState } from 'react'
import { Link } from 'react-router'
import { Box, Button, Flex, SimpleGrid, Stack, Text, Textarea, TextInput, Title } from '@mantine/core'
import { RiMailLine, RiMapPinLine, RiPhoneLine, RiTimeLine } from '@remixicon/react'
import { Layout } from '../components/Layout.tsx'

const contactInfo = [
  { icon: RiMapPinLine, label: 'Адрес', value: 'Ташкент, ул. Сайрам 5-проезд, 4' },
  { icon: RiMailLine, label: 'Email', value: 'shop@anorbank.uz' },
  { icon: RiPhoneLine, label: 'Телефон', value: '+998 78 150 00 00' },
  { icon: RiTimeLine, label: 'Часы работы', value: 'Пн-Пт: 9:00 - 18:00' },
]

export function ContactUsPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    if (!name || !email || !message) {
      alert('Заполните все поля')
      return
    }

    alert('Спасибо! Мы свяжемся с вами в ближайшее время')
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <Layout>
      <Stack p={'xl'} maw={1100} mx={'auto'} gap={'xl'}>
        <Box>
          <Title order={1}>Contact Us</Title>
          <Flex gap={4} mt={4}>
            <Text component={Link} to={'/'} size={'sm'} c={'dimmed'} style={{ textDecoration: 'none' }}>
              Home
            </Text>
            <Text size={'sm'} c={'dimmed'}>
              /
            </Text>
            <Text size={'sm'} c={'dark'}>
              Contact Us
            </Text>
          </Flex>
        </Box>

        <Flex gap={'xl'} wrap={'wrap'}>
          <Box bg={'#96033E'} p={'xl'} style={{ borderRadius: 16 }} w={{ base: '100%', sm: 380 }}>
            <Title order={3} c={'white'} mb={'md'}>
              Напишите нам
            </Title>

            <Stack gap={'sm'}>
              <TextInput
                placeholder={'Ваше имя'}
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
              <TextInput
                placeholder={'Email'}
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
              <Textarea
                placeholder={'Сообщение'}
                minRows={4}
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)}
              />

              <Button onClick={handleSubmit} color={'orange'} fullWidth>
                Отправить
              </Button>
            </Stack>
          </Box>

          <Box flex={1} miw={280} h={400} bg={'#3d3d3d'} style={{ borderRadius: 16 }} />
        </Flex>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={'lg'}>
          {contactInfo.map((item) => {
            const Icon = item.icon

            return (
              <Flex key={item.label} align={'center'} gap={'sm'}>
                <Flex
                  align={'center'}
                  justify={'center'}
                  w={44}
                  h={44}
                  bg={'orange'}
                  style={{ borderRadius: '50%', flexShrink: 0 }}
                >
                  <Icon size={20} color={'white'} />
                </Flex>
                <Box>
                  <Text size={'xs'} c={'dimmed'}>
                    {item.label}
                  </Text>
                  <Text size={'sm'} fw={600}>
                    {item.value}
                  </Text>
                </Box>
              </Flex>
            )
          })}
        </SimpleGrid>
      </Stack>
    </Layout>
  )
}