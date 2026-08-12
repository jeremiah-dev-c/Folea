"use client";

import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 10,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center rounded-full border border-charcoal/15">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Aantal verlagen"
        className="p-3 disabled:opacity-30"
      >
        <Minus size={16} />
      </button>
      <span className="w-8 text-center text-sm font-medium">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Aantal verhogen"
        className="p-3 disabled:opacity-30"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
