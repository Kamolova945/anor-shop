import { useQuery } from '@tanstack/react-query'
import { authApi } from '../api/auth.ts'
import { useAuthStore } from '../store/auth.store.ts'

export const PROFILE_KEY = 'profile-key'

export const useProfile = () => {
  const accessToken = useAuthStore((s) => s.accessToken)

  return useQuery({
    queryKey: [PROFILE_KEY],
    queryFn: authApi.getProfile,
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    retry: false,
  })
}