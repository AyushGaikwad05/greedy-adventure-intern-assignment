import React from "react";

interface SpecItem {
  label: string;
  value: string;
  placeholder?: string;
}

const SPECIFICS: SpecItem[] = [
  {
    label: "Duration",
    value: "~3 Hours total (60s freefall, 5-7 min canopy flight)",

  },
  {
    label: "Altitude",
    value: "13,000 FT (Over Gulf of Thailand coast)",

  },
  {
    label: "Pickup",
    value: "Bangkok pickup available as a fixed-price add-on",

  },
  {
    label: "Languages",
    value: "English & Thai (USPA-certified tandem masters)",

  },
];

const GOOD_TO_KNOW: SpecItem[] = [
  {
    label: "Age",
    value: "Min. 14 years old (Jumpers under 18 require parental consent)",

  },
  {
    label: "Weight",
    value: "Maximum 100 kg (Jumpers 90–100 kg subject to harness assessment)",

  },
  {
    label: "Health",
    value: "Good general health; no heart conditions, sinus blockage, or recent scuba dives within 24h",

  },
  {
    label: "Weather",
    value: "Operations are strictly weather-permitting; free reschedule in case of cloud/rain",

  },
];

export const DetailsSection: React.FC = () => {
  return (
    <section
      id="details"
      aria-label="Trip Details and Prerequisites"
      className="max-w-6xl mx-auto px-6 py-20 sm:py-28"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Column 1: Details / The Specifics */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="w-5 h-[2px] bg-[#fa7a3d]" aria-hidden="true" />
            <span className="text-[#fa7a3d] text-xs font-bold uppercase tracking-[0.25em]">
              DETAILS
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-slate-900 mt-3 mb-8">
            THE SPECIFICS
          </h2>

          <div className="divide-y divide-slate-300/80 border-y border-slate-300/80">
            {SPECIFICS.map((item, idx) => (
              <div
                key={idx}
                className="py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
              >
                <div className="flex items-center gap-2 sm:w-1/3">
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-slate-900">
                    {item.label}
                  </span>
                  {item.placeholder && (
                    <span className="text-[9px] text-slate-400 font-mono">
                      {item.placeholder}
                    </span>
                  )}
                </div>
                <span className="sm:w-2/3 text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Good To Know / Before You Book */}
        <div id="good-to-know" className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="w-5 h-[2px] bg-[#fa7a3d]" aria-hidden="true" />
            <span className="text-[#fa7a3d] text-xs font-bold uppercase tracking-[0.25em]">
              GOOD TO KNOW
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-slate-900 mt-3 mb-8">
            BEFORE YOU BOOK
          </h2>

          <div className="divide-y divide-slate-300/80 border-y border-slate-300/80">
            {GOOD_TO_KNOW.map((item, idx) => (
              <div
                key={idx}
                className="py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
              >
                <div className="flex items-center gap-2 sm:w-1/3">
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-slate-900">
                    {item.label}
                  </span>
                  {item.placeholder && (
                    <span className="text-[9px] text-slate-400 font-mono">
                      {item.placeholder}
                    </span>
                  )}
                </div>
                <span className="sm:w-2/3 text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsSection;

