export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://192.168.100.118:8080'

export const API_ROUTES = {
  login: `${BASE_URL}/api/auth/login`,
  register: `${BASE_URL}/api/users/register`,
  logout: `${BASE_URL}/api/auth/logout`,
  validate: `${BASE_URL}/api/auth/validate`,
  users: {
    profile: (id: number) => `${BASE_URL}/api/users/${id}`,
    password: (id: number) => `${BASE_URL}/api/users/${id}/password`
  },
  reservation:{
    room:(id:number) => `${BASE_URL}/api/reservations/rooms/${id}`,
    user:(id:number) => `${BASE_URL}/api/reservations/users/${id}`,
    delete:(id:number) => `${BASE_URL}/api/reservations/${id}`,
    create:`${BASE_URL}/api/reservations`
  },
  roomLocation: (name:String) => `${BASE_URL}/api/rooms/location?location=${name}`
} as const