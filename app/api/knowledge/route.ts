import { NextRequest, NextResponse } from "next/server";
import { KNOWLEDGE_SOURCES } from "@/lib/knowledge/sources";
import { MEDIA_CATALOG } from "@/lib/knowledge/media";
import { retrieveKnowledge } from "@/lib/knowledge/retriever";

export async function GET() {
  const hasApiKey = Boolean(
    process.env.GEMINI_API_KEY &&
      process.env.GEMINI_API_KEY.trim().length > 0 &&
      process.env.GEMINI_API_KEY !== "your_api_key_here"
  );

  return NextResponse.json({
    sources: KNOWLEDGE_SOURCES,
    media: MEDIA_CATALOG,
    modelInfo: {
      provider: "Google Gemini",
      model: "gemini-2.5-flash",
      status: hasApiKey ? "Active (Live Gemini 2.5 Flash)" : "API Key Required",
      hasApiKey,
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { testQuestion } = body;

    if (!testQuestion || typeof testQuestion !== "string") {
      return NextResponse.json(
        { error: "Please provide a valid testQuestion string." },
        { status: 400 }
      );
    }

    // Run backend's actual retriever logic
    const retrieval = retrieveKnowledge(testQuestion);

    return NextResponse.json({
      testQuestion,
      intentDetected: retrieval.intent,
      selectedMedia: retrieval.attachments,
      matchedSources: retrieval.matchedSources.map((s) => ({
        id: s.id,
        title: s.title,
        url: s.url,
        captureDate: s.captureDate,
        summary: s.summary,
        exactTextPassedToModel: s.text,
      })),
      contextPromptPassedToModel: retrieval.contextPrompt,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error testing question retrieval", details: error?.message },
      { status: 500 }
    );
  }
}

