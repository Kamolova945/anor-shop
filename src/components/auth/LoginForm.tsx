import { Button, PasswordInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useLogin } from '../../hooks/useLogin.ts'
import type { ILoginPayload } from '../../types/auth.ts'

export const LoginForm = () => {
  const login = useLogin()

  const form = useForm<ILoginPayload>({
    initialValues: { email: '', password: '' },
    validate: {
      email: (v) => (/^\S+@\S+$/.test(v) ? null : 'Некорректный email'),
      password: (v) => (v.length < 4 ? 'Минимум 4 символа' : null),
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => login.mutate(values))}>
      <TextInput label={'Email'} {...form.getInputProps('email')} />
      <PasswordInput label={'Пароль'} mt={'sm'} {...form.getInputProps('password')} />
      <Button type={'submit'} mt={'lg'} fullWidth loading={login.isPending} color={'red'}>
        Войти
      </Button>
    </form>
  )
}