"use client";

import { useState } from "react";
import ServiceCard from "@/components/ServiceCard";

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  services: Service[];
}

export default function ServiceTabs({ categories }: { categories: Category[] }) {
  const [activeTab, setActiveTab] = useState<number | null>(null);

  const filteredCategories = activeTab
    ? categories.filter((c) => c.id === activeTab)
    : categories;

  return (
    <>
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <button
          onClick={() => setActiveTab(null)}
          className={`px-6 py-3 rounded-full font-semibold transition-all ${
            activeTab === null
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          ทั้งหมด
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              activeTab === cat.id
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Services grid */}
      {filteredCategories.map((cat) => (
        <div key={cat.id} className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {cat.icon} {cat.name}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
      ))}
    </>
  );
}
