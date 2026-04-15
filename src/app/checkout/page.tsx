"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    lineId: "",
    note: "",
  });

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-6">📋</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          ไม่มีรายการในตะกร้า
        </h1>
        <Link
          href="/services"
          className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold"
        >
          ไปเลือกบริการ
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          totalPrice,
          items: items.map((item) => ({
            serviceId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      });

      if (!res.ok) throw new Error("Order failed");

      const data = await res.json();
      clearCart();
      router.push(`/order-success?id=${data.id}`);
    } catch {
      alert("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">สั่งซื้อบริการ</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              ข้อมูลการติดต่อ
            </h2>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                ชื่อ-นามสกุล *
              </label>
              <input
                type="text"
                required
                value={form.customerName}
                onChange={(e) =>
                  setForm({ ...form, customerName: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="กรอกชื่อ-นามสกุล"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                เบอร์โทรศัพท์ *
              </label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="08x-xxx-xxxx"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Line ID *
              </label>
              <input
                type="text"
                required
                value={form.lineId}
                onChange={(e) => setForm({ ...form, lineId: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Line ID สำหรับติดต่อกลับ"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                หมายเหตุเพิ่มเติม
              </label>
              <textarea
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                rows={3}
                placeholder="รายละเอียดเพิ่มเติม เช่น ลิงก์เพจ, ลิงก์โพสต์ ฯลฯ"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-full text-lg font-bold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "กำลังสั่งซื้อ..." : "ยืนยันสั่งซื้อ"}
          </button>
        </form>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              สรุปรายการสั่งซื้อ
            </h2>

            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="font-semibold">
                    ฿{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between">
                <span className="text-lg font-bold">ยอดรวม</span>
                <span className="text-2xl font-bold text-blue-600">
                  ฿{totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">
                วิธีชำระเงิน
              </h3>
              <p className="text-sm text-blue-700">
                หลังจากสั่งซื้อ กรุณาแจ้งชำระเงินผ่าน Line
                ทีมงานจะติดต่อกลับภายใน 30 นาที
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
