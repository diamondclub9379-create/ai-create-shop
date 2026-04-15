import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await prisma.portfolio.findUnique({
    where: { slug, published: true },
  });

  if (!item) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/portfolio"
        className="text-blue-600 hover:underline text-sm mb-6 inline-block"
      >
        ← กลับไปหน้าผลงาน
      </Link>

      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white mb-8">
        <div className="flex flex-wrap gap-3 mb-4">
          {item.platform && (
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
              {item.platform}
            </span>
          )}
          {item.clientName && (
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
              {item.clientName}
            </span>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{item.title}</h1>
        <time className="text-white/70 text-sm">
          {new Date(item.createdAt).toLocaleDateString("th-TH", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </div>

      {/* Content */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            รายละเอียดงาน
          </h2>
          <div style={{ lineHeight: "1.8", color: "#374151" }}>
            {item.description.split("\n").map((p, i) =>
              p.trim() ? (
                <p key={i} className="mb-3">
                  {p}
                </p>
              ) : null
            )}
          </div>
        </div>

        {item.result && (
          <div
            className="rounded-2xl p-6"
            style={{
              backgroundColor: "#f0fdf4",
              border: "1px solid #bbf7d0",
            }}
          >
            <h2 className="text-xl font-bold text-green-800 mb-3">
              ผลลัพธ์ที่ได้
            </h2>
            <div className="space-y-2">
              {item.result.split(" / ").map((r, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span className="text-green-700">{r}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {item.videoUrl && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              วิดีโอผลงาน
            </h2>
            <a
              href={item.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              ดูวิดีโอ →
            </a>
          </div>
        )}
      </div>

      {/* CTA */}
      <div
        className="mt-12 p-8 rounded-2xl text-center"
        style={{ backgroundColor: "#eef2ff" }}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          อยากได้ผลงานแบบนี้?
        </h3>
        <p className="text-gray-600 mb-6">
          ติดต่อ Ai Create เลย เราพร้อมทำให้ธุรกิจคุณเติบโต
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/services"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition"
          >
            ดูบริการทั้งหมด
          </Link>
          <a
            href="https://line.me/R/ti/p/@aicreate"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
            style={{ backgroundColor: "#06C755" }}
          >
            Line @aicreate
          </a>
        </div>
      </div>
    </div>
  );
}
