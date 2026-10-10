export default function Loading() {
  return <main className="mx-auto min-h-[650px] max-w-6xl px-5 py-14" aria-label="লোড হচ্ছে"><div className="h-10 w-48 animate-pulse rounded bg-[#e8eee5]" /><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <div key={index} className="h-44 animate-pulse rounded-2xl bg-[#e8eee5]" />)}</div></main>
}
