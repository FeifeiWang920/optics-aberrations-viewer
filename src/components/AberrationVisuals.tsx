'use client';

import React from 'react';

interface AberrationVisualsProps {
  aberrationType: 'spherical' | 'coma' | 'astigmatism' | 'field-curvature' | 'distortion' | 'chromatic';
  parameter: number;
}

function pRNG(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function AberrationVisuals({ aberrationType, parameter }: AberrationVisualsProps) {
  const size = 300;
  const center = size / 2;

  const renderContent = () => {
    switch (aberrationType) {
      case 'spherical': {
        const points: { x: number; y: number }[] = [];
        for (let i = 0; i < 400; i++) {
          const u = pRNG(i);
          const v = pRNG(i + 1000);
          const r_aperture = Math.sqrt(u);
          const theta = v * 2 * Math.PI;
          // Transverse spherical aberration scales with r^3
          const r_blur = r_aperture * r_aperture * r_aperture * 80 * parameter;
          points.push({ x: r_blur * Math.cos(theta), y: r_blur * Math.sin(theta) });
        }
        return (
          <g transform={`translate(${center}, ${center})`}>
            {points.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={1.5} fill="rgba(34, 211, 238, 0.4)" />
            ))}
            {/* Paraxial focal point spot for reference */}
            <circle cx={0} cy={0} r={2} fill="#ef4444" />
          </g>
        );
      }

      case 'coma': {
        const points: { x: number; y: number }[] = [];
        // Coma circles are rings of varying location and size
        for (let i = 0; i < 400; i++) {
          const u = pRNG(i);
          const v = pRNG(i + 1000);
          const r_aperture = Math.sqrt(u);
          const theta = v * 2 * Math.PI;
          
          const w31 = 60 * parameter;
          // transverse coma formula derived from Seidel theory
          const shiftY = w31 * r_aperture * r_aperture * (2 + Math.cos(2 * theta)) - (w31 * 2); 
          const shiftX = w31 * r_aperture * r_aperture * Math.sin(2 * theta);
          points.push({ x: shiftX, y: shiftY });
        }
        return (
          <g transform={`translate(${center}, ${center + 40 * parameter})`}>
            {points.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={1.5} fill="rgba(34, 211, 238, 0.5)" />
            ))}
          </g>
        );
      }

      case 'astigmatism': {
        const points: { r: number; theta: number }[] = [];
        for (let i = 0; i < 200; i++) {
          const u = pRNG(i);
          const v = pRNG(i + 1000);
          const r = Math.sqrt(u);
          const theta = v * 2 * Math.PI;
          points.push({ r, theta });
        }
        
        // Astigmatism shows different blurred shapes based on focal plane
        // Sagittal Focus: vertical line
        // Medial Focus: circle of least confusion
        // Tangential Focus: horizontal line
        const spread = 40 * parameter;
        
        const renderSpots = (offsetX: number, sx: number, sy: number, label: string) => (
          <g transform={`translate(${offsetX}, ${center})`}>
            {points.map((p, i) => (
              <circle 
                key={i} 
                cx={p.r * Math.cos(p.theta) * sx} 
                cy={p.r * Math.sin(p.theta) * sy} 
                r={1} 
                fill="rgba(34, 211, 238, 0.6)" 
              />
            ))}
            <text y={60} fontSize="10" fill="#a855f7" textAnchor="middle" className="font-bold tracking-widest">{label}</text>
          </g>
        );

        return (
          <>
            {renderSpots(size * 0.2, spread, 2, "子午焦线")}
            {renderSpots(size * 0.5, spread/2, spread/2, "最小弥散圆")}
            {renderSpots(size * 0.8, 2, spread, "弧矢焦线")}
          </>
        );
      }

      case 'chromatic': {
        const points: { r: number; theta: number }[] = [];
        for (let i = 0; i < 200; i++) {
          const u = pRNG(i);
          const v = pRNG(i + 1000);
          const r = Math.sqrt(u);
          const theta = v * 2 * Math.PI;
          points.push({ r, theta });
        }
        
        const renderColorSpots = (color: string, spread: number) => (
           <g transform={`translate(${center}, ${center})`}>
            {points.map((p, i) => (
              <circle 
                key={i} 
                cx={p.r * Math.cos(p.theta) * spread} 
                cy={p.r * Math.sin(p.theta) * spread} 
                r={1.5} 
                fill={color} 
              />
            ))}
          </g>
        );

        return (
          <g style={{ mixBlendMode: 'screen' }}>
            {/* Assume viewing at blue focus: blue is sharp, red is highly blurred */}
            {renderColorSpots('rgba(239, 68, 68, 0.4)', 40 * parameter + 2)} {/* Red */}
            {renderColorSpots('rgba(34, 197, 94, 0.6)', 20 * parameter + 2)} {/* Green */}
            {renderColorSpots('rgba(59, 130, 246, 0.8)', 2)} {/* Blue (in focus) */}
          </g>
        );
      }

      case 'distortion': {
        const lines: React.ReactNode[] = [];
        const gridSize = 10;
        const spacing = 20;
        const totalSize = gridSize * spacing;
        
        const applyDistortion = (x: number, y: number) => {
           const r2 = x*x + y*y;
           const distParam = parameter * 0.00003; // Scale parameter
           const newX = x * (1 + distParam * r2);
           const newY = y * (1 + distParam * r2);
           return { x: newX + center, y: newY + center };
        };

        // Draw vertical lines
        for (let i = -gridSize/2; i <= gridSize/2; i++) {
            const x = i * spacing;
            let d = `M ${applyDistortion(x, -gridSize/2 * spacing).x} ${applyDistortion(x, -gridSize/2 * spacing).y}`;
            for (let j = -gridSize/2; j <= gridSize/2; j+=0.5) {
                const pt = applyDistortion(x, j * spacing);
                d += ` L ${pt.x} ${pt.y}`;
            }
            lines.push(<path key={`v${i}`} d={d} fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity="0.6" />);
        }

        // Draw horizontal lines
        for (let j = -gridSize/2; j <= gridSize/2; j++) {
            const y = j * spacing;
            let d = `M ${applyDistortion(-gridSize/2 * spacing, y).x} ${applyDistortion(-gridSize/2 * spacing, y).y}`;
            for (let i = -gridSize/2; i <= gridSize/2; i+=0.5) {
                const pt = applyDistortion(i * spacing, y);
                d += ` L ${pt.x} ${pt.y}`;
            }
            lines.push(<path key={`h${j}`} d={d} fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity="0.6" />);
        }

        return <>{lines}</>;
      }

      case 'field-curvature': {
         const gridPoints: { x: number; y: number; blurR: number }[] = [];
         const gridSize = 12;
         const spacing = 18;
         
         for (let i = -gridSize/2; i <= gridSize/2; i++) {
             for (let j = -gridSize/2; j <= gridSize/2; j++) {
                 const x = i * spacing;
                 const y = j * spacing;
                 const r2 = x*x + y*y;
                 // Blur radius increases with distance from center
                 const blurR = (r2 / 10000) * 20 * parameter + 1;
                 gridPoints.push({ x: x + center, y: y + center, blurR });
             }
         }
         
         return (
             <g>
                 {gridPoints.map((p, idx) => (
                     <circle key={idx} cx={p.x} cy={p.y} r={p.blurR} fill="#22d3ee" opacity={Math.min(1, 2/p.blurR)} />
                 ))}
             </g>
         );
      }
    }
  };

  return (
    <div className="w-full glass rounded-xl border border-white/5 p-6 space-y-4">
      <h3 className="text-sm font-bold text-accent-cyan uppercase tracking-widest flex items-center justify-between">
        <span>典型光斑图 / 成像视图 (Characteristic View)</span>
        <span className="text-[10px] text-slate-500 font-mono">RENDER_CTX: {aberrationType}</span>
      </h3>
      <div className="relative w-full aspect-video bg-black/40 rounded-lg overflow-hidden border border-white/5 flex items-center justify-center shadow-inner">
        {/* Helper visual grid in background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        
        {aberrationType === 'field-curvature' || aberrationType === 'distortion' ? (
             <svg width={size} height={size * 0.6} viewBox={`0 0 ${size} ${size}`} className="overflow-visible !w-auto !h-full py-4 scale-y-75 md:scale-y-100">
                {renderContent()}
             </svg>
        ) : (
            <svg width={size} height={size * 0.6} viewBox={`0 0 ${size} ${size}`} className="overflow-visible !w-[60%] !h-[60%] drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                {renderContent()}
            </svg>
        )}
      </div>
    </div>
  );
}
