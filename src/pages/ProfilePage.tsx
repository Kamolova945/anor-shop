import { Avatar, Box, Button, Stack, Text, Title } from '@mantine/core'
import { Layout } from '../components/Layout.tsx'
import { useProfile } from '../hooks/useProfile.ts'
import { useLogout } from '../hooks/useLogout.ts'

export function ProfilePage() {
  const { data: user } = useProfile()
  const logout = useLogout()

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

          <Button color={'red'} variant={'light'} mt={'md'} onClick={logout}>
            Выйти
          </Button>
        </Stack>
      </Box>
    </Layout>
  )
}