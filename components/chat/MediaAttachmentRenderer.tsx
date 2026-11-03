import React from "react";
import { MediaItem } from "@/lib/knowledge/media";
import { FileText, Download, ExternalLink, Play, Film } from "lucide-react";

interface MediaAttachmentRendererProps {
  attachments: MediaItem[];
}

export const MediaAttachmentRenderer: React.FC<MediaAttachmentRendererProps> = ({
  attachments,
}) => {
  if (!attachments || attachments.length === 0) return null;

  return (
    <div className="mt-3 space-y-3 pt-2">
      {attachments.map((media) => {
        if (media.type === "pdf") {
          return (
            <div
              key={media.id}
              className="border border-slate-200 bg-white shadow-xs p-3.5 flex flex-col gap-2.5 transition-all hover:border-slate-300"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-rose-50 border border-rose-100 text-rose-600 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-xs text-slate-900 truncate">
                      {media.title}
                    </span>
                    {media.isDemoMaterial && (
                      <span className="inline-block text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200">
                        {media.demoLabel}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    {media.description}
                  </p>
                  <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                    Format: PDF {media.size ? `• ${media.size}` : ""}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Open & Download */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <a
                  href={media.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 transition-colors focus:ring-1 focus:ring-slate-400"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open in New Tab
                </a>
                <a
                  href={media.downloadUrl}
                  download={media.filename}
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white bg-[#0e2235] hover:bg-[#1a3854] px-3 py-1.5 transition-colors focus:ring-1 focus:ring-slate-900"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download PDF
                </a>
              </div>
            </div>
          );
        }

        if (media.type === "video") {
          return (
            <div
              key={media.id}
              className="border border-slate-200 bg-white shadow-xs p-3.5 flex flex-col gap-2.5 transition-all hover:border-slate-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-xs text-slate-900">
                    {media.title}
                  </span>
                </div>
                {media.isDemoMaterial && (
                  <span className="text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200">
                    {media.demoLabel}
                  </span>
                )}
              </div>

              {/* Video Player */}
              <div className="relative w-full aspect-video bg-black overflow-hidden shadow-inner border border-slate-800">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={media.thumbnailUrl || "/images/glimpse.jpg"}
                  className="w-full h-full object-cover"
                >
                  <source src={media.url} type="video/mp4" />
                  Your browser does not support playing this video.
                </video>
              </div>

              {/* Direct watch/download link */}
              <div className="flex items-center justify-between pt-1 text-[11px]">
                <span className="text-slate-500 font-light">
                  {media.description}
                </span>
                <a
                  href={media.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium shrink-0 ml-2"
                >
                  <Play className="w-3 h-3 fill-current" />
                  Watch Full Screen
                </a>
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default MediaAttachmentRenderer;

