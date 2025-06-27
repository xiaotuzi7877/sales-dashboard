'use client'

import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

type Sales = { year: number; sales: number }
type ChartType = 'bar' | 'line' | 'pie'

export default function ChartSwitcher() {
  const [data, setData] = useState<Sales[]>([])
  const [chart, setChart] = useState<ChartType>('bar')
  const [threshold, setThreshold] = useState<number>(0)

  useEffect(() => {
    fetch('/api/sales')
      .then((r) => r.json())
      .then(setData)
  }, [])

  const filtered = threshold
    ? data.filter((d) => d.sales >= threshold)
    : data

  const renderChart = () => {
    switch (chart) {
      case 'line':
        return (
          <LineChart data={filtered}>
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" />
          </LineChart>
        )
      case 'pie':
        const COLORS = ['#3182bd', '#6baed6', '#9ecae1']
        return (
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie
              data={filtered}
              dataKey="sales"
              nameKey="year"
              label
              outerRadius={120}
            >
              {filtered.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        )
      default:
        return (
          <BarChart data={filtered}>
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" />
          </BarChart>
        )
    }
  }

  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <input
          type="number"
          placeholder="Min Sales"
          value={threshold || ''}
          onChange={(e) => setThreshold(Number(e.target.value))}
          className="w-32 rounded border px-2 py-1"
        />

        {(['bar', 'line', 'pie'] as ChartType[]).map((t) => (
          <button
            key={t}
            onClick={() => setChart(t)}
            className={`px-3 py-1 rounded ${
              chart === t ? 'bg-blue-600 text-white' : 'bg-slate-200'
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>{renderChart()}</ResponsiveContainer>
      </div>
    </section>
  )
}
