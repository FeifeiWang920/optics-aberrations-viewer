'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AberrationPageLayoutProps {
  title: string;
  theory: string;
  tips: string[];
  mathExpression: React.ReactNode;
  children: React.ReactNode;
}

export function AberrationPageLayout({ title, theory, tips, mathExpression, children }: AberrationPageLayoutProps) {
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
              {tips.map((tip, index) => (
                <li key={index} className="flex gap-2 leading-relaxed">
                  <span className="text-accent-cyan">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="glass p-6 rounded-xl border border-white/5 bg-accent-purple/5">
            <h3 className="text-xl font-bold mb-4 text-accent-purple">核心教学公式</h3>
            <div className="text-sm text-purple-200 block bg-black/40 p-4 rounded-md font-mono leading-relaxed overflow-x-auto">
              {mathExpression}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
