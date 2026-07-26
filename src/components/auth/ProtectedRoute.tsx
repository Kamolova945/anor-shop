import { Center, Loader } from '@mantine/core'
import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuthStore } from '../../store/auth.store.ts'
import { useProfile } from '../../hooks/useProfile.ts'

export const ProtectedRoute = () => {
  const accessToken = useAuthStore((s) => s.accessToken)
  const { isLoading, isError } = useProfile()
  const location = useLocation()

  if (!accessToken) {
    return <Navigate to={'/login'} state={{ from: location }} replace />
  }

  if (isLoading) {
    return (
      <Center h={'100vh'}>
        <Loader color={'red'} />
      </Center>
    )
  }

  if (isError) {
    return <Navigate to={'/login'} replace />
  }

  return <Outlet />
}