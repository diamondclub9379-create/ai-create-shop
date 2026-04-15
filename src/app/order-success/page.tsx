"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="bg-white rounded-2xl shadow-lg p-10 border border-gray-100">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          สั่งซื้อสำเร็จ!
        </h1>
        {orderId && (
          <p className="text-lg text-gray-600 mb-2">
            หมายเลขออเดอร์: <span className="font-bold text-blue-600">#{orderId}</span>
          </p>
        )}
        <p className="text-gray-600 mb-8">
          ขอบคุณที่ใช้บริการ Ai Create กรุณาแจ้งชำระเงินผ่าน Line
          เพื่อดำเนินการต่อ
        </p>

        <div className="bg-blue-50 rounded-xl p-6 mb-8 text-left">
          <h3 className="font-bold text-blue-800 mb-3">ขั้นตอนถัดไป:</h3>
          <ol className="space-y-2 text-blue-700 text-sm">
            <li>1. แจ้งหมายเลขออเดอร์ผ่าน Line</li>
            <li>2. โอนเงินตามยอดที่สั่งซื้อ</li>
            <li>3. แนบสลิปการโอนเงิน</li>
            <li>4. รอทีมงานตรวจสอบและดำเนินการ</li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://line.me/R/ti/p/@aicreate"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
            style={{ backgroundColor: "#06C755" }}
          >
            แจ้งชำระผ่าน Line @aicreate
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100075628369768"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            ติดต่อผ่าน Facebook
          </a>
          <Link
            href="/"
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            กลับหน้าแรก
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">กำลังโหลด...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
