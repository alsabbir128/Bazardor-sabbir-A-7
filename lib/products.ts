export type Market = { market: string; division: string; min: number; max: number }
export type Product = {
  id: number
  slug: string
  name: string
  emoji: string
  category: string
  categorySlug: string
  unit: string
  price: number
  change: number
  description: string
  bazars: { name: string; price: number; note: string }[]
  markets: Market[]
}

type ApiProduct = { id: number; slug: string; nameBn: string; category: string; categoryNameBn: string; categoryIcon: string; unit: string; image: string; today: number; change?: { pct?: number }; markets?: Market[] }
const API_BASE = 'https://api.api-store.workers.dev/api/bazardor'

const unitLabel = (unit: string) => unit === 'kg' ? 'প্রতি কেজি' : unit === 'litre' ? 'প্রতি লিটার' : unit === 'piece' ? 'প্রতি পিস' : unit === 'dozen' ? 'প্রতি ডজন' : `প্রতি ${unit}`
const toProduct = (item: ApiProduct): Product => ({
  id: item.id, slug: item.slug, name: item.nameBn, emoji: item.image || item.categoryIcon, category: item.categoryNameBn, categorySlug: item.category, unit: unitLabel(item.unit), price: item.today, change: item.change?.pct ?? 0,
  description: `${item.nameBn} এর আজকের বাজারদর ও বাজারভিত্তিক তথ্য।`, markets: item.markets ?? [],
  bazars: (item.markets ?? []).map((market) => ({ name: market.market, price: Math.round((market.min + market.max) / 2), note: market.min === market.max ? 'স্থিতিশীল' : 'বাজারভেদে পরিবর্তনশীল' })),
})

export async function getProducts(category?: string) {
  const query = category ? `?category=${encodeURIComponent(category)}` : ''
  const response = await fetch(`${API_BASE}/products${query}`, { next: { revalidate: 300 } })
  if (!response.ok) throw new Error('Products API unavailable')
  const payload = await response.json() as ApiProduct[] | { data: ApiProduct[] }
  return (Array.isArray(payload) ? payload : payload.data).map(toProduct)
}

export async function getProduct(slug: string) {
  const response = await fetch(`${API_BASE}/products/${encodeURIComponent(slug)}`, { next: { revalidate: 300 } })
  if (!response.ok) return null
  const payload = await response.json() as ApiProduct | { data: ApiProduct }
  const item = 'data' in payload ? payload.data : payload
  return item?.slug ? toProduct(item) : null
}

export async function getCategories() {
  const response = await fetch(`${API_BASE}/categories`, { next: { revalidate: 300 } })
  if (!response.ok) throw new Error('Categories API unavailable')
  const payload = await response.json() as Array<{ id?: string; slug?: string; nameBn?: string; name?: string; icon?: string; categoryIcon?: string }> | { data: Array<{ slug: string; nameBn?: string; name?: string; icon?: string; categoryIcon?: string }> }
  const items = Array.isArray(payload) ? payload : payload.data
  return items.map((item) => ({ slug: item.slug || item.id || '', name: item.nameBn || item.name || '', icon: item.icon || item.categoryIcon || '•' }))
}

export const bn = (value: number) => value.toLocaleString('bn-BD')
export const findProduct = (slug: string) => getProduct(slug)
export const categories = [{ slug: 'chal', name: 'চাল', icon: '🍚' }, { slug: 'dal', name: 'ডাল', icon: '🫘' }, { slug: 'tel', name: 'তেল', icon: '🛢️' }, { slug: 'shobji', name: 'সবজি', icon: '🥬' }, { slug: 'mach', name: 'মাছ', icon: '🐟' }, { slug: 'mangsho', name: 'মাংস', icon: '🍗' }, { slug: 'dudh', name: 'ডিম-দুধ', icon: '🥛' }, { slug: 'moshla', name: 'মসলা', icon: '🌶️' }]
export const products: Product[] = []
