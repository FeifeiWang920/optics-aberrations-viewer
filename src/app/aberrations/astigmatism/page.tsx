'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { AberrationPageLayout } from '@/components/AberrationPageLayout';
import { RayCanvas } from '@/components/RayCanvas';
import { Slider } from '@/components/Slider';
import { AberrationVisuals } from '@/components/AberrationVisuals';

export default function AstigmatismPage() {
  const [astigmatismAmount, setAstigmatismAmount] = useState(0.5);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <AberrationPageLayout
        title="像散 (Astigmatism)"
        theory="像散是指由于光学系统在相互垂直的两个平面（子午面和弧矢面）上的折射能力不同，导致轴外物点发出的圆锥光束经系统折射后不再汇聚于一点，而是形成两条相互垂直、间隔一定距离的焦线。在两个焦线之间，光束的截面是一个弥散圆（最小弥散圆）。"
      >
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-accent-cyan">01.</span> 
              焦线与弥散圆模拟
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3">
                <RayCanvas 
                  aberrationType="astigmatism" 
                  parameter={astigmatismAmount} 
                  rayCount={13}
                />
              </div>
              <div className="lg:col-span-2">
                <AberrationVisuals aberrationType="astigmatism" parameter={astigmatismAmount} />
              </div>
            </div>
            
            <div className="glass p-8 rounded-xl space-y-8 neon-border">
              <Slider 
                label="像散差值 (Astigmatic Difference)" 
                value={astigmatismAmount} 
                min={0} 
                max={1} 
                step={0.01} 
                onChange={setAstigmatismAmount} 
              />
            </div>
          </section>

          <section className="space-y-6">
             <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-accent-cyan">02.</span> 
              物理特征
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass p-6 rounded-lg">
                <h4 className="font-bold text-accent-blue mb-2">子午焦点与弧矢焦点</h4>
                <p className="text-sm text-slate-400">光束在子午面和弧矢面内的汇聚点不重合，导致在不同距离处看到水平或垂直方向的拉伸。</p>
              </div>
              <div className="glass p-6 rounded-lg">
                <h4 className="font-bold text-accent-blue mb-2">在眼镜设计中的应用</h4>
                <p className="text-sm text-slate-400">人眼的散光通常是由角膜不规则形状引起的，可以通过柱面镜（Cylindrical Lens）来补偿。</p>
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
