import React from "react";

export interface MetricItem {
  label: string;
  value: string;
  tag?: string;
}

export interface KeyMetricsBarProps {
  metrics?: MetricItem[];
}

const DEFAULT_METRICS: MetricItem[] = [
  {
    label: "LOCATION",
    value: "PATTAYA, THAILAND",
  },
  {
    label: "JUMP TYPE",
    value: "TANDEM",
  },
  {
    label: "ALTITUDE",
    value: "13,000 FT",
    tag: "[ALTITUDE]",
  },
  {
    label: "DURATION",
    value: "~3 HOURS",
    tag: "[DURATION]",
  },
];

export const KeyMetricsBar: React.FC<KeyMetricsBarProps> = ({
  metrics = DEFAULT_METRICS,
}) => {
  return (
    <section
      aria-label="Experience Key Specifications"
      className="relative z-30 -mt-14 sm:-mt-16 max-w-6xl mx-auto px-4 sm:px-6 mb-10 sm:mb-12"
    >
      <div className="bg-white shadow-2xl border border-slate-200/90 grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-x-0 sm:divide-x divide-slate-200">
        {metrics.map((item, index) => (
          <div
            key={index}
            className="p-6 sm:p-7 flex flex-col justify-center"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                {item.label}
              </span>
              {item.tag && (
                <span className="text-[9px] text-slate-400 font-mono">
                  {item.tag}
                </span>
              )}
            </div>
            <span className="font-display text-xl sm:text-2xl text-slate-900 tracking-wide uppercase mt-1">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyMetricsBar;

