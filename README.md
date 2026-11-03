# Greedy Adventures — Sea View Skydiving Prototype

Full-stack Next.js + TypeScript prototype for the **Greedy Adventures Assignment**. Features a redesigned editorial landing page for the **Sea View Skydiving** experience, an AI customer chatbot powered by **Google Gemini 2.5 Flash**, and a live **Read-Only Knowledge View**.

---

## ⚡ Quick Setup

```bash
# 1. Install dependencies
npm install

# 2. Add your Gemini API key in .env.local
GEMINI_API_KEY=your_gemini_api_key_here

# 3. Run development server
npm run dev
```

Open **`http://localhost:3000`** in your browser.

---

## 🌐 Website Sources Loaded

Content is grounded in the official Greedy Adventures experience page:
- **Base URL**: [`https://www.greedyadventures.com/experiences/sea-view-skydiving`](https://www.greedyadventures.com/experiences/sea-view-skydiving)
- **Sections Ingested**:
  - `Overview`: Tandem jump over Pattaya coast, 13,000 FT altitude, ~3h duration, starting ฿9,500.
  - `Packages`: ECO (฿9,500), Deluxe (฿12,500), and VIP (฿14,000) inclusions.
  - `The Plan`: 5-step itinerary (Arrival &rarr; Briefing &rarr; Boarding &rarr; Freefall &rarr; Canopy Landing).
  - `Details & Good to Know`: Bangkok pickup add-on, 100 kg weight threshold, minimum age 14+, weather policy.
  - `Dropzone Location`: Dropzone Thailand, 95 M.4, Chakphong, Klaeng District, Rayong 21190.

---

## 🤖 Agent Flow & Media Delivery

```
User Query ──► Intent & Topic Retrieval ──► Grounded Gemini 2.5 Flash ──► Rich UI Response
                      │                                                        │
                      ├──► Requests Brochure ──► Attaches PDF Card (Open/Download)
                      └──► Requests Video    ──► Attaches HTML5 Video Player
```

- **Model**: `gemini-2.5-flash` via `@google/generative-ai`.
- **Media Catalog**:
  - **Brochure (PDF)**: `public/documents/sea-view-skydiving-brochure.pdf` (1.4 MB).
  - **Experience Video (MP4)**: `public/hero.mp4` (Actual 13,000 FT ocean jump preview).
- **Safe Handling**: Secrets stay server-side; missing info triggers a polite fallback instead of hallucinations; sources are cited with direct anchor links.

---

## 🔍 How to Open the Knowledge View

Navigate to **`/knowledge`** or click **`KNOWLEDGE [AI VIEW]`** in the top navigation bar.

- **Sources Catalog**: Inspect all raw website chunks loaded into the chatbot.
- **Media Inventory**: Review available brochure PDFs and preview videos with demo labels.
- **Real-Time Activity Inspector**: Run any test query to see the **exact source text chunks and media files passed into the model prompt**.

---

## ✅ Repeatable Verification Steps

| # | Test Prompt | Expected Chatbot Behavior |
| :--- | :--- | :--- |
| **1** | *"What is included in the package?"* | Returns clear text breakdown of ECO, Deluxe, and VIP tiers with citations. No media attachments. |
| **2** | *"Can you send me a brochure?"* | Returns answer + official brochure card with **Open in New Tab** and **Download PDF** buttons. |
| **3** | *"Can I see a video of the experience?"* | Returns answer + playable HTML5 video preview in chat. |
| **4** | *"Send me the brochure and a video."* | Returns answer + **both** the PDF card and the video player. |
| **5** | *"What about the weight limit?"* | Remembers context; explains 100 kg limit and 90–100 kg instructor assessment. |
| **6** | *"Can I jump with my pet dog?"* | Fallback: States the info is unavailable on the website rather than making it up. |

---

## ⚠️ Limitations & AI Assistance

- **Limitations**: Prototype scope. Does not process live credit card transactions or book real calendar slots.
- **AI Assistance**: Built with assistance from Google Antigravity / Gemini for rapid layout structuring, component separation, and API wiring. All code, types, and logic were reviewed and tested.
