export interface Property {
  id: number
  address: string
  suburb: string
  city: string
  price: number
  beds: number
  baths: number
  sqft: number
  lot: number
  type: "House" | "Apartment" | "Townhouse" | "Development"
  status: "For Sale" | "For Rent" | "New Development"
  lat: number
  lng: number
  year: number
  description: string
  features: string[]
  agent: { name: string; agency: string; phone: string }
  daysListed: number
  priceHistory: { date: string; price: number }[]
  images: string[]
  saved?: boolean
}
