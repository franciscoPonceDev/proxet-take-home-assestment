export interface UserName {
  first: string
  middle?: string
  last: string
}

export interface UserLocation {
  street: string
  city: string
  state: string
  country: string
  zip: string
}

export interface UserJob {
  title: string
  descriptor: string
  area: string
  type: string
  company: string
}

export interface User {
  id: string
  phoneNumber: string
  name: UserName
  location: UserLocation
  job: UserJob
}

export interface UsersResponse {
  result: User[]
}

const USERS_API_URL =
  process.env.NEXT_PUBLIC_USERS_API_URL ??
  'https://dummyjson.com/c/81a3-7acb-406a-8571'

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(USERS_API_URL)

  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }

  const data = (await response.json()) as UsersResponse

  if (!Array.isArray(data.result)) {
    throw new Error('Invalid users payload')
  }

  return data.result
}


