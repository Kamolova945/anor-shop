import { Box, Text, Title } from '@mantine/core'
import { Layout } from '../components/Layout.tsx'

export function AdminPage() {
  return (
    <Layout>
      <Box maw={600} mx={'auto'} p={'xl'}>
        <Title order={2} mb={'md'}>
          Admin
        </Title>
        <Text c={'dimmed'}>
          Эта страница видна только пользователям с ролью admin. Проверка идёт на фронте
          по полю role из /auth/profile — это защита интерфейса, а не данных.
        </Text>
      </Box>
    </Layout>
  )
}