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
        const rings: React.ReactNode[] = [];
        const ringCount = 8; // 8 个极其分明的透镜入射光带
        const w31 = 70 * parameter; // 增大差值以突显展开感
        
        for (let i = 1; i <= ringCount; i++) {
          const r_aperture = i / ringCount; 
          const pointsStr = [];
          
          for (let j = 0; j <= 60; j++) {
            const theta = (j / 60) * 2 * Math.PI;
            // 彗差的横向方程：不强行整体居中！
            // 强制将理想焦点固定在 (0,0) (即彗核顶点)。让偏心圆自己向外“流淌”出来！
            const shiftY = w31 * r_aperture * r_aperture * (2 + Math.cos(2 * theta)); 
            const shiftX = w31 * r_aperture * r_aperture * Math.sin(2 * theta);
            pointsStr.push(`${shiftX},${shiftY}`);
          }
          
          const hue = 190 - r_aperture * 160; 
          rings.push(
            // 彻底去除 fill 填充！只保留恒定线宽的虚线轨迹。
            // 这就彻底打破了“一整块发光体被放大缩小”的错觉。
            <polygon 
              key={`ring-${i}`} 
              points={pointsStr.join(' ')} 
              fill="none" 
              stroke={`hsla(${hue}, 100%, 65%, 0.8)`} 
              strokeWidth={1.5}
              strokeDasharray="4 6" /* 虚线代表数学轨迹 */
            />
          );
          
          // 在每圈轨道上散布 12 个恒定大小的离散光点，跟着轨道扩散。
          // 光点绝对大小不变，只有坐标位移，完全暴露其数学运动本质。
          for (let j = 0; j < 12; j++) {
            const theta = (j / 12) * 2 * Math.PI;
            const shiftY = w31 * r_aperture * r_aperture * (2 + Math.cos(2 * theta)); 
            const shiftX = w31 * r_aperture * r_aperture * Math.sin(2 * theta);
            rings.push(<circle key={`pt-${i}-${j}`} cx={shiftX} cy={shiftY} r={2.5} fill={`hsla(${hue}, 100%, 80%, 1)`} />);
          }
        }
        
        if (Math.abs(parameter) > 0.05) {
            // Apex 固定在 0。最远的 Y 是 r=1 时，2+cos=3，即 3 * w31
            const apexY = 0; 
            const endY = w31 * 3; 
            const dy = endY - apexY;
            const dx = dy * Math.tan(30 * Math.PI / 180); 
            
            rings.push(
              <g key="envelope" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeDasharray="6 6" fill="none">
                <line x1={0} y1={apexY} x2={dx} y2={endY} />
                <line x1={0} y1={apexY} x2={-dx} y2={endY} />
              </g>
            );
        }

        // 顶点主光束的理想位置：被死死钉死在画面上方中轴线上
        rings.push(<circle key="apex" cx={0} cy={0} r={4} fill="#fff" className="shadow-[0_0_10px_#fff]" />);

        return (
          // 整个绘制坐标系顶点上移，给彗差尾部留下疯狂向下散落生长的空间！
          <g transform={`translate(${center}, ${center - 80})`}>
            {rings}
          </g>
        );
      }

      case 'astigmatism': {
        const rings: React.ReactNode[] = [];
        const L = 80 * parameter; // 斯特林距的一半 (Half of Sturm Interval)
        const k = 0.4; // 聚焦光锥的孔径斜率
        const tilt = 0.35; // 3D 侧视角的等轴投影压缩率 (模拟纵深)
        
        // 1. 绘制连续的光截面 (Cross-section rings) 以构建真 3D 光锥
        // 从聚焦透镜后方 (Z=-160) 一直追踪到极远处 (Z=160)
        for (let Z = -160; Z <= 160; Z += 8) {
          // 子午面(Tangential)在垂直方向(Y轴)汇聚，焦点在 Z = -L
          const Ry = k * Math.abs(Z + L);
          // 弧矢面(Sagittal)在水平进深方向(X轴)汇聚，焦点在 Z = L
          const Rx = k * Math.abs(Z - L);
          
          // 根据切面所在位置计算体积光透明度
          const alpha = 0.15 + 0.3 * Math.exp(-(Z*Z)/10000);
          
          rings.push(
            <ellipse 
              key={`ring-${Z}`} 
              cx={Z} 
              cy={0} 
              rx={Math.max(Rx * tilt, 0.1)} // 乘以 tilt 实现 3D 视觉透视
              ry={Math.max(Ry, 0.1)} 
              fill={`rgba(34, 211, 238, ${alpha * 0.1})`}
              stroke={`rgba(34, 211, 238, ${alpha})`}
              strokeWidth={1}
            />
          );
        }

        // 2. 绘制光锥的外包络透视线 (Ray boundaries)
        const z1 = -160, z2 = 160;
        // 子午面(垂直)边缘光线：在 Z = -L 处发生 X 交叉
        rings.push(
          <g key="t-rays" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="1.5">
            <line x1={z1} y1={k * (z1 + L)} x2={z2} y2={k * (z2 + L)} />
            <line x1={z1} y1={-k * (z1 + L)} x2={z2} y2={-k * (z2 + L)} />
          </g>
        );
        // 弧矢面(水平进出屏幕)边缘光线：在 Z = L 处发生交叉，视觉上被 tilt 压缩。
        rings.push(
          <g key="s-rays" stroke="rgba(168, 85, 247, 0.8)" strokeWidth="1.5" strokeDasharray="4 4" opacity={0.8}>
            <line x1={z1} y1={k * (z1 - L) * tilt} x2={z2} y2={k * (z2 - L) * tilt} />
            <line x1={z1} y1={-k * (z1 - L) * tilt} x2={z2} y2={-k * (z2 - L) * tilt} />
          </g>
        );

        // 3. 标注并凸显三个物理学极其核心的靶面位置
        if (parameter > 0.05) {
          // 子午焦线 (T-focus at Z = -L) 
          // 纵向(垂直)已经收紧汇聚到0，而横向(深)还未汇聚，所以视觉上是一条水平线。
          rings.push(
            <g key="t-plane" transform={`translate(${-L}, 0)`}>
              <line x1={0} y1={-80} x2={0} y2={80} stroke="rgba(255,255,255,0.2)" strokeDasharray="2 2" />
              <text x={0} y={-90} fill="#fff" fontSize={11} textAnchor="middle" opacity={0.8}>子午焦线</text>
              <line x1={-(k * (2*L) * tilt)} y1={0} x2={(k * (2*L) * tilt)} y2={0} stroke="#fff" strokeWidth={3} className="shadow-[0_0_10px_#fff]" />
            </g>
          );
          // 最小弥散圆 (Circle of least confusion at Z = 0)
          rings.push(
            <g key="c-plane" transform={`translate(0, 0)`}>
              <line x1={0} y1={-80} x2={0} y2={80} stroke="rgba(34,211,238,0.4)" strokeDasharray="2 2" />
              <text x={0} y={95} fill="#22d3ee" fontSize={11} textAnchor="middle" opacity={1}>最小弥散圆</text>
              <ellipse cx={0} cy={0} rx={k*L*tilt} ry={k*L} stroke="#22d3ee" fill="rgba(34,211,238,0.3)" strokeWidth={2} />
            </g>
          );
          // 弧矢焦线 (S-focus at Z = L)
          // 横向(深)已经收紧汇聚到0，但前面的面已经发散形成了纵向宽度，所以视觉上是一条绝对的垂直线。
          rings.push(
            <g key="s-plane" transform={`translate(${L}, 0)`}>
              <line x1={0} y1={-80} x2={0} y2={80} stroke="rgba(168,85,247,0.4)" strokeDasharray="2 2" />
              <text x={0} y={-90} fill="#a855f7" fontSize={11} textAnchor="middle" opacity={1}>弧矢焦线</text>
              <line x1={0} y1={-(k * (2*L))} x2={0} y2={(k * (2*L))} stroke="#a855f7" strokeWidth={3} className="shadow-[0_0_10px_#a855f7]" />
            </g>
          );
        } else {
          // 完美合焦 (Parameter = 0)
          rings.push(
            <g key="perfect-focus" transform={`translate(0, 0)`}>
              <line x1={0} y1={-80} x2={0} y2={80} stroke="rgba(255,255,255,0.4)" strokeDasharray="2 2" />
              <text x={0} y={-90} fill="#fff" fontSize={12} textAnchor="middle" opacity={0.9}>无像散 (理想共焦点)</text>
              <circle cx={0} cy={0} r={4} fill="#fff" className="shadow-[0_0_10px_#fff]" />
            </g>
          );
        }

        return (
          <g transform={`translate(${center}, ${center})`}>
            {rings}
          </g>
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
    <div className="w-full h-full flex flex-col glass rounded-xl border border-white/5 p-6 space-y-4">
      <h3 className="text-sm font-bold text-accent-cyan uppercase tracking-widest flex items-center justify-between">
        <span>典型光斑图 / 成像视图 (Characteristic View)</span>
        <span className="text-[10px] text-slate-500 font-mono">RENDER_CTX: {aberrationType}</span>
      </h3>
      <div className="relative w-full flex-grow min-h-[300px] bg-black/40 rounded-lg overflow-hidden border border-white/5 flex items-center justify-center shadow-inner">
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
