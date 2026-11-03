import React from "react";

export const CtaSection: React.FC = () => {
  return (
    <section
      aria-label="Book Your Jump"
      className="w-full bg-[#0a1b2a] text-white py-20 sm:py-28"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-display text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight leading-none text-white">
          SEE PATTAYA FROM ABOVE
        </h2>

        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-lg mx-auto mt-4 font-light leading-relaxed">
          Pick a package and check dates. Tandem jumps from{" "}
          <span className="font-bold text-white">฿9,500</span> per person.
        </p>

        <div className="mt-8 flex justify-center">
          <a
            href="#packages"
            className="inline-flex items-center justify-center bg-white hover:bg-slate-100 text-[#0a1b2a] px-10 py-4 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-all shadow-xl hover:shadow-2xl active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-white"
          >
            CHOOSE PACKAGE
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;

