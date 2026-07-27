import { useProfile } from './useProfile.ts'

export const useIsAdmin = () => {
  const { data: user, isLoading } = useProfile()
  return { isAdmin: user?.role === 'admin', isLoading }
}