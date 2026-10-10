import Link from 'next/link'

export default function NotFound() {
  return <main className="flex min-h-screen items-center justify-center bg-[#f7faf5] px-6 text-center text-[#293326]" dir="ltr"><div><p className="text-sm font-bold text-[#05893e]">৪০৪</p><h1 className="mt-2 text-3xl font-black">পেজটি খুঁজে পাওয়া যায়নি</h1><p className="mt-2 text-sm text-[#7f8879]">লিংকটি ভুল হতে পারে অথবা তথ্যটি আর নেই।</p><Link href="/" className="mt-6 inline-flex rounded-md bg-[#05893e] px-5 py-3 text-sm font-bold text-white">হোমে ফিরুন</Link></div></main>
}
