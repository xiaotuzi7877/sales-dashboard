'use client'

import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type SalesData = { year: number; sales: number }

export default function SalesChart() {
  const [data, setData] = useState<SalesData[]>([])

  useEffect(() => {
    fetch('/api/sales')
      .then((res) => res.json())
      .then((d) => setData(d))
  }, [])

  if (!data.length) return <p>Loading…</p>

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h2 className="text-xl font-bold mb-4">年度销售柱状图</h2>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
