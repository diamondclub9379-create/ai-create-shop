"use client";

import { useState } from "react";
import Link from "next/link";

interface Portfolio {
  id: number;
  title: string;
  slug: string;
  description: string;
  result: string | null;
  clientName: string | null;
  platform: string | null;
}

export default function PortfolioFilter({
  portfolios,
  platforms,
}: {
  portfolios: Portfolio[];
  platforms: string[];
}) {
  const [activePlatform, setActivePlatform] = useState<string | null>(null);

  const filtered = activePlatform
    ? portfolios.filter((p) => p.platform?.includes(activePlatform))
    : portfolios;

  // Platform icon map
  const platformIcon: Record<string, string> = {
    TikTok: "🎵",
    Instagram: "📸",
    Facebook: "👍",
    YouTube: "▶️",
    "Facebook Ads": "📢",
  };

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <button
          onClick={() => setActivePlatform(null)}
          className={`px-6 py-3 rounded-full font-semibold transition-all ${
            activePlatform === null
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          style={
            activePlatform === null
              ? { boxShadow: "0 4px 14px rgba(99,102,241,0.3)" }
              : {}
          }
        >
          ทั้งหมด ({portfolios.length})
        </button>
        {platforms.map((platform) => (
          <button
            key={platform}
            onClick={() => setActivePlatform(platform)}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              activePlatform === platform
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            style={
              activePlatform === platform
                ? { boxShadow: "0 4px 14px rgba(99,102,241,0.3)" }
                : {}
            }
          >
            {platformIcon[platform] || "🌐"} {platform}
          </button>
        ))}
      </div>

      {/* Portfolio grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((item) => (
          <Link
            key={item.id}
            href={`/portfolio/${item.slug}`}
            className="group"
          >
            <div
              className="bg-white rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1 h-full flex flex-col"
              style={{
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
              }}
            >
              <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 h-44 flex items-center justify-center relative">
                <img src="/icons/portfolio.svg" alt="ผลงาน" width={110} height={75} className="drop-shadow-lg" />
                {item.platform && (
                  <span className="absolute top-3 right-3 bg-white/90 text-gray-700 text-xs px-3 py-1 rounded-full font-semibold">
                    {item.platform}
                  </span>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                {item.clientName && (
                  <span className="text-xs text-purple-600 font-semibold mb-1">
                    {item.clientName}
                  </span>
                )}
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                  {item.description}
                </p>

                {item.result && (
                  <div
                    className="rounded-lg p-3 text-sm mt-auto"
                    style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0" }}
                  >
                    <span className="font-semibold text-green-700">
                      ผลลัพธ์:
                    </span>{" "}
                    <span className="text-green-600">{item.result}</span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">ไม่พบผลงานในหมวดนี้</p>
        </div>
      )}
    </>
  );
}
