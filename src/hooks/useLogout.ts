import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { useAuthStore } from '../store/auth.store.ts'

export const useLogout = () => {
  const logout = useAuthStore((s) => s.logout)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return () => {
    logout()
    queryClient.clear()
    navigate('/login', { replace: true })
  }
}