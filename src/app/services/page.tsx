import { prisma } from "@/lib/prisma";
import ServiceCard from "@/components/ServiceCard";
import ServiceTabs from "./ServiceTabs";

export default async function ServicesPage() {
  const categories = await prisma.category.findMany({
    include: { services: true },
    orderBy: { id: "asc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          บริการทั้งหมด
        </h1>
        <p className="text-gray-600 text-lg">
          เลือกบริการที่คุณต้องการ แล้วเพิ่มลงตะกร้าได้เลย
        </p>
      </div>

      <ServiceTabs categories={categories} />
    </div>
  );
}
