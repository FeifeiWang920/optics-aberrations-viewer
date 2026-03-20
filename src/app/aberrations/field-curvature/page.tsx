'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { AberrationPageLayout } from '@/components/AberrationPageLayout';
import { RayCanvas } from '@/components/RayCanvas';
import { Slider } from '@/components/Slider';
import { AberrationVisuals } from '@/components/AberrationVisuals';

export default function FieldCurvaturePage() {
  const [curvatureAmount, setCurvatureAmount] = useState(0.5);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <AberrationPageLayout 
        title="场曲 (Field Curvature)"
        theory="场曲（Petzval 场曲）是指平面物体通过透镜系统成像时，其像面不是一个平面，而是一个弯曲的表面（曲面）。这意味着如果屏幕是平坦的，你无法同时使得图像的中心和边缘都清晰：当中心合焦时边缘会模糊，反之亦然。这在显微镜和广角摄影中是需要重点校正的问题。"
        tips={[
          "实际像平面为一个凹陷或凸出的旋转准抛物面(Petzval面)。",
          "平坦的感光原件上表现为：中心清晰时边缘模糊，或边缘清晰时中心模糊。",
          "通过引入特殊厚度的平场镜(Field Flattener)或利用正负透镜组匹配折射率消除。"
        ]}
        mathExpression={<>
          1/R<sub>P</sub> = -n &sum; (1 / n<sub>i</sub>f<sub>i</sub>)
        </>}
      >
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-accent-cyan">01.</span> 
              像面弯曲模拟 (Petzval Surface Simulation)
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
              <div className="lg:col-span-3">
                <RayCanvas 
                  aberrationType="field-curvature" 
                  parameter={curvatureAmount} 
                  rayCount={17}
                />
              </div>
              <div className="lg:col-span-2">
                <AberrationVisuals aberrationType="field-curvature" parameter={curvatureAmount} />
              </div>
            </div>
            
            <div className="glass p-8 rounded-xl space-y-8 neon-border">
              <Slider 
                label="场曲程度 (Curvature Intensity)" 
                value={curvatureAmount} 
                min={0} 
                max={1} 
                step={0.01} 
                onChange={setCurvatureAmount} 
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
                <h4 className="font-bold text-accent-blue mb-2">Petzval 和定理</h4>
                <p className="text-sm text-slate-400">场曲主要取决于透镜的焦距和折射率。对于多透镜系统，总场曲是各透镜场曲的代数和。</p>
              </div>
              <div className="glass p-6 rounded-lg">
                <h4 className="font-bold text-accent-blue mb-2">平场设计 (Flat-field)</h4>
                <p className="text-sm text-slate-400">现代相机镜头通过复杂的透镜组合（平场物镜）来尽可能抵消场曲，以便在平铺的光学传感上获得全屏锐利的图像。</p>
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
