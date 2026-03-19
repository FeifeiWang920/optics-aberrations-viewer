'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface RayCanvasProps {
  aberrationType: 'spherical' | 'coma' | 'astigmatism' | 'field-curvature' | 'distortion' | 'chromatic';
  parameter: number; // 0 to 1 scaling the effect
  rayCount?: number;
}

export function RayCanvas({ aberrationType, parameter, rayCount = 11 }: RayCanvasProps) {
  const width = 800;
  const height = 400;
  const centerX = width / 2;
  const centerY = height / 2;
  const lensWidth = 20;
  const lensHeight = 200;

  const rays = useMemo(() => {
    const newRays: any[] = [];
    
    // Helper to add a generic ray
    const addRay = (id: number, x1: number, y1: number, x2: number, y2: number, focusX: number, focusY: number, color: string, opacity: number) => {
        newRays.push({ id, x1, y1, x2, y2, focusX, focusY, color, opacity });
    }

    if (aberrationType === 'spherical') {
        const step = lensHeight / (rayCount - 1);
        for (let i = 0; i < rayCount; i++) {
            const h = -lensHeight / 2 + i * step; 
            const relativeH = h / (lensHeight / 2);
            
            const x1 = 0, y1 = centerY + h, x2 = centerX, y2 = centerY + h;
            const focusX = centerX + 200 - (relativeH * relativeH) * 100 * parameter;
            const focusY = centerY;
            
            addRay(i, x1, y1, x2, y2, focusX, focusY, '#22d3ee', 0.6);
        }
    } 
    else if (aberrationType === 'chromatic') {
        const step = lensHeight / (rayCount - 1);
        let idCounter = 0;
        for (let i = 0; i < rayCount; i++) {
            const h = -lensHeight / 2 + i * step;
            const x1 = 0, y1 = centerY + h, x2 = centerX, y2 = centerY + h;
            
            const colors = [
                { c: '#ef4444', shift: 40 },   // Red - focuses further
                { c: '#22c55e', shift: 0 },    // Green - reference
                { c: '#3b82f6', shift: -40 }   // Blue - focuses closer
            ];
            
            colors.forEach((col) => {
                const focusX = centerX + 200 + col.shift * parameter;
                const focusY = centerY;
                addRay(idCounter++, x1, y1, x2, y2, focusX, focusY, col.c, 0.5);
            });
        }
    }
    else if (aberrationType === 'coma') {
        const incidentAngle = 0.15; // ~8.5 degrees
        const step = lensHeight / (rayCount - 1);
        for (let i = 0; i < rayCount; i++) {
            const h = -lensHeight / 2 + i * step; 
            const relativeH = h / (lensHeight / 2);
            
            const x2 = centerX, y2 = centerY + h;
            const x1 = 0, y1 = y2 - Math.tan(incidentAngle) * centerX;
            
            const paraxialFocusX = centerX + 200;
            const paraxialFocusY = centerY + Math.tan(incidentAngle) * 200;
            
            // Coma shift: proportional to h^2
            const comaShiftY = relativeH * relativeH * 60 * parameter;
            const comaShiftX = relativeH * relativeH * -30 * parameter;
            
            const focusX = paraxialFocusX + comaShiftX;
            const focusY = paraxialFocusY + comaShiftY; 
            
            addRay(i, x1, y1, x2, y2, focusX, focusY, '#22d3ee', 0.6);
        }
    }
    else if (aberrationType === 'astigmatism') {
        const incidentAngle = 0.2; 
        const halfCount = Math.floor(rayCount / 2);
        const step = lensHeight / (halfCount - 1);
        let idCounter = 0;
        
        // Tangential rays
        for (let i = 0; i < halfCount; i++) {
            const h = -lensHeight / 2 + i * step; // full aperture
            const x2 = centerX, y2 = centerY + h;
            const x1 = 0, y1 = y2 - Math.tan(incidentAngle) * centerX;
            
            const focusX = centerX + 200 - 80 * parameter;
            const focusY = centerY + Math.tan(incidentAngle) * (200 - 80 * parameter);
            
            addRay(idCounter++, x1, y1, x2, y2, focusX, focusY, '#f472b6', 0.6); 
        }
        
        // Sagittal rays
        for (let i = 0; i < halfCount; i++) {
            const h = -lensHeight / 4 + i * (lensHeight/2) / (halfCount - 1); // slightly smaller aperture to distinguish
            const x2 = centerX, y2 = centerY + h;
            const x1 = 0, y1 = y2 - Math.tan(incidentAngle) * centerX;
            
            const focusX = centerX + 200 + 40 * parameter;
            const focusY = centerY + Math.tan(incidentAngle) * (200 + 40 * parameter);
            
            addRay(idCounter++, x1, y1, x2, y2, focusX, focusY, '#38bdf8', 0.6); 
        }
    }
    else if (aberrationType === 'field-curvature') {
        const angles = [0, 0.15, -0.15]; 
        let idCounter = 0;
        
        angles.forEach((angle) => {
            const bundleCount = Math.floor(rayCount / 2);
            const step = lensHeight / (bundleCount - 1);
            for (let i = 0; i < bundleCount; i++) {
                const h = -lensHeight / 2 + i * step;
                const x2 = centerX, y2 = centerY + h;
                const x1 = 0, y1 = y2 - Math.tan(angle) * centerX;
                
                const idealFocusX = centerX + 200;
                const focusX = idealFocusX - (angle * angle) * 2000 * parameter; 
                const focusY = centerY + Math.tan(angle) * (focusX - centerX);
                
                const color = angle === 0 ? '#22c55e' : (angle > 0 ? '#38bdf8' : '#f472b6');
                addRay(idCounter++, x1, y1, x2, y2, focusX, focusY, color, 0.6);
            }
        });
    }
    else if (aberrationType === 'distortion') {
        const angles = [0.2, 0.1, 0, -0.1, -0.2];
        let idCounter = 0;
        
        angles.forEach((angle) => {
            const bundleCount = 3;
            const step = (lensHeight/3) / (bundleCount - 1); 
            for (let i = 0; i < bundleCount; i++) {
                const h = -lensHeight / 6 + i * step;
                const x2 = centerX, y2 = centerY + h;
                const x1 = 0, y1 = y2 - Math.tan(angle) * centerX;
                
                const focusX = centerX + 200;
                const idealY = centerY + Math.tan(angle) * 200;
                
                const distAmount = (angle * angle * angle) * 4000 * parameter;
                const focusY = idealY + distAmount;
                
                const isCenter = angle === 0;
                addRay(idCounter++, x1, y1, x2, y2, focusX, focusY, isCenter ? '#22c55e' :'#a855f7', 0.6);
            }
        });
    }

    return newRays;
  }, [aberrationType, parameter, Math.max(7, rayCount), centerY, centerX, lensHeight]);

  return (
    <div className="relative w-full aspect-[2/1] glass rounded-2xl overflow-hidden neon-border bg-slate-950">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        {/* Optical Axis */}
        <line x1="0" y1={centerY} x2={width} y2={centerY} stroke="rgba(255,255,255,0.1)" strokeDasharray="5,5" />
        
        {/* Focal Point Indicator */}
        <motion.circle 
          cx={centerX + 200} cy={centerY} r={4} fill="#a855f7" 
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <text x={centerX + 200 - 10} y={centerY + 20} fill="rgba(255,255,255,0.4)" fontSize="10">焦点 F</text>

        {/* Rays */}
        {rays.map((ray) => (
          <g key={ray.id}>
            {/* Incoming Ray */}
            <motion.line
              x1={ray.x1} y1={ray.y1} x2={ray.x2} y2={ray.y2}
              stroke={ray.color} strokeWidth="1.5" strokeOpacity={ray.opacity}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
            />
            {/* Outgoing Ray */}
            <motion.line
              x1={ray.x2} y1={ray.y2} x2={ray.focusX} y2={ray.focusY}
              stroke={ray.color} strokeWidth="1.5" strokeOpacity={ray.opacity}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            {/* Extension Ray (past focus) */}
            <motion.line
              x1={ray.focusX} y1={ray.focusY} x2={ray.focusX + (ray.focusX - ray.x2)} y2={ray.focusY + (ray.focusY - ray.y2)}
              stroke={ray.color} strokeWidth="1" strokeOpacity={ray.opacity * 0.3}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </g>
        ))}

        {/* Lens */}
        <path
          d={`M ${centerX - 5} ${centerY - lensHeight/2} Q ${centerX + 15} ${centerY} ${centerX - 5} ${centerY + lensHeight/2} Q ${centerX - 25} ${centerY} ${centerX - 5} ${centerY - lensHeight/2}`}
          fill="rgba(34, 211, 238, 0.1)"
          stroke="rgba(34, 211, 238, 0.5)"
          strokeWidth="2"
        />
      </svg>
      
      <div className="absolute bottom-4 right-4 flex gap-4 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
        <span>仿真渲染引擎 v1.0</span>
        <span>正向追踪开启</span>
      </div>
    </div>
  );
}
