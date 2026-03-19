'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Atom } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: '首页', href: '/' },
  { name: '球差', href: '/aberrations/spherical' },
  { name: '彗差', href: '/aberrations/coma' },
  { name: '像散', href: '/aberrations/astigmatism' },
  { name: '场曲', href: '/aberrations/field-curvature' },
  { name: '畸变', href: '/aberrations/distortion' },
  { name: '色差', href: '/aberrations/chromatic' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-white/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Atom className="w-8 h-8 text-accent-cyan group-hover:rotate-180 transition-transform duration-500" />
          <span className="scientific-heading text-lg">OpticsLab</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent-cyan",
                pathname === item.href ? "text-accent-cyan" : "text-slate-400"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
