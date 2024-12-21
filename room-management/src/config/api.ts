export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080'

export const API_ROUTES = {
  login: `${BASE_URL}/api/auth/login`,
  register: `${BASE_URL}/api/users/register`,
  logout: `${BASE_URL}/api/auth/logout`,
  validate: `${BASE_URL}/api/auth/validate`,
  users: {
    profile: (id: number) => `${BASE_URL}/api/users/${id}`,
    password: (id: number) => `${BASE_URL}/api/users/${id}/password`
  }
} as const 