import { Anchor, Center, Paper, Stack, Text, Title } from '@mantine/core'
import { Link } from 'react-router'
import { RegisterForm } from '../components/auth/RegisterForm.tsx'

export function RegisterPage() {
  return (
    <Center h={'100vh'} bg={'gray.0'}>
      <Paper p={'xl'} radius={'md'} withBorder w={360}>
        <Stack gap={4} mb={'lg'}>
          <Title order={2} c={'#96033E'}>
            Anor Shop
          </Title>
          <Text size={'sm'} c={'dimmed'}>
            Создайте аккаунт
          </Text>
        </Stack>

        <RegisterForm />

        <Text size={'sm'} c={'dimmed'} mt={'md'} ta={'center'}>
          Уже есть аккаунт?{' '}
          <Anchor component={Link} to={'/login'} c={'#96033E'}>
            Войти
          </Anchor>
        </Text>
      </Paper>
    </Center>
  )
}