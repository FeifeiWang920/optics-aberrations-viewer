'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { AberrationPageLayout } from '@/components/AberrationPageLayout';
import { RayCanvas } from '@/components/RayCanvas';
import { Slider } from '@/components/Slider';
import { AberrationVisuals } from '@/components/AberrationVisuals';

export default function SphericalAberrationPage() {
  const [aberrationAmount, setAberrationAmount] = useState(0.5);
  const [rayCount, setRayCount] = useState(13);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <AberrationPageLayout
        title="球差 (Spherical Aberration)"
        theory="当平行光轴的光束垂直射入球面透镜时，靠近光轴的近轴光线与远离光轴的边缘光线在折射后不能交于同一点。边缘光线的折射能力更强，其焦点更靠近透镜，从而在光轴上形成了一个弥散的光斑，这种缺陷被称为球差。球差主要影响图像的锐度，是唯一一种存在于轴上物点的单色像差。"
        tips={[
          "这是唯一的轴上物点单色光成像缺陷。",
          "由于球面折射面的折射能力随入射高度增加而增强。",
          "可以通过组合正负透镜或使用抛物面等非球面来校正。"
        ]}
        mathExpression={<>
          ΔL' = W<sub>040</sub> &middot; ρ<sup>2</sup> + W<sub>060</sub> &middot; ρ<sup>4</sup> + ...
        </>}
      >
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-accent-cyan">01.</span> 
              交互式物理模拟
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
              <div className="lg:col-span-3">
                <RayCanvas 
                  aberrationType="spherical" 
                  parameter={aberrationAmount} 
                  rayCount={rayCount}
                />
              </div>
              <div className="lg:col-span-2">
                <AberrationVisuals aberrationType="spherical" parameter={aberrationAmount} />
              </div>
            </div>
            
            <div className="glass p-8 rounded-xl space-y-8 neon-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <Slider 
                  label="像差强度 (Aberration Intensity)" 
                  value={aberrationAmount} 
                  min={0} 
                  max={1} 
                  step={0.01} 
                  onChange={setAberrationAmount} 
                />
                <Slider 
                  label="光线数量 (Ray Count)" 
                  value={rayCount} 
                  min={3} 
                  max={21} 
                  step={2} 
                  onChange={setRayCount} 
                />
              </div>
            </div>
          </section>

          <section className="space-y-6">
             <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-accent-cyan">02.</span> 
              消除方法
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass p-6 rounded-lg">
                <h4 className="font-bold text-accent-blue mb-2">使用非球面镜</h4>
                <p className="text-sm text-slate-400">将透镜表面加工成非球面（如抛物面），使得所有高度的入射光线都能准确汇聚在一点。</p>
              </div>
              <div className="glass p-6 rounded-lg">
                <h4 className="font-bold text-accent-blue mb-2">设置光圈 (Aperture)</h4>
                <p className="text-sm text-slate-400">通过缩小光圈，阻挡边缘光线进入系统，只允许近轴光线成像，从而显著减小球差。</p>
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
