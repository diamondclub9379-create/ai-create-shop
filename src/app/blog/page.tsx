import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function BlogPage() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          บทความ & ผลงาน
        </h1>
        <p className="text-gray-600 text-lg">
          เคล็ดลับการตลาดออนไลน์ รีวิวผลงาน และข่าวสารจาก Ai Create
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📝</div>
          <p className="text-gray-500">ยังไม่มีบทความ</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="group"
            >
              <article
                className="bg-white rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1"
                style={{
                  boxShadow:
                    "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-40 flex items-center justify-center">
                  <Image src="/icons/blog.svg" alt="บทความ" width={100} height={70} className="drop-shadow-lg" />
                </div>
                <div className="p-6">
                  <time className="text-xs text-gray-400 mb-2 block">
                    {new Date(article.createdAt).toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h2 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  {article.excerpt && (
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {article.excerpt}
                    </p>
                  )}
                  <div className="mt-4 text-blue-600 text-sm font-semibold group-hover:underline">
                    อ่านต่อ →
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
