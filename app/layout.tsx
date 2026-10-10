import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = { title: 'বাজার দর — আজকের বাজারদর এক নজরে', description: 'নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ বাজারদর, তুলনা ও বিস্তারিত তথ্য।' }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="bn"><body>{children}</body></html> }
