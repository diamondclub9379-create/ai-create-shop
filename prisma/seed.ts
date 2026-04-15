import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.service.deleteMany();
  await prisma.category.deleteMany();

  const clipCategory = await prisma.category.create({
    data: { name: "รับทำคลิป", slug: "video-production", icon: "🎬" },
  });

  const socialCategory = await prisma.category.create({
    data: { name: "ปั๊มยอด Social Media", slug: "social-boost", icon: "🚀" },
  });

  await prisma.service.createMany({
    data: [
      {
        name: "คลิปสั้น TikTok/Reels",
        description: "คลิปวิดีโอสั้น 30-60 วินาที สำหรับ TikTok, Instagram Reels พร้อมตัดต่อ ใส่เอฟเฟกต์ เพลงประกอบ",
        price: 499,
        categoryId: clipCategory.id,
      },
      {
        name: "คลิปรีวิวสินค้า",
        description: "คลิปรีวิวสินค้า 1-3 นาที พร้อม Script ถ่ายทำ ตัดต่อ ใส่ซับไตเติ้ล",
        price: 990,
        categoryId: clipCategory.id,
      },
      {
        name: "คลิปโฆษณา/โปรโมท",
        description: "คลิปโฆษณาสินค้า/บริการ 1-5 นาที ออกแบบสตอรี่บอร์ด ตัดต่อมืออาชีพ ใส่กราฟิก",
        price: 1990,
        categoryId: clipCategory.id,
      },
      {
        name: "คลิปยาว YouTube",
        description: "คลิปวิดีโอ 5-10 นาที สำหรับ YouTube พร้อม Thumbnail, ตัดต่อ, กราฟิก, ซับไตเติ้ล",
        price: 3500,
        categoryId: clipCategory.id,
      },
    ],
  });

  await prisma.service.createMany({
    data: [
      {
        name: "เพิ่มผู้ติดตาม Facebook",
        description: "เพิ่มผู้ติดตามเพจ Facebook 1,000 คน คนจริง เริ่มทำภายใน 24 ชม.",
        price: 590,
        categoryId: socialCategory.id,
      },
      {
        name: "เพิ่มไลค์โพสต์ Facebook",
        description: "เพิ่มไลค์โพสต์ Facebook 1,000 ไลค์ เริ่มทำทันที",
        price: 290,
        categoryId: socialCategory.id,
      },
      {
        name: "เพิ่มผู้ติดตาม Instagram",
        description: "เพิ่มผู้ติดตาม Instagram 1,000 คน โปรไฟล์จริง เริ่มทำภายใน 24 ชม.",
        price: 490,
        categoryId: socialCategory.id,
      },
      {
        name: "เพิ่มวิว TikTok",
        description: "เพิ่มยอดวิว TikTok 10,000 วิว เริ่มทำทันที ยอดขึ้นเร็ว",
        price: 390,
        categoryId: socialCategory.id,
      },
      {
        name: "เพิ่มวิว YouTube",
        description: "เพิ่มยอดวิว YouTube 1,000 วิว วิวจริง Retention สูง",
        price: 490,
        categoryId: socialCategory.id,
      },
      {
        name: "เพิ่ม Subscriber YouTube",
        description: "เพิ่ม Subscriber YouTube 1,000 คน คนจริง ไม่หลุด",
        price: 990,
        categoryId: socialCategory.id,
      },
    ],
  });

  // Seed sample articles
  await prisma.article.deleteMany();
  await prisma.article.createMany({
    data: [
      {
        title: "ทำไมธุรกิจยุคนี้ต้องมีคลิปวิดีโอ?",
        slug: "why-business-needs-video",
        content: `ในยุคดิจิทัลที่ทุกคนใช้โซเชียลมีเดีย คลิปวิดีโอกลายเป็นเครื่องมือสำคัญในการทำการตลาด

คลิปวิดีโอช่วยเพิ่ม Engagement ได้มากกว่าโพสต์ภาพนิ่งถึง 3 เท่า ทำให้ลูกค้าเข้าใจสินค้า/บริการได้เร็วขึ้น และสร้างความน่าเชื่อถือให้แบรนด์

จากประสบการณ์ของ Ai Create ลูกค้าที่ใช้คลิปวิดีโอในการโปรโมทสินค้า มียอดขายเพิ่มขึ้นเฉลี่ย 40% เมื่อเทียบกับการใช้แค่ภาพนิ่ง

หากคุณกำลังมองหาทีมทำคลิปมืออาชีพ Ai Create พร้อมให้บริการครับ`,
        excerpt: "คลิปวิดีโอช่วยเพิ่ม Engagement ได้มากกว่าโพสต์ภาพนิ่งถึง 3 เท่า ทำให้ลูกค้าเข้าใจสินค้าได้เร็วขึ้น",
        published: true,
      },
      {
        title: "5 เคล็ดลับเพิ่มยอดผู้ติดตามบน Social Media",
        slug: "5-tips-increase-followers",
        content: `การเพิ่มยอดผู้ติดตามบน Social Media ไม่ใช่เรื่องยาก หากรู้เทคนิคที่ถูกต้อง

1. โพสต์สม่ำเสมอ - ควรโพสต์อย่างน้อย 3-5 ครั้งต่อสัปดาห์
2. ใช้ Hashtag ที่เกี่ยวข้อง - ช่วยให้คนใหม่ๆ เจอเพจของคุณ
3. สร้าง Content ที่มีคุณค่า - ให้ข้อมูลที่เป็นประโยชน์ ไม่ใช่แค่ขายของ
4. Engage กับผู้ติดตาม - ตอบคอมเมนต์ ตอบข้อความ สร้างความสัมพันธ์
5. ลงทุนกับ Boost - ใช้งบเล็กน้อยในการ Boost โพสต์ที่มี Engagement สูง

และถ้าต้องการเพิ่มผู้ติดตามแบบรวดเร็ว Ai Create มีบริการปั๊มยอด Social Media ทุกแพลตฟอร์มครับ`,
        excerpt: "5 เทคนิคง่ายๆ ที่ช่วยเพิ่มยอดผู้ติดตามบน Social Media ได้จริง",
        published: true,
      },
      {
        title: "รีวิวผลงาน: คลิปโปรโมทร้านอาหารสุดปัง!",
        slug: "review-restaurant-promo-clip",
        content: `ล่าสุด Ai Create ได้รับโอกาสทำคลิปโปรโมทให้ร้านอาหารชื่อดังย่านสุขุมวิท

คลิปนี้มีความยาว 1 นาที สำหรับลง TikTok และ Instagram Reels ใช้เทคนิคการถ่ายแบบ Close-up อาหาร สลับกับบรรยากาศร้าน พร้อมเพลงประกอบสนุกๆ

ผลลัพธ์หลังลงคลิปเพียง 3 วัน:
- ยอดวิว 50,000+
- ยอดไลค์ 3,000+
- มีลูกค้าใหม่เข้าร้านเพิ่มขึ้น 30%

ลูกค้าประทับใจมากครับ สนใจทำคลิปแบบนี้ ติดต่อ Ai Create ได้เลย!`,
        excerpt: "ผลงานล่าสุด คลิปโปรโมทร้านอาหาร ยอดวิว 50,000+ ใน 3 วัน!",
        published: true,
      },
    ],
  });

  // Seed portfolio
  await prisma.portfolio.deleteMany();
  await prisma.portfolio.createMany({
    data: [
      {
        title: "คลิปโปรโมทร้านอาหารย่านสุขุมวิท",
        slug: "restaurant-promo-sukhumvit",
        description: "คลิปสั้น 1 นาที สำหรับ TikTok และ Instagram Reels ถ่ายแบบ Close-up อาหาร สลับบรรยากาศร้าน พร้อมเพลงประกอบสนุกๆ",
        result: "ยอดวิว 50,000+ ใน 3 วัน / ไลค์ 3,000+ / ลูกค้าใหม่เข้าร้านเพิ่ม 30%",
        clientName: "ร้านอาหาร XYZ",
        platform: "TikTok / Instagram",
      },
      {
        title: "ปั๊มผู้ติดตาม Instagram ร้านเสื้อผ้า",
        slug: "ig-followers-clothing-shop",
        description: "เพิ่มผู้ติดตาม Instagram จาก 500 เป็น 5,000 คนภายใน 2 สัปดาห์ ผู้ติดตามจริง โปรไฟล์จริง มี Engagement ดี",
        result: "ผู้ติดตามเพิ่ม 4,500 คน / Engagement Rate เพิ่ม 25% / ยอดขายเพิ่ม 40%",
        clientName: "ร้านเสื้อผ้า ABC",
        platform: "Instagram",
      },
      {
        title: "คลิปรีวิวสินค้า Skincare",
        slug: "skincare-review-clip",
        description: "คลิปรีวิวสินค้า Skincare 2 นาที พร้อม Script มืออาชีพ ถ่ายทำด้วยแสงธรรมชาติ ตัดต่อใส่ซับไตเติ้ล กราฟิกสวยงาม",
        result: "ยอดวิว 30,000+ / แชร์ 500+ / ยอดสั่งซื้อสินค้าเพิ่ม 50%",
        clientName: "แบรนด์ Skincare DEF",
        platform: "TikTok / Facebook",
      },
      {
        title: "เพิ่มวิว YouTube ช่อง Travel Vlog",
        slug: "youtube-views-travel-vlog",
        description: "เพิ่มยอดวิว YouTube 50,000 วิว สำหรับคลิป Travel Vlog วิวจริง Retention สูง ช่วยให้วิดีโอติดแนะนำ",
        result: "วิว 50,000+ / Watch Time เพิ่ม 200% / ติด YouTube Suggested",
        clientName: "ช่อง Travel Vlog GHI",
        platform: "YouTube",
      },
      {
        title: "คลิปโฆษณาคอร์สออนไลน์",
        slug: "online-course-ad-clip",
        description: "คลิปโฆษณา 30 วินาที สำหรับยิง Facebook Ads ออกแบบสตอรี่บอร์ด ใส่กราฟิก Motion ดึงดูดสายตา พร้อม CTA ชัดเจน",
        result: "CTR 4.5% (เฉลี่ยอุตสาหกรรม 1.5%) / ลดต้นทุนต่อ Lead 60% / ยอดสมัครเพิ่ม 120%",
        clientName: "คอร์สออนไลน์ JKL",
        platform: "Facebook Ads",
      },
      {
        title: "เพิ่มไลค์เพจ Facebook ร้านกาแฟ",
        slug: "fb-likes-coffee-shop",
        description: "เพิ่มไลค์เพจ Facebook จาก 200 เป็น 3,000 ไลค์ คนจริง ท้องถิ่น เพิ่ม Reach ให้โพสต์ของร้าน",
        result: "ไลค์เพจเพิ่ม 2,800 / Reach โพสต์เพิ่ม 300% / ลูกค้า Walk-in เพิ่ม 20%",
        clientName: "ร้านกาแฟ MNO",
        platform: "Facebook",
      },
    ],
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
