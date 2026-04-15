import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PortfolioFilter from "./PortfolioFilter";

export default async function PortfolioPage() {
  const portfolios = await prisma.portfolio.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  // Extract unique platforms for filter
  const platforms = [
    ...new Set(
      portfolios
        .map((p) => p.platform)
        .filter(Boolean)
        .flatMap((p) => p!.split(" / "))
    ),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          ตัวอย่างผลงาน
        </h1>
        <p className="text-gray-600 text-lg">
          ผลงานจริงจากลูกค้าที่ไว้วางใจ Ai Create
        </p>
      </div>

      <PortfolioFilter portfolios={portfolios} platforms={platforms} />

      {/* CTA */}
      <div
        className="mt-16 p-10 rounded-2xl text-center"
        style={{ backgroundColor: "#eef2ff" }}
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          อยากให้ผลงานคุณเป็นแบบนี้?
        </h3>
        <p className="text-gray-600 mb-6">
          ปรึกษาฟรี! ทีมงาน Ai Create พร้อมช่วยคุณ
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/services"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition"
          >
            ดูบริการทั้งหมด
          </Link>
          <a
            href="https://line.me/R/ti/p/@aicreate"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition"
            style={{ backgroundColor: "#06C755" }}
          >
            ปรึกษาฟรีผ่าน Line
          </a>
        </div>
      </div>
    </div>
  );
}
