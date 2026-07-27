import { useState } from 'react'
import { Button, PasswordInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useMutation } from '@tanstack/react-query'
import { authApi } from '../../api/auth.ts'
import { useRegister } from '../../hooks/useRegister.ts'
import type { IRegisterPayload } from '../../types/auth.ts'

export const RegisterForm = () => {
  const register = useRegister()
  const [emailWarning, setEmailWarning] = useState(false)

  const checkEmail = useMutation({
    mutationFn: authApi.checkEmailAvailability,
    onSuccess: (result) => setEmailWarning(!result.isAvailable),
  })

  const form = useForm<IRegisterPayload>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      avatar: 'https://i.pravatar.cc/300',
    },
    validate: {
      name: (v) => (v.trim().length < 2 ? 'Минимум 2 символа' : null),
      email: (v) => (/^\S+@\S+$/.test(v) ? null : 'Некорректный email'),
      password: (v) => (v.length < 4 ? 'Минимум 4 символа' : null),
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => register.mutate(values))}>
      <TextInput label={'Имя'} {...form.getInputProps('name')} />

      <TextInput
        label={'Email'}
        mt={'sm'}
        {...form.getInputProps('email')}
        onBlur={(e) => checkEmail.mutate(e.currentTarget.value)}
        error={
          form.errors.email ??
          (emailWarning ? 'Похоже, этот email уже занят — но можно попробовать' : null)
        }
      />

      <PasswordInput label={'Пароль'} mt={'sm'} {...form.getInputProps('password')} />

      <Button type={'submit'} mt={'lg'} fullWidth loading={register.isPending} color={'red'}>
        Зарегистрироваться
      </Button>
    </form>
  )
}