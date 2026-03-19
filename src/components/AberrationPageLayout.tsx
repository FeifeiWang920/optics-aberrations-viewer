'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AberrationPageLayoutProps {
  title: string;
  theory: string;
  children: React.ReactNode;
}

export function AberrationPageLayout({ title, theory, children }: AberrationPageLayoutProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold scientific-heading mb-4 pt-10">{title}</h1>
        <div className="h-1 w-24 bg-accent-cyan mb-8"></div>
        <p className="text-slate-300 text-lg leading-relaxed max-w-4xl p-6 glass rounded-xl border-l-4 border-accent-cyan">
          {theory}
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {children}
        </div>
        
        <div className="space-y-6">
          <div className="glass p-6 rounded-xl border border-white/5">
            <h3 className="text-xl font-bold mb-4 text-accent-blue flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-blue"></span>
              物理小贴士
            </h3>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex gap-2">
                <span className="text-accent-cyan">•</span>
                <span>轴上物点的单色光成像缺陷。</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent-cyan">•</span>
                <span>主要由于球面折射面的折射能力随入射高度增加而增强。</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent-cyan">•</span>
                <span>可以通过使用非球面镜或复合透镜组来消除。</span>
              </li>
            </ul>
          </div>
          
          <div className="glass p-6 rounded-xl border border-white/5 bg-accent-purple/5">
            <h3 className="text-xl font-bold mb-4 text-accent-purple">数学表达式</h3>
            <code className="text-xs text-purple-200 block bg-black/40 p-4 rounded-md font-mono leading-relaxed">
              Δs' = s' - s'_0 <br />
              = k * h² + ...
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
