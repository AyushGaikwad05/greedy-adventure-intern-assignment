import { MediaItem } from "../knowledge/media";
import { KnowledgeSource } from "../knowledge/sources";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt?: string;
  attachments?: MediaItem[];
  citations?: SourceCitation[];
}

export interface SourceCitation {
  sourceId: string;
  title: string;
  url: string;
  snippet?: string;
}

export interface ChatRequestPayload {
  messages: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
  temperature?: number;
}

export interface ChatResponsePayload {
  message: {
    id: string;
    role: "assistant";
    content: string;
    attachments: MediaItem[];
    citations: SourceCitation[];
    modelUsed: string;
    isMock: boolean;
  };
  debug?: {
    intentDetected: {
      requestsBrochure: boolean;
      requestsVideo: boolean;
      topicMatches: string[];
    };
    retrievedSourceIds: string[];
    sourcesPassedToModel: Array<{
      id: string;
      title: string;
      snippet: string;
    }>;
  };
}

export interface KnowledgeViewData {
  sources: KnowledgeSource[];
  media: MediaItem[];
  modelInfo: {
    name: string;
    provider: string;
    isConfigured: boolean;
    mode: "live-gemini" | "mock-mode";
  };
}

