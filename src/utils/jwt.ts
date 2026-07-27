interface IJwtPayload {
  exp: number
  iat?: number
  [key: string]: unknown
}

export const decodeJwtPayload = (token: string): IJwtPayload | null => {
  try {
    const payloadBase64 = token.split('.')[1]
    const decoded = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(decoded)
  } catch {
    return null
  }
}