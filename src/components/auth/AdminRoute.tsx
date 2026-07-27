import { Center, Loader } from '@mantine/core'
import { Navigate, Outlet } from 'react-router'
import { useIsAdmin } from '../../hooks/useIsAdmin.ts'


export const AdminRoute = () => {
  const { isAdmin, isLoading } = useIsAdmin()

  if (isLoading) {
    return (
      <Center h={'100vh'}>
        <Loader color={'red'} />
      </Center>
    )
  }

  if (!isAdmin) {
    return <Navigate to={'/'} replace />
  }

  return <Outlet />
}