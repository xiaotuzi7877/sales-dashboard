import { NextResponse } from 'next/server'
import fs from 'node:fs/promises'
import { parse } from 'csv-parse/sync'

export const revalidate = 3600 // seconds

const CSV_FILE = 'Data/SampleSuperstore.csv'
const ORDER_DATE_COL = 'Order Date'
const SALES_COL = 'Sales'

export async function GET() {
  /* 1) read CSV */
  const csv = await fs.readFile(CSV_FILE, 'utf8')
  const rows: Record<string, string>[] = parse(csv, { columns: true })

  /* 2) collect all years */
  const years = new Set<number>()
  for (const r of rows) {
    const y = new Date(r[ORDER_DATE_COL]).getFullYear()
    if (!isNaN(y)) years.add(y)
  }
  const latest3 = [...years].sort().slice(-3)

  /* 3) Count */
  const summary: Record<number, number> = {}
  latest3.forEach((y) => (summary[y] = 0))
  for (const r of rows) {
    const y = new Date(r[ORDER_DATE_COL]).getFullYear()
    if (summary[y] !== undefined) summary[y] += Number(r[SALES_COL])
  }

  const result = latest3.map((y) => ({
    year: y,
    sales: Math.round(summary[y]),
  }))

  /* 4) return */
  return NextResponse.json(result)
}
