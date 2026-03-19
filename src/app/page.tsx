'use client';

import { Navbar } from '@/components/Navbar';
import { AberrationCard } from '@/components/AberrationCard';
import { motion } from 'framer-motion';
import { 
  Zap, 
  CircleDot, 
  Telescope, 
  Focus, 
  Maximize2, 
  Palette 
} from 'lucide-react';

const aberrations = [
  {
    title: "球差 (Spherical Aberration)",
    description: "由于球面镜对边缘光线和中心光线的折射能力不同，导致它们无法汇聚在同一点。",
    href: "/aberrations/spherical",
    icon: <CircleDot className="w-8 h-8" />,
    delay: 0.1
  },
  {
    title: "彗差 (Coma)",
    description: "离轴点光源发出的光经光学系统成像后，在像面上形成像彗星一样的弥散斑。",
    href: "/aberrations/coma",
    icon: <Zap className="w-8 h-8" />,
    delay: 0.2
  },
  {
    title: "像散 (Astigmatism)",
    description: "光学系统在子午面和弧矢面上的成像焦点不重合，导致成像模糊。",
    href: "/aberrations/astigmatism",
    icon: <Telescope className="w-8 h-8" />,
    delay: 0.3
  },
  {
    title: "场曲 (Field Curvature)",
    description: "成像面不再是平面，而是一个曲面，导致中心和边缘无法同时清晰成像。",
    href: "/aberrations/field-curvature",
    icon: <Maximize2 className="w-8 h-8" />,
    delay: 0.4
  },
  {
    title: "畸变 (Distortion)",
    description: "成像的放大率随离轴距离的变化而变化，导致图像形状扭曲（桶形或枕形）。",
    href: "/aberrations/distortion",
    icon: <Focus className="w-8 h-8" />,
    delay: 0.5
  },
  {
    title: "色差 (Chromatic Aberration)",
    description: "不同颜色的光折射率不同，导致成像焦点不重合，边缘出现色晕。",
    href: "/aberrations/chromatic",
    icon: <Palette className="w-8 h-8" />,
    delay: 0.6
  }
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 scientific-heading leading-tight pt-10">
              探索光影的奥秘 <br />
              <span className="text-slate-200">几何光学像差</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
              像差是光学系统的必然缺陷。通过生动的交互式动画和物理模拟，
              深入理解光线如何在非理想系统中传播并产生误差。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-3 bg-accent-cyan text-slate-950 font-bold rounded-lg hover:bg-accent-cyan/90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                开始学习
              </button>
              <button className="px-8 py-3 glass neon-border text-white font-bold rounded-lg hover:bg-white/5 transition-all">
                物理原理
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Background Bokeh Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-cyan/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px] -z-10 animate-pulse duration-[4000ms]"></div>
      </section>

      {/* Aberrations Grid */}
      <section className="py-20 px-6 bg-slate-950/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent-cyan/20"></div>
            <h2 className="text-2xl font-bold scientific-heading">六大像差类型</h2>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent-cyan/20"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aberrations.map((item, index) => (
              <AberrationCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 text-center text-slate-500 text-sm">
        <p>© 2026 OpticsLab - 几何光学像差教学平台</p>
      </footer>
    </main>
  );
}
