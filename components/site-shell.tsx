'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Menu, X, UserRound, LogOut } from 'lucide-react'
import { categories, products, bn } from '@/lib/products'

export function SiteShell({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  const [userName, setUserName] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  async function signOut() { await createClient().auth.signOut(); setUserName('') }
  useEffect(() => { const supabase = createClient(); supabase.auth.getUser().then(({ data }) => setUserName(String(data.user?.user_metadata?.display_name || data.user?.email?.split('@')[0] || ''))) }, [path])
  useEffect(() => { setCurrentDate(new Intl.DateTimeFormat('bn-BD', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())) }, [])
  return <div className="min-h-screen bg-[#fafcfa] text-[#1d271f]" dir="ltr">
    <header className="border-b border-[#e8e7df] bg-[#fafaf7]/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-8 py-2 lg:px-12">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex size-7 items-center justify-center rounded-lg bg-[#05893e] shadow-sm"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-icon-Ls1QEsuDS24HVqXxMBxifBuATTEFT9.png" alt="বাজার দর লোগো" className="size-6 object-contain" /></span>
          <span><span className="block text-base font-extrabold tracking-tight">বাজার দর</span><span className="block text-[8px] font-medium text-[#8b9283]">{currentDate || 'আজকের তারিখ'}</span></span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          <Link href="/" className={`text-sm font-semibold ${path === '/' ? 'text-[#507247]' : 'text-[#747c6e] hover:text-[#507247]'}`}>হোম</Link>
          {categories.map((category) => <Link key={category.slug} href={`/category/${category.slug}`} className={`text-sm font-semibold ${path === `/category/${category.slug}` ? 'text-[#507247]' : 'text-[#747c6e] hover:text-[#507247]'}`}>{category.name}</Link>)}
        </nav>
        <div className="hidden items-center gap-2 md:flex">{userName ? <div className="flex items-center gap-2"><Link href="/account" className="flex items-center gap-2 rounded-full px-2 py-1.5 text-xs font-bold text-[#394732]"><img src="/placeholder-user.jpg" alt="" className="size-7 rounded-full object-cover" />{userName}<span className="text-[10px]">⌄</span></Link><button onClick={signOut} aria-label="সাইন আউট" className="rounded-full p-2 text-[#9a625a] hover:bg-[#fff0ed]"><LogOut className="size-4" /></button></div> : <><Link href="/signin" className="rounded-full px-4 py-2 text-sm font-bold text-[#66705f] hover:bg-[#f0f1e9]">সাইন ইন</Link><Link href="/signup" className="rounded-full bg-[#507247] px-4 py-2 text-sm font-bold text-white hover:bg-[#3e5c37]">সাইন আপ</Link></>}</div>
        <button aria-label="মেনু" className="rounded-xl p-2 md:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <div className="flex flex-col gap-4 border-t border-[#e8e7df] px-5 py-5 md:hidden">{categories.map((category) => <Link key={category.slug} href={`/category/${category.slug}`} onClick={() => setOpen(false)} className="font-semibold">{category.icon} {category.name}</Link>)}<div className="flex gap-2 pt-2"><Link href="/signin" className="rounded-full border px-4 py-2 text-sm font-bold">সাইন ইন</Link><Link href="/signup" className="rounded-full bg-[#507247] px-4 py-2 text-sm font-bold text-white">সাইন আপ</Link></div></div>}
    </header>
    <div className="overflow-hidden border-b border-[#e9e7dc] bg-[#f3f1e8] py-1.5"><div className="ticker-track flex w-max gap-8 text-xs font-semibold text-[#697361]">{[...products, ...products].map((product, index) => <span key={`${product.slug}-${index}`} className="flex items-center gap-2"><span className="text-base">{product.emoji}</span>{product.name} <strong className="text-[#384d32]">{bn(product.price)} টাকা</strong><span className={product.change > 0 ? 'text-[#3d9652]' : 'text-[#d1594c]'}>{product.change > 0 ? '▲' : '▼'} {bn(Math.abs(product.change))}%</span></span>)}</div></div>
    {children}
    <footer className="border-t border-[#e8e7df] bg-white"><div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-5 py-8 text-sm text-[#7d8576] sm:flex-row lg:px-8"><div><p className="font-extrabold text-[#394732]">বাজার দর</p><p className="mt-1">প্রয়োজনীয় পণ্যের দাম এক নজরে।</p></div><p className="sm:text-right">সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর<br className="hidden sm:block" /> নির্ভর করে পরিবর্তিত হয়।</p></div></footer>
  </div>
}
