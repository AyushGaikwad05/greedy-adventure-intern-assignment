import React from "react";

interface NavbarProps {
  onContactClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick }) => {
  return (
    <header className="sticky top-0 z-50 w-full h-[72px] border-b border-white/10 bg-[#071726]/85 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto h-full px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="group flex flex-col focus:outline-hidden focus:ring-2 focus:ring-[#fa7a3d] rounded-xs"
          aria-label="Greedy Adventures Homepage"
        >
          <span className="font-display text-2xl sm:text-3xl tracking-wider text-white font-bold group-hover:text-slate-200 transition-colors leading-none">
            GREEDY
          </span>
          <span className="text-[9px] tracking-[0.35em] uppercase text-slate-300 font-medium mt-1">
            ADVENTURES
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-8 lg:gap-10 text-xs uppercase tracking-[0.2em] font-medium text-slate-200"
          aria-label="Main Navigation"
        >
          <a
            href="#escapes"
            className="hover:text-white transition-colors py-1 focus:outline-hidden focus:text-white"
          >
            ESCAPES
          </a>
          <a
            href="#adventures"
            className="hover:text-white transition-colors py-1 focus:outline-hidden focus:text-white"
          >
            ADVENTURES
          </a>
          <a
            href="#about"
            className="hover:text-white transition-colors py-1 focus:outline-hidden focus:text-white"
          >
            ABOUT
          </a>

        </nav>

        {/* Contact Action */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            onClick={onContactClick}
            className="border border-white/40 hover:border-white text-white px-5 py-2 text-xs uppercase tracking-[0.2em] font-semibold transition-all hover:bg-white/10 focus:outline-hidden focus:ring-2 focus:ring-white"
          >
            CONTACT
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
