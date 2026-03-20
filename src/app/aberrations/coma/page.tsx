'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { AberrationPageLayout } from '@/components/AberrationPageLayout';
import { RayCanvas } from '@/components/RayCanvas';
import { Slider } from '@/components/Slider';
import { AberrationVisuals } from '@/components/AberrationVisuals';

export default function ComaPage() {
  const [comaAmount, setComaAmount] = useState(0.5);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <AberrationPageLayout 
        title="彗差 (Coma Aberration)"
        theory="当离轴光束（不平行于光轴的光线）穿过透镜时，不同环带上的光线经过折射后，其交点不能集中于一点，而是形成一系列不对称的偏心圆。这些交点的叠加在像平面上形成一个具有彗星般尾巴的弥散斑，这种不对称的像差被称为彗差。"
        tips={[
          "由离轴视场点斜射发出的宽泛光束产生。",
          "形成形如彗星的非对称弥散斑，严重影响彗星观测等天文摄影的边缘星点形状。",
          "消除彗差必须满足阿贝正弦条件 (Abbe Sine Condition)。"
        ]}
        mathExpression={<>
          Δy' = W<sub>131</sub> &middot; ρ<sup>2</sup> (2 + cos 2θ)
        </>}
      >
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-accent-cyan">01.</span> 
              彗点形状模拟 (Comatic Flare Simulation)
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
              <div className="lg:col-span-3">
                <RayCanvas 
                  aberrationType="coma" 
                  parameter={comaAmount} 
                  rayCount={15}
                />
              </div>
              <div className="lg:col-span-2">
                <AberrationVisuals aberrationType="coma" parameter={comaAmount} />
              </div>
            </div>
            
            <div className="glass p-8 rounded-xl space-y-8 neon-border">
              <Slider 
                label="离轴程度/彗差系数 (Off-axis Intensity)" 
                value={comaAmount} 
                min={0} 
                max={1} 
                step={0.01} 
                onChange={setComaAmount} 
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
                <h4 className="font-bold text-accent-blue mb-2">不对称性</h4>
                <p className="text-sm text-slate-400">与球差不同，彗差具有高度的不对称性。弥散斑的形状像一个彗星，尾巴指向或背离光轴。</p>
              </div>
              <div className="glass p-6 rounded-lg">
                <h4 className="font-bold text-accent-blue mb-2">与口径的关系</h4>
                <p className="text-sm text-slate-400">彗差随口径的增加而剧烈增加。在光学设计中，常使用满足“正弦条件”的系统来消除彗差。</p>
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
