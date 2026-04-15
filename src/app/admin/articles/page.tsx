"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  published: boolean;
  createdAt: string;
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", excerpt: "" });

  const fetchArticles = useCallback(async () => {
    const res = await fetch("/api/articles");
    const data = await res.json();
    setArticles(data);
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm({ title: "", content: "", excerpt: "" });
        setShowForm(false);
        fetchArticles();
      }
    } catch {
      alert("เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("ต้องการลบบทความนี้?")) return;
    await fetch(`/api/articles/${id}`, { method: "DELETE" });
    fetchArticles();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">จัดการบทความ</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition"
        >
          {showForm ? "ปิดฟอร์ม" : "+ เพิ่มบทความใหม่"}
        </button>
      </div>

      {/* Add Article Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-6 mb-8"
          style={{
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
            border: "1px solid #e5e7eb",
          }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            เพิ่มบทความใหม่
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            ก็อปเนื้อหาจาก Facebook มาวางได้เลย
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                หัวข้อบทความ *
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="ชื่อบทความ"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                คำอธิบายสั้นๆ (แสดงในหน้ารายการ)
              </label>
              <input
                type="text"
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="สรุปสั้นๆ 1-2 บรรทัด (ถ้าไม่กรอก จะตัดจากเนื้อหาอัตโนมัติ)"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                เนื้อหาบทความ *
              </label>
              <textarea
                required
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                rows={10}
                placeholder="ก็อปเนื้อหาจาก Facebook มาวางได้เลย..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-full font-bold hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? "กำลังบันทึก..." : "บันทึกบทความ"}
            </button>
          </div>
        </form>
      )}

      {/* Article List */}
      <div className="space-y-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              border: "1px solid #e5e7eb",
            }}
          >
            <div className="flex-1">
              <h3 className="font-bold text-gray-800">{article.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(article.createdAt).toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/blog/${article.slug}`}
                className="text-blue-600 hover:underline text-sm"
              >
                ดูบทความ
              </Link>
              <button
                onClick={() => handleDelete(article.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                ลบ
              </button>
            </div>
          </div>
        ))}

        {articles.length === 0 && (
          <p className="text-center text-gray-500 py-8">ยังไม่มีบทความ</p>
        )}
      </div>
    </div>
  );
}
