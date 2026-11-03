"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Database, Film, FileText, Search, Sparkles, CheckCircle2, ShieldAlert } from "lucide-react";
import { KnowledgeSource } from "@/lib/knowledge/sources";
import { MediaItem } from "@/lib/knowledge/media";

interface KnowledgeData {
  sources: KnowledgeSource[];
  media: MediaItem[];
  modelInfo: {
    provider: string;
    model: string;
    status: string;
    hasApiKey: boolean;
  };
}

interface TestResult {
  testQuestion: string;
  intentDetected: {
    wantsBrochure: boolean;
    wantsVideo: boolean;
    wantsPackages: boolean;
    wantsEligibility: boolean;
    wantsLocation: boolean;
    wantsPricing: boolean;
    wantsItinerary: boolean;
  };
  selectedMedia: MediaItem[];
  matchedSources: Array<{
    id: string;
    title: string;
    url: string;
    captureDate: string;
    summary: string;
    exactTextPassedToModel: string;
  }>;
  contextPromptPassedToModel: string;
}

const SAMPLE_TEST_QUESTIONS = [
  "What is included in the package?",
  "Can you send me a brochure?",
  "Can I see a video of the experience?",
  "Send me the brochure and a video.",
  "What are the age and weight limits?",
  "Where is the dropzone located?",
];

export default function KnowledgePage() {
  const [data, setData] = useState<KnowledgeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [testInput, setTestInput] = useState(SAMPLE_TEST_QUESTIONS[0]);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    fetch("/api/knowledge")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load knowledge sources:", err);
        setLoading(false);
      });
  }, []);

  const runTestQuestion = async (query: string) => {
    setTesting(true);
    setTestInput(query);
    try {
      const res = await fetch("/api/knowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testQuestion: query }),
      });
      const json = await res.json();
      setTestResult(json);
    } catch (err) {
      console.error("Test failed:", err);
    } finally {
      setTesting(false);
    }
  };

  // Run initial test query once loaded
  useEffect(() => {
    if (!loading && data) {
      runTestQuestion(SAMPLE_TEST_QUESTIONS[0]);
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f3ec] flex items-center justify-center p-6 text-slate-700">
        <div className="flex items-center gap-3 font-mono text-sm">
          <span className="w-3 h-3 bg-[#fa7a3d] animate-ping rounded-full" />
          Loading Knowledge View & Backend Sources...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f3ec] text-slate-900 font-sans selection:bg-[#fa7a3d] selection:text-white pb-24">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 w-full bg-[#0b1d2e] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Experience Page
            </Link>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-[#fa7a3d]" />
              <h1 className="font-display text-xl uppercase tracking-wider text-white">
                Knowledge View & Activity Inspector
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Model:</span>
            <span className="bg-slate-800 text-blue-300 px-2 py-0.5 border border-slate-700">
              {data?.modelInfo.provider} ({data?.modelInfo.model})
            </span>
            <span
              className={`px-2 py-0.5 text-[11px] font-semibold ${
                data?.modelInfo.hasApiKey
                  ? "bg-emerald-900/60 text-emerald-300 border border-emerald-700"
                  : "bg-amber-900/60 text-amber-300 border border-amber-700"
              }`}
            >
              {data?.modelInfo.status}
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
        {/* Notice Card */}
        <section className="bg-white border border-slate-200/90 p-6 shadow-sm">
          <h2 className="text-xs uppercase font-bold tracking-[0.2em] text-[#fa7a3d] mb-1">
            Assignment Evaluation Note
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed font-light">
            This read-only dashboard exposes the website sources loaded into the chatbot, available media inventory, and real-time backend retrieval activity. For any test question, you can inspect the exact source text chunks and media files passed into the model prompt.
          </p>
        </section>

        {/* ----------------- SECTION 1: LIVE TEST QUESTION INSPECTOR ----------------- */}
        <section className="bg-white border border-slate-200 shadow-md p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-[#fa7a3d]" />
            <h2 className="font-display text-2xl uppercase tracking-wider text-slate-900">
              Real-Time Activity Inspector
            </h2>
          </div>
          <p className="text-xs text-slate-500 mb-6 font-light">
            Shows the backend&apos;s actual activity for a test question: intent recognition, selected media, and source text passed to the Gemini model.
          </p>

          {/* Preset Buttons */}
          <div className="mb-4">
            <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 block mb-2">
              Select a Test Scenario from Assignment Brief:
            </span>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_TEST_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => runTestQuestion(q)}
                  className={`text-xs px-3 py-1.5 transition-all border font-medium ${
                    testInput === q
                      ? "bg-[#0b1d2e] text-white border-[#0b1d2e] shadow-sm"
                      : "bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (testInput.trim()) runTestQuestion(testInput.trim());
            }}
            className="flex gap-2 mb-8"
          >
            <input
              type="text"
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              placeholder="Type custom test question..."
              className="flex-1 border border-slate-300 px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-[#fa7a3d]"
            />
            <button
              type="submit"
              disabled={testing}
              className="bg-[#fa7a3d] hover:bg-[#f86520] text-white px-6 py-2.5 text-xs uppercase font-bold tracking-wider transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <Search className="w-3.5 h-3.5" />
              {testing ? "Inspecting..." : "Inspect"}
            </button>
          </form>

          {/* Results Grid */}
          {testResult && (
            <div className="space-y-6 pt-6 border-t border-slate-200">
              {/* Intent & Media Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Intent Detected */}
                <div className="bg-slate-50 border border-slate-200 p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Backend Intent Detection
                  </h4>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-center justify-between">
                      <span className="text-slate-600">Requests Brochure PDF:</span>
                      <span
                        className={`font-mono font-semibold px-2 py-0.5 ${
                          testResult.intentDetected.wantsBrochure
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {String(testResult.intentDetected.wantsBrochure)}
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-slate-600">Requests Experience Video:</span>
                      <span
                        className={`font-mono font-semibold px-2 py-0.5 ${
                          testResult.intentDetected.wantsVideo
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {String(testResult.intentDetected.wantsVideo)}
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-slate-600">Packages Topic:</span>
                      <span
                        className={`font-mono font-semibold px-2 py-0.5 ${
                          testResult.intentDetected.wantsPackages
                            ? "bg-blue-100 text-blue-800"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {String(testResult.intentDetected.wantsPackages)}
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-slate-600">Eligibility / Health:</span>
                      <span
                        className={`font-mono font-semibold px-2 py-0.5 ${
                          testResult.intentDetected.wantsEligibility
                            ? "bg-blue-100 text-blue-800"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {String(testResult.intentDetected.wantsEligibility)}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Selected Media */}
                <div className="bg-slate-50 border border-slate-200 p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Selected Media Attachments ({testResult.selectedMedia.length})
                  </h4>
                  {testResult.selectedMedia.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">
                      None selected (Question answered in text format).
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {testResult.selectedMedia.map((m) => (
                        <div
                          key={m.id}
                          className="p-3 bg-white border border-slate-200 flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-2">
                            {m.type === "pdf" ? (
                              <FileText className="w-4 h-4 text-rose-600 shrink-0" />
                            ) : (
                              <Film className="w-4 h-4 text-blue-600 shrink-0" />
                            )}
                            <div>
                              <div className="font-semibold text-slate-900">
                                {m.title}
                              </div>
                              <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.2">
                                {m.demoLabel}
                              </span>
                            </div>
                          </div>
                          <a
                            href={m.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] uppercase font-bold text-blue-600 hover:underline shrink-0"
                          >
                            Open ↗
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Exact Source Text Passed to Model */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Actual Knowledge Chunks Retrieved & Passed to Model ({testResult.matchedSources.length} sources)
                </h4>
                <div className="space-y-3">
                  {testResult.matchedSources.map((s) => (
                    <div
                      key={s.id}
                      className="border border-slate-200 bg-slate-50 p-4 text-xs font-mono"
                    >
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                        <span className="font-bold text-slate-800">{s.title}</span>
                        <span className="text-[10px] text-slate-400">{s.url}</span>
                      </div>
                      <pre className="whitespace-pre-wrap font-mono text-[11px] text-slate-700 leading-relaxed max-h-48 overflow-y-auto">
                        {s.exactTextPassedToModel}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ----------------- SECTION 2: WEBSITE SOURCES CATALOG ----------------- */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-slate-700" />
            <h2 className="font-display text-2xl uppercase tracking-wider text-slate-900">
              Loaded Website Sources ({data?.sources.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data?.sources.map((src) => (
              <div
                key={src.id}
                className="bg-white border border-slate-200 p-6 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-2">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700">
                      {src.category}
                    </span>
                    <span>Captured: {src.captureDate}</span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 mb-1">
                    {src.title}
                  </h3>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-blue-600 hover:underline block truncate mb-3"
                  >
                    {src.url}
                  </a>
                  <p className="text-xs text-slate-500 font-light mb-4 leading-relaxed">
                    {src.summary}
                  </p>
                </div>

                <details className="text-xs text-slate-600 border-t border-slate-100 pt-3 group">
                  <summary className="cursor-pointer text-slate-700 font-semibold group-hover:text-black">
                    View Full Loaded Text Chunk
                  </summary>
                  <pre className="mt-3 p-3 bg-slate-50 text-[11px] font-mono whitespace-pre-wrap leading-relaxed text-slate-800 border border-slate-200 max-h-60 overflow-y-auto">
                    {src.text}
                  </pre>
                </details>
              </div>
            ))}
          </div>
        </section>

        {/* ----------------- SECTION 3: MEDIA INVENTORY ----------------- */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Film className="w-5 h-5 text-slate-700" />
            <h2 className="font-display text-2xl uppercase tracking-wider text-slate-900">
              Available Media Catalog ({data?.media.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data?.media.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 p-6 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-wider mb-2">
                    <span
                      className={`px-2 py-0.5 ${
                        item.type === "pdf"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {item.type.toUpperCase()}
                    </span>
                    <span className="text-slate-400">
                      {item.size || item.duration}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-light mb-3">
                    {item.description}
                  </p>

                  <span className="inline-block text-[10px] uppercase font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 mb-4">
                    {item.demoLabel}
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-100 text-xs font-semibold">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Open Media ↗
                  </a>
                  <a
                    href={item.downloadUrl}
                    download={item.filename}
                    className="text-slate-700 hover:text-black"
                  >
                    Download File ↓
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

