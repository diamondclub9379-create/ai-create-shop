import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import ServiceCard from "@/components/ServiceCard";

export default async function HomePage() {
  const categories = await prisma.category.findMany({
    include: { services: { take: 3 } },
  });

  const latestPortfolios = await prisma.portfolio.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const latestArticles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Ai Create
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-blue-100">
            บริการรับทำคลิป & ปั๊มยอด Social Media
          </p>
          <p className="text-lg mb-8 text-blue-200 max-w-2xl mx-auto">
            ครบวงจร มืออาชีพ ราคาเป็นมิตร เริ่มต้นเพียง 290 บาท
          </p>
          <Link
            href="/services"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            ดูบริการทั้งหมด
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            ทำไมต้องเลือก Ai Create?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                img: "/icons/speed.svg",
                title: "รวดเร็วทันใจ",
                desc: "เริ่มดำเนินการทันทีหลังชำระเงิน ไม่ต้องรอนาน",
              },
              {
                img: "/icons/quality.svg",
                title: "คุณภาพระดับมืออาชีพ",
                desc: "ทีมงานมีประสบการณ์ ผลงานคุณภาพสูง การันตีความพึงพอใจ",
              },
              {
                img: "/icons/support.svg",
                title: "ซัพพอร์ต 24 ชม.",
                desc: "ติดต่อสอบถาม พร้อมให้บริการตลอด ผ่าน Line และ Facebook",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  <Image src={item.img} alt={item.title} width={72} height={72} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services */}
      {categories.map((cat) => (
        <section key={cat.id} className="py-12" style={{ backgroundColor: '#f1f5f9' }}>
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">
              {cat.icon} {cat.name}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {cat.services.map((service) => (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  name={service.name}
                  description={service.description}
                  price={service.price}
                  categorySlug={cat.slug}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Portfolio Highlights */}
      {latestPortfolios.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                ตัวอย่างผลงาน
              </h2>
              <p className="text-gray-600">
                ผลงานจริงจากลูกค้าที่ไว้วางใจ Ai Create
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {latestPortfolios.map((item) => (
                <Link key={item.id} href={`/portfolio/${item.slug}`} className="group">
                  <div
                    className="bg-white rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1 h-full flex flex-col"
                    style={{
                      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 h-32 flex items-center justify-center relative">
                      <Image src="/icons/portfolio.svg" alt="ผลงาน" width={90} height={60} className="drop-shadow-lg" />
                      {item.platform && (
                        <span className="absolute top-2 right-2 bg-white/90 text-gray-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                          {item.platform}
                        </span>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      {item.result && (
                        <p className="text-green-600 text-sm mt-auto pt-2">
                          ✓ {item.result.split(" / ")[0]}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/portfolio" className="text-blue-600 font-semibold hover:underline">
                ดูผลงานทั้งหมด →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Latest Articles */}
      {latestArticles.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                บทความ & ผลงานล่าสุด
              </h2>
              <p className="text-gray-600">
                เคล็ดลับการตลาดออนไลน์ และรีวิวผลงานจาก Ai Create
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {latestArticles.map((article) => (
                <Link key={article.id} href={`/blog/${article.slug}`} className="group">
                  <div
                    className="bg-white rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1"
                    style={{
                      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 h-32 flex items-center justify-center">
                      <Image src="/icons/blog.svg" alt="บทความ" width={90} height={60} className="drop-shadow-lg" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-gray-500 text-sm line-clamp-2">{article.excerpt}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/blog"
                className="text-blue-600 font-semibold hover:underline"
              >
                ดูบทความทั้งหมด →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">พร้อมเริ่มต้นแล้วหรือยัง?</h2>
          <p className="text-lg mb-8 text-blue-100">
            เลือกบริการที่ต้องการ แล้วสั่งซื้อได้เลย!
          </p>
          <Link
            href="/services"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            เลือกบริการเลย
          </Link>
        </div>
      </section>
    </div>
  );
}
