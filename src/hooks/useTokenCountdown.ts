import { useEffect, useState } from 'react'
import { useAuthStore } from '../store/auth.store.ts'
import { decodeJwtPayload } from '../utils/jwt.ts'

export const useTokenCountdown = () => {
  const accessToken = useAuthStore((s) => s.accessToken)
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null)

  useEffect(() => {
    if (!accessToken) {
      setSecondsLeft(null)
      return
    }

    const payload = decodeJwtPayload(accessToken)
    if (!payload?.exp) {
      setSecondsLeft(null)
      return
    }

    const update = () => {
      const diff = payload.exp - Math.floor(Date.now() / 1000)
      setSecondsLeft(Math.max(diff, 0))
    }

    update()
    const interval = setInterval(update, 1000)

    return () => clearInterval(interval)
  }, [accessToken])

  return secondsLeft
}