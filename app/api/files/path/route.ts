import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const folderId = searchParams.get("folderId")

    if (!folderId) {
      // Return root path
      return NextResponse.json({ path: [] })
    }

    // Build the path by traversing up the parent chain
    const path: Array<{ id: string; name: string }> = []
    let currentId: string | null = folderId

    while (currentId) {
      const folder = await prisma.file.findFirst({
        where: {
          id: currentId,
          userId: session.user.id,
          isFolder: true,
          deletedAt: null,
        },
        select: {
          id: true,
          name: true,
          parentId: true,
        },
      })

      if (!folder) {
        break
      }

      path.unshift({ id: folder.id, name: folder.name })
      currentId = folder.parentId
    }

    return NextResponse.json({ path })
  } catch (error) {
    console.error("Error fetching folder path:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

