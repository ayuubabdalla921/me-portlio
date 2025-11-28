import { NextResponse, type NextRequest } from 'next/server'

import { getSessionFromRequest } from '@/lib/auth'
import prisma from '@/lib/prisma'

async function requireAuth(request: NextRequest) {
  const session = await getSessionFromRequest(request)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAuth(request)
  if (unauthorized) return unauthorized

  try {
    const { id } = await params
    const project = await prisma.project.findUnique({ where: { id } })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAuth(request)
  if (unauthorized) return unauthorized

  try {
    const { id } = await params
    const body = await request.json()
    const { title, description, techStack, liveLink, githubLink, image } = body

    if (!title || !description || !techStack || !liveLink || !githubLink || !image) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!Array.isArray(techStack)) {
      return NextResponse.json({ error: 'techStack must be an array of strings' }, { status: 400 })
    }

    const updated = await prisma.project.update({
      where: { id },
      data: { title, description, techStack, liveLink, githubLink, image },
    })

    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAuth(request)
  if (unauthorized) return unauthorized

  try {
    const { id } = await params
    await prisma.project.delete({ where: { id } })

    return NextResponse.json({ message: 'Project deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
