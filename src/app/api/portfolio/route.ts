import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const portfolios = await prisma.portfolio.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(portfolios);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, result, clientName, platform, videoUrl } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "กรุณากรอกชื่อและรายละเอียดผลงาน" },
        { status: 400 }
      );
    }

    const slug =
      title
        .toLowerCase()
        .replace(/[^a-z0-9ก-๙\s-]/g, "")
        .replace(/\s+/g, "-")
        .substring(0, 100) +
      "-" +
      Date.now();

    const portfolio = await prisma.portfolio.create({
      data: {
        title,
        slug,
        description,
        result: result || null,
        clientName: clientName || null,
        platform: platform || null,
        videoUrl: videoUrl || null,
        published: true,
      },
    });

    return NextResponse.json(portfolio, { status: 201 });
  } catch (error) {
    console.error("Portfolio creation error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาด" },
      { status: 500 }
    );
  }
}
