'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { AberrationPageLayout } from '@/components/AberrationPageLayout';
import { RayCanvas } from '@/components/RayCanvas';
import { Slider } from '@/components/Slider';
import { AberrationVisuals } from '@/components/AberrationVisuals';
import Link from 'next/link';

export default function AstigmatismPage() {
  const [astigmatismAmount, setAstigmatismAmount] = useState(0.5);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <AberrationPageLayout 
        title="像散 (Astigmatism)"
        theory="像散是由于离轴光束在透镜的子午面（包含光轴的平面）和弧矢面（垂直于子午面的平面）的折射能力不同所引起的像差。这会导致离轴物点不能成像为一个点，而是形成两条相互垂直、且位于不同位置的短线（焦线）。在两焦线之间，光斑的形状会从长椭圆变成一个模糊的圆（最小弥散圆），再变成横椭圆。"
        tips={[
          "子午面与弧矢面所经历的光焦度(Optical Power)不相等，焦点深度分离产生斯特林光锥与焦距差(Sturm's interval)。",
          "成像呈现垂直的双焦线与中间的最小弥散圆。",
          "即使透镜是完美回转对称球面，宽光束离轴斜射也会产生固有像散。"
        ]}
        mathExpression={<>
          Δx = x'<sub>s</sub> - x'<sub>t</sub> &propto; W<sub>222</sub> &middot; y<sub>obj</sub><sup>2</sup>
        </>}
      >
        <div className="space-y-12">
          <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="text-accent-cyan">01.</span> 
                焦线与弥散圆模拟
              </h2>
              <Link href="/aberrations/astigmatism/deep-dive" className="px-6 py-2 bg-accent-purple/20 text-accent-purple hover:bg-accent-purple/30 border border-accent-purple/30 rounded-lg text-sm font-bold transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                深度解密：斯特林光锥与焦点撕裂 &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
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
