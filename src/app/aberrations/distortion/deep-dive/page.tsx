'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { RayCanvas } from '@/components/RayCanvas';
import { AberrationVisuals } from '@/components/AberrationVisuals';
import { Slider } from '@/components/Slider';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DistortionDeepDivePage() {
  const [barrelParam, setBarrelParam] = useState(-0.8);
  const [pinParam, setPinParam] = useState(0.8);

  return (
    <main className="min-h-screen bg-slate-950 pb-20">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-6 pt-24">
        <Link href="/aberrations/distortion" className="inline-flex items-center gap-2 text-accent-cyan hover:text-cyan-300 transition-colors mb-8 text-sm font-bold">
          <ArrowLeft className="w-4 h-4" /> 返回畸变实验室
        </Link>
        
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 scientific-heading text-white">深入理解畸变物理成因</h1>
          
          <div className="prose prose-invert prose-lg max-w-none text-slate-300 space-y-12">
            <p className="text-xl text-slate-300 leading-relaxed max-w-4xl p-6 glass rounded-xl border-l-4 border-accent-cyan">
              畸变的本质是：由于<strong className="text-white">孔径光阑</strong>（控制进光量的圆孔挡板）的位置偏离了透镜的光学中心，强迫斜射的宽光束通过时打击在具有强烈球差的透镜边缘区域上，从而导致横向放大率随离轴距离发生了非线性的重度改变。
            </p>

            {/* 桶形畸变 */}
            <div className="glass p-8 rounded-xl border border-white/5 bg-slate-900/50">
              <h2 className="text-3xl font-bold text-accent-cyan mb-6 mt-0 flex items-center gap-3">
                <span className="bg-accent-cyan/20 px-3 py-1 rounded text-lg">01</span> 
                桶形畸变 (Barrel Distortion) —— 光阑前置
              </h2>
              
              <div className="text-base text-slate-400 mb-8 space-y-4">
                <p>
                  当光阑<strong className="text-accent-cyan">前置</strong>时：假设一束光线<strong className="text-white">斜向下方</strong>射入（也就是画面边缘的光束），它穿过前面的光阑后，顺理成章地会打击在透镜的<strong className="text-white">下半部分</strong>。
                </p>
                <p>
                  凸透镜的下半部，其天职就是把光线<strong className="text-accent-cyan">向上弯折</strong>以向光轴聚拢。但透镜边缘存在天然的<strong className="text-white">球差（折射聚焦能力远超中心）</strong>！因此，这束本该投射到下方边缘的光线，被严重超标的折射力“<strong className="text-white">向上过度往回拉了一把</strong>”。
                </p>
                <p>
                  结果：光线最后落在成像面上的高度，比理想位置更靠近中心（高度缩水）。越是边缘的光线缩水越严重，边缘的网格因此向内严重收缩，就像被箍紧的木桶。
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
                  <div className="lg:col-span-3 flex flex-col glass rounded-xl border border-white/5 p-6">
                    <h3 className="text-sm font-bold text-slate-400 mb-4 text-center tracking-widest">光阑在左侧前置时光路（向内弯折逼近光轴）</h3>
                    <div className="flex-grow mb-6 relative z-0">
                      <RayCanvas aberrationType="distortion" parameter={barrelParam} rayCount={5} />
                    </div>
                    <div className="relative z-50 pointer-events-auto">
                      <Slider label="前置光阑位移 (Front Stop Offset)" value={barrelParam} onChange={setBarrelParam} min={-1} max={0} step={0.01} />
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                      <AberrationVisuals aberrationType="distortion" parameter={barrelParam} />
                  </div>
              </div>
            </div>

            {/* 枕形畸变 */}
            <div className="glass p-8 rounded-xl border border-white/5 bg-accent-purple/5">
              <h2 className="text-3xl font-bold text-accent-purple mb-6 mt-0 flex items-center gap-3">
                <span className="bg-accent-purple/20 px-3 py-1 rounded text-lg">02</span> 
                枕形畸变 (Pincushion Distortion) —— 光阑后置
              </h2>
              
              <div className="text-base text-slate-300 mb-8 space-y-4">
                <p>
                  而当光阑<strong className="text-accent-purple">后置</strong>时，几何关系发生了绝妙的反转！同样是一束<strong className="text-white">斜向下方</strong>射入视野的平行光集群，如果它们打在透镜下半部分，经过折射后早就过度偏离，<strong className="text-white">根本无法钻进后方那个狭小的光阑洞口。</strong>
                </p>
                <p>
                  <strong className="text-white">真正能幸存穿过孔洞的光线，入射时必须极度反常地打击在透镜的<strong className="text-accent-purple pl-1 text-xl">上半部分</strong>！</strong>
                </p>
                <p>
                  这里是产生枕形畸变的绝杀点：凸透镜的上半部，其天职是把光线<strong className="text-accent-purple">向下弯折</strong>！由于它打在了高度极偏的上半部边缘，承受了极其狂暴的向下球差折光力，光线被<strong className="text-white">狠狠地向下（向外延展方向）劈折而去</strong>，随后才堪堪穿过后置光阑孔！
                </p>
                <p>
                  结果：极其猛烈的向下折射让这束光抛射得更远，导致落在像面上的高度被无限拉伸增生。中心不受影响，四角的坐标越拉越远，画面硬生生变成了扯开的“枕头”。
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
                  <div className="lg:col-span-3 flex flex-col glass rounded-xl border border-white/5 p-6 bg-black/20">
                    <h3 className="text-sm font-bold text-slate-400 mb-4 text-center tracking-widest">光阑在右侧后置时光路（向外拉扯）</h3>
                    <div className="flex-grow mb-6 relative z-0">
                      <RayCanvas aberrationType="distortion" parameter={pinParam} rayCount={5} />
                    </div>
                    <div className="relative z-50 pointer-events-auto">
                      <Slider label="后置光阑位移 (Rear Stop Offset)" value={pinParam} onChange={setPinParam} min={0} max={1} step={0.01} />
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                      <AberrationVisuals aberrationType="distortion" parameter={pinParam} />
                  </div>
              </div>
            </div>

            {/* Symmetry Conclusion */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700/50 p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
              <h3 className="text-2xl font-bold text-white mb-4">🏆 工业界终极解法：完全对称结构</h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                如果将一个完美的镜头分成完全相同的两半，并把光阑塞在正中央的夹缝里，会发生什么？<br/><br/>
                真相是：光阑相对于前面的透镜是后置的产生<strong className="text-accent-purple">枕形畸变</strong>，而对于后面的透镜它是前置的产生<strong className="text-accent-cyan">桶形畸变</strong>！一拉一挤之间，畸变被完全相消归零！<br/>
                这正是高端大画幅相机及现代无畸变测量镜头（双高斯结构/Plasmata设计）能够诞生、战胜天然物理缺陷的伟大秘密！
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </main>
  );
}
