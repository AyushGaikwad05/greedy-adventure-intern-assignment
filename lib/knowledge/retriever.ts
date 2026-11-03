import { KNOWLEDGE_SOURCES, KnowledgeSource } from "./sources";
import { MEDIA_CATALOG, MediaItem } from "./media";
import { SourceCitation } from "../ai/types";

export interface RetrievalResult {
  matchedSources: KnowledgeSource[];
  citations: SourceCitation[];
  attachments: MediaItem[];
  intent: {
    wantsBrochure: boolean;
    wantsVideo: boolean;
    wantsPackages: boolean;
    wantsEligibility: boolean;
    wantsLocation: boolean;
    wantsPricing: boolean;
    wantsItinerary: boolean;
  };
  contextPrompt: string;
}

export function retrieveKnowledge(query: string, conversationHistory: Array<{ role: string; content: string }> = []): RetrievalResult {
  const combinedText = [
    ...conversationHistory.slice(-4).map((m) => m.content),
    query,
  ].join(" ").toLowerCase();

  const currentQuery = query.toLowerCase();

  // 1. Detect Media Intent
  const brochureKeywords = ["brochure", "pdf", "catalog", "catalogue", "document", "pamphlet", "flyer", "download"];
  const videoKeywords = ["video", "clip", "watch", "film", "footage", "preview", "recording", "movie", "see the experience"];

  const wantsBrochure = brochureKeywords.some((kw) => currentQuery.includes(kw));
  const wantsVideo = videoKeywords.some((kw) => currentQuery.includes(kw));

  const attachments: MediaItem[] = [];
  if (wantsBrochure) {
    const brochure = MEDIA_CATALOG.find((m) => m.type === "pdf");
    if (brochure) attachments.push(brochure);
  }
  if (wantsVideo) {
    const video = MEDIA_CATALOG.find((m) => m.type === "video");
    if (video) attachments.push(video);
  }

  // 2. Detect Topic Intent
  const wantsPackages = ["package", "eco", "deluxe", "vip", "include", "difference", "pricing", "cost", "price", "baht", "fee"].some(
    (kw) => combinedText.includes(kw)
  );

  const wantsEligibility = [
    "age",
    "weight",
    "weigh",
    "kg",
    "kilos",
    "lbs",
    "limit",
    "old",
    "young",
    "child",
    "minor",
    "heavy",
    "scuba",
    "medical",
    "heart",
    "health",
    "fitness",
    "pregnant",
    "alcohol",
    "weather",
    "rain",
    "wind",
    "cancel",
  ].some((kw) => combinedText.includes(kw));

  const wantsLocation = [
    "location",
    "where",
    "address",
    "pickup",
    "transport",
    "bangkok",
    "hotel",
    "reach",
    "pattaya",
    "dropzone",
  ].some((kw) => combinedText.includes(kw));

  const wantsItinerary = [
    "plan",
    "step",
    "schedule",
    "arrive",
    "time",
    "how long",
    "freefall",
    "canopy",
    "jump",
    "what happens",
  ].some((kw) => combinedText.includes(kw));

  // 3. Match relevant sources for citation
  const matchedSources: KnowledgeSource[] = [];

  // Always include overview
  matchedSources.push(KNOWLEDGE_SOURCES.find((s) => s.id === "src-overview")!);

  if (wantsPackages) {
    const s = KNOWLEDGE_SOURCES.find((s) => s.id === "src-packages");
    if (s && !matchedSources.includes(s)) matchedSources.push(s);
  }

  if (wantsEligibility) {
    const s = KNOWLEDGE_SOURCES.find((s) => s.id === "src-faq");
    if (s && !matchedSources.includes(s)) matchedSources.push(s);
  }

  if (wantsLocation) {
    const s1 = KNOWLEDGE_SOURCES.find((s) => s.id === "src-details");
    const s2 = KNOWLEDGE_SOURCES.find((s) => s.id === "src-dropzone");
    if (s1 && !matchedSources.includes(s1)) matchedSources.push(s1);
    if (s2 && !matchedSources.includes(s2)) matchedSources.push(s2);
  }

  if (wantsItinerary) {
    const s = KNOWLEDGE_SOURCES.find((s) => s.id === "src-plan");
    if (s && !matchedSources.includes(s)) matchedSources.push(s);
  }

  // Ensure high quality citations
  if (matchedSources.length === 1) {
    const p = KNOWLEDGE_SOURCES.find((s) => s.id === "src-packages");
    const d = KNOWLEDGE_SOURCES.find((s) => s.id === "src-details");
    if (p) matchedSources.push(p);
    if (d) matchedSources.push(d);
  }

  // Build Citations
  const citations: SourceCitation[] = matchedSources.map((s) => ({
    sourceId: s.id,
    title: s.title,
    url: s.url,
    snippet: s.summary,
  }));

  // Build Complete Context for Gemini 2.5 Flash (all sources to ensure zero hallucination & full coverage)
  const contextPrompt = KNOWLEDGE_SOURCES.map(
    (s) => `### SOURCE: ${s.title} (${s.url})\n${s.text}`
  ).join("\n\n");

  return {
    matchedSources,
    citations,
    attachments,
    intent: {
      wantsBrochure,
      wantsVideo,
      wantsPackages,
      wantsEligibility,
      wantsLocation,
      wantsPricing: wantsPackages,
      wantsItinerary,
    },
    contextPrompt,
  };
}

