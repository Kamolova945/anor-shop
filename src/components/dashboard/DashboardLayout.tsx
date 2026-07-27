import type { ReactNode } from 'react'
import { ActionIcon, Avatar, Box, Flex, NavLink, Text } from '@mantine/core'
import { Link, useLocation } from 'react-router'
import { RiDashboardLine, RiShoppingBagLine, RiPriceTag3Line, RiLogoutBoxRLine } from '@remixicon/react'
import { useProfile } from '../../hooks/useProfile.ts'
import { useLogout } from '../../hooks/useLogout.ts'

const navItems = [
  { path: '/dashboard', label: 'Главная', icon: RiDashboardLine },
  { path: '/dashboard/products', label: 'Товары', icon: RiShoppingBagLine },
  { path: '/dashboard/categories', label: 'Категории', icon: RiPriceTag3Line },
]

interface DashboardLayoutProps {
  children: ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation()
  const { data: user } = useProfile()
  const logout = useLogout()

  return (
    <Flex h={'100vh'}>
      <Box w={240} bg={'#1A1B1E'} p={'md'}>
        <Text fw={700} size={'lg'} c={'white'} mb={'xl'} pl={'sm'}>
          Anor Admin
        </Text>

        {navItems.map((item) => (
          <NavLink
            key={item.path}
            component={Link}
            to={item.path}
            label={item.label}
            leftSection={<item.icon size={18} />}
            active={location.pathname === item.path}
            variant={'filled'}
            color={'red'}
            mb={4}
            styles={{ label: { color: location.pathname === item.path ? 'white' : '#C1C2C5' } }}
          />
        ))}
      </Box>

      <Box flex={1} style={{ overflowY: 'auto' }}>
        <Flex justify={'flex-end'} align={'center'} gap={'sm'} p={'md'} bg={'white'}>
          <Avatar src={user?.avatar} radius={'50%'} color={'red'} size={'sm'}>
            {user?.name?.[0]}
          </Avatar>
          <Text size={'sm'} fw={500}>
            {user?.name}
          </Text>
          <ActionIcon variant={'light'} color={'red'} radius={'xl'} onClick={logout}>
            <RiLogoutBoxRLine size={16} />
          </ActionIcon>
        </Flex>

        <Box p={'xl'}>{children}</Box>
      </Box>
    </Flex>
  )
}