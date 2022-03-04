export type Subscription = {
  id: number
  name: string
  description: string
  interval: string
  price: string
  count: number
  organization: number
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

export type Transaction = {
  id: number
  amount: number
  phone: string
  state: "pending" | "success" | "failed"
  reason_failed: string
}
