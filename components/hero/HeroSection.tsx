import React from "react";

export interface HeroSectionProps {
  onChoosePackage?: () => void;
  onSeeThePlan?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onChoosePackage,
  onSeeThePlan,
}) => {
  return (
    <section className="relative w-full -mt-[72px] pt-[72px] bg-[#0d2235] text-white overflow-hidden">
      {/* Background Video with Poster Fallback */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero-bg.jpg"
          className="w-full h-full object-cover object-center opacity-60 scale-105 transition-transform duration-1000"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Oceanic Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#091825]/85 via-[#0b2840]/60 to-[#071726]/95 pointer-events-none" />
        {/* Subtle vignette overlay */}
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/50 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pt-20 pb-36 sm:pt-28 sm:pb-44 lg:pt-32 lg:pb-48">
        <div className="max-w-3xl">
          {/* Eyebrow badge */}
          <div className="flex items-center gap-3">
            <span
              className="w-8 h-[2px] bg-[#fa7a3d]"
              aria-hidden="true"
            />
            <span className="text-[#fa7a3d] text-xs sm:text-sm font-bold uppercase tracking-[0.25em]">
              PATTAYA DROPZONE
            </span>
          </div>

          {/* Display Headline */}
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[108px] uppercase tracking-tight text-white leading-[0.88] mt-5 drop-shadow-md">
            SEA VIEW
            <br />
            SKYDIVING
          </h1>

          {/* Sub-headline */}
          <h2 className="text-white font-bold text-lg sm:text-xl md:text-2xl uppercase tracking-[0.12em] mt-5">
            TANDEM JUMP OVER PATTAYA
          </h2>

          {/* Description Paragraph */}
          <p className="text-slate-200 text-base sm:text-lg md:text-xl max-w-xl mt-4 leading-relaxed font-light">
            Climb above the coast, then freefall with the Gulf of Thailand beneath you.
          </p>

          {/* Dual CTAs & Pricing Hook */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7">
            {/* Primary CTA */}
            <a
              href="#packages"
              onClick={onChoosePackage}
              className="inline-flex items-center justify-center bg-[#fa7a3d] hover:bg-[#f86520] text-white px-8 py-4 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-all shadow-lg hover:shadow-orange-500/25 active:translate-y-0.5 focus:outline-hidden focus:ring-2 focus:ring-[#fa7a3d]"
            >
              CHOOSE PACKAGE
            </a>

            {/* Secondary CTA */}
            <a
              href="#the-plan"
              onClick={onSeeThePlan}
              className="inline-flex items-center justify-center border border-white/60 hover:border-white text-white hover:bg-white/10 px-8 py-4 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-all focus:outline-hidden focus:ring-2 focus:ring-white"
            >
              SEE THE PLAN
            </a>

            {/* Price Anchor */}
            <div className="flex items-baseline gap-1.5 text-slate-300">
              <span className="text-xs uppercase tracking-wider">From</span>
              <span className="font-display text-3xl sm:text-4xl text-white font-bold tracking-tight">
                ฿9,500
              </span>
              <span className="text-xs text-slate-300 tracking-wider">
                per person
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
