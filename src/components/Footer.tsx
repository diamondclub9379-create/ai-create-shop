export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-3">Ai Create</h3>
            <p className="text-sm">
              บริการรับทำคลิปวิดีโอ และปั๊มยอด Social Media
              ครบวงจร มืออาชีพ ราคาเป็นมิตร
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">ติดต่อเรา</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=100075628369768"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Facebook: Ai Create
                </a>
              </li>
              <li>
                <a
                  href="https://line.me/R/ti/p/@aicreate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Line: @aicreate
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">เมนู</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-white transition">หน้าแรก</a>
              </li>
              <li>
                <a href="/services" className="hover:text-white transition">บริการ</a>
              </li>
              <li>
                <a href="/portfolio" className="hover:text-white transition">ผลงาน</a>
              </li>
              <li>
                <a href="/blog" className="hover:text-white transition">บทความ</a>
              </li>
              <li>
                <a href="/faq" className="hover:text-white transition">FAQ</a>
              </li>
              <li>
                <a href="/cart" className="hover:text-white transition">ตะกร้า</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          &copy; {new Date().getFullYear()} Ai Create. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
