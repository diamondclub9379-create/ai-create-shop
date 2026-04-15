"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface ServiceCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  icon?: string;
}

export default function ServiceCard({ id, name, description, price, icon }: ServiceCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ id, name, price });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden" style={{ boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-center">
        <span className="text-4xl">{icon || "✨"}</span>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">
            ฿{price.toLocaleString()}
          </div>
          <button
            onClick={handleAdd}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              added
                ? "bg-green-500 text-white"
                : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:scale-105"
            }`}
          >
            {added ? "เพิ่มแล้ว ✓" : "เพิ่มลงตะกร้า"}
          </button>
        </div>
      </div>
    </div>
  );
}
