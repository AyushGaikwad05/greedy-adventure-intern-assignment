import { NextRequest, NextResponse } from "next/server";
import { retrieveKnowledge } from "@/lib/knowledge/retriever";
import { generateChatResponse } from "@/lib/ai/gemini";
import { ChatResponsePayload } from "@/lib/ai/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    // 1. Input Validation
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request: 'messages' must be a non-empty array." },
        { status: 400 }
      );
    }

    const latestMessage = messages[messages.length - 1];
    if (!latestMessage || typeof latestMessage.content !== "string" || !latestMessage.content.trim()) {
      return NextResponse.json(
        { error: "Invalid request: latest message content cannot be empty." },
        { status: 400 }
      );
    }

    const userQuery = latestMessage.content.trim();

    // 2. Retrieve relevant website knowledge & media attachments
    const retrieval = retrieveKnowledge(userQuery, messages);

    // 3. Generate response using Gemini (or intelligent mock fallback)
    const aiResult = await generateChatResponse({
      messages,
      retrieval,
    });

    // 4. Construct payload
    const responsePayload: ChatResponsePayload = {
      message: {
        id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        role: "assistant",
        content: aiResult.content,
        attachments: retrieval.attachments,
        citations: retrieval.citations,
        modelUsed: aiResult.modelUsed,
        isMock: aiResult.isMock,
      },
      debug: {
        intentDetected: {
          requestsBrochure: retrieval.intent.wantsBrochure,
          requestsVideo: retrieval.intent.wantsVideo,
          topicMatches: Object.entries(retrieval.intent)
            .filter(([_, v]) => v)
            .map(([k]) => k),
        },
        retrievedSourceIds: retrieval.matchedSources.map((s) => s.id),
        sourcesPassedToModel: retrieval.matchedSources.map((s) => ({
          id: s.id,
          title: s.title,
          snippet: s.summary,
        })),
      },
    };

    return NextResponse.json(responsePayload, { status: 200 });
  } catch (error: any) {
    console.error("API /api/chat error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate AI response. Please try again.",
        details: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

