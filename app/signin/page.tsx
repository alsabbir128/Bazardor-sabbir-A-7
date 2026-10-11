import { AuthForm } from '@/components/auth-form'
import { SiteShell } from '@/components/site-shell'
export default async function SignInPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) { const { error } = await searchParams; return <SiteShell><main className="flex min-h-[650px] items-center justify-center px-5 py-16"><AuthForm mode="signin" initialError={error ? 'ইমেইল নিশ্চিতকরণ সম্পন্ন হয়নি। আবার চেষ্টা করুন।' : ''} /></main></SiteShell> }
