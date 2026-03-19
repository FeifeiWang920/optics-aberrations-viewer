'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface AberrationCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  delay?: number;
}

export function AberrationCard({ title, description, href, icon, delay = 0 }: AberrationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Link 
        href={href}
        className="group block p-6 glass neon-border rounded-xl transition-all duration-300 hover:scale-[1.02] hover:bg-slate-900/80"
      >
        <div className="mb-4 text-accent-cyan group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-accent-cyan transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed line-clamp-2">
          {description}
        </p>
        <div className="flex items-center gap-2 text-xs font-bold text-accent-blue group-hover:translate-x-1 transition-transform">
          了解更多 <ArrowRight className="w-4 h-4" />
        </div>
      </Link>
    </motion.div>
  );
}
