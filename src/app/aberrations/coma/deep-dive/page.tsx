'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { AberrationVisuals } from '@/components/AberrationVisuals';
import { Slider } from '@/components/Slider';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ComaDeepDivePage() {
  const [comaParam, setComaParam] = useState(0.5);

  return (
    <main className="min-h-screen bg-slate-950 pb-20">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-6 pt-24">
        <Link href="/aberrations/coma" className="inline-flex items-center gap-2 text-accent-cyan hover:text-cyan-300 transition-colors mb-8 text-sm font-bold">
          <ArrowLeft className="w-4 h-4" /> 返回彗差实验室
        </Link>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 scientific-heading text-white">深入理解彗差：失控的圆系叠加与正弦法典</h1>
          
          <div className="prose prose-invert prose-lg max-w-none text-slate-300 space-y-12">
            <p className="text-xl text-slate-300 leading-relaxed max-w-4xl p-6 glass rounded-xl border-l-4 border-orange-500">
              彗差（Coma）之所以在天文望远镜观测和夜景摄影中臭名昭著，是因为它极度破坏了点光源（如星星、反光、路灯）的结构对称美感。但更令人震撼的是：它拖拽出的彗星尾巴并不是颜料抹涂出来的无序模糊，而是一系列<strong className="text-white">严格遵循高阶几何函数位移的抛物面偏心圆环</strong>互相重叠形成的终极数学奇观。
            </p>

            {/* 彗差的光斑形成法则 */}
            <div className="glass p-8 rounded-xl border border-white/5 bg-slate-900/50">
              <h2 className="text-3xl font-bold text-orange-400 mb-6 mt-0 flex items-center gap-3">
                <span className="bg-orange-400/20 px-3 py-1 rounded text-lg">01</span> 
                彗星尾巴是怎么画出来的？—— 局部放大率
              </h2>
              
              <div className="text-base text-slate-400 mb-8 space-y-4">
                <p>
                  彗差产生的核心物理原因只有一个：当离轴宽泛光束以倾斜角度打到厚度不均的镜片上时，<strong className="text-white border-b border-orange-500 pb-1">透镜不同距离的环带（内圈、外圈），其垂轴放大率（局部焦点）是不一样的</strong>。
                </p>
                <p>
                  想象我们将入射的一整束圆形粗光分为透镜光轴上的“中心主光线”，围绕它的“近轴内环带”，以及最外侧的“边缘外环带”：
                </p>
                <ul className="space-y-4 list-disc pl-6 text-slate-300">
                  <li><strong>中心主光线</strong>：它最守规矩偏折最小，乖乖在焦平面上聚成了一个坚固明亮的高光点。这是彗星系统性溃散保留的唯一尊严<span className="text-orange-400">（彗核）</span>。</li>
                  <li><strong>近轴内环带</strong>：第一圈光束穿过透镜后，由于局部的放大倍率细微不同，它们在交点投影不仅画出了一个比点更大的闭合小圆圈，更可怕的是，<strong className="text-white">这个小圆的圆心整个下沉平移了，已经不再与主光线同心！</strong></li>
                  <li><strong>边缘外环带</strong>：那些打击在透镜最外围抛物线死角的光线，由于承受了极大的球差夹击，它们投射到幕布上画出了惊人的巨型抛物线极坐标圆。而且由于其超大的相对曲面孔径角，<span className="text-orange-400">其圆心偏离主光线彗核的位移量，呈抛物线平方级猛烈下坠扩张！</span></li>
                </ul>
                <p>
                  当这无数个<strong className="text-white">【半径越来越大、圆心越来越向下坠落位移】的空心圆环</strong>同时高密度曝光在你的摄像机CMOS上时，由于边界包络线的切线相切，它完美地拼接成了一个精确呈 60 度夹角扩展的 V 型辐射体——这就是彗差犹如夜空扫把星一样的几何学形成过程！
                </p>
              </div>

              <div className="glass rounded-xl border border-white/5 p-6 bg-black/40">
                <h3 className="text-sm font-bold text-slate-400 mb-4 text-center tracking-widest">特征视图提取：完全由嵌套偏心圆环相交组成的数学残局</h3>
                <div className="h-64 flex-grow w-full relative mb-8 z-0">
                  <AberrationVisuals aberrationType="coma" parameter={comaParam * 5} />
                </div>
                <div className="max-w-md mx-auto relative z-50 pointer-events-auto pt-4">
                  <Slider 
                    label="阿贝正弦破坏度 (Sine Condition Violation)"
                    value={comaParam}
                    onChange={setComaParam}
                    min={0}
                    max={1}
                    step={0.01}
                  />
                </div>
                <p className="text-xs text-center text-slate-500 mt-6">仔细拖动滑块观察利用代码算法模拟出的散落斑点。你会发现这绝不是杂乱无章的高斯模糊，而是具有极高物理规整性的层层嵌套偏移圆系方程描绘出的纯净轨迹集。</p>
              </div>
            </div>

            {/* 阿贝正弦条件 */}
            <div className="bg-gradient-to-r from-orange-950/80 to-slate-900 border border-slate-700/50 p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 mix-blend-overlay"></div>
              <h3 className="text-2xl font-bold text-orange-200 mb-4">🏆 消除彗差的光学大统一法典：Abbe Sine Condition</h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                一百多年前，光学巨匠卡尔·蔡司背后的物理学奠基人恩斯特·阿贝（Ernst Abbe）证明了一个极其伟大的定理：<br/><br/>
                想要在一个只除掉球差（球差校正点周边）的系统中连底扫除掉烦人的点系彗差展开，系统里所有参与折射交汇的光线，无论它是多么倾斜打在那一个孔径边缘角，都必须无条件绝对服从：<br/>
                <code className="block bg-black/50 p-6 rounded-xl my-6 text-orange-400 font-mono text-center text-2xl shadow-[0_0_30px_rgba(249,115,22,0.1)] border border-orange-500/20">
                  n &middot; y &middot; sin U = n' &middot; y' &middot; sin U'
                </code>
                这意味着整个光束在被透镜压服的时候，横向垂轴放大率 {"$\\beta = \\frac{n \\sin U}{n' \\sin U'}$"} 必须犹如神明般保持不可破坏的<strong className="text-white">绝对常数 (Constant)</strong>。<br/>
                只要这根弦崩住不断，彗差偏心圆永远重叠不出来！满足阿贝正弦条件的强悍系统被称为<strong className="text-white">齐明系统 (Aplanatic System)</strong>，能够获得中心及其附近小视野范围内完全无拖尾、如针尖般极高锐度的完美点系——这是人类迄今为止所有深空望远镜和高倍相差显微镜物镜阵列不可逾越的最高指导钢印。
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </main>
  );
}
