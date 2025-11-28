import fs from 'fs/promises'
import path from 'path'
import { NextResponse, type NextRequest } from 'next/server'

import { getSessionFromRequest } from '@/lib/auth'

async function requireAuth(request: NextRequest) {
  const session = await getSessionFromRequest(request)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAuth(request)
  if (unauthorized) return unauthorized

  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'projects')
    await fs.mkdir(uploadDir, { recursive: true })

    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileName = `${Date.now()}-${safeName}`
    const filePath = path.join(uploadDir, fileName)

    await fs.writeFile(filePath, buffer)

    const url = `/uploads/projects/${fileName}`

    return NextResponse.json({ url })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
