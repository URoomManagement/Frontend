export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080'

export const API_ROUTES = {
  login: `${BASE_URL}/api/auth/login`,
  register: `${BASE_URL}/api/auth/register`,
  logout: `${BASE_URL}/api/auth/logout`,
  validate: `${BASE_URL}/api/auth/validate`,
} as const 