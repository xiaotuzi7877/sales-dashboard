import { NextResponse } from 'next/server'
import path from 'node:path'
import { promises as fs } from 'node:fs'

export const revalidate = 3600  // re-generate every hour

export async function GET() {
  // 1) locate json file in the build output
  const filePath = path.join(process.cwd(), 'data', 'sales.json')

  // 2) read & parse
  const json = await fs.readFile(filePath, 'utf8')
  const data = JSON.parse(json)

  // 3) return
  return NextResponse.json(data)
}
