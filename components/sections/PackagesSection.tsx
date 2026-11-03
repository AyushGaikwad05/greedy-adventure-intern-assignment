import React from "react";
import Image from "next/image";

export interface PackageItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  price: string;
  image: string;
  badge?: string;
  isPopular?: boolean;
  baseFeatures: string[];
  plusFeatures?: string[];
  footerLabel?: string;
}

const PACKAGES: PackageItem[] = [
  {
    id: "eco",
    number: "01",
    title: "ECO",
    subtitle: "THE JUMP, NOTHING ELSE",
    price: "฿9,500",
    image: "/images/package-eco.jpg",
    isPopular: false,
    baseFeatures: [
      "Tandem skydive in Pattaya",
      "Safety briefing and instructor support",
      "Aircraft ascent and ocean-view jump",
      "Certificate of completion",
    ],
    footerLabel: "JUST THE JUMP",
  },
  {
    id: "deluxe",
    number: "02",
    title: "DELUXE",
    subtitle: "VIDEO AND PHOTOS INCLUDED",
    price: "฿12,500",
    image: "/images/package-deluxe.jpg",
    badge: "PHOTOS + VIDEO",
    isPopular: true,
    baseFeatures: [
      "Tandem skydive in Pattaya",
      "Safety briefing and instructor support",
      "Aircraft ascent and ocean-view jump",
      "Certificate of completion",
    ],
    plusFeatures: ["Video of your jump", "Photos of your jump"],
  },
  {
    id: "vip",
    number: "03",
    title: "VIP",
    subtitle: "PERSONAL CAMERAMAN AND EDITED FILM",
    price: "฿14,000",
    image: "/images/package-vip.jpg",
    isPopular: false,
    baseFeatures: [
      "Tandem skydive in Pattaya",
      "Safety briefing and instructor support",
      "Aircraft ascent and ocean-view jump",
      "Certificate of completion",
    ],
    plusFeatures: [
      "Personal cameraman",
      "Professionally edited film",
    ],
  },
];

export const PackagesSection: React.FC = () => {
  return (
    <section
      id="packages"
      aria-label="Packages and Pricing"
      className="max-w-6xl mx-auto px-6 py-20 sm:py-28"
    >
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-[2px] bg-[#fa7a3d]" aria-hidden="true" />
            <span className="text-[#fa7a3d] text-xs font-bold uppercase tracking-[0.25em]">
              PACKAGES
            </span>
          </div>
          <div>
            <h2 className="font-display text-5xl sm:text-6xl uppercase tracking-tight text-slate-900 mt-3">
              CHOOSE YOUR PACKAGE
            </h2>
          </div>
          <p className="text-slate-600 text-sm md:text-base max-w-sm  font-light leading-relaxed md:text-left lg:text-left sm:text-center">
            Every package is the same jump. Pick how much of it you take home.
          </p>
        </div>
      </div>

      {/* 3 Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {PACKAGES.map((pkg) => {
          const isDeluxe = pkg.isPopular;

          return (
            <div
              key={pkg.id}
              className={`flex flex-col relative border transition-all duration-300 ${isDeluxe
                ? "bg-[#0b1d2e] text-white border-[#173a5a] shadow-2xl scale-100 md:-translate-y-2"
                : "bg-white text-slate-900 border-slate-200/90 shadow-md hover:shadow-xl"
                }`}
            >
              {/* Optional Top Badge for Deluxe */}
              {pkg.badge && (
                <div className="absolute top-4 right-4 z-10 bg-[#fa7a3d] text-white text-[10px] font-bold tracking-[0.2em] px-3 py-1 uppercase shadow-md">
                  {pkg.badge}
                </div>
              )}

              {/* Card Image Thumbnail */}
              <div className="relative w-full h-44 overflow-hidden bg-slate-900">
                <Image
                  src={pkg.image}
                  alt={`${pkg.title} tandem skydiving package`}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Card Content Area */}
              <div className="p-7 sm:p-8 flex flex-col flex-1 justify-between">
                <div>
                  {/* Number & Title */}
                  <span
                    className={`font-display text-xl tracking-wider ${isDeluxe ? "text-[#fa7a3d]" : "text-slate-400"
                      }`}
                  >
                    {pkg.number}
                  </span>

                  <h3
                    className={`font-display text-4xl sm:text-5xl uppercase tracking-tight mt-1 ${isDeluxe ? "text-white" : "text-slate-900"
                      }`}
                  >
                    {pkg.title}
                  </h3>

                  <p
                    className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] mt-1 ${isDeluxe ? "text-slate-300" : "text-slate-500"
                      }`}
                  >
                    {pkg.subtitle}
                  </p>

                  {/* Price */}
                  <div className="mt-6 flex items-baseline gap-2 pb-6 border-b border-dashed border-slate-300/40">
                    <span
                      className={`font-display text-4xl sm:text-5xl font-bold tracking-tight ${isDeluxe ? "text-white" : "text-slate-900"
                        }`}
                    >
                      {pkg.price}
                    </span>
                    <span
                      className={`text-xs uppercase tracking-wider ${isDeluxe ? "text-slate-300" : "text-slate-500"
                        }`}
                    >
                      per person
                    </span>
                  </div>

                  {/* Base Features Checklist */}
                  <ul className="mt-6 space-y-3">
                    {pkg.baseFeatures.map((feat, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm font-light leading-snug"
                      >
                        <span
                          className={`shrink-0 font-bold ${isDeluxe ? "text-[#fa7a3d]" : "text-emerald-600"
                            }`}
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                        <span
                          className={isDeluxe ? "text-slate-200" : "text-slate-700"}
                        >
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Plus Features (for Deluxe & VIP) */}
                  {pkg.plusFeatures && (
                    <div className="mt-5 pt-4 border-t border-slate-300/30">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-[0.25em] block mb-2.5 ${isDeluxe ? "text-[#fa7a3d]" : "text-slate-500"
                          }`}
                      >
                        PLUS
                      </span>
                      <ul className="space-y-2">
                        {pkg.plusFeatures.map((feat, idx) => (
                          <li
                            key={idx}
                            className={`flex items-start gap-2.5 text-xs sm:text-sm font-medium leading-snug ${isDeluxe ? "text-white" : "text-slate-900"
                              }`}
                          >
                            <span
                              className={`shrink-0 font-bold ${isDeluxe ? "text-[#fa7a3d]" : "text-blue-600"
                                }`}
                              aria-hidden="true"
                            >
                              +
                            </span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Footer Label for ECO */}
                  {pkg.footerLabel && (
                    <div className="mt-6 pt-4 border-t border-slate-200">
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
                        {pkg.footerLabel}
                      </span>
                    </div>
                  )}
                </div>

                {/* Call to Action Button */}
                <div className="mt-8 pt-4">
                  <a
                    href="#contact"
                    className={`w-full py-4 px-6 text-xs sm:text-sm uppercase tracking-[0.2em] font-bold inline-flex items-center justify-center transition-all ${isDeluxe
                      ? "bg-white hover:bg-slate-100 text-[#0b1d2e] shadow-lg active:scale-98"
                      : "bg-[#0b1d2e] hover:bg-[#1a3854] text-white active:scale-98"
                      }`}
                  >
                    CHECK AVAILABILITY
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Note under packages */}
      <p className="mt-10 text-center text-xs text-slate-500 uppercase tracking-widest">
        Prices are per person. Select a package to check dates.
      </p>
    </section>
  );
};

export default PackagesSection;

