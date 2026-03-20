'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { AberrationPageLayout } from '@/components/AberrationPageLayout';
import { RayCanvas } from '@/components/RayCanvas';
import { Slider } from '@/components/Slider';
import { AberrationVisuals } from '@/components/AberrationVisuals';

export default function ChromaticAberrationPage() {
  const [dispersion, setDispersion] = useState(0.5);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <AberrationPageLayout 
        title="色差 (Chromatic Aberration)"
        theory="由于不同波长（颜色）的光在折射介质中的折射率不同——通常短波长（蓝光）的折射率较长波长（红光）大。这导致白光经过透镜后，不同颜色的光无法汇聚在同一个焦点上。表现为高对比度边缘出现紫边或红蓝晕影，被称为位置色差（轴向色差）。"
        tips={[
          "材料对不同波长光线的色散率不同引起。",
          "短波长焦距短（蓝偏内），长波长焦距长（红偏外）。",
          "通常使用不同色散率的玻璃组合成消色差双合透镜（Achromat）进行校正。"
        ]}
        mathExpression={<>
          f(λ) = 1 / [(n(λ) - 1)(1/R<sub>1</sub> - 1/R<sub>2</sub>)]
        </>}
      >
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-accent-cyan">01.</span> 
              色散模拟 (Dispersion Simulation)
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
              <div className="lg:col-span-3">
                <div className="relative">
                    <RayCanvas 
                      aberrationType="chromatic" 
                      parameter={dispersion} 
                      rayCount={15}
                    />
                    <div className="absolute top-4 left-4 p-2 glass rounded text-[10px] text-white">
                        波长范围: 400nm - 700nm
                    </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <AberrationVisuals aberrationType="chromatic" parameter={dispersion} />
              </div>
            </div>
            
            <div className="glass p-8 rounded-xl space-y-8 neon-border">
              <Slider 
                label="材料色散系数 (Dispersion Coefficient / Abbe Number inverse)" 
                value={dispersion} 
                min={0} 
                max={1} 
                step={0.01} 
                onChange={setDispersion} 
              />
            </div>
          </section>

          <section className="space-y-6">
             <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-accent-cyan">02.</span> 
              消除方法
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass p-6 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-bold text-accent-blue mb-2">消色差透镜 (Achromatic Doublet)</h4>
                <p className="text-sm text-slate-400">将正透镜（冕牌玻璃）和负透镜（火石玻璃）组合在一起，使得红光和蓝光的焦点重合。</p>
              </div>
              <div className="glass p-6 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-bold text-accent-blue mb-2">复消色差 (Apochromat)</h4>
                <p className="text-sm text-slate-400">使用三片或更多透镜组合，使得三种或更多波长的光能够汇聚在同一点，几乎消除所有可见色散。</p>
              </div>
            </div>
          </section>
        </div>
      </AberrationPageLayout>

      <footer className="py-12 border-t border-white/5 text-center text-slate-500 text-sm">
        <p>© 2026 OpticsLab - 几何光学像差教学平台</p>
      </footer>
    </main>
  );
}
