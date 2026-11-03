import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#07131e] text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="col-span-2">
            <span className="font-display text-2xl tracking-wider text-white font-bold">
              GREEDY
            </span>
            <span className="block text-[9px] tracking-[0.35em] uppercase text-slate-400 font-medium -mt-1 mb-4">
              ADVENTURES
            </span>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed font-light">
              Pattaya Sea View Dropzone: 95 M.4, Chakphong, Klaeng District,
              Rayong 21190, Thailand. USPA-affiliated tandem skydiving
              operations.
            </p>
          </div>

          {/* Adventures */}
          <div>
            <h4 className="font-bold uppercase tracking-[0.2em] text-white text-[11px] mb-4">
              ADVENTURES
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Skydiving
                </a>
              </li>
              <li>
                <span className="text-slate-500">Paragliding (Soon)</span>
              </li>
              <li>
                <span className="text-slate-500">Scuba Diving (Soon)</span>
              </li>
              <li>
                <span className="text-slate-500">Snowboarding (Soon)</span>
              </li>
            </ul>
          </div>

          {/* Escapes */}
          <div>
            <h4 className="font-bold uppercase tracking-[0.2em] text-white text-[11px] mb-4">
              ESCAPES
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Pattaya Dropzone
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Mount Abu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Thailand
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  India
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold uppercase tracking-[0.2em] text-white text-[11px] mb-4">
              COMPANY
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Guides & Stories
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© 2026 GREEDY ADVENTURES. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              PRIVACY
            </a>
            <a href="#" className="hover:text-white transition-colors">
              TERMS
            </a>
            <a href="#" className="hover:text-white transition-colors">
              CANCELLATIONS
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

