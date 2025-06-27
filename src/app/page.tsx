import Link from 'next/link'
import ChartSwitcher from '../components/ChartSwitcher'

export default function HomePage() {
  return (
    <main className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-blue-600">Sales Dashboard</h1>

      {/* navigation link */}
      <Link href="/dashboard" className="text-blue-600 underline">
        Go to Dashboard
      </Link>

      <ChartSwitcher />
    </main>
  )
}
