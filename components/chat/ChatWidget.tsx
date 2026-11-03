"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, AlertCircle, RefreshCw, BookOpen } from "lucide-react";
import { MediaAttachmentRenderer } from "./MediaAttachmentRenderer";
import { SourceCitations } from "./SourceCitations";
import { ChatMessage, ChatResponsePayload } from "@/lib/ai/types";

const SUGGESTED_QUESTIONS = [
  "What is included in the package?",
  "Can you send me a brochure?",
  "Can I see a video of the experience?",
  "Send me the brochure and a video.",
];

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      role: "assistant",
      content:
        "Hello! I am your Greedy Adventures AI concierge for the Pattaya Sea View Skydiving jump. Ask me anything about packages, requirements, or ask to see our brochure and experience video!",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    setInput("");
    setErrorMessage(null);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error ${res.status}`);
      }

      const data: ChatResponsePayload = await res.json();
      const assistantMsg: ChatMessage = {
        id: data.message.id,
        role: "assistant",
        content: data.message.content,
        attachments: data.message.attachments,
        citations: data.message.citations,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error("Chat error:", err);
      setErrorMessage(
        err?.message || "Failed to reach AI backend. Please verify your connection or try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 bg-[#fa7a3d] hover:bg-[#f86520] text-white px-5 py-3.5 shadow-2xl transition-all hover:scale-105 active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-[#fa7a3d] focus:ring-offset-2"
          aria-label="Open AI Skydiving Assistant"
        >
          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="font-bold text-xs uppercase tracking-[0.18em]">
            Ask Skydiving AI
          </span>
          <span className="relative flex h-2.5 w-2.5 ml-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Greedy Adventures AI Assistant"
          className="w-[92vw] sm:w-[440px] h-[640px] max-h-[85vh] bg-[#fdfcf9] border border-slate-300 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="bg-[#0b1d2e] text-white px-5 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#fa7a3d] text-white">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display text-lg uppercase tracking-wider text-white leading-none">
                  Greedy Adventures AI
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Link to Knowledge View */}
              <a
                href="/knowledge"
                target="_blank"
                rel="noopener noreferrer"
                title="Open Backend Knowledge View"
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus:ring-1 focus:ring-white rounded-xs flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sources</span>
              </a>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-hidden focus:ring-1 focus:ring-white rounded-xs"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Viewport */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#f8f6f0]">
            {messages.map((msg) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[88%] p-3.5 text-xs sm:text-[13px] leading-relaxed shadow-xs ${isUser
                      ? "bg-[#fa7a3d] text-white font-medium"
                      : "bg-white text-slate-800 border border-slate-200"
                      }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>

                    {/* Media Attachments (PDF / Video) */}
                    {!isUser && msg.attachments && msg.attachments.length > 0 && (
                      <MediaAttachmentRenderer attachments={msg.attachments} />
                    )}

                    {/* Sources / Citations */}
                    {!isUser && msg.citations && msg.citations.length > 0 && (
                      <SourceCitations citations={msg.citations} />
                    )}
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start">
                <div className="bg-white border border-slate-200 p-3.5 text-xs text-slate-500 shadow-xs flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#fa7a3d]" />
                  <span>Consulting Pattaya website knowledge & Gemini...</span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">Chat Error</p>
                  <p className="text-[11px] mt-0.5">{errorMessage}</p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Starter Questions (when few messages) */}
          {messages.length <= 2 && (
            <div className="p-2.5 bg-white border-t border-slate-200 overflow-x-auto flex gap-1.5 shrink-0">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  disabled={isLoading}
                  className="text-[10px] sm:text-[11px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-2.5 py-1 whitespace-nowrap transition-colors focus:ring-1 focus:ring-slate-400 disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Composer Input Form */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about packages, video, brochure..."
                rows={1}
                className="flex-1 resize-none bg-slate-50 border border-slate-300 px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-[#fa7a3d] focus:bg-white"
                aria-label="Type your message"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-[#0b1d2e] hover:bg-[#1a3854] text-white p-2.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-hidden focus:ring-2 focus:ring-[#0b1d2e]"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;

