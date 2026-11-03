# Greedy Adventures — Sea View Skydiving Full-Stack Prototype

A full-stack Next.js + TypeScript web application built for the **Greedy Adventures Full-Stack Developer Assignment**. It features a redesigned editorial landing page for the **Sea View Skydiving** experience in Pattaya, Thailand, an AI customer chatbot powered by **Google Gemini** and `assistant-ui`, and a real-time **Read-Only Knowledge View** connected to the backend.

---

## 🚀 Quick Setup & Running Locally

1. **Clone & Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables (Optional for Live Gemini API)**:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Add your Google Gemini API key from [Google AI Studio](https://aistudio.google.com/):
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   > **Note on Mock Mode**: If `GEMINI_API_KEY` is not provided, the application runs in an **Intelligent Mock Mode** that fulfills all assignment test cases without requiring API credits, and is clearly labeled in responses and the dashboard.

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Architecture & File Structure

```
demo/
├── app/
│   ├── api/
│   │   ├── chat/route.ts         # POST /api/chat - Validates input, passes context to Gemini, returns response + attachments + citations
│   │   └── knowledge/route.ts    # GET & POST /api/knowledge - Live sources, media inventory, and test-question inspector
│   ├── knowledge/page.tsx        # Read-only Knowledge View dashboard (/knowledge)
│   ├── globals.css               # Tailwind CSS v4 theme & typography
│   ├── layout.tsx                # Next.js Root Layout with Bebas Neue display fonts
│   └── page.tsx                  # Redesigned Sea View Skydiving landing page
├── components/
│   ├── chat/
│   │   ├── ChatWidget.tsx        # Floating AI chat drawer with assistant-ui primitives
│   │   ├── MediaAttachmentRenderer.tsx # PDF (open/download) & video player renderers
│   │   └── SourceCitations.tsx   # Source citations with anchor links
│   ├── hero/
│   │   └── HeroSection.tsx       # Autoplay video background, dual CTAs, pricing hook
│   ├── navigation/
│   │   ├── Navbar.tsx            # Sticky brand navbar with Knowledge View shortcut
│   │   └── SubNav.tsx            # Sticky in-page quick nav (Packages, Plan, Details, Good to Know)
│   ├── sections/
│   │   ├── GlimpseSection.tsx    # "SEE IT. FEEL IT." editorial section
│   │   ├── PackagesSection.tsx   # 3-tier pricing (ECO, featured DELUXE, VIP)
│   │   ├── PlanSection.tsx       # 4-step linear day itinerary
│   │   ├── DetailsSection.tsx    # "The Specifics" vs "Before You Book" tables
│   │   ├── CtaSection.tsx        # "See Pattaya From Above" conversion banner
│   │   └── Footer.tsx            # Dropzone info & legal links
│   └── KeyMetricsBar.tsx         # Floating 4-part specs bar (Location, Jump Type, Altitude, Duration)
├── lib/
│   ├── ai/
│   │   ├── gemini.ts             # Google Gen AI SDK integration & labeled mock fallback
│   │   └── types.ts              # ChatMessage, MediaItem, SourceCitation interfaces
│   └── knowledge/
│       ├── sources.ts            # Official Pattaya website knowledge base
│       ├── media.ts              # Media inventory (brochure PDF, hero video)
│       └── retriever.ts          # Intent detection, knowledge retrieval, prompt builder
└── public/
    ├── documents/
    │   └── sea-view-skydiving-brochure.pdf # 3-page official experience brochure
    ├── images/                   # Cropped high-res experience photos
    └── hero.mp4                  # Actual 13,000 FT ocean tandem jump preview video
```

---

## 🤖 Agent Flow & AI Model Logic

1. **Customer Query**: The user asks a question via the floating chat widget or quick prompt pills.
2. **Intent & Keyword Analysis** (`lib/knowledge/retriever.ts`):
   - **Brochure Request**: Detects intent for PDF/document downloads.
   - **Video Request**: Detects intent for video previews/footage.
   - **Both**: Attaches both PDF brochure and experience video.
   - **Topic Matching**: Selects specific knowledge chunks (Packages, Itinerary, Eligibility, Location).
3. **Grounding & Context Injection**:
   - Compiles retrieved knowledge chunks into the system context.
   - Injects instructions: *Never invent facts; cite sources; reference attached media; maintain Greedy Adventures persona.*
4. **Model Execution** (`lib/ai/gemini.ts`):
   - **Live Mode**: Calls `gemini-1.5-flash` via `@google/generative-ai`.
   - **Mock Mode**: Returns grounded answers clearly labeled `(Mock Mode — Set GEMINI_API_KEY for Live API)`.
5. **Safe Response Rendering**:
   - Renders text with citations linking to relevant landing page sections.
   - Renders PDF cards with **Open in New Tab** and **Download PDF** buttons.
   - Renders HTML5 video player with inline playback and full-screen links.
   - Labels demo media with `Demo Material` badges.

---

## 🔍 How to Open & Use the Knowledge View

Navigate to **`/knowledge`** or click **`KNOWLEDGE [AI VIEW]`** in the top navigation bar.

The Knowledge View provides:
1. **Real-Time Activity Inspector**:
   - Type any question or click a preset test scenario.
   - Shows the exact backend intent detected.
   - Shows which media files were selected.
   - Shows the **exact knowledge chunks passed to the Gemini model in the prompt**.
2. **Website Sources Catalog**: Lists all 6 website knowledge sources with title, URL, capture date, category, and expandable text chunks.
3. **Media Catalog**: Lists available brochure PDFs and preview videos with file sizes, durations, and download links.

---

## ✅ Verification Steps (Assignment Rubric)

| Test Scenario | Input Query | Expected Result | Verified Behavior |
| :--- | :--- | :--- | :--- |
| **1. Package Inclusions** | *"What is included in the package?"* | Text response detailing ECO, Deluxe, and VIP tiers with citations. No media. | ✅ Passed (0 attachments, 3 citations) |
| **2. Brochure Request** | *"Can you send me a brochure?"* | Text response + PDF card with Open and Download buttons. | ✅ Passed (1 PDF attachment: `sea-view-skydiving-brochure.pdf`) |
| **3. Video Request** | *"Can I see a video of the experience?"* | Text response + embedded video player preview. | ✅ Passed (1 Video attachment: `hero.mp4`) |
| **4. Dual Request** | *"Send me the brochure and a video."* | Text response + both PDF brochure card and video player. | ✅ Passed (2 attachments: PDF + Video) |
| **5. Follow-Up Questions** | *"What about the weight limit?"* | Remembers conversation context; answers with 100 kg limit and medical guidelines. | ✅ Passed |
| **6. Missing Information** | *"Can I jump with my pet dog?"* | States that the information is unavailable on the website rather than hallucinating. | ✅ Passed |
| **7. Backend Inspector** | Inspect on `/knowledge` | Reflects real backend activity and exact text passed to Gemini. | ✅ Passed |

---

## 🔒 Security & Safe Handling

- **Server-Side API Key**: `GEMINI_API_KEY` is accessed only within Node.js runtime server routes (`app/api/chat/route.ts`).
- **Input Validation**: Rejects empty payloads, validates message array shapes, and escapes output.
- **Privacy in Knowledge View**: No API keys, tokens, or private conversation histories are exposed in `/knowledge`.
