import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { SiteShell } from '@/components/site-shell'
import { getProducts, bn } from '@/lib/products'

export default async function Page() {
  const products = await getProducts()
  const risers = [...products].sort((a, b) => b.change - a.change).slice(0, 6)
  const fallers = [...products].sort((a, b) => a.change - b.change).slice(0, 6)
  return <SiteShell><main>
    <section className="mx-auto grid max-w-5xl items-center gap-6 px-8 pb-8 pt-6 lg:grid-cols-[1.08fr_.92fr] lg:px-12" dir="ltr">
      <div className="text-left" dir="ltr"><div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#e8f1e5] px-3 py-1.5 text-[11px] font-bold text-[#507247]"><Sparkles className="size-3" /> আজকের বাজার আপডেট</div><h1 className="max-w-xl text-3xl font-black leading-[1.12] tracking-[-0.04em] text-[#283322] sm:text-4xl">আজকের বাজারের দাম এক নজরে</h1><p className="mt-3 max-w-lg text-sm leading-6 text-[#7f8879]">চাল, ডাল, তেল, সবজি ও নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ বাজারদর দেখুন।</p><Link href="#সব-পণ্য" className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#05893e] px-4 py-2 text-xs font-bold text-white shadow-[0_4px_10px_rgba(5,137,62,.22)] transition hover:bg-[#047f39]">সব পণ্য দেখুন <ArrowRight className="size-3" /></Link></div>
      <div className="relative mx-auto flex w-full max-w-[300px] items-center justify-center rounded-2xl bg-[#f0f5f0] p-5"><div className="absolute inset-3 rounded-2xl border border-[#dce8dc]"/><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bazar-hero-hIal5lPIoNiZ8QU8ZrI3vvCg5u7Hsg.png" alt="সবজি ভর্তি বাজারের ঝুড়ি" className="relative z-10 w-full max-w-[315px] object-contain" /></div>
    </section>
    <section className="bg-[#f2f5ed] py-5"><div className="mx-auto max-w-5xl px-8 lg:px-12"><SectionHeading title="আজ দাম বেড়েছে" sub="যেসব পণ্যের দাম আজ কিছুটা বেড়েছে" up /> <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{risers.map((product) => <ProductCard key={product.slug} product={product} />)}</div></div></section>
    <section className="mx-auto max-w-5xl px-8 py-5 lg:px-12"><SectionHeading title="আজ দাম কমেছে" sub="সাশ্রয়ী দামে আজকের সেরা পণ্য" /> <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{fallers.map((product) => <ProductCard key={product.slug} product={product} />)}</div></section>
    <section id="সব-পণ্য" className="bg-[#f2f5ed] py-5"><div className="mx-auto max-w-5xl px-8 lg:px-12"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><h2 className="text-3xl font-black tracking-tight">সব পণ্য</h2><p className="mt-1 text-xs text-[#7f8879]">আপনার প্রয়োজনীয় সব পণ্যের আজকের বাজারদর</p></div><span className="text-sm font-bold text-[#7c8975]">মোট {bn(products.length)}টি পণ্য</span></div><div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.slug} product={product} />)}</div></div></section>
  </main></SiteShell>
}
function SectionHeading({ title, sub, up }: { title: string; sub: string; up?: boolean }) { return <div><h2 className="flex items-center gap-2 text-3xl font-black tracking-tight">{title} <span className={up ? 'text-[#31954e]' : 'text-[#d65b4c]'}>{up ? '▲' : '▼'}</span></h2><p className="mt-1 text-xs text-[#7f8879]">{sub}</p></div> }
