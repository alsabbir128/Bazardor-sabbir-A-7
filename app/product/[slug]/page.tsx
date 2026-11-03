import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowDown, ArrowUp, Minus } from 'lucide-react'
import { SiteShell } from '@/components/site-shell'
import { bn, getProduct } from '@/lib/products'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const prices = product.bazars.map((item) => item.price)
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  const avg = Math.round(prices.reduce((total, price) => total + price, 0) / prices.length)
  const stats = [['সর্বনিম্ন', min], ['সর্বোচ্চ', max], ['গড়', avg]] as const
  const trend = product.change === 0 ? 'bg-[#f2f2ed] text-[#81867b]' : product.change > 0 ? 'bg-[#fff0ed] text-[#d34e42]' : 'bg-[#e5f5e7] text-[#298542]'

  return <SiteShell><main className="mx-auto max-w-5xl px-8 py-5 lg:px-12 text-left" dir="ltr">
    <div className="text-[10px] text-[#798476]"><Link href="/" className="hover:text-[#507247]">হোম</Link><span className="mx-2">›</span><span>{product.category}</span><span className="mx-2">›</span><span>{product.name}</span></div>

    <section className="mt-4 flex items-center justify-between rounded-lg border border-[#e3e8e1] bg-white px-4 py-3 shadow-[0_2px_8px_rgba(45,52,37,0.03)]">
      <div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-lg bg-[#f1f5ed] text-2xl">{product.emoji}</div><div><h1 className="text-lg font-black text-[#293326]">{product.name}</h1><p className="text-[10px] text-[#818b7e]">{product.category} · {product.unit}</p><p className="text-[9px] text-[#7d8879]">{product.description}</p></div></div>
      <div className="rounded-md bg-[#f4f6f0] px-4 py-2 text-center"><p className="text-[9px] text-[#7d8879]">আজকের দাম</p><p className="text-xl font-black text-[#293326]">{bn(product.price)}</p><p className="text-[9px] text-[#7d8879]">টাকা / {product.unit.replace('প্রতি ', '')}</p><span className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold ${trend}`}>{product.change === 0 ? <Minus className="size-2.5" /> : product.change > 0 ? <ArrowUp className="size-2.5" /> : <ArrowDown className="size-2.5" />}{bn(Math.abs(product.change))}%</span></div>
    </section>

    <section className="mt-3 rounded-lg border border-[#e3e8e1] bg-white p-4">
      <h2 className="text-xs font-black text-[#33412f]">দামের সারসংক্ষেপ</h2><div className="mt-2 grid grid-cols-3 gap-2">{stats.map(([label, value]) => <div key={label} className="rounded-md border border-[#e5e9e1] px-3 py-2"><p className="text-[9px] text-[#7e897c]">{label}</p><p className="mt-1 text-sm font-black text-[#34452f]">{bn(value)} <span className="text-[9px] font-normal text-[#879182]">টাকা</span></p><p className="text-[8px] text-[#899487]">বাজারভেদে পরিবর্তনশীল</p></div>)}</div>
      <h2 className="mt-4 text-xs font-black text-[#33412f]">বাজারভিত্তিক আজকের দাম</h2><div className="mt-2 overflow-hidden rounded-md border border-[#7f8980]"><table className="w-full border-collapse text-right text-[10px]"><thead className="bg-[#f1f4ee] text-[#445344]"><tr><th className="border-b border-[#7f8980] px-2 py-1.5 font-bold">বাজার</th><th className="border-b border-l border-[#7f8980] px-2 py-1.5 font-bold">দাম</th><th className="border-b border-l border-[#7f8980] px-2 py-1.5 font-bold">অবস্থা</th></tr></thead><tbody>{product.bazars.map((bazar) => <tr key={bazar.name} className="odd:bg-white even:bg-[#f7f9f6]"><td className="border-b border-[#7f8980] px-2 py-1.5 font-semibold">{bazar.name}</td><td className="border-b border-l border-[#7f8980] px-2 py-1.5 font-bold">{bn(bazar.price)} টাকা</td><td className="border-b border-l border-[#7f8980] px-2 py-1.5 text-[#5f6f5d]">{bazar.note}</td></tr>)}</tbody></table></div>
    </section>
    <Link href="/" className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold text-[#71806f] hover:text-[#507247]"><ArrowLeft className="size-3" /> সব পণ্যে ফিরুন</Link>
  </main></SiteShell>
}
