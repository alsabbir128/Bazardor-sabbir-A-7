'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SiteShell } from '@/components/site-shell'
import { createClient } from '@/lib/supabase/client'

export default function AccountPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace('/signin')
        return
      }
      setEmail(data.user.email || '')
      setName(String(data.user.user_metadata?.display_name || data.user.email?.split('@')[0] || 'ব্যবহারকারী'))
    })
  }, [router])

  async function signOut() {
    await createClient().auth.signOut()
    router.replace('/')
    router.refresh()
  }

  async function updateName() {
    const { error } = await createClient().auth.updateUser({ data: { display_name: name.trim() || 'ব্যবহারকারী' } })
    if (!error) router.refresh()
  }

  return <SiteShell><main className="mx-auto flex min-h-[650px] max-w-5xl flex-col items-center px-8 py-16 text-left lg:px-12" dir="ltr">
    <div className="w-full max-w-3xl">
      <h1 className="text-2xl font-black text-[#293326]">আমার প্রোফাইল</h1>
      <p className="mt-1 text-xs text-[#818b7e]">আপনার বাজারদর-এর তথ্য এখানে দেখুন</p>
      <section className="mt-5 flex items-center justify-between rounded-xl border border-[#e3e8e1] bg-white p-4 shadow-[0_3px_12px_rgba(45,52,37,.03)]">
        <div className="flex items-center gap-3"><img src="/placeholder-user.jpg" alt="প্রোফাইল ছবি" className="size-12 rounded-xl object-cover" /><div><h2 className="font-bold text-[#293326]">{name || 'ব্যবহারকারী'}</h2><p className="text-xs text-[#818b7e]">{email || 'ইমেইল পাওয়া যায়নি'}</p></div></div>
        <button onClick={signOut} className="rounded-md border border-[#ef8c83] px-3 py-2 text-xs font-bold text-[#e15b50] hover:bg-[#fff4f2]">সাইন আউট</button>
      </section>
      <section className="mt-4 rounded-xl border border-[#e3e8e1] bg-white p-5"><h2 className="text-sm font-black text-[#293326]">তথ্য</h2><label className="mt-5 block text-xs font-bold text-[#4c584a]">নাম<input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-md border border-[#dfe6de] px-3 py-2.5 text-sm outline-none focus:border-[#05893e]" /></label><button onClick={updateName} className="mt-4 w-full rounded-md bg-[#05893e] py-2.5 text-xs font-bold text-white hover:bg-[#047f39]">আপডেট</button></section>
      <Link href="/" className="mt-4 inline-block text-xs font-bold text-[#507247]">← বাজারদরে ফিরে যান</Link>
    </div>
  </main></SiteShell>
}
