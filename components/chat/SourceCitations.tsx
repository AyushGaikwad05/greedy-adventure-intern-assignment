import React from "react";
import { SourceCitation } from "@/lib/ai/types";
import { Link2 } from "lucide-react";

interface SourceCitationsProps {
  citations: SourceCitation[];
}

export const SourceCitations: React.FC<SourceCitationsProps> = ({
  citations,
}) => {
  if (!citations || citations.length === 0) return null;

  return (
    <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col gap-1.5">
      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
        Sources Consulted:
      </span>
      <div className="flex flex-wrap gap-1.5">
        {citations.map((cite, idx) => {
          // If local anchor link, point to landing page section
          let targetHref = cite.url;
          if (cite.url.includes("#")) {
            const anchor = cite.url.split("#")[1];
            targetHref = `#${anchor}`;
          }

          return (
            <a
              key={idx}
              href={targetHref}
              title={cite.snippet || cite.title}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-blue-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-2 py-0.5 transition-colors focus:ring-1 focus:ring-blue-500"
            >
              <Link2 className="w-3 h-3 text-slate-400" />
              <span className="truncate max-w-[200px]">{cite.title}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SourceCitations;

