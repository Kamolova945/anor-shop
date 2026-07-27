import { $api } from './api.ts'
import type {
  ILoginPayload,
  ITokens,
  IUser,
  IRegisterPayload,
  IEmailAvailability,
} from '../types/auth.ts'

export const authApi = {
  login: async (payload: ILoginPayload): Promise<ITokens> => {
    const { data } = await $api.post<ITokens>('/auth/login', payload)
    return data
  },

  getProfile: async (): Promise<IUser> => {
    const { data } = await $api.get<IUser>('/auth/profile')
    return data
  },

  refresh: async (refreshToken: string): Promise<ITokens> => {
    const { data } = await $api.post<ITokens>('/auth/refresh-token', { refreshToken })
    return data
  },

  register: async (payload: IRegisterPayload): Promise<IUser> => {
    const { data } = await $api.post<IUser>('/users/', payload)
    return data
  },

  checkEmailAvailability: async (email: string): Promise<IEmailAvailability> => {
    const { data } = await $api.post<IEmailAvailability>('/users/is-available', { email })
    return data
  },
}