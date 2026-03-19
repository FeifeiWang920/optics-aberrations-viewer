'use client';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

export function Slider({ label, value, min, max, step, onChange }: SliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-sm font-medium">
        <span className="text-slate-400 uppercase tracking-wider text-[10px]">{label}</span>
        <span className="text-accent-cyan font-mono">{value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-accent-cyan"
      />
    </div>
  );
}
