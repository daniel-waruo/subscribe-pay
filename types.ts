export type Subscription = {
  id: number
  name: string
  description: string
  interval: string
  price: string
  count: number
}

export type Provider = {
  id: number
  name: string
  logo: string
  phone: string
  location: string
  description: string
  subscriptions: Subscription[]
}
