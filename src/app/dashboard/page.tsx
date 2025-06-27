import ChartSwitcher from '../../components/ChartSwitcher'

async function getTotal() {
  // build correct base URL for dev / prod
  const base =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : `https://${process.env.VERCEL_URL}`

  const res = await fetch(`${base}/api/sales`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch sales')

  const data: { year: number; sales: number }[] = await res.json()
  const sum = data.reduce((acc, d) => acc + d.sales, 0)
  return { years: data.length, total: sum.toLocaleString() }
}

export default async function DashboardPage() {
  const { years, total } = await getTotal()

  return (
    <main className="p-8 space-y-8">
      {/* simple index card */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-blue-50 p-4">
          <h3 className="text-sm">Count Number of Years</h3>
          <p className="text-2xl font-bold">{years}</p>
        </div>
        <div className="rounded-lg bg-green-50 p-4">
          <h3 className="text-sm">Total Sales Volume</h3>
          <p className="text-2xl font-bold">${total}</p>
        </div>
      </div>

      {/* multiple charts */}
      <ChartSwitcher />
    </main>
  )
}
