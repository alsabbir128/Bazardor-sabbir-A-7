'use client'

import Link from 'next/link'
import { ArrowDown, ArrowUp, Minus } from 'lucide-react'
import { Product, bn } from '@/lib/products'

export function ProductCard({ product }: { product: Product }) {
  const rising = product.change > 0
  const flat = product.change === 0
  return (
    <Link href={`/product/${product.slug}`} className="group flex min-h-[104px] flex-col rounded-lg border border-[#e5e3dc] bg-white p-3 shadow-[0_3px_10px_rgba(45,52,37,0.03)] transition hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(45,52,37,0.1)]">
      <div className="flex items-start justify-between">
        <div className="flex size-8 items-center justify-center rounded-md bg-[#f4f1e9] text-lg">{product.emoji}</div>
        <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${flat ? 'bg-[#f2f2ed] text-[#81867b]' : rising ? 'bg-[#e5f5e7] text-[#298542]' : 'bg-[#fff0ed] text-[#d34e42]'}`}>
          {flat ? <Minus className="size-3" /> : rising ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
          {bn(Math.abs(product.change))}%
        </span>
      </div>
      <h3 className="mt-2 text-sm font-bold text-[#252d20] group-hover:text-[#517247]">{product.name}</h3>
      <p className="mt-0.5 text-[10px] text-[#858c7c]">{product.unit}</p>
      <div className="mt-2 flex items-end justify-between border-t border-[#efeee9] pt-2">
        <div><p className="text-[9px] text-[#9aa092]">আজকের দাম</p><p className="mt-0.5 text-sm font-bold text-[#252d20]">{bn(product.price)} <span className="text-[10px] font-medium text-[#858c7c]">টাকা</span></p></div>
        <span className="text-xs font-semibold text-[#84917a]">বিস্তারিত →</span>
      </div>
    </Link>
  )
}
