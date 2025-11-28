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

export async function GET(request: NextRequest) {
  const unauthorized = await requireAuth(request)
  if (unauthorized) return unauthorized

  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAuth(request)
  if (unauthorized) return unauthorized

  try {
    const body = await request.json()
    const { title, description, techStack, liveLink, githubLink, image } = body

    if (!title || !description || !techStack || !liveLink || !githubLink || !image) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!Array.isArray(techStack)) {
      return NextResponse.json({ error: 'techStack must be an array of strings' }, { status: 400 })
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        techStack,
        liveLink,
        githubLink,
        image,
      },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
