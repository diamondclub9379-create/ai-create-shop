import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(articles);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, excerpt, image } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "กรุณากรอกชื่อบทความและเนื้อหา" },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9ก-๙\s-]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 100)
      + "-" + Date.now();

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || content.substring(0, 150) + "...",
        image: image || null,
        published: true,
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("Article creation error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการสร้างบทความ" },
      { status: 500 }
    );
  }
}
