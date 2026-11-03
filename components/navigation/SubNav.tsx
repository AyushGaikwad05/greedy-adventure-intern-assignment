"use client";

import React, { useState } from "react";

interface SubNavProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const NAV_ITEMS = [
  { id: "packages", label: "PACKAGES" },
  { id: "the-plan", label: "THE PLAN" },
  { id: "details", label: "DETAILS" },
  { id: "good-to-know", label: "GOOD TO KNOW" },
];

export const SubNav: React.FC<SubNavProps> = ({
  activeTab = "packages",
  onTabChange,
}) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleClick = (id: string) => {
    setCurrentTab(id);
    if (onTabChange) {
      onTabChange(id);
    }
  };

  return (
    <nav
      aria-label="Section Quick Links"
      className=" flex  sticky top-[72px] z-40 w-full bg-[#f2f1ea]/95 backdrop-blur-md border-b border-[#e5e1d5] shadow-xs"
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-center sm:justify-start gap-6 sm:gap-10 overflow-x-auto py-0">
        {NAV_ITEMS.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => handleClick(item.id)}
              className={`py-4 text-xs tracking-[0.2em] uppercase shrink-0 transition-all border-b-2 ${isActive
                ? "font-bold text-slate-900 border-slate-900"
                : "font-semibold text-slate-500 hover:text-slate-900 border-transparent hover:border-slate-400"
                }`}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default SubNav;

