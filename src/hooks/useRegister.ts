import { useMutation } from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'
import { authApi } from '../api/auth.ts'
import { useLogin } from './useLogin.ts'
import type { IRegisterPayload } from '../types/auth.ts'

export const useRegister = () => {
  const login = useLogin()

  const register = useMutation({
    mutationFn: (payload: IRegisterPayload) => authApi.register(payload),
    onSuccess: (_user, variables) => {
      login.mutate({ email: variables.email, password: variables.password })
    },
    onError: () => {
      notifications.show({
        color: 'red',
        message: 'Не удалось зарегистрироваться. Возможно, email уже занят',
      })
    },
  })

  return {
    ...register,
    isPending: register.isPending || login.isPending,
  }
}