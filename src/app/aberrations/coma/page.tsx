'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { AberrationPageLayout } from '@/components/AberrationPageLayout';
import { RayCanvas } from '@/components/RayCanvas';
import { Slider } from '@/components/Slider';

export default function ComaPage() {
  const [comaAmount, setComaAmount] = useState(0.5);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <AberrationPageLayout
        title="彗差 (Coma)"
        theory="彗差是一种出现在离轴点光源成像中的像差。当光线斜着射入光学系统时，由于透镜不同区域的放大率不同，导致成像点变成了一个彗星状的弥散斑（头部尖锐亮，尾部发散）。这种像差在广角镜头或天文望远镜的边缘观测中尤为明显。"
      >
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-accent-cyan">01.</span> 
              彗点形状模拟 (Comatic Flare Simulation)
            </h2>
            <RayCanvas 
              aberrationType="coma" 
              parameter={comaAmount} 
              rayCount={15}
            />
            
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
