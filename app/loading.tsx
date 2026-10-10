export default function Loading() {
  return <main className="mx-auto max-w-5xl space-y-5 px-8 py-12" aria-busy="true" aria-label="লোড হচ্ছে"><div className="h-10 w-64 animate-pulse rounded bg-[#e5ece2]" /><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <div key={index} className="h-32 animate-pulse rounded-lg bg-[#e9efe7]" />)}</div></main>
}
