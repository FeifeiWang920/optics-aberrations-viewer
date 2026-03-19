'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { AberrationPageLayout } from '@/components/AberrationPageLayout';
import { RayCanvas } from '@/components/RayCanvas';
import { Slider } from '@/components/Slider';
import { AberrationVisuals } from '@/components/AberrationVisuals';

export default function DistortionPage() {
  const [distortionAmount, setDistortionAmount] = useState(0.5);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <AberrationPageLayout
        title="畸变 (Distortion)"
        theory="畸变是指光学系统的垂轴放大率随像高（离轴距离）的变化而变化，导致成像的几何形状发生形变。畸变不影响成像的清晰度，只影响位置精度。常见的畸变有桶形畸变（放大率随高度增加而减小）和枕形畸变（放大率随高度增加而增加）。"
      >
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-accent-cyan">01.</span> 
              几何形变模拟 (Barrel & Pincushion)
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3">
                <RayCanvas 
                  aberrationType="distortion" 
                  parameter={(distortionAmount - 0.5) * 2} 
                  rayCount={15}
                />
              </div>
              <div className="lg:col-span-2">
                <AberrationVisuals aberrationType="distortion" parameter={(distortionAmount - 0.5) * 2} />
              </div>
            </div>
            
            <div className="glass p-8 rounded-xl space-y-8 neon-border">
              <Slider 
                label="畸变方向与强度 (Distortion Type & Intensity)" 
                value={distortionAmount} 
                min={0} 
                max={1} 
                step={0.01} 
                onChange={setDistortionAmount} 
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-bold px-2">
                <span>桶形畸变 (BARREL)</span>
                <span>无畸变</span>
                <span>枕形畸变 (PINCUSHION)</span>
              </div>
            </div>
          </section>

          <section className="space-y-6">
             <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-accent-cyan">02.</span> 
              物理特征
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass p-6 rounded-lg">
                <h4 className="font-bold text-accent-blue mb-2">光阑位置的影响</h4>
                <p className="text-sm text-slate-400">畸变的方向往往取决于系统光阑（Stop）的位置。光阑在透镜前容易产生桶形畸变，在后容易产生枕形畸变。</p>
              </div>
              <div className="glass p-6 rounded-lg">
                <h4 className="font-bold text-accent-blue mb-2">软件校正</h4>
                <p className="text-sm text-slate-400">由于畸变不损失分辨率，现代数字相机常通过嵌入式算法对畸变进行后期数字补偿。</p>
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
