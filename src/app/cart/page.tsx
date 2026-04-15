"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          ตะกร้าว่างเปล่า
        </h1>
        <p className="text-gray-600 mb-8">
          ยังไม่มีบริการในตะกร้า เลือกบริการที่ต้องการได้เลย
        </p>
        <Link
          href="/services"
          className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition"
        >
          ไปเลือกบริการ
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">ตะกร้าสินค้า</h1>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-gray-100"
          >
            <div className="flex-1">
              <h3 className="font-bold text-gray-800">{item.name}</h3>
              <p className="text-blue-600 font-semibold">
                ฿{item.price.toLocaleString()} / รายการ
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-600 transition"
              >
                -
              </button>
              <span className="text-lg font-bold w-8 text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-600 transition"
              >
                +
              </button>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold text-gray-800">
                ฿{(item.price * item.quantity).toLocaleString()}
              </p>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-400 hover:text-red-600 text-sm transition mt-1"
              >
                ลบ
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-bold text-gray-800">ยอดรวมทั้งหมด</span>
          <span className="text-3xl font-bold text-blue-600">
            ฿{totalPrice.toLocaleString()}
          </span>
        </div>
        <Link
          href="/checkout"
          className="block w-full text-center bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-full text-lg font-bold hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
        >
          ดำเนินการสั่งซื้อ
        </Link>
      </div>
    </div>
  );
}
