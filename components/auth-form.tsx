'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export function AuthForm({ mode, initialError = '' }: { mode: 'signin' | 'signup'; initialError?: string }) {
  const router = useRouter()
  const [error, setError] = useState(initialError)
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isSignIn = mode === 'signin'
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (event.nativeEvent.isComposing || (event as React.KeyboardEvent).keyCode === 229) return
    setError('')
    setStatus('')
    setIsSubmitting(true)
    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') || '').trim().toLowerCase()
    const password = String(form.get('password') || '')
    const name = String(form.get('name') || '').trim()
    if (!email.includes('@') || password.length < 6) { setError('সঠিক ইমেইল এবং অন্তত ৬ অক্ষরের পাসওয়ার্ড দিন।'); setIsSubmitting(false); return }

    try {
      const result = isSignIn
        ? await authClient.signIn.email({ email, password })
        : await authClient.signUp.email({ name: name.trim() || 'ব্যবহারকারী', email, password })
      if (result.error) {
        const message = result.error.message.toLowerCase()
        const isUnconfirmed = message.includes('email not confirmed')
        const isRateLimited = message.includes('rate limit') || message.includes('too many')
        setError(isUnconfirmed ? 'আপনার ইমেইল এখনও নিশ্চিত করা হয়নি। ইমেইল থেকে নিশ্চিত করে আবার চেষ্টা করুন।' : isRateLimited ? 'অনেকবার চেষ্টা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।' : isSignIn ? 'ইমেইল বা পাসওয়ার্ড সঠিক নয়।' : 'অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।')
        return
      }
      router.replace('/account')
      router.refresh()
    } catch {
      setError('সার্ভারের সাথে সংযোগ করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।')
    } finally {
      setIsSubmitting(false)
    }
  }
  return <form onSubmit={submit} className="w-full max-w-md rounded-[30px] border border-[#e5e5dc] bg-white p-7 shadow-[0_16px_50px_rgba(45,52,37,.07)] sm:p-9"><div className="mb-8"><span className="text-4xl">🛒</span><h1 className="mt-5 text-3xl font-black">{isSignIn ? 'আবার স্বাগতম' : 'অ্যাকাউন্ট তৈরি করুন'}</h1><p className="mt-2 text-sm leading-6 text-[#899187]">{isSignIn ? 'আপনার বাজারদর দেখতে সাইন ইন করুন।' : 'বাজার দর-এর সাথে যুক্ত হয়ে সহজে দাম দেখুন।'}</p></div>{!isSignIn && <label className="mb-4 block text-sm font-bold">নাম<input name="name" required className="mt-2 w-full rounded-xl border border-[#dedfd6] px-4 py-3 outline-none focus:border-[#507247]" placeholder="আপনার নাম" /></label>}<label className="mb-4 block text-sm font-bold">ইমেইল<input name="email" type="email" required className="mt-2 w-full rounded-xl border border-[#dedfd6] px-4 py-3 outline-none focus:border-[#507247]" placeholder="you@example.com" /></label><label className="block text-sm font-bold">পাসওয়ার্ড<input name="password" type="password" required className="mt-2 w-full rounded-xl border border-[#dedfd6] px-4 py-3 outline-none focus:border-[#507247]" placeholder="••••••••" /></label>{error && <p role="alert" className="mt-4 rounded-xl bg-[#fff0ed] px-3 py-2 text-sm font-semibold text-[#c84e42]">{error}</p>}{status && <p role="status" className="mt-4 rounded-xl bg-[#edf8ef] px-3 py-2 text-sm font-semibold text-[#2f7443]">{status}</p>}<button type="submit" disabled={isSubmitting} className="mt-6 w-full rounded-xl bg-[#507247] py-3.5 text-sm font-bold text-white hover:bg-[#3e5c37] disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? 'অপেক্ষা করুন…' : isSignIn ? 'সাইন ইন করুন' : 'অ্যাকাউন্ট তৈরি করুন'}</button><p className="mt-6 text-center text-sm text-[#899187]">{isSignIn ? 'নতুন এখানে? ' : 'আগেই অ্যাকাউন্ট আছে? '}<Link href={isSignIn ? '/signup' : '/signin'} className="font-bold text-[#507247]">{isSignIn ? 'সাইন আপ করুন' : 'সাইন ইন করুন'}</Link></p></form>
}
