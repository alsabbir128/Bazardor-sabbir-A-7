import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { SiteShell } from '@/components/site-shell'
import { getCategories, getProducts } from '@/lib/products'

export default async function CategoryPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ sort?: string }> }) {
  const { slug } = await params
  const { sort } = await searchParams
  const [categories, products] = await Promise.all([getCategories(), getProducts(slug)])
  const category = categories.find((item) => item.slug === slug)
  if (!category) notFound()
  const items = [...products].sort((a, b) => sort === 'asc' ? a.price - b.price : sort === 'desc' ? b.price - a.price : 0)
  return <SiteShell><main className="mx-auto max-w-6xl px-5 py-14 text-left lg:px-8" dir="ltr"><Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#7c8878] hover:text-[#507247]"><ArrowLeft className="size-4" /> হোমে ফিরুন</Link><div className="mt-10 flex flex-col justify-between gap-5 border-b border-[#e5e5dc] pb-8 sm:flex-row sm:items-end"><div><div className="mb-3 text-5xl">{category.icon}</div><h1 className="text-4xl font-black">{category.name}</h1><p className="mt-2 text-[#7f8879]">{category.name} বিভাগের আজকের সব পণ্যের দাম</p></div><form method="get" className="flex items-center gap-2"><select name="sort" aria-label="পণ্য সাজান" defaultValue={sort || ''} className="rounded-full border border-[#dedfd5] bg-white px-5 py-3 text-sm font-bold text-[#687363] outline-none"><option value="">সাজান: ডিফল্ট</option><option value="asc">দাম: কম থেকে বেশি</option><option value="desc">দাম: বেশি থেকে কম</option></select><button type="submit" className="rounded-full bg-[#05893e] px-4 py-3 text-xs font-bold text-white">প্রয়োগ</button></form></div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((product) => <ProductCard key={product.slug} product={product} />)}</div></main></SiteShell>
}
