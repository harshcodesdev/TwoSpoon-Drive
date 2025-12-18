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
    const parentId = searchParams.get("parentId") || null

    // Fetch files for the user, optionally filtered by parent folder
    const files = await prisma.file.findMany({
      where: {
        userId: session.user.id,
        parentId: parentId,
        deletedAt: null, // Only show non-deleted files
      },
      orderBy: [
        { isFolder: "desc" }, // Folders first
        { createdAt: "desc" }, // Then by creation date
      ],
    })

    return NextResponse.json({ files })
  } catch (error) {
    console.error("Error fetching files:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

