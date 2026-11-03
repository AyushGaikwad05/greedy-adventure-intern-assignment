import React from "react";
import Image from "next/image";

export const GlimpseSection: React.FC = () => {
  return (
    <section
      id="glimpse"
      aria-label="A Glimpse of the Jump"
      className="max-w-6xl mx-auto px-6 py-20 sm:py-28"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Editorial Copy */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <span className="w-5 h-[2px] bg-[#fa7a3d]" aria-hidden="true" />
            <span className="text-[#fa7a3d] text-xs font-bold uppercase tracking-[0.25em]">
              A GLIMPSE OF THE JUMP
            </span>
          </div>

          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-slate-900 mt-4 leading-none">
            SEE IT.
            <br />
            FEEL IT.
          </h2>

          <p className="text-slate-600 text-base sm:text-lg mt-6 leading-relaxed font-light">
            Climb above the Gulf of Thailand, then fall toward the coast with a
            tandem instructor at your back.
          </p>

          <div className="mt-8 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            <span className="inline-block w-2 h-2 rounded-full bg-[#fa7a3d]" />
            Gulf of Thailand coastal dropzone
          </div>
        </div>

        {/* Right Column: High Quality Experience Photo */}
        <div className="lg:col-span-7">
          <div className="relative overflow-hidden bg-slate-900 shadow-xl border border-slate-200 aspect-4/3 group">
            <Image
              src="/images/glimpse.jpg"
              alt="Tandem skydiving over Pattaya coast with instructors and ocean view"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            {/* Subtle Gradient & Badge */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 text-white text-xs font-medium tracking-wider uppercase bg-black/40 backdrop-blur-sm px-3 py-1">
              Pattaya, Thailand • 13,000 FT
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlimpseSection;

