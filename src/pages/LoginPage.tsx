import { Center, Paper, Stack, Text, Title } from '@mantine/core'
import { LoginForm } from '../components/auth/LoginForm.tsx'

export function LoginPage() {
  return (
    <Center h={'100vh'} bg={'gray.0'}>
      <Paper p={'xl'} radius={'md'} withBorder w={360}>
        <Stack gap={4} mb={'lg'}>
          <Title order={2} c={'#96033E'}>
            Anor Shop
          </Title>
          <Text size={'sm'} c={'dimmed'}>
            Войдите, чтобы продолжить
          </Text>
        </Stack>

        <LoginForm />
      </Paper>
    </Center>
  )
}