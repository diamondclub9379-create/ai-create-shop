"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface ServiceCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  categorySlug?: string;
}

// Per-service images (matched by service name keyword)
const serviceImages: Record<string, string> = {
  "TikTok/Reels": "/icons/svc-tiktok-reels.svg",
  "รีวิวสินค้า": "/icons/svc-review-clip.svg",
  "โฆษณา/โปรโมท": "/icons/svc-ads-promo.svg",
  "YouTube": "/icons/svc-youtube-long.svg",
  "AI Cloning Secrets": "/icons/svc-ai-course.svg",
  "AI Clone — ให้": "/icons/svc-ai-service.svg",
  "VIP": "/icons/svc-ai-vip.svg",
  "แพ็คเกจ S": "/icons/svc-page-s.svg",
  "แพ็คเกจ M": "/icons/svc-page-m.svg",
  "แพ็คเกจ L": "/icons/svc-page-l.svg",
};

// Fallback category images
const categoryImages: Record<string, string> = {
  "video-production": "/icons/video-production.svg",
  "ai-cloning": "/icons/ai-cloning.svg",
  "fanpage-management": "/icons/fanpage-management.svg",
};

function getServiceImage(name: string, categorySlug?: string): string | null {
  for (const [keyword, img] of Object.entries(serviceImages)) {
    if (name.includes(keyword)) return img;
  }
  return categorySlug ? categoryImages[categorySlug] || null : null;
}

export default function ServiceCard({
  id,
  name,
  description,
  price,
  categorySlug,
}: ServiceCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleAdd = () => {
    addItem({ id, name, price });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const hasDetails = description.includes("\n");
  const lines = description.split("\n").filter((l) => l.trim());
  const firstLine = lines[0];
  const bulletLines = lines.slice(1);
  const isMonthly = price >= 5000;
  const imgSrc = getServiceImage(name, categorySlug);

  return (
    <div
      className="bg-white rounded-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
      style={{
        boxShadow:
          "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
        border: "1px solid #e5e7eb",
      }}
    >
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-5 flex items-center justify-center h-28">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={name}
            width={90}
            height={90}
            className="drop-shadow-lg"
          />
        ) : (
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{name}</h3>

        {hasDetails ? (
          <>
            <p className="text-gray-600 text-sm mb-2">{firstLine}</p>
            {expanded && (
              <ul className="text-gray-600 text-sm space-y-1 mb-3">
                {bulletLines.map((line, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-blue-500 shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>{line.replace(/^•\s*/, "")}</span>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-blue-500 text-xs font-semibold mb-3 hover:underline self-start"
            >
              {expanded ? "ซ่อนรายละเอียด ▲" : "ดูรายละเอียด ▼"}
            </button>
          </>
        ) : (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {description}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-2">
          <div>
            <div className="text-2xl font-bold text-blue-600">
              ฿{price.toLocaleString()}
            </div>
            {isMonthly && (
              <span className="text-xs text-gray-400">/เดือน</span>
            )}
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
