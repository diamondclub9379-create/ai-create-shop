import Link from "next/link";
import FAQAccordion from "./FAQAccordion";

const faqs = [
  {
    question: "Ai Create ให้บริการอะไรบ้าง?",
    answer:
      "เราให้บริการ 2 หมวดหลัก คือ 1) รับทำคลิปวิดีโอ ทั้งคลิปสั้น TikTok/Reels, คลิปรีวิวสินค้า, คลิปโฆษณา และคลิปยาว YouTube 2) ปั๊มยอด Social Media ทุกแพลตฟอร์ม เช่น เพิ่มผู้ติดตาม, ไลค์, วิว บน Facebook, Instagram, TikTok, YouTube",
  },
  {
    question: "สั่งซื้อบริการอย่างไร?",
    answer:
      "เลือกบริการที่ต้องการในหน้า 'บริการ' → เพิ่มลงตะกร้า → กรอกข้อมูลติดต่อ → ยืนยันสั่งซื้อ → แจ้งชำระเงินผ่าน Line @aicreate หรือ Facebook เพจ Ai Create",
  },
  {
    question: "ชำระเงินได้ช่องทางไหน?",
    answer:
      "รับชำระผ่านการโอนเงิน PromptPay และ True Money Wallet โดยหลังจากสั่งซื้อแล้ว กรุณาแจ้งชำระเงินพร้อมแนบสลิปผ่าน Line @aicreate",
  },
  {
    question: "ใช้เวลาทำงานนานแค่ไหน?",
    answer:
      "บริการปั๊มยอด Social Media เริ่มดำเนินการภายใน 24 ชั่วโมงหลังชำระเงิน บริการทำคลิปใช้เวลา 3-7 วันทำการ ขึ้นอยู่กับความซับซ้อนของงาน",
  },
  {
    question: "มีการรับประกันไหม?",
    answer:
      "มีครับ! บริการปั๊มยอดรับประกันยอดไม่หลุด หากยอดลดลงภายใน 30 วัน เราเติมให้ฟรี บริการทำคลิปสามารถแก้ไขได้ 2 ครั้งหลังส่งมอบงาน",
  },
  {
    question: "ยอดที่ปั๊มเป็นคนจริงไหม?",
    answer:
      "ยอดผู้ติดตามและไลค์เป็นบัญชีจริง ไม่ใช่บอท มีโปรไฟล์จริง ยอดขึ้นแบบค่อยเป็นค่อยไปเพื่อความปลอดภัยของบัญชีลูกค้า",
  },
  {
    question: "ติดต่อสอบถามได้ที่ไหน?",
    answer:
      "ติดต่อได้ตลอด 24 ชั่วโมงผ่าน Line @aicreate หรือ Facebook เพจ Ai Create ทีมงานพร้อมตอบทุกคำถามครับ",
  },
  {
    question: "มีส่วนลดสำหรับลูกค้าประจำไหม?",
    answer:
      "มีครับ! ลูกค้าที่ใช้บริการเป็นประจำจะได้รับส่วนลดพิเศษ สอบถามรายละเอียดได้ทาง Line @aicreate",
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          คำถามที่พบบ่อย (FAQ)
        </h1>
        <p className="text-gray-600 text-lg">
          หากมีคำถามเพิ่มเติม ติดต่อเราได้ตลอดผ่าน Line @aicreate
        </p>
      </div>

      <FAQAccordion faqs={faqs} />

      {/* Contact CTA */}
      <div
        className="mt-12 p-8 rounded-2xl text-center"
        style={{ backgroundColor: "#eef2ff" }}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          ยังมีคำถามอื่นๆ?
        </h3>
        <p className="text-gray-600 mb-6">
          ติดต่อเราได้เลย ทีมงานพร้อมตอบทุกคำถามตลอด 24 ชม.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://line.me/R/ti/p/@aicreate"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
            style={{ backgroundColor: "#06C755" }}
          >
            Line @aicreate
          </a>
          <Link
            href="/services"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition"
          >
            ดูบริการทั้งหมด
          </Link>
        </div>
      </div>
    </div>
  );
}
