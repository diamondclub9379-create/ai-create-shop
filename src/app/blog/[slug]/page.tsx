import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug, published: true },
  });

  if (!article) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/blog"
        className="text-blue-600 hover:underline text-sm mb-6 inline-block"
      >
        ← กลับไปหน้าบทความ
      </Link>

      <article>
        <time className="text-sm text-gray-400 block mb-2">
          {new Date(article.createdAt).toLocaleDateString("th-TH", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
          {article.title}
        </h1>

        <div
          className="prose prose-lg max-w-none"
          style={{ lineHeight: "1.8", color: "#374151" }}
        >
          {article.content.split("\n").map((paragraph, i) =>
            paragraph.trim() ? (
              <p key={i} className="mb-4">
                {paragraph}
              </p>
            ) : null
          )}
        </div>
      </article>

      {/* CTA */}
      <div
        className="mt-12 p-8 rounded-2xl text-center"
        style={{ backgroundColor: "#eef2ff" }}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          สนใจบริการของ Ai Create?
        </h3>
        <p className="text-gray-600 mb-6">
          ดูบริการทั้งหมดของเรา หรือติดต่อสอบถามได้เลย
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
          <a
            href="https://www.facebook.com/profile.php?id=100075628369768"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            ติดต่อผ่าน Facebook
          </a>
        </div>
      </div>
    </div>
  );
}
