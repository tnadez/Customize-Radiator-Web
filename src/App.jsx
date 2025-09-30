// import { useState } from 'react'
// import { HashRouter as Router, Route ,Routes } from 'react-router-dom'
// // import './App.css'
// import { Home } from './pages/Home'

// function App() {
//   // const [count, setCount] = useState(0)

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home/>}/>
//       </Routes>
//     </Router>
//   )
// }

// export default App

import React, { useState } from "react";
import { motion } from "framer-motion";

// Single-file React mockup for a sales website
// - Tailwind CSS classes used (assumes Tailwind is set up in the project)
// - Simple client-side navigation (no router) so it's easy to drop in
// - Replace placeholder images/text with real content later

const navItems = [
  { id: "home", label: "หน้าหลัก" },
  { id: "system", label: "Custom Car Radiator Design System" },
  { id: "about", label: "เกี่ยวกับ" },
  { id: "contact", label: "ติดต่อ" },
];

const placeholderImages = Array.from({ length: 8 }).map((_, i) =>
  `https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=60&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&sat=${i * 10 + 30}`
);

export default function CustomCarRadiatorDesignMockup() {
  const [page, setPage] = useState("home");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Header / Nav */}
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-teal-400 flex items-center justify-center text-white font-bold">CR</div>
            <div>
              <div className="text-lg font-semibold">นิรันดร์ลา</div>
              <div className="text-xs text-gray-500">Custom Car Radiator Design</div>
            </div>
          </div>

          <nav className="hidden md:flex gap-4 items-center">
            {navItems.map((n) => (
              <button
                key={n.id}
                onClick={() => setPage(n.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition ${page === n.id ? "bg-gray-100" : ""}`}
              >
                {n.label}
              </button>
            ))}
            <a href="#contact" onClick={() => setPage('contact')} className="ml-3 inline-block px-4 py-2 bg-blue-600 text-white rounded-md text-sm">ขอใบเสนอราคา</a>
          </nav>

          <div className="md:hidden">
            <select
              value={page}
              onChange={(e) => setPage(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              {navItems.map((n) => (
                <option key={n.id} value={n.id}>{n.label}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {page === "home" && <HomeGallery onOpenSystem={() => setPage('system')} />}
        {page === "system" && <SystemMain />}
        {page === "about" && <About />}
        {page === "contact" && <ContactForm />}
      </main>

      <footer className="mt-12 border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">© {new Date().getFullYear()} นิรันดร์ลา — Custom Car Radiator Design</div>
          <div className="text-sm text-gray-500">Designed as a simple mockup • Ready to connect to backend / CMS</div>
        </div>
      </footer>
    </div>
  );
}

function HomeGallery({ onOpenSystem }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold">ผลงานของเรา</h1>
          <p className="text-gray-600 mt-1">ผลงานออกแบบหม้อน้ำรถยนต์แบบสั่งตัด — ตัวอย่างงานและโปรเจคที่เสร็จแล้ว</p>
        </div>
        <div>
          <button onClick={onOpenSystem} className="px-4 py-2 bg-teal-600 text-white rounded-md">ดูระบบออกแบบ</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {placeholderImages.map((src, idx) => (
          <motion.div key={idx} whileHover={{ scale: 1.03 }} className="rounded-lg overflow-hidden shadow-sm bg-white">
            <img src={src} alt={`portfolio-${idx}`} className="w-full h-48 object-cover" />
            <div className="p-3">
              <div className="font-semibold">Project #{idx + 1}</div>
              <div className="text-xs text-gray-500 mt-1">คอมเมนต์สั้น ๆ เกี่ยวกับงานออกแบบ</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function SystemMain() {
  return (
    <section>
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold">Custom Car Radiator Design System</h2>
            <p className="text-gray-600 mt-2">หน้างานหลักของระบบ — ที่นี่ลูกค้าสามารถดูขั้นตอนการออกแบบ ปรับสเปค และดาวน์โหลดแบบจำลอง 3D (mockup หน้าเปล่าในตอนนี้)</p>

            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li>• เลือกขนาด (Width × Height × Thickness)</li>
              <li>• วัสดุและคอร์ (Core) แบบต่าง ๆ</li>
              <li>• พอร์ทและตำแหน่งขาเข้าขาออก</li>
              <li>• ประมาณราคาเบื้องต้น และขอใบเสนอราคา</li>
            </ul>

            <div className="mt-6">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md">ทดลองปรับขนาด (mock)</button>
              <button className="ml-3 px-4 py-2 border rounded-md">ดาวน์โหลดแบบ (ยังไม่เชื่อม)</button>
            </div>
          </div>

          <div className="w-full lg:w-96 h-56 bg-gray-100 rounded-xl flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="font-medium">Preview Mockup</div>
              <div className="text-xs mt-2">(พื้นที่แสดงแบบ 2D/3D ในเวอร์ชันสมบูรณ์)</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Step 1: ขนาด" desc="กำหนด W × H × T" />
        <Card title="Step 2: Material" desc="เลือกวัสดุและคอร์" />
        <Card title="Step 3: Ports" desc="เลือกตำแหน่งขาเข้า/ออก" />
      </div>
    </section>
  );
}

function Card({ title, desc }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="bg-white p-4 rounded-lg shadow-sm">
      <div className="font-semibold">{title}</div>
      <div className="text-sm text-gray-600 mt-2">{desc}</div>
    </motion.div>
  );
}

function About() {
  return (
    <section className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold">เกี่ยวกับเรา</h2>
      <p className="text-gray-600 mt-3">นิรันดร์ลา — ผู้เชี่ยวชาญด้านการออกแบบหม้อน้ำรถยนต์แบบสั่งตัด ให้บริการทั้งงานออกแบบ ผลิต และติดตั้งสำหรับรถแข่ง รถยนต์แต่ง และยานยนต์เฉพาะทาง</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="font-semibold">ประสบการณ์</div>
          <div className="text-sm text-gray-600 mt-1">มากกว่า 10 ปีในการออกแบบหม้อน้ำสำหรับทีมแข่งและอู่แต่ง</div>
        </div>
        <div>
          <div className="font-semibold">บริการ</div>
          <div className="text-sm text-gray-600 mt-1">ออกแบบ, ผลิตตามสั่ง, ทดสอบความร้อน, ให้คำปรึกษาด้านระบบหล่อเย็น</div>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  return (
    <section id="contact" className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold">ติดต่อเรา</h2>
      <p className="text-gray-600 mt-2">กรอกข้อมูลเพื่อรับใบเสนอราคาเบื้องต้น — (แบบ mockup: ฟอร์มยังไม่เชื่อมต่อ)</p>

      <form className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="p-3 border rounded" placeholder="ชื่อ-นามสกุล" />
        <input className="p-3 border rounded" placeholder="อีเมล" />
        <input className="p-3 border rounded" placeholder="เบอร์โทร" />
        <input className="p-3 border rounded" placeholder="รุ่นรถ / รายละเอียดสั้น ๆ" />
        <textarea className="md:col-span-2 p-3 border rounded" rows={4} placeholder="รายละเอียดเพิ่มเติม" />

        <div className="md:col-span-2 flex items-center gap-3">
          <button type="button" className="px-4 py-2 bg-green-600 text-white rounded-md">ส่ง</button>
          <button type="button" className="px-4 py-2 border rounded-md">รีเซ็ต</button>
        </div>
      </form>

      <div className="mt-6 text-sm text-gray-500">ที่อยู่สำนักงาน (ตัวอย่าง): 123/4 ถนนตัวอย่าง แขวงตัวอย่าง เขตตัวอย่าง กรุงเทพฯ</div>
    </section>
  );
}
