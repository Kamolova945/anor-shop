import { Box, Flex, Text } from '@mantine/core'
import { Link, useLocation } from 'react-router'
import { RiPhoneFill, RiStore2Fill } from '@remixicon/react'
import { menuLinks } from '../constants/menuLinks.ts'

export const HeaderComponent = () => {
  const location = useLocation()

  return (
    <Box bg={'white'} py={'md'} px={'xl'}>
      <Flex justify={'space-between'} align={'center'}>
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <Flex align={'center'} gap={'xs'}>
            <RiStore2Fill size={28} color={'#96033E'} />
            <Text fw={700} size={'xl'} c={'#96033E'}>
              Anor Shop
            </Text>
          </Flex>
        </Link>

       
        <Flex gap={'lg'}>
          {menuLinks.map((item) => {
            const isActive = location.pathname === item.path

            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  textDecoration: 'none',
                  color: isActive ? '#000000' : '#BFBFBF',
                  fontWeight: isActive ? 700 : 400,
                }}
              >
                {item.title}
              </Link>
            )
          })}
        </Flex>

        
        <Flex align={'center'} gap={'sm'}>
          <Flex
            align={'center'}
            justify={'center'}
            w={44}
            h={44}
            bg={'#96033E'}
            style={{ borderRadius: '50%' }}
          >
            <RiPhoneFill size={20} color={'white'} />
          </Flex>

          <Box>
            <Text size={'xs'} c={'black'}>
              Need help?
            </Text>
            <Text fw={700}>+998 78 150 00 00</Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}