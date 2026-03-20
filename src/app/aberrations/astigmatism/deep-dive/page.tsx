'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { AberrationVisuals } from '@/components/AberrationVisuals';
import { Slider } from '@/components/Slider';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AstigmatismDeepDivePage() {
  const [param, setParam] = useState(0.5);

  return (
    <main className="min-h-screen bg-slate-950 pb-20">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-6 pt-24">
        <Link href="/aberrations/astigmatism" className="inline-flex items-center gap-2 text-accent-cyan hover:text-cyan-300 transition-colors mb-8 text-sm font-bold">
          <ArrowLeft className="w-4 h-4" /> 返回像散实验室
        </Link>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 scientific-heading text-white">深入理解像散：撕裂的焦点与斯特林光锥</h1>
          
          <div className="prose prose-invert prose-lg max-w-none text-slate-300 space-y-12">
            <p className="text-xl text-slate-300 leading-relaxed max-w-4xl p-6 glass rounded-xl border-l-4 border-accent-cyan">
              像散（Astigmatism）是所有像差中最令初学者头疼的一种三维空间畸变像差。它的本质非常简单：当一束大范围的光线<strong className="text-white">斜向</strong>（离轴外）打在哪怕是最完美对称的球面上时，透镜在这束光线的<strong className="text-accent-cyan pl-1">垂直切面</strong>与<strong className="text-accent-purple pl-1">水平切面</strong>上，展现出了完全不对等的折光能力。
            </p>

            {/* 子午面与弧矢面 */}
            <div className="glass p-8 rounded-xl border border-white/5 bg-slate-900/50">
              <h2 className="text-3xl font-bold text-accent-cyan mb-6 mt-0 flex items-center gap-3">
                <span className="bg-accent-cyan/20 px-3 py-1 rounded text-lg">01</span> 
                空间极值的降维打击：子午面(T) vs 弧矢面(S)
              </h2>
              
              <div className="text-base text-slate-400 mb-8 space-y-4">
                <p>
                  想象一个平放的圆形硬币，你正对着俯视它，它是绝对完整的圆。但如果你退后两步，以极大的倾角<strong className="text-white">斜视它</strong>，它在你眼中就收缩变成了一个<strong className="text-white">扁平的椭圆形</strong>！
                </p>
                <p>
                  迎面走向透镜的倾斜宽光束也是如此。因为斜射，它“感受到”的透镜有效折射曲率不再是圆形的，而是在两个正交方向上曲率截然不同：
                </p>
                <ul className="space-y-4 list-none pl-0 text-slate-300 mt-6">
                  <li className="p-4 bg-black/30 rounded-lg border border-accent-cyan/20">
                    <strong className="text-accent-cyan text-xl block mb-2">子午面 (Tangential Plane, T面)</strong>
                    包含主光轴与主光线的纵向截面。因为具有超前倾角，它迎合光线的曲面变得更“陡峭”。由于折射截面斜率陡增，在这个面的光线被严重过度弯折，<strong className="text-white">导致焦距剧烈变短，焦点提前在太空中聚合</strong>。
                  </li>
                  <li className="p-4 bg-black/30 rounded-lg border border-accent-purple/20">
                    <strong className="text-accent-purple text-xl block mb-2">弧矢面 (Sagittal Plane, S面)</strong>
                    垂直于子午面的横向截面。曲面的空间变化相对平缓，折射能力较弱，<strong className="text-white">焦距更长，光束在远端才迟迟开始汇聚</strong>。
                  </li>
                </ul>
              </div>
            </div>

            {/* 斯特林光锥 */}
            <div className="glass p-8 rounded-xl border border-white/5 bg-accent-purple/5">
              <h2 className="text-3xl font-bold text-accent-purple mb-6 mt-0 flex items-center gap-3">
                <span className="bg-accent-purple/20 px-3 py-1 rounded text-lg">02</span> 
                斯特林区间 (Sturm's Interval) 的奇妙演变
              </h2>
              
              <div className="text-base text-slate-300 mb-8 space-y-4">
                <p>
                  因为 $T$ 极值面和 $S$ 极值面的光线无论如何都无法在一个绝对 Z 轴深度上交汇，一个本该是汇率成圆的星点，在空间纵深中被硬生生撕裂成了一个复杂的三维光束沙漏带——这在学术上被称为<strong className="text-white text-lg px-2 border-b border-white">斯特林光锥 (Sturm's Conoid)</strong>。
                </p>
                <p>如果你在暗房里拿着一张平坦的白纸，从透镜后方慢慢往远端平移去拦截这束光，你会亲眼目睹这一系列诡异的光斑截面变形动画：</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                  <div className="p-4 border border-white/10 rounded-lg bg-black/40 text-center">
                    <strong className="text-white block mb-2">1. 第一副焦线</strong>
                    <p className="text-sm text-slate-400 pb-2">T面率先汇聚，由于S面尚未汇聚横向铺开，白纸上出现了一条绝对<strong className="text-accent-cyan">横向的线段光束</strong>。</p>
                  </div>
                  <div className="p-4 border border-white/10 rounded-lg bg-black/40 text-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    <strong className="text-white block mb-2">2. 最小弥散圆</strong>
                    <p className="text-sm text-slate-400 pb-2">再往后移动，纵向拉长，横向开始萎缩。此时长宽比例逼近 1:1 形成弥散圆。<strong className="text-emerald-400">它是这段撕裂畸变中最接近正常点的模糊斑。</strong></p>
                  </div>
                  <div className="p-4 border border-white/10 rounded-lg bg-black/40 text-center">
                    <strong className="text-white block mb-2">3. 第二副焦线</strong>
                    <p className="text-sm text-slate-400 pb-2">推到最后，S面终于迟迟汇聚，但此时急切的T面早已发散完毕，白纸上出现了一条<strong className="text-accent-purple">垂直的纵向线段光束</strong>。</p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl border border-white/5 p-6 bg-black/40">
                <h3 className="text-sm font-bold text-slate-400 mb-4 text-center tracking-widest">特征视图全景展开：三焦点截面一览</h3>
                <div className="h-64 flex-grow w-full relative mb-8 z-0">
                  <AberrationVisuals aberrationType="astigmatism" parameter={param * 5} />
                </div>
                <div className="max-w-md mx-auto relative z-50 pointer-events-auto pt-4">
                  <Slider 
                    label="像散强度 (Astigmatism Level)"
                    value={param}
                    onChange={setParam}
                    min={0}
                    max={1}
                    step={0.01}
                  />
                </div>
                <p className="text-xs text-center text-slate-500 mt-6">我们的引擎完美可视化了这三段光束的截面分布。您可以亲自拖动滑块看到随着像散加剧，这横纵两根焦线之间的距离（斯特林距）是如何被无情拉大断裂的。</p>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </main>
  );
}
