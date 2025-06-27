import { headers } from 'next/headers'

async function getTotal() {
  // build absolute URL for server-side fetch
  const host =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : `https://${headers().get('host')}`

  const res = await fetch(`${host}/api/sales`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch sales')

  const data: { year: number; sales: number }[] = await res.json()
  const sum = data.reduce((acc, d) => acc + d.sales, 0)

  return { years: data.length, total: sum.toLocaleString() }
}

export default async function DashboardPage() {
  const { years, total } = await getTotal()

  return (
    <main className="p-8 space-y-6">
      <div className="rounded bg-blue-50 p-4">
        <h3 className="text-sm">Years counted</h3>
        <p className="text-2xl font-bold">{years}</p>
      </div>
      <div className="rounded bg-green-50 p-4">
        <h3 className="text-sm">Total sales</h3>
        <p className="text-2xl font-bold">${total}</p>
      </div>
      {/* other components */}
    </main>
  )
}
