import { Avatar, Badge, Box, Button, Stack, Text, Title } from '@mantine/core'
import { Layout } from '../components/Layout.tsx'
import { useProfile } from '../hooks/useProfile.ts'
import { useLogout } from '../hooks/useLogout.ts'
import { useTokenCountdown } from '../hooks/useTokenCountdown.ts'

export function ProfilePage() {
  const { data: user } = useProfile()
  const logout = useLogout()
  const secondsLeft = useTokenCountdown()

  const minutes = secondsLeft !== null ? Math.floor(secondsLeft / 60) : 0
  const seconds = secondsLeft !== null ? secondsLeft % 60 : 0

  return (
    <Layout>
      <Box maw={400} mx={'auto'} p={'xl'}>
        <Title order={2} mb={'lg'}>
          Профиль
        </Title>

        <Stack align={'center'} gap={'sm'}>
          <Avatar src={user?.avatar} size={96} radius={'50%'} />
          <Text fw={700}>{user?.name}</Text>
          <Text c={'dimmed'}>{user?.email}</Text>
          <Text size={'sm'} c={'dimmed'}>
            Роль: {user?.role}
          </Text>

          {secondsLeft !== null && (
            <Badge color={secondsLeft < 20 ? 'red' : 'gray'} size={'lg'} variant={'light'}>
              Токен истечёт через {minutes}:{String(seconds).padStart(2, '0')}
            </Badge>
          )}

          <Button color={'red'} variant={'light'} mt={'md'} onClick={logout}>
            Выйти
          </Button>
        </Stack>
      </Box>
    </Layout>
  )
}