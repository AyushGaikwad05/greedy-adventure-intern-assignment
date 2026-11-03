import React from "react";

interface StepItem {
  number: string;
  title: string;
  description: string;
  tag?: string;
}

const STEPS: StepItem[] = [
  {
    number: "01",
    title: "ARRIVE",
    description:
      "Dropzone Thailand meeting point. Check-in 45 minutes prior with your photo ID.",
    tag: "[MEETING POINT AND CHECK-IN TIME]",
  },
  {
    number: "02",
    title: "SAFETY BRIEFING",
    description:
      "Brief with your tandem instructor before you suit up and gear into harness.",
  },
  {
    number: "03",
    title: "AIRCRAFT ASCENT",
    description:
      "Climb above the coast for the ocean-view jump at 13,000 ft over the Gulf of Thailand.",
  },
  {
    number: "04",
    title: "JUMP AND LAND",
    description:
      "Freefall at 200 km/h, scenic canopy ride, landing, then your certificate.",
  },
];

export const PlanSection: React.FC = () => {
  return (
    <section
      id="the-plan"
      aria-label="Your Day, Step by Step"
      className="max-w-6xl mx-auto px-6 py-20 sm:py-28"
    >
      <div className="mb-14">
        <div className="flex items-center gap-2">
          <span className="w-5 h-[2px] bg-[#fa7a3d]" aria-hidden="true" />
          <span className="text-[#fa7a3d] text-xs font-bold uppercase tracking-[0.25em]">
            THE PLAN
          </span>
        </div>
        <h2 className="font-display text-5xl sm:text-6xl uppercase tracking-tight text-slate-900 mt-3">
          YOUR DAY, STEP BY STEP
        </h2>
      </div>

      {/* 4 Linear Step Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {STEPS.map((step) => (
          <div
            key={step.number}
            className="flex flex-col border-t-2 border-slate-900 pt-6 group"
          >
            {/* Step Number */}
            <span className="font-display text-3xl sm:text-4xl font-bold text-[#fa7a3d] group-hover:text-slate-900 transition-colors">
              {step.number}
            </span>

            {/* Step Title */}
            <h3 className="font-display text-2xl uppercase tracking-wider text-slate-900 mt-2">
              {step.title}
            </h3>

            {/* Step Description */}
            <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed mt-3">
              {step.description}
            </p>

            {/* Optional Tag indicator */}
            {step.tag && (
              <span className="text-[10px] text-slate-400 font-mono mt-3">
                {step.tag}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlanSection;

