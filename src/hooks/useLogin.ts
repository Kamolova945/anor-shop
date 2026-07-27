import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { notifications } from '@mantine/notifications'
import { authApi } from '../api/auth.ts'
import { useAuthStore } from '../store/auth.store.ts'
import { PROFILE_KEY } from './useProfile.ts'

export const useLogin = () => {
  const setTokens = useAuthStore((s) => s.setTokens)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (tokens) => {
      setTokens(tokens)
      queryClient.invalidateQueries({ queryKey: [PROFILE_KEY] })
    navigate('/', { replace: true })
    },
    onError: () =>
      notifications.show({ color: 'red', message: 'Неверный email или пароль' }),
  })
}