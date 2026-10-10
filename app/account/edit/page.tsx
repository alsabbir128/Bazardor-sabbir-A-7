'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SiteShell } from '@/components/site-shell'
import { authClient } from '@/lib/auth-client'
import toast from 'react-hot-toast'

export default function EditAccountPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    if (!isPending && !session?.user) router.replace('/signin')
    if (session?.user) setName(session.user.name || '')
  }, [isPending, router, session])

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextName = name.trim()
    if (nextName.length < 2) { toast.error('নাম অন্তত ২ অক্ষরের হতে হবে।'); return }
    setIsSaving(true)
    const { error } = await authClient.updateUser({ name: nextName })
    setIsSaving(false)
    if (error) toast.error('তথ্য আপডেট করা যায়নি। আবার চেষ্টা করুন।')
    else { toast.success('তথ্য আপডেট হয়েছে।'); router.replace('/account'); router.refresh() }
  }

  if (isPending || !session?.user) return <SiteShell><main className="mx-auto min-h-[650px] max-w-2xl px-5 py-16"><div className="h-8 w-48 animate-pulse rounded bg-[#e8eee5]" /><div className="mt-6 h-48 animate-pulse rounded-xl bg-[#e8eee5]" /></main></SiteShell>
  return <SiteShell><main className="mx-auto min-h-[650px] max-w-2xl px-5 py-16" dir="ltr"><h1 className="text-2xl font-black text-[#293326]">তথ্য পরিবর্তন</h1><p className="mt-1 text-sm text-[#818b7e]">আপনার প্রোফাইলের নাম আপডেট করুন।</p><form onSubmit={submit} className="mt-6 rounded-xl border border-[#e3e8e1] bg-white p-5"><label className="block text-sm font-bold text-[#4c584a]">নাম<input value={name} onChange={(event) => setName(event.target.value)} required className="mt-2 w-full rounded-md border border-[#dfe6de] px-3 py-3 outline-none focus:border-[#05893e]" /></label><div className="mt-5 flex gap-2"><button type="submit" disabled={isSaving} className="rounded-md bg-[#05893e] px-5 py-3 text-sm font-bold text-white disabled:opacity-60">{isSaving ? 'সংরক্ষণ হচ্ছে…' : 'তথ্য আপডেট করুন'}</button><button type="button" onClick={() => router.back()} className="rounded-md border border-[#dfe6de] px-5 py-3 text-sm font-bold text-[#5f6f5d]">বাতিল</button></div></form></main></SiteShell>
}
