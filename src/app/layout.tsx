import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LineFloatingButton from "@/components/LineFloatingButton";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Ai Create | รับทำคลิป & ปั๊มยอด Social Media",
  description:
    "บริการรับทำคลิปวิดีโอ ปั๊มยอด Social Media ครบวงจร ราคาเป็นมิตร โดย Ai Create",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="min-h-screen">
        <CartProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-64px)]">{children}</main>
          <Footer />
          <LineFloatingButton />
        </CartProvider>
      </body>
    </html>
  );
}
