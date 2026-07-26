import axios from 'axios'
import { useAuthStore } from '../store/auth.store.ts'
import { authApi } from './auth.ts'

export const $api = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
  timeout: 15_000,
})

$api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  const params = { ...config.params }

  if (params.search) {
    params.title = params.search
    delete params.search
  }

  config.params = params

  return config
})

let isRefreshing = false
let queue: Array<(token: string) => void> = []

$api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error)
    }

    const { refreshToken, setTokens, logout } = useAuthStore.getState()
    if (!refreshToken) {
      logout()
      return Promise.reject(error)
    }

    original._retry = true

    if (isRefreshing) {
      return new Promise((resolve) => {
        queue.push((token) => {
          original.headers.Authorization = `Bearer ${token}`
          resolve($api(original))
        })
      })
    }

    isRefreshing = true

    try {
      const tokens = await authApi.refresh(refreshToken)
      setTokens(tokens)

      queue.forEach((cb) => cb(tokens.access_token))
      queue = []

      original.headers.Authorization = `Bearer ${tokens.access_token}`
      return $api(original)
    } catch (e) {
      logout()
      queue = []
      globalThis.location.href = '/login'
      return Promise.reject(e)
    } finally {
      isRefreshing = false
    }
  },
)